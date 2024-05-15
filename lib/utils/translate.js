const { Translate } = require('@google-cloud/translate').v2;
const translateClient = new Translate();

async function translateText(logger, text, sourceLang, targetLang) {

  text = text.replace(/\n(?!\s)/g, ' ').replace(/\n\s/g, ' ');
  if (sourceLang === targetLang) return text;
  try {
    const [translation] = await translateClient.translate(text, {
      from: sourceLang,
      to: targetLang,
    });
    logger.debug(`"${text}" => "${translation}"`);
    return translation;
  } catch (error) {
    logger.info('Error translating text:', error);
    throw error;
  }
}

module.exports = translateText;
