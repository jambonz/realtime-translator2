const assert = require('assert');
const translateText = require('./utils/translate');
const getPrompt = require('./utils/prompts');

const dialNumber = async(session) => {
  const {
    logger,
    destination,
    recognizer_a,
    recognizer_b,
    callerLang
  } = session.locals;

  logger.info(`dialing ${destination} for caller ${session.from}`);

  session
    .on('/dtmfDuringCall', onDtmf.bind(null, session))
    .on('/transcription-a', onTranscribeALeg.bind(null, session))
    .on('/transcription-b', onTranscribeBLeg.bind(null, session));

  session
    .say({text: getPrompt(callerLang, 'FINAL_PROMPT')})
    .config({
      boostAudioSignal: '-10 dB',
      recognizer: recognizer_a,
      transcribe: {
        enable: true,
        transcriptionHook: '/transcription-a'
      }
    })
    .dub({
      action: 'addTrack',
      track: 'a'
    })
    .dial({
      callerId: '15083728299',
      dtmfCapture: ['*1'],
      dtmfHook: '/dtmfDuringCall',
      target: [
        {
          type: 'phone',
          number: `1${destination}`
        }
      ],
      headers: {
        'P-Asserted-Identity': 'sip:15083728299@sip.jambonz.xyz',
      },
      boostAudioSignal: '-10 dB',
      transcribe: {
        transcriptionHook: '/transcription-b',
        channel: 2,
        recognizer: {
          ...recognizer_b,
          deepgramOptions: {
            endpointing: 500,
            utteranceEndMs: 1000,
            smartFormatting: true,
          }
        }
      },
      dub:(
        [
          {
            action: 'addTrack',
            track: 'b',
          }
        ]
      ),
    })
    .hangup()
    .reply();
};

const onTranscribeALeg = (session, evt) => {
  const {
    logger,
    call_sid_b,
    recognizer_a,
    recognizer_b,
    synthesizer_b,
    translatorPaused
  } = session.locals;
  const {speech} = evt;
  const transcript = speech.alternatives[0].transcript;
  logger.info({speech}, 'transcription received for channel 1');

  session.reply();

  if (translatorPaused) return;

  assert.ok(speech.is_final, 'expecting only final transcriptions');

  if (call_sid_b) {
    translateText(logger, transcript, recognizer_a.language, recognizer_b.language)
      .then((translation) => {
        if (!translation) return;
        logger.info({translation},
          `translated text, now sending dub command: ${translation} for call_sid_b ${call_sid_b}`);

        /* speak the translation to the b party */
        session.injectCommand('dub', {
          action: 'sayOnTrack',
          track: 'b',
          say: {
            text: translation,
            synthesizer: synthesizer_b
          }
        }, call_sid_b);
        return;
      })
      .catch((err) => logger.error({err}, 'Error translating text'));
  }
  else {
    logger.info('no call_sid_b, not sending dub command');
  }
};

const onTranscribeBLeg = (session, evt) => {
  const {
    logger,
    recognizer_a,
    recognizer_b,
    synthesizer_a,
    translatorPaused
  } = session.locals;
  const {speech} = evt;
  const transcript = speech.alternatives[0].transcript;
  logger.info({speech}, 'transcription received for channel 2');

  session.reply();

  if (translatorPaused) return;

  assert.ok(speech.is_final, 'expecting only final transcriptions');

  translateText(logger, transcript, recognizer_b.language, recognizer_a.language)
    .then((translation) => {
      if (!translation) return;
      logger.info({translation}, `translated text, now sending dub command: ${translation}`);

      /* speak the translation to the a party */
      session.injectCommand('dub', {
        action: 'sayOnTrack',
        track: 'a',
        say: {
          text: translation,
          synthesizer: synthesizer_a
        }
      });
      return;
    })
    .catch((err) => logger.error({err}, 'Error translating text'));
};

const onDtmf = async(session, evt) => {
  const {logger, callerLang, translatorPaused, synthesizer_a} = session.locals;
  logger.info({evt}, `got dtmf ${evt.dtmf} during call`);

  session.reply();

  if (evt.dtmf === '*1') {
    session.locals.translatorPaused = !translatorPaused;
    logger.info(`translator ${session.locals.translatorPaused ? 'paused' : 'resumed'}`);
    const text = getPrompt(callerLang, session.locals.translatorPaused ? 'TRANSLATOR_OFF' : 'TRANSLATOR_ON');
    session.injectCommand('dub', {
      action: 'sayOnTrack',
      track: 'a',
      say: {
        text,
        synthesizer: synthesizer_a
      }
    });

  }
};


module.exports = dialNumber;

