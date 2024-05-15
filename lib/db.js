const anis = {
  '15083084809': 'english',
  '13109809433': 'farsi',
};
const langInfo = {
  arabic: {
    stt: {
      vendor: 'microsoft',
      language: 'ar-SY'
    },
    tts: {
      vendor: 'microsoft',
      language: 'ar-SY',
      voice: 'ar-SY-AmanyNeural'
    }
  },
  english: {
    stt: {
      vendor: 'deepgram',
      language: 'en-US'
    },
    tts: {
      vendor: 'microsoft',
      language: 'en-US',
      voice: 'en-US-AvaMultilingualNeural'
    }
  },
  french: {
    stt: {
      vendor: 'microsoft',
      language: 'fr-FR'
    },
    tts: {
      vendor: 'microsoft',
      language: 'fr-FR',
      voice: 'fr-FR-DeniseNeural'
    }
  },
  farsi: {
    stt: {
      vendor: 'microsoft',
      language: 'fa-IR'
    },
    tts: {
      vendor: 'microsoft',
      language: 'fa-IR',
      voice: 'fa-IR-DilaraNeural'
    }
  },
  hindi: {
    stt: {
      vendor: 'microsoft',
      language: 'hi-IN'
    },
    tts: {
      vendor: 'microsoft',
      language: 'hi-IN',
      voice: 'hi-IN-SwaraNeural'
    }
  },
  khmer: {
    stt: {
      vendor: 'microsoft',
      language: 'km-KH'
    },
    tts: {
      vendor: 'microsoft',
      language: 'km-KH',
      voice: 'km-KH-SreymomNeural'
    }
  },
  portuguese: {
    stt: {
      vendor: 'microsoft',
      language: 'pt-BR'
    },
    tts: {
      vendor: 'microsoft',
      language: 'pt-BR',
      voice: 'pt-BR-FranciscaNeural'
    }
  },
  spanish: {
    stt: {
      vendor: 'microsoft',
      language: 'es-VE'
    },
    tts: {
      vendor: 'microsoft',
      language: 'es-VE',
      voice: 'es-UY-ValentinaNeural'
    }
  },
  russian: {
    stt: {
      vendor: 'microsoft',
      language: 'ru-RU'
    },
    tts: {
      vendor: 'microsoft',
      language: 'ru-RU',
      voice: 'ru-RU-SvetlanaNeural'
    }
  },
  ukrainian: {
    stt: {
      vendor: 'microsoft',
      language: 'uk-UA'
    },
    tts: {
      vendor: 'microsoft',
      language: 'uk-UA',
      voice: 'uk-UA-PolinaNeural'
    }
  },
};

const numerals = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const getLanguagePromptInfo = (lang) => {
  const languages = Object.keys(langInfo)
    .filter((l) => l !== lang) // Filter out the specified language
    .sort(); // Sort the languages alphabetically

  const result = languages.map((l) => ({
    language: l,
    stt: langInfo[l].stt,
    tts: langInfo[l].tts
  }));

  const prompt = languages
    .map((language, index) => `To choose ${language}, press ${numerals[index]}`)
    .join('. ');

  return {
    languages: result,
    prompt
  };
};

const getCallerPrefs = (ani) => {
  if (anis[ani]) return anis[ani];
};

const getLangInfo = (lang) => {
  if (langInfo[lang]) return langInfo[lang];
};


module.exports = {
  getCallerPrefs,
  getLangInfo,
  getLanguagePromptInfo
};
