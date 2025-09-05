let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};



const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens; // Возвращаем все данные из файла
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

// Функция для записи токена и других данных
function saveTokens(token, spoler, chatlogi) {
  const tokens = {
    token: token,
    spoler: spoler,
    chatlogi: chatlogi
  };

  try {
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
    console.log('Токены успешно сохранены.');
  } catch (error) {
    console.error('Ошибка при сохранении токенов:', error);
  }
}

// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


const encryptionMap = {
  'а': 'б', 'б': 'в', 'в': 'г', 'г': 'д',
  'д': 'е', 'е': 'ж', 'ж': 'з', 'з': 'и',
  'и': 'й', 'й': 'к', 'к': 'л', 'л': 'м',
  'м': 'н', 'н': 'о', 'о': 'п', 'п': 'р',
  'р': 'с', 'с': 'т', 'т': 'у', 'у': 'ф',
  'ф': 'х', 'х': 'ц', 'ц': 'ч', 'ч': 'ш',
  'ш': 'щ', 'щ': 'ъ', 'ъ': 'ы', 'ы': 'ь',
  'ь': 'э', 'э': 'ю', 'ю': 'я', 'я': 'а'
};

// Инвертируем карту для расшифровки
const decryptionMap = Object.fromEntries(Object.entries(encryptionMap).map(([key, value]) => [value, key]));

// Все буквы алфавита
const alphabet = Object.keys(encryptionMap);

// Функция для генерации случайного слова длиной от 3 до 10 символов
function getRandomWord() {
  const length = Math.floor(Math.random() * 6) + 5; // Случайная длина от 3 до 10
  let word = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    word += alphabet[randomIndex]; // Формируем слово из случайных букв
  }

  return word;
}

// Функция для шифрования слова
function encryptWord(word) {
  return word.split('').map(char => {
    return encryptionMap[char] || char; // Зашифровать каждую букву
  }).join('');
}
/*
// Игра "Отгадай слово"
cmd.hear(/^(?:загадка)$/i, async (message, bot) => {
  const originalWord = getRandomWord(); // Получаем случайное слово
  const encryptedWord = encryptWord(originalWord); // Шифруем слово

  message.user.secretWord = originalWord; // Сохраняем правильный ответ для проверки

  const explanation = `
Шифр: каждая буква заменяется на следующую в алфавите:
а -> я,
б -> а,
в -> б,
г -> в,
д -> г,
е -> д,
ж -> е,
з -> ж,
и -> з,
й -> и,
к -> й,
л -> к,
м -> л,
н -> м,
о -> н,
п -> о,
р -> п,
с -> р,
т -> с,
у -> т,
ф -> у,
х -> ф,
ц -> х,
ч -> ц,
ш -> ч,
щ -> ш,
ъ -> щ,
ы -> ъ,
ь -> ы,
э -> ь,
ю -> э,
я -> ю
`;

  await bot(`${explanation}
    
    
    
    отгадай - "${encryptedWord}"?
    Например напиши - решение прарк`);
});

// Проверка ответа игрока
const prizes = [
  'обычный кейс',
  'золотой кейс',
  'донат кейс',
  'Starr Drops',
  'Halloween кейс',
  'секретный кейс',
  'автозвук кейс',
  'новогодний кейс',
  'премиум кейс',
  'ультра кейс'
];

const dailyPrizesLimit = 5;
const userPrizes = {};

cmd.hear(/^(?:решение)\s+(.+)$/i, async (message, bot) => {
  if (!message.user.secretWord) {
    await bot('Сначала начните с команды "загадка" для получения слова.');
    return;
  }

  const playerAnswer = message.args[1].trim();

  if (playerAnswer === message.user.secretWord) {
    await bot('Верно! Вы угадали слово!');

    // Проверяем, сколько призов игрок уже получил сегодня
    const today = new Date().toDateString();
    if (!userPrizes[message.user.id]) {
      userPrizes[message.user.id] = { count: 0, lastClaim: today };
    }

    // Если игрок уже получал призы сегодня, проверяем лимит
    if (userPrizes[message.user.id].lastClaim === today && userPrizes[message.user.id].count >= dailyPrizesLimit) {
      await bot('Вы уже получили максимальное количество призов на сегодня.');
    } else {
      // Случайно выбираем индекс приза
      const rewardIndex = Math.floor(Math.random() * 10); // случайное число от 0 до 9
      const randomPrize = prizes[rewardIndex];

      // Увеличиваем счётчик призов
      userPrizes[message.user.id].count++;
      userPrizes[message.user.id].lastClaim = today;

      // Определяем ключ для начисления призов C1 до C10
      const rewardKey = `c${rewardIndex + 1}`; // +1, чтобы получить от 1 до 10

      // Увеличиваем соответствующее значение
      message.user[rewardKey] = (message.user[rewardKey] || 0) + 1;

      await bot(`Поздравляем! Вы получили приз: "${randomPrize}".`);
    }
  } else {
    await bot(`Неверно. Правильный ответ: ${message.user.secretWord}`);
  }

  delete message.user.secretWord; // Сбрасываем сохранённый ответ пользователя
});
*/
const prizes2 = {
  1: { amount: 100000000000000000, field: 'balance', name: 'на баланс' },
  2: { amount: 5, field: 'c8', name: 'новогодних кейсов' },
  3: { amount: 15, field: 'rubli', name: 'донат рублей' },
  4: { amount: 50000, field: 'balance2', name: 'GB' },
  5: { amount: 30, field: 'bilet', name: 'билетов для фортуны' },
  6: { amount: 700, field: 'rub', name: 'ЧакоРублей' },
  7: { amount: 2000, field: 'c2', name: 'сумма на поле c2' },
  8: { amount: 2000, field: 'c2', name: 'сумма на поле c2' },
  9: { amount: 2000, field: 'c2', name: 'сумма на поле c2' },
  10: { amount: 2000, field: 'c2', name: 'сумма на поле c2' },
};


const path = require('path');

// Путь к файлу для хранения дат
const datesFilePath = path.join(__dirname, '../database/даты.json');

const manualStartDate = new Date(2025, 0, 6, 19, 40);
const manualEndDate = new Date(2025, 0, 6, 19, 42);

let randomStartDate;
let randomEndDate;


// Функция для загрузки случайных дат из файла
function loadRandomDates() {
  if (fs.existsSync(datesFilePath)) {
    const data = JSON.parse(fs.readFileSync(datesFilePath));
    randomStartDate = new Date(data.start);
    randomEndDate = new Date(data.end);
  } else {
    generateRandomDates();
  }
}

// Функция генерации случайных дат
function generateRandomDates() {
  const randomDays = Math.floor(Math.random() * 10) + 1; // Генерация от 1 до 10 дней
  randomStartDate = new Date(manualStartDate);
  randomStartDate.setDate(randomStartDate.getDate() + randomDays);

  randomEndDate = new Date(randomStartDate);
  randomEndDate.setDate(randomEndDate.getDate() + randomDays); // Сдвиг на то же количество дней
  randomEndDate.setHours(23, 2); // Установите время 23:02 на конечной дате

  // Сохранение в файл
  const data = {
    start: randomStartDate,
    end: randomEndDate,
  };

  // Перед записью убедимся, что директория существует
  const dir = path.dirname(datesFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });

  }

  fs.writeFileSync(datesFilePath, JSON.stringify(data));
  console.log("Генерация новых дат:", {
    randomStart: randomStartDate,
    randomEnd: randomEndDate,
  });
}


// Функция, возвращающая датные пары
function getDates() {
  return {
    manual: {
      start: manualStartDate,
      end: manualEndDate,
    },
    random: {
      start: randomStartDate,
      end: randomEndDate,
    }
  };
}

// Загрузка случайных дат
loadRandomDates();


let allowGenerateRandomDates = true;

// Получаем даты
let { manual, random } = getDates();
cmd.hear(/^(?:получить)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const currentDate = new Date();

    if (currentDate < manualStartDate) {
      return bot(`Ивент еще не начался! Он начнется ${formatDate(manualStartDate)} 🎉`);
    }

    if (currentDate > manualEndDate) {
      if (allowGenerateRandomDates) {
        generateRandomDates();
        allowGenerateRandomDates = false; // запрещаем дальнейшую генерацию до следующего завершения
      }
      double.forEach(user => {
        user.days = 0; // Сбрасываем количество дней полученных пользователем
      });
      return bot(`Ивент завершился! Следующий ивент начнется ${formatDate(randomStartDate)} 🎉`);
    }
    // Логика получения призов остается без изменений
    const timeDiff = currentDate - manual.start; // Разница во времени в миллисекундах
    const daysReceived = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Преобразуем миллисекунды в дни

    // Проверка на количество дней, полученных пользователем
    if (message.user.days === undefined) {
      message.user.days = 0; // Инициализируем, если значение не задано
    }

    // Текущий день, за который можно получить приз
    const currentDay = daysReceived + 1;

    if (prizes2[currentDay] && currentDay > message.user.days) {
      const { amount, field, name } = prizes2[currentDay];

      message.user[field] = (message.user[field] || 0) + amount; // Обновляем баланс пользователя
      bot(`Поздравляю! Вы получили ${utils.sp(amount)} ${name} на день ${currentDay} 🎉`);

      // Обновляем состояние о полученных днях
      message.user.days = currentDay;
    } else {
      bot(`Вы уже получили все призы за этот день или не настал очередной день! 🎓`);
    }
  }
});

// Функция для форматирования даты
function formatDate(date) {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()]; // Получаем название месяца
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0'); // Форматируем часы
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Форматируем минуты

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}

cmd.hear(/^(?:время)$/i, async (message, bot) => {
  const currentDateTime = new Date(); // Получаем текущее время

  const formattedDate = currentDateTime.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Получаем миллисекунды и округляем их до двух знаков после запятой
  const milliseconds = currentDateTime.getMilliseconds();
  const roundedMilliseconds = Math.round(milliseconds / 10); // Округляем до десятых

  // Формируем сообщение
  const timeMessage = `Текущая дата и время: ${formattedDate} ${formattedTime}.${roundedMilliseconds}мс`;

  return bot(timeMessage); // Отправляем сообщение пользователю
});







module.exports = commands;
