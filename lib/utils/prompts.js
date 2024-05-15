/* eslint-disable max-len */
const prompts = {
  english: {
    WELCOME: 'Welcome to the automated translation service.',
    ENTER_NUMBER: 'Using the dialpad on your phone, please enter the ten digit phone number that you would like to call.',
    ARE_YOU_THERE: 'Are you still there?',
    SELECT_LANGUAGE_PREAMBLE: 'Great! Now please select the language the person you are calling speaks. ',
    FINAL_PROMPT: 'We will connect your call now with a translator on the line.  If you wish to remove the translator from the call at any time, just press star one.  Press star one again to add the translator back to the call.  Now please hold while we connect your call.',
    TRANSLATOR_OFF: 'translator off',
    TRANSLATOR_ON: 'translator on',
  },
  arabic: {
    WELCOME: 'مرحبًا بك في خدمة الترجمة الآلية',
    ENTER_NUMBER: 'باستخدام لوحة الاتصال على هاتفك، يرجى إدخال رقم الهاتف المكون من عشرة أرقام الذي ترغب في الاتصال به.',
    ARE_YOU_THERE: 'أنت لا تزال هناك؟',
    SELECT_LANGUAGE_PREAMBLE: 'الآن، يرجى تحديد اللغة التي يتحدث بها الشخص الذي تتصل به ',
    FINAL_PROMPT: 'سنقوم بتوصيل مكالمتك الآن مع مترجم على الخط. إذا كنت ترغب في إزالة المترجم من المكالمة في أي وقت، فقط اضغط على النجمة الأولى. يمكنك إضافة المترجم مرة أخرى بالضغط على النجمة مرة ثانية. يرجى الانتظار بينما نقوم بتوصيل مكالمتك.',
    TRANSLATOR_OFF: 'المترجم معطل',
    TRANSLATOR_ON: 'مترجم على',
  },
  farsi: {
    WELCOME: 'به خدمات ترجمه خودکار خوش آمدید.',
    ENTER_NUMBER: 'با استفاده از صفحه شماره گیری روی تلفن خود، لطفاً شماره تلفن ده رقمی را که می خواهید با آن تماس بگیرید وارد کنید.',
    ARE_YOU_THERE: 'هنوز آنجا هستی؟',
    SELECT_LANGUAGE_PREAMBLE: 'اکنون، لطفاً زبانی را که فردی که با او تماس می‌گیرید صحبت می‌کند، انتخاب کنید ',
    FINAL_PROMPT: 'ما اکنون تماس شما را با یک مترجم در خط وصل خواهیم کرد. اگر می خواهید مترجم را در هر زمان از تماس حذف کنید، فقط ستاره یک را فشار دهید. می‌توانید با فشار دادن یک بار ستاره، مترجم را دوباره اضافه کنید. لطفاً تا زمانی که تماس شما را وصل می کنیم، نگه دارید.',
    TRANSLATOR_OFF: 'مترجم خاموش',
    TRANSLATOR_ON: 'مترجم روشن',
  },
  french: {
    WELCOME: 'Bienvenue dans le service de traduction automatique.',
    ENTER_NUMBER: 'À l\'aide du clavier de votre téléphone, veuillez saisir le numéro de téléphone à dix chiffres que vous souhaitez appeler.',
    ARE_YOU_THERE: 'Vous êtes toujours là ?',
    SELECT_LANGUAGE_PREAMBLE: 'Maintenant, veuillez sélectionner la langue que parle la personne que vous appelez. ',
    FINAL_PROMPT: 'Nous allons maintenant connecter votre appel avec un traducteur en ligne. Si vous souhaitez retirer le traducteur de l\'appel à tout moment, appuyez simplement sur la première étoile. Vous pouvez rajouter le traducteur en appuyant une seconde fois sur l\'étoile. Veuillez patienter pendant que nous connectons votre appel.',
    TRANSLATOR_OFF: 'traducteur éteint',
    TRANSLATOR_ON: 'traducteur sur',
  },
  hindi: {
    WELCOME: 'स्वचालित अनुवाद सेवा में आपका स्वागत है।',
    ENTER_NUMBER: 'अपने फ़ोन पर डायलपैड का उपयोग करके, कृपया दस अंकों वाला फ़ोन नंबर दर्ज करें जिस पर आप कॉल करना चाहते हैं।',
    ARE_YOU_THERE: 'क्या आप अभी भी हैं?',
    SELECT_LANGUAGE_PREAMBLE: 'महान! अब कृपया वह भाषा चुनें जिसे आप कॉल कर रहे हैं वह भाषा बोलता है। ',
    FINAL_PROMPT: 'अब हम आपकी कॉल को लाइन पर मौजूद अनुवादक से जोड़ देंगे। यदि आप किसी भी समय अनुवादक को कॉल से हटाना चाहते हैं, तो बस स्टार वन दबाएँ। अनुवादक को कॉल में वापस जोड़ने के लिए फिर से स्टार वन दबाएँ। अब जब तक हम आपकी कॉल कनेक्ट कर रहे हैं कृपया होल्ड करें। ',
    TRANSLATOR_OFF: 'अनुवादक बंद',
    TRANSLATOR_ON: 'अनुवादक चालू',
  },
  khmer: {
    WELCOME: 'សូមស្វាគមន៍មកកាន់សេវាកម្មបកប្រែដោយស្វ័យប្រវត្តិ។',
    ENTER_NUMBER: 'ដោយប្រើបន្ទះចុចនៅលើទូរស័ព្ទរបស់អ្នក សូមបញ្ចូលលេខទូរស័ព្ទដប់ខ្ទង់ដែលអ្នកចង់ហៅ។',
    ARE_YOU_THERE: 'តើ​អ្នក​នៅ​ទីនេះ​ទេ​?',
    SELECT_LANGUAGE_PREAMBLE: 'ឥឡូវនេះ សូមជ្រើសរើសភាសាដែលអ្នកកំពុងហៅនិយាយ ',
    FINAL_PROMPT: 'យើងនឹងភ្ជាប់ការហៅទូរសព្ទរបស់អ្នកឥឡូវនេះជាមួយអ្នកបកប្រែនៅលើបន្ទាត់។ ប្រសិនបើ​អ្នក​ចង់​ដក​អ្នក​បក​ប្រែ​ចេញ​ពី​ការ​ហៅ​ទូរសព្ទ​គ្រប់​ពេល គ្រាន់​តែ​ចុច​ផ្កាយ​មួយ។ អ្នកអាចបន្ថែមអ្នកបកប្រែមកវិញដោយចុចផ្កាយមួយលើកទីពីរ។ សូមរង់ចាំខណៈពេលដែលយើងភ្ជាប់ការហៅរបស់អ្នក។',
    TRANSLATOR_OFF: 'អ្នកបកប្រែបិទ',
    TRANSLATOR_ON: 'អ្នកបកប្រែបើក',
  },
  portuguese: {
    WELCOME: 'Bem-vindo ao serviço de tradução automática.',
    ENTER_NUMBER: 'Usando o teclado de discagem do seu telefone, digite o número de telefone de dez dígitos para o qual você gostaria de ligar.',
    ARE_YOU_THERE: 'Você ainda está aí?',
    SELECT_LANGUAGE_PREAMBLE: 'Agora, selecione o idioma que a pessoa para quem você está ligando fala. ',
    FINAL_PROMPT: 'Conectaremos sua chamada agora com um tradutor na linha. Se desejar retirar o tradutor da chamada a qualquer momento, basta digitar asterisco um. Você pode adicionar o tradutor novamente pressionando asterisco um uma segunda vez. Aguarde enquanto conectamos sua chamada.',
    TRANSLATOR_OFF: 'tradutor desligado',
    TRANSLATOR_ON: 'tradutor em',
  },
  spanish: {
    WELCOME: 'Bienvenido al servicio de traducción automática.',
    ENTER_NUMBER: 'Usando el teclado de su teléfono, ingrese el número de teléfono de diez dígitos al que desea llamar.',
    ARE_YOU_THERE: 'estás ahí todavía',
    SELECT_LANGUAGE_PREAMBLE: 'Ahora, seleccione el idioma que habla la persona a la que llama. ',
    FINAL_PROMPT: 'Conectaremos su llamada ahora con un traductor en la línea. Si desea eliminar al traductor de la llamada en cualquier momento, simplemente presione asterisco uno. Puede volver a agregar el traductor presionando asterisco uno por segunda vez. Espere mientras conectamos su llamada.',
    TRANSLATOR_OFF: 'traductor apagado',
    TRANSLATOR_ON: 'Traductora en',
  },
  russian: {
    WELCOME: 'Добро пожаловать в сервис автоматического перевода.',
    ENTER_NUMBER: 'С помощью клавиатуры телефона введите десятизначный номер телефона, на который вы хотите позвонить.',
    ARE_YOU_THERE: 'Ты еще там?',
    SELECT_LANGUAGE_PREAMBLE: 'Теперь выберите язык, на котором говорит человек, которому вы звоните. ',
    FINAL_PROMPT: 'Сейчас мы соединим ваш звонок с переводчиком на линии. Если вы хотите в любой момент удалить переводчика из разговора, просто нажмите звездочку. Вы можете добавить переводчик обратно, нажав звездочку второй раз. Пожалуйста, подождите, пока мы подключим ваш звонок.',
    TRANSLATOR_OFF: 'переводчик выключен',
    TRANSLATOR_ON: 'переводчик на',
  },
  ukrainian: {
    WELCOME: 'Ласкаво просимо до служби автоматичного перекладу.',
    ENTER_NUMBER: 'Використовуючи цифрову клавіатуру на своєму телефоні, введіть десятизначний номер телефону, на який ви хочете зателефонувати.',
    ARE_YOU_THERE: 'Ти ще там?',
    SELECT_LANGUAGE_PREAMBLE: 'Тепер виберіть мову, якою розмовляє особа, якій ви телефонуєте. ',
    FINAL_PROMPT: 'Зараз ми з’єднаємо ваш дзвінок із перекладачем на лінії. Якщо ви бажаєте в будь-який момент видалити перекладача з розмови, просто натисніть зірочку. Ви можете додати перекладач назад, натиснувши зірочку вдруге. Зачекайте, поки ми з’єднаємо ваш дзвінок.',
    TRANSLATOR_OFF: 'перекладач вимкнено',
    TRANSLATOR_ON: 'перекладач на',
  },
};


const getPrompt = (language, promptName, param) => {
  return prompts[language][promptName];
};

module.exports = getPrompt;
