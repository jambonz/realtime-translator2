const {
  getLangInfo,
  getCallerPrefs,
  getLanguagePromptInfo
} = require('../db');
const getPrompt = require('../utils/prompts');
const translateText = require('../utils/translate');
const dial = require('../dial');

const service = ({logger, makeService}) => {
  const svc = makeService({path: '/translator'});

  svc.on('session:new', async(session) => {
    session.locals = {translatorPaused: 0, logger: logger.child({call_sid: session.call_sid})};
    const ani = session.from.startsWith('+') ? session.from.slice(1) : session.from;
    session.locals.logger.info(`new incoming call from: ${ani}`);

    session
      .on('/number', onNumberCollected.bind(null, session))
      .on('/selected-language', onLanguageSelected.bind(null, session))
      .on('call:status', onCallStatus.bind(null, session))
      .on('close', onClose.bind(null, session))
      .on('error', onError.bind(null, session));

    const callerLang = getCallerPrefs(ani);

    /* only provide services to known callers */
    if (!callerLang) {
      session.locals.logger.info(`unknown calling number: ${ani}`);
      session
        .sip_decline({status: 503})
        .send();
      return;
    }
    const {tts, stt} = getLangInfo(callerLang);
    logger.info({tts, stt}, `caller language is ${callerLang} for ani ${ani}`);
    session.locals.callerLang = callerLang;
    session.locals.synthesizer_a = tts;
    session.locals.recognizer_a = stt;

    session
      .answer()
      .config({
        recognizer: stt,
        synthesizer: tts,
      })
      .pause({length: 0.3})
      .gather({
        say: {text: `${getPrompt(callerLang, 'WELCOME')}${getPrompt(callerLang, 'ENTER_NUMBER')}`},
        input: ['digits'],
        dtmfBargein: true,
        numDigits: 10,
        actionHook: '/number',
        timeout: 20
      })
      .send();
  });
};


/* step one is to collect the number to call */
const onNumberCollected = (session, evt) => {
  const {logger, callerLang} = session.locals;

  switch (evt.reason) {
    case 'dtmfDetected':
      logger.info(`collected digits: ${evt.digits}`);
      session.locals = {
        ...session.locals,
        destination: evt.digits,
        callerId: evt.from
      };
      getLanguage(session);
      break;
    case 'timeout':
    default:
      session
        .say({text: getPrompt(callerLang, 'ARE_YOU_THERE')})
        .gather({
          say: {text: getPrompt(callerLang, 'ENTER_NUMBER')},
          input: ['digits'],
          dtmfBargein: true,
          numDigits: 10,
          actionHook: '/number',
          timeout: 20
        })
        .send();
      break;
  }
};

/* step two is to collect the language for the called party  */
const getLanguage = async(session) => {
  const {logger, callerLang, synthesizer_a} = session.locals;
  const {languages, prompt} = getLanguagePromptInfo(callerLang);
  let select_language_prompt = prompt;
  logger.info({languages, prompt}, 'got language info');

  try {
    select_language_prompt = await translateText(logger, prompt, 'en-US', synthesizer_a.language);
  } catch (error) {
    logger.error({error}, 'Error translating language prompt');
    return session.hangup().reply();
  }

  session.locals.languages = languages;
  const text = `${getPrompt(callerLang, 'SELECT_LANGUAGE_PREAMBLE')}${select_language_prompt}`;
  session
    .gather({
      say: {text},
      input: ['digits'],
      dtmfBargein: true,
      numDigits: 1,
      actionHook: '/selected-language',
      timeout: 20
    })
    .reply();
};

/* step three is the play a final prompt and then dial the called party */
const onLanguageSelected = async(session, evt) => {
  const {logger, languages} = session.locals;
  const {digits} = evt;
  const selected = parseInt(digits, 10) - 1;

  logger.info({evt}, 'got language selection');

  switch (evt.reason) {
    case 'dtmfDetected':
      if (selected < 0 || selected >= languages.length) break;
      session.locals = {
        recognizer_b: languages[selected].stt,
        synthesizer_b: languages[selected].tts,
        ...session.locals,
      };

      return dial(session);
    case 'timeout':
    default:
      break;
  }
  session.hangup().reply();
};

const onClose = (session, code, reason) => {
  const {logger} = session.locals;
  logger.info({session, code, reason}, `session ${session.call_sid} closed`);
};

const onError = (session, err) => {
  const {logger} = session.locals;
  logger.info({err}, `session ${session.call_sid} received error`);
};

const onCallStatus = (session, evt) => {
  const {logger} = session.locals;
  logger.info({evt}, 'call status');
  if (!session.locals.call_sid_b && evt.direction === 'outbound') {
    session.locals.call_sid_b = evt.call_sid;
    logger.info(`call_sid for b leg is ${session.locals.call_sid_b}`);
  }
};

module.exports = service;
