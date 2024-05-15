const assert = require('assert');

assert.ok(process.env.CALLER_LANGUAGE_NAME, 'process.env.CALLER_LANGUAGE_NAME is required');
assert.ok(process.env.CALLER_LANGUAGE_CODE, 'process.env.CALLER_LANGUAGE_CODE is required');
assert.ok(process.env.CALLER_TTS_VENDOR, 'process.env.CALLER_TTS_VENDOR is required');
assert.ok(process.env.CALLER_TTS_VOICE, 'process.env.CALLER_TTS_VOICE is required');
assert.ok(process.env.CALLER_STT_VENDOR, 'process.env.CALLER_STT_VENDOR is required');
assert.ok(process.env.CALLED_LANGUAGE_NAME, 'process.env.CALLED_LANGUAGE_NAME is required');
assert.ok(process.env.CALLED_LANGUAGE_CODE, 'process.env.CALLED_LANGUAGE_CODE is required');
assert.ok(process.env.CALLED_TTS_VENDOR, 'process.env.CALLED_TTS_VENDOR is required');
assert.ok(process.env.CALLED_TTS_VOICE, 'process.env.CALLED_TTS_VOICE is required');
assert.ok(process.env.CALLED_STT_VENDOR, 'process.env.CALLED_STT_VENDOR is required');

const speakerSettings = {
  a: {
    preferredLanguageName: process.env.CALLER_LANGUAGE_NAME,
    tts: {
      vendor: process.env.CALLER_TTS_VENDOR,
      language: process.env.CALLER_LANGUAGE_CODE,
      voice: process.env.CALLER_TTS_VOICE
    },
    stt: {
      vendor: process.env.CALLER_STT_VENDOR,
      language: process.env.CALLER_LANGUAGE_CODE
    }
  },
  b: {
    preferredLanguageName: process.env.CALLED_LANGUAGE_NAME,
    tts: {
      vendor: process.env.CALLED_TTS_VENDOR,
      language: process.env.CALLED_LANGUAGE_CODE,
      voice: process.env.CALLED_TTS_VOICE
    },
    stt: {
      vendor: process.env.CALLED_STT_VENDOR,
      language: process.env.CALLED_LANGUAGE_CODE
    }
  }
};

const synthesizer_a = {
  vendor: speakerSettings.a.tts.vendor,
  language: speakerSettings.a.tts.language,
  voice: speakerSettings.a.tts.voice
};
const synthesizer_b = {
  vendor: speakerSettings.b.tts.vendor,
  language: speakerSettings.b.tts.language,
  voice: speakerSettings.b.tts.voice
};
const recognizer_a = {
  vendor: speakerSettings.a.stt.vendor,
  language: speakerSettings.a.stt.language
};
const recognizer_b = {
  vendor: speakerSettings.b.stt.vendor,
  language: speakerSettings.b.stt.language
};

module.exports = {
  speakerSettings,
  synthesizer_a,
  synthesizer_b,
  recognizer_a,
  recognizer_b
};
