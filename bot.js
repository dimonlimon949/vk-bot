// npm install -g pm2
const { VK } = require('vk-io');
let vk = require('./vk-api.js'); 
const fs = require('fs');
const path = require('path');


// Увеличение лимитов памяти
if (process.env.NODE_ENV === 'production') {
    require('v8').setFlagsFromString('--max-old-space-size=14096');
}


const tokensFilePath = path.join(__dirname, './настройки/токены.json');

// Функция для получения токенов
function getTokens() {
  try {
    // Создаем папку и файл, если их нет
    if (!fs.existsSync(path.dirname(tokensFilePath))) {
      fs.mkdirSync(path.dirname(tokensFilePath), { recursive: true });
    }
    
    if (!fs.existsSync(tokensFilePath)) {
      fs.writeFileSync(tokensFilePath, JSON.stringify({ 
        token: "ВАШ_ОСНОВНОЙ_ТОКЕН",
        token2: "ДОПОЛНИТЕЛЬНЫЙ_ТОКЕН"
      }, null, 2));
      console.log('Создан новый файл токенов с шаблоном');
    }

    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

// Получаем все токены
const tokenData = getTokens();
console.log("Загруженные токены:", tokenData);



let user = new VK({
  token: tokenData.token,
});

if (!tokenData) {
  console.error('Не удалось загрузить токены');
  process.exit(1);
}





let messageSentFiveSeconds = false;

let messageSentThreeSeconds = false;

let config = require('./database/settings.json');

const crypto = require('crypto'); 

let farms = require('./spisok/фермы.js')

const { performance } = require('perf_hooks');

const commands = [];

let utils = require('./utils.js') 

const { stringify } = require("querystring");



let chats = require('./database/chats.json');

let log = require('./database/log.json');

let double = require('./database/users.json');

let bossinfo = require('./database/bossinfo.json')

let botinfo = require("./database/botinfo.json");




const tokensFilePath2 = './настройки/ид бесед.json';

const tokensFilePath3 = './настройки/валюты.json';


function calculateBonus(user, winnings, gameResult) {
  let bonusPercentage = 0;

  switch (gameResult) {
    case 2:
      bonusPercentage = 0.10;
      break;
    case 3:
      bonusPercentage = 0.05; 
      break;
    case 5:
      bonusPercentage = 0.03;
      break;
    case 50:
      bonusPercentage = 0.02; 
      break;
    default:
      bonusPercentage = 0;
      break;
  }

  let bonus = winnings * bonusPercentage;
  return bonus;
}
 


function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function addZero(i) {
  return i < 10 ? "0" + i : i;
}





const tokenData2 = getToken2(); 
const tokenData3 = getToken3(); 

const tokensFilePath4 = './настройки/создатели бота.json';

function getToken4() {
    try {
      const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
      return tokens;
    } catch (error) {
      console.error('Ошибка при чтении токенов:', error);
      return null;
    }
  }

const tokenData4 = getToken4();

const spoler = tokenData4 ? Object.values(tokenData4)
    .map(id => Number(id))
    .filter(id => Number.isInteger(id) && id > 0) : [];

const chatlogi = tokenData2.chatlogi;

const coaf = tokenData2.coaf
let val1 = tokenData3.val1
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4
let val5 = tokenData3.val5

const tokenu = tokenData.user

const usert = new VK({
  token: tokenu
});


const fss = require('fs').promises; // Используем асинхронный API


 const loadCommands = async () => {
  const cmdDirs = [
    path.join(__dirname, 'команды'),
    path.join(__dirname, 'аниме команды'),
    path.join(__dirname, 'функции и интервалы'),
    path.join(__dirname, 'гпт'),
  ];

  try {
    for (const cmdDir of cmdDirs) {
      // Асинхронное чтение директории
      const files = await fss.readdir(cmdDir);

      // Параллельная загрузка команд
      await Promise.all(files.map(async (file) => {
        if (file.endsWith('.js')) {
          const command = require(path.join(cmdDir, file));
          
          // Валидация команды (базовые проверки)
          if (!Array.isArray(command)) {
            console.warn(`[WARN] Команда в файле ${file} должна экспортировать массив`);
            return;
          }

          commands.push(...command); // Добавляем команды без модификации
        }
      }));
    }
    
    console.log(`[INFO] Загружено ${commands.length} команд`);
  } catch (error) {
    console.error('[ERROR] Ошибка загрузки команд:', error);
    throw error; // Пробрасываем ошибку для обработки выше
  }
};



 





function generateRandomString(length) {
  const englishCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const russianCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = englishCharacters + russianCharacters;
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateCustomHash(proverka) {
  // Создаем хеш SHA-256
  const hash = crypto.createHash('sha256').update(proverka).digest('hex');
  
  // Заменяем символы на китайские иероглифы
  const replacementMap = {
    '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
    'a': '',
    'b': '',
    'c': '',
    'd': '',
    'e': '',
    'f': '',
    'g': '',
    'h': '',
    'i': '',
    'j': '',
    'k': '',
    'l': '',
    'm': '',
    'n': '',
    'o': '',
    'p': '',
    'q': '',
    'r': '',
    's': '',
    't': '',
    'u': '',
    'v': '',
    'w': '',
    'x': '',
    'y': '',
    'z': ''
  };

  let chineseHash = '';
  for (let char of hash) {
    chineseHash += replacementMap[char.toLowerCase()] || char;
  }

  return chineseHash;
}

const spolerList = Object.values(spoler).map(Number);

// Генераторы случайных чисел
const randomGenerators = {
  System: {
    name: 'Системный',
    icon: '🖥️',
    getRandom: () => Math.random()
  },
  Crypto: {
    name: 'Криптографический',
    icon: '🔐',
    getRandom: () => {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] / 2**32;
    }
  },
  TimeBased: {
    name: 'Временной',
    icon: '⏱️',
    getRandom: () => {
      const perf = performance.now();
      return (perf % 1000) / 1000;
    }
  },
  Hybrid: {
    name: 'Гибридный',
    icon: '⚡',
    getRandom: () => {
      const rand1 = randomGenerators.Crypto.getRandom();
      const rand2 = randomGenerators.TimeBased.getRandom();
      const rand3 = Math.random();
      return (rand1 + rand2 + rand3) % 1;
    }
  },
  Weather: {
    name: 'Погодный',
    icon: '🌧️',
    getRandom: async () => {
      try {
        const mockWeather = {
          humidity: Math.random() * 100,
          pressure: 950 + Math.random() * 100,
          timestamp: Date.now()
        };
        return (mockWeather.humidity + mockWeather.pressure + mockWeather.timestamp) % 1;
      } catch {
        return Math.random();
      }
    }
  }
};

setInterval(async () => {
  timerUpdated = false;
  const chat = chats.find(chat => chat.type === 2);
  if (chat) {
    for (const chat of chats) {
      if (chat.id >= 0 && chat.type == 2) {
        updateGameTime(chat);

        if (!chat.game) {
          startNewGame(chat);
        }
        const lastGame = chat.games[chat.games.length - 1];
        if (chat.gametime <= 5 && chat.games[chat.games.length - 1].stavki.length > 0 && !messageSentFiveSeconds) {
          chat.games[chat.games.length - 1].stavka = false;
          vk.api.messages.send({
            chat_id: chat.id,
            message: '⏳ До конца раунда осталось менее пяти секунд, ставки не принимаются! 🚫💰',
            random_id: 0
          });
          messageSentFiveSeconds = true;
        }

        if (chat.gametime <= 2 && chat.games[chat.games.length - 1].stavki.length > 0 && !messageSentThreeSeconds) {
          vk.api.messages.send({
            chat_id: chat.id,
            message: 'Итак, результаты раунда... 🎉✨',
            random_id: 0
          });
          messageSentThreeSeconds = true;
        }
        
        if (chat.gametime <= 0 && !timerUpdated && chat.games[chat.games.length - 1].stavki.length > 0) {
          messageSentFiveSeconds = false;
          messageSentThreeSeconds = false;
          let win = [];

          chat.games[chat.games.length - 1].stavki.forEach(stavka => {
            win.push({ id: stavka.id, type: stavka.type, amount: stavka.amount });
          });

          win.sort((a, b) => a.type - b.type);

          let text = '';

          for (let i = 0; i < win.length; i++) {
            let user = win[i];
            let gameResult = chat.games[chat.games.length - 1].result;
            let userId = user.id;

            let dbUser = double.find(u => u.id === userId);

            if (dbUser) {
              let userWon = user.type === gameResult;
              let winnings = 0;

              if (userWon) {
                winnings = user.amount * user.type;
                let roundedWinnings = Math.round(winnings);

                if (dbUser.reshim == 1) {
                  text += `✅ [id${user.id}|${dbUser.tag}] ставка ${utils.sp(user.amount)} на x${user.type} выиграла! 🏆 (приз ${utils.sp(roundedWinnings)} ${val4}) 💰🎉\n`;
                  dbUser.balance2 += roundedWinnings;

                  if (dbUser.settings.topdon && (user.amount >= 10000)) {
                    dbUser.winStreaks = (dbUser.winStreaks || 0) + 1;
                    const bonus = calculateBonus(dbUser, roundedWinnings, lastGame.result); 
                    const roundedBonus = Math.round(bonus);
                    dbUser.balance2 += roundedBonus;
                    text += `💥 Бонус : ${utils.sp(roundedBonus)} ${val4}\n`;
                  }
                } else if (dbUser.reshim == 2) {
                  text += `✅ [id${user.id}|${dbUser.tag}] ставка ${utils.sp(user.amount)} на x${user.type} выиграла! 🏆 (приз ${utils.sp(roundedWinnings)} ${val1}) 💰🎉\n`;
                  dbUser.balance += roundedWinnings;

                  if (dbUser.settings.topdon && (user.amount >= 10000)) {
                    dbUser.winStreaks = (dbUser.winStreaks || 0) + 1;
                    const bonus = calculateBonus(dbUser, roundedWinnings, lastGame.result); 
                    const roundedBonus = Math.round(bonus);
                    dbUser.balance += roundedBonus;
                    text += `💥 Бонус : ${utils.sp(roundedBonus)} ${val1}\n`;
                  }
                }
              } else {
text += `❌ [id${user.id}|${dbUser.tag}] ставка ${utils.sp(user.amount)} ${dbUser.reshim == 1 ? val4 : val1} на x${user.type} проиграла\n`;                dbUser.winStreaks = 0;
              }
            } else {
              console.error(`Пользователь с ID ${user.id2} не найден в массиве double`);
            }
          }

          let attachment;
          switch (chat.games[chat.games.length - 1].result) {
            case 2: attachment = 'photo-171493284_457790008'; break;
            case 3: attachment = 'photo-171493284_457790009'; break;
            case 5: attachment = 'photo-171493284_457790010'; break;
            case 50: attachment = 'photo-171493284_457790007'; break;
          }

          vk.api.messages.send({
            chat_id: chat.id,
            message: `🎲✨ Выпал множитель х${chat.games[chat.games.length - 1].result} 

${text}

🔑 Хеш игры: 
${chat.games[chat.games.length - 1].hash}
✅ Проверка честности: ${chat.games[chat.games.length - 1].proverka}
`,
            attachment: attachment,
            keyboard: JSON.stringify({}),
            random_id: 0
          }); 
        }
      }
    }
    timerUpdated = true;
  }
}, 1000);


async function testDistribution(runs = 1000) {
  const prizes = [
    {value: 2, prob: 0.54, name: "Обычный приз", color: "\x1b[37m"},
    {value: 3, prob: 0.23, name: "Необычный приз", color: "\x1b[36m"},
    {value: 5, prob: 0.20, name: "Редкий приз", color: "\x1b[32m"},
    {value: 50, prob: 0.03, name: "Ультра-редкий", color: "\x1b[35m"}
  ];

  console.log(`🔍 Тестируем распределение (${runs.toLocaleString()} итераций)`);

  // Статистика
  const stats = {
    prizes: {},
    generators: {},
    startTime: Date.now()
  };

  // Инициализация
  prizes.forEach(p => {
    stats.prizes[p.value] = {
      count: 0,
      name: p.name,
      color: p.color,
      expectedBar: '▇'.repeat(Math.round(p.prob * 50))
    };
  });

  Object.keys(randomGenerators).forEach(key => {
    stats.generators[key] = 0;
  });

  // Запуск тестов
  const chat = {games: [], game: false};
  for (let i = 0; i < runs; i++) {
    const result = await startNewGame(chat);
    stats.prizes[result].count++;
    stats.generators[chat.games[0].randomSource]++;
  }

  // Вывод результатов
  console.log('\n📊 Распределение призов:');
  prizes.forEach(p => {
    const stat = stats.prizes[p.value];
    const actual = stat.count / runs;
    const actualBar = '▇'.repeat(Math.round(actual * 50));
    
    console.log(
      `${p.value} (${p.color}${p.name}\x1b[0m):\n` +
      `  Ожидаемо: ${(p.prob * 100).toFixed(2).padStart(6)}% | ${stat.expectedBar}\n` +
      `  Получено: ${(actual * 100).toFixed(2).padStart(6)}% | ${p.color}${actualBar}\x1b[0m\n` +
      `  Количество: ${stat.count.toLocaleString()}`
    );
  });

  console.log('\n🎲 Использованные генераторы:');
  Object.entries(stats.generators)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, count]) => {
      const gen = randomGenerators[key];
      const percent = (count / runs * 100).toFixed(1);
      const bar = '▇'.repeat(Math.round(count / runs * 30));
      
      console.log(
        `${gen.icon} ${gen.name.padEnd(16)}: ` +
        `${percent}%`.padStart(6) +
        ` | ${bar} ${count.toLocaleString()}`.padStart(15)
      );
    });

  console.log(`\n⏱ Общее время: ${Date.now() - stats.startTime} мс`);
}

// Запуск теста с интервалом
let isFirstRun = true;
const interval = setInterval(() => {
  const now = new Date();
  console.log('\n' + '='.repeat(50));
  console.log(`🕒 ${isFirstRun ? 'Первый запуск' : 'Запуск'} теста в ${now.toLocaleTimeString()}`);
  testDistribution().catch(console.error);
  isFirstRun = false;
}, 60000);


async function startBot() {
  try {
    // Форматирование даты и времени
    const now = new Date();
    const launchTime = now.toLocaleString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Получаем статистику ВК API
    const apiStatus = await checkVkApiStatus();
    const serverTime = await getVkServerTime();

    console.log(`🤖 Бот успешно запущен`);
    console.log(`⏱ Время запуска: ${launchTime}`);
    console.log(`📊 Статус VK API: ${apiStatus ? '✅ Работает' : '❌ Ошибка'}`);
    console.log(`🕒 Серверное время ВК: ${serverTime}`);

    // Отправляем сообщение в чаты
    for (const chat of chats) {
      try {
        await vk.api.messages.send({
          chat_id: chat.id,
          message: `🔄 Бот запущен

📅 ${launchTime}
🌐 VK API: ${apiStatus ? '✅ Стабильно' : '⚠️ Проблемы'}
⏱ Время сервера ВК: ${serverTime}

Система готова к работе!`,
          random_id: 0,
          disable_mentions: 1
        });
      } catch (error) {
        console.error(`Ошибка отправки в чат ${chat.id}:`, error.message);
      }
    }

  } catch (error) {
    console.error('Критическая ошибка при запуске:', error);
  }
}

// Проверка статуса API ВКонтакте
async function checkVkApiStatus() {
  try {
    await vk.api.utils.getServerTime({});
    return true;
  } catch {
    return false;
  }
}

// Получение серверного времени ВК
async function getVkServerTime() {
  try {
    const response = await vk.api.utils.getServerTime({});
    return new Date(response * 1000).toLocaleTimeString('ru-RU');
  } catch {
    return 'не доступно';
  }
}


function datasss() {
  const date = new Date();
  let days = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (days < 10) days = "0" + days;
  return days + "." + month + "." + year;
}

function timesss() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return hours + ":" + minutes + ":" + seconds;
}

async function startNewGame(chat) {
  const prizes = [
    {value: 2, prob: 0.54, name: "Обычный приз", color: "\x1b[37m"},
    {value: 3, prob: 0.23, name: "Необычный приз", color: "\x1b[36m"},
    {value: 5, prob: 0.20, name: "Редкий приз", color: "\x1b[32m"},
    {value: 50, prob: 0.03, name: "Ультра-редкий", color: "\x1b[35m"}
  ];

  // Выбираем случайный генератор
  const generatorKeys = Object.keys(randomGenerators);
  const randomGeneratorKey = generatorKeys[Math.floor(Math.random() * generatorKeys.length)];
  const generator = randomGenerators[randomGeneratorKey];

  // Получаем случайное значение
  let randValue;
  try {
    randValue = generator.getRandom.constructor.name === 'AsyncFunction' 
      ? await generator.getRandom() 
      : generator.getRandom();
  } catch (e) {
    console.error(`Ошибка в генераторе ${generator.name}:`, e);
    randValue = Math.random();
  }

  // Выбираем приз
  let result;
  let cumulativeProb = 0;
  for (const prize of prizes) {
    cumulativeProb += prize.prob;
    if (randValue <= cumulativeProb) {
      result = prize.value;
      break;
    }
  }

  // Генерация данных для проверки
  const proverka = `${result}|${generateRandomString(15)}`;
  const gamehash = await generateCustomHash(proverka);

  // Обновление состояния игры
  chat.games = [{
    result,
    stavka: true,
    hash: gamehash,
    proverka,
    stavki: [],
    randomSource: randomGeneratorKey,
    generatorIcon: generator.icon,
  }];
  chat.game = true;

  return result;
}












const { updates, snippets } = vk;

vk.updates.on('error', (err) => {
  console.error('Ошибка Long Poll:', err);
});



vk.updates.on('chat_invite_user', async (message, bot) => {
  const inviterId = message.senderId;
  const invitedId = message.eventMemberId;
  const chatId = message.chatId;
  const isCommunity = invitedId < 0;
  const absoluteInvitedId = Math.abs(invitedId);
  const isInviterCreator = spolerList.includes(Math.abs(inviterId));

  // Формируем лог-объект
  const actionLog = {
      timestamp: new Date().toISOString(),
      inviter: {
          id: inviterId,
          isCreator: isInviterCreator,
          tag: `@id${inviterId}`
      },
      invited: {
          id: invitedId,
          type: isCommunity ? 'community' : 'user',
          tag: isCommunity ? `@club${absoluteInvitedId}` : `@id${invitedId}`
      },
      chatId: chatId,
      action: 'chat_invite',
      status: 'начато'
  };

  // Функция для отправки логов
  const sendLog = async (logData) => {
      try {
          const logMessage = [
              `🔹 ${logData.action.toUpperCase()}`,
              `👤 Пригласил: ${logData.inviter.tag} ${logData.inviter.isCreator ? '(создатель)' : ''}`,
              `🎯 Приглашен: ${logData.invited.tag}`,
              `🔄 Статус: ${logData.status}`,
              ...(logData.reason ? [`📌 Причина: ${logData.reason}`] : []),
              ...(logData.error ? [`❗ Ошибка: ${logData.error.message} (код ${logData.error.code})`] : []),
              `⏱ ${logData.timestamp}`
          ].join('\n');

          await vk.api.messages.send({
              chat_id: chatlogi,
              message: logMessage,
              random_id: 0
          });
      } catch (e) {
          console.error('Ошибка при отправке лога:', e);
      }
  };

  // Обработка приглашения сообщества
  if (isCommunity) {
      actionLog.status = 'обработка';
      await sendLog(actionLog);

      // Если пригласил создатель - пропускаем
      if (isInviterCreator) {
          actionLog.status = 'пропущено';
          actionLog.reason = 'пригласил создатель';
          await sendLog(actionLog);
          return;
      }

      try {
          // 1. Кикаем сообщество
          await vk.api.messages.removeChatUser({
              chat_id: chatId,
              member_id: invitedId
          });

          // 2. Кикаем пригласившего
          await vk.api.messages.removeChatUser({
              chat_id: chatId,
              user_id: inviterId
          });

          // 3. Отправляем уведомление в чат
          await vk.api.messages.send({
              chat_id: chatId,
              message: `⚠ ${actionLog.inviter.tag}, приглашение сообществ запрещено!`,
              random_id: 0
          });

          actionLog.status = 'успешно';
          actionLog.details = 'сообщество и пригласивший кикнуты';
          await sendLog(actionLog);

      } catch (error) {
          actionLog.status = 'ошибка';
          actionLog.error = {
              code: error.code,
              message: error.message
          };
          await sendLog(actionLog);
          console.error('Ошибка при кике:', error);
      }
      return;
  }

  // Обработка приглашения пользователей
  actionLog.status = 'обработка';
  await sendLog(actionLog);

  let inviter = double.find(x => x.id === inviterId);
  let invitedUser = double.find(x => x.id === invitedId);

  // Проверка регистрации приглашающего
  if (!inviter) {
      actionLog.status = 'отклонено';
      actionLog.reason = 'приглашающий не зарегистрирован';
      await sendLog(actionLog);
      await bot('Вы не получили награду, так как не зарегистрированы в системе');
      return;
  }

  // Проверка на кик-лист
  if (invitedUser?.kik) {
      try {
          await vk.api.messages.removeChatUser({
              chat_id: chatId,
              user_id: invitedId
          });
          actionLog.status = 'кикнут';
          actionLog.reason = 'пользователь в кик-листе';
          await sendLog(actionLog);
          await bot('Пользователь был кикнут из чата');
      } catch (error) {
          actionLog.status = 'ошибка';
          actionLog.error = {
              code: error.code,
              message: error.message
          };
          await sendLog(actionLog);
          await bot('Ошибка при кике пользователя');
          console.error('Ошибка при кике:', error);
      }
      return;
  }

  // Начисление награды за приглашение
  const reward = 1000;
  inviter.balance2 += reward;

  try {
      await vk.api.messages.send({
          user_id: inviter.id,
          message: `🎉 Вы получили ${utils.sp(reward)} ${val4} за приглашение!`,
          random_id: 0
      });
      
      // Сохраняем изменения в базе
      fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
      
      actionLog.status = 'награда начислена';
      actionLog.details = `начислено ${reward} ${val4}`;
      await sendLog(actionLog);

  } catch (error) {
      actionLog.status = 'ошибка';
      actionLog.error = {
          code: error.code,
          message: error.message
      };
      await sendLog(actionLog);
      console.error('Ошибка при начислении награды:', error);
  }
});





let messageCount = 0; // Счетчик сообщений
let captchaThreshold = getRandomInt(10, 200); // Начальное случайное количество сообщений для капчи

// Функция для генерации случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация капчи
function generateCaptcha() {
  const examples = [
    { expression: '2 + 2', answer: 2 + 2 },
    { expression: '8 + 2', answer: 8 + 2 },
    { expression: '10 - 5', answer: 10 - 5 },
    { expression: '4 * 2', answer: 4 * 2 },
    { expression: '3 * 2 + 5', answer: 3 * 2 + 5 },
    { expression: '20 / 5', answer: 20 / 5 },
    { expression: '15 + 10', answer: 15 + 10 },
    { expression: '50 - 25', answer: 50 - 25 },
    { expression: '6 * 7', answer: 6 * 7 },
    { expression: '9 / 3', answer: 9 / 3 },
    { expression: '5 + 3 * 2', answer: 5 + 3 * 2 },
    { expression: '(8 + 4) / 2', answer: (8 + 4) / 2 },
    { expression: '12 - (3 + 1)', answer: 12 - (3 + 1) },
    { expression: '2 * (3 + 4)', answer: 2 * (3 + 4) },
    { expression: '18 / (2 + 4)', answer: 18 / (2 + 4) },
    { expression: '7 * 3 - 4', answer: 7 * 3 - 4 },

  ];

  const randomExample = examples[Math.floor(Math.random() * examples.length)];
  return randomExample; 
}




function logMessage(message) {
  const userId = message.user.uid;

  const logDate = new Date();

  // Форматируем дату и время только один раз
  const formattedDate = `${addZero(logDate.getDate())}.${addZero(logDate.getMonth() + 1)}.${logDate.getFullYear()}`;
  const formattedTime = `${addZero(logDate.getHours())}:${addZero(logDate.getMinutes())}:${addZero(logDate.getSeconds())}`;
  const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  const logEntry = {
    time: formattedDateTime, // Сохраняем дату и время в формате строки
    msg: message.text
  };

  // 1. Запись в файл (logi.txt)
  const fileLogString = `${userId} | ${formattedDateTime} | ${message.text}\n`;
  fs.appendFile('logi.txt', fileLogString, (err) => {
    if (err) {
      console.error('Ошибка записи в файл logi.txt:', err);
    }
  });

  // 2. Запись в память (объект log)
  if (!log[userId]) {
    log[userId] = [];
  }

  log[userId].push({
    time: `🕒 Время: ${formattedDateTime}`, //Сохраняем  полную дату и время
    msg: `⏩ Команда: «${message.text}»`
  });

  //Ограничение кол-ва логов в памяти
  if (log[userId].length > 20) {
    log[userId] = log[userId].slice(-20); // Оставляем только последние 20
  }

  // Другие действия (если message.text есть, то +1 sms, обновление aktiv)
  if (message.text) {
    message.user.sms += 1;
  }
  message.user.aktiv = `${datasss()}, ${timesss()}`;
}

const userMessageHistory = new Map(); 

const MESSAGE_HISTORY_LENGTH = 6;  
const TIME_WINDOW = 5000; 
const MAX_MESSAGES = 5;  

const lastMessageTime = new Map(); // Map для хранения времени последнего сообщения каждого пользователя
const lastMessageText = new Map(); 
const lastMessageSenderId = new Map();
const cooldownTime = 1400; 

// Путь к файлу статистики
const statsPath = path.join(__dirname, 'commandStats.json');

// Инициализация файла статистики
function initStatsFile() {
  if (!fs.existsSync(statsPath)) {
    fs.writeFileSync(statsPath, '{}', 'utf8');
    return {};
  }
  
  try {
    return JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  } catch (e) {
    console.error('Ошибка чтения файла статистики, создаём новый:', e);
    fs.writeFileSync(statsPath, '{}', 'utf8');
    return {};
  }
}

// Загрузка статистики
let commandStats = initStatsFile();

// Функция для сохранения статистики
function saveStats() {
  fs.writeFileSync(statsPath, JSON.stringify(commandStats, null, 2), 'utf8');
}














loadCommands().then(() => {
  updates.on('message_new', async (message) => {
    console.log('Получено сообщение:', message.text);

     if (Number(message.senderId) <= 0) return;


    let userId = message.peerId || 'Неизвестно';


  const now = Date.now();


const previousMessageText = lastMessageText.get(userId) || null;
const previousSenderId = lastMessageSenderId.get(userId) || null;

// Проверяем, совпадает ли текущее сообщение с предыдущим и нужно ли применять cooldown
if (previousMessageText === message.text && 
    previousSenderId === message.senderId && 
    lastMessageTime.has(userId) && 
    (now - lastMessageTime.get(userId)) < cooldownTime) {
    
    console.log(`Сообщение от пользователя ${userId} проигнорировано (идентично предыдущему и слишком быстро): ${message.text}`);
    return; // Игнорируем сообщение
}

  // Обновляем время последнего сообщения и текст последнего сообщения
  lastMessageTime.set(userId, now);
  lastMessageText.set(userId, message.text);

    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });
  
    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }
  
    const groupId = groupInfo[0].id;

    const groupName = groupInfo[0].name;

    // if (message.chat && message.chat.type !== 0 &&  (message.chatId === undefined || (message.chatId !== 95 && message.chatId !== 96))) {return;}
    
if (/\[@club${groupId}|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[@club${groupId}|(.*)\]/ig, '').trim();
  
    if (!chats.find(x => x.id === message.chatId)) {
      if (message.isChat) {
        chats.push({
          id: message.chatId,
          type: 1,
          uid: chats.length,
          antispam: true,
          statuemoney: 0,
          statuepeople: 0,
          statuemsg: 0,
          statuemoneylvl: 0,
          statuepeoplelvl: 0,
          statuemsglvl: 0,
          reg: new Date(),
          priz: false,
          start: false,
          gametime: 60,
          game: false,
          igra: false, 
          games: []
        })

        message.chat = chats.find(x => x.id === message.chatId)
      } 
    }

    if (!double.find(x => x.id === message.senderId) && !message.isChat) {

      const [user_info] = await vk.api.users.get({ user_id: message.senderId });

      const date = new Date();

      double.push({
        id: message.senderId,
        id2: message.senderId,
        tag: user_info.first_name,
        balance: 5000,
        mention: true,
        uid: double.length,
        winStreaks: 0,
        balance2: 0,
        ch: 0,
        vopros: "-",
        ostat: 0,
        bank: 0,
        bilet: 0,
        btc: 0,
        farm_btc: 0,
        videocard_dg: 0,
        biz: 0,
        energy: 10,
        maxenergy: 10,
        sataka: 1,
        bossyr: 0,
        pismo: 0,
        refcount: 0,
        ref: false,
        iznos: 0,
        bral: 86400000,
        tema: 1,
        parkedLength: 1,
        arend: {
          pk: 0,
          dom: 0,
          yaxta: 0,
          tel: 0,
          vert: 0,
          sam: 0,
          instrm: 0,
          kvar: 0,
        },
        now: {
          kv1: false,
          kv2: false,
          kv3: false,
          kv4: false,
          kv5: false,
          kv6: false,
          kv7: false,
          kv8: false,
          kv9: false,
          kv10: false,
          kv11: false,
          kv12: false,
          kv13: false,
          kv14: false,
          kv15: false,
          kv16: false,
          kv17: false,
          kv18: false,
          kv19: false,
          kv: false,
          kv20: false,
        },
        stock: {
          status: "Игрок",
          stpban: "Нет",
          strban: "Нет",
          stban: "Нет",
          bantop: "Нет",
        },
        astats: {
          warn: 0,
          blocked: false,
          reports: 0,
          bans: 0,
          rbans: 0,
          pbans: 0,
          balance: 0,
          bank: 0,
          astat: true,
          fakeid: double.length,
          tema: 1,
          kd: 0,
          car: false,
          yacht: false,
          helicopter: false,
          airplane: false,
          homes: false,
          apartment: false,
          videocard: false,
          bad: 0,
          norm: 0,
        },
        rub: 0,
        rubli: 0,
        sprcoin: 0,
        dcoins: 0,
        rating: 0,
        gon: 0,
        bans: {
          ban: false,
          rban: false,
          pban: false,
          bantimer: 0,
          rbantimer: 0,
          reason: "",
        },
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
        c11: 0,
        possilka1: 0,
        possilka2: 0,
        possilka3: 0,
        sound: 0,
        soundrating: 0,
        autosound: 0,
        tree: 0,
        leaf: 0,
        irrigation: 0,
        leafpribil: 0,
        minertool: 0,
        clanid: false,
        aktiv: 0,
        ruds: {
          zhelezo: 0,
          zoloto: 0,
          almaz: 0,
          materia: 0,
          obsidian: 0,
          plazma: 0,
          antimateria: 0,
        },
        procent: {
          clock: 0,
        },
        timers: {
          hasWorked: false,
          bonus: false,
          bonus2: false,
          vipbonus: false,
          prembonus: false,
          titanbonus: false,
          imperatorbonus: false,
          poxod: false,
          podarok: false,
          report: false,
          ban: false,
        },
        captcha: {
          vid: false,
          otvet: false,
          primer: false,
          pred: 0,
          primer2: 0,
        },
        work: 0,
        lte2: false,
        bantop: false,
        notifications: true,
        promo: false,
        opit: 0,
        exp: 1,
        level: 1,

        regDate: `${date.getDate()}.${date.getMonth() + 1
          }.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,

        settings: {
          busi: false,
        },
        scar: {
          gosnomer: "undefined",
          gontime: false,
          prok_1: 1,
          prok_2: 1,
          prok_3: 1,
          prok_4: 1,
          prok_5: 1,
          prok_6: 1,
        },
        transport: {
          car: 0,
          yacht: 0,
          airplane: 0,
          helicopter: 0,
        },
        settings: {
          adm: 0,
          vip: false,
          premium: false,
          titan: false,
          imperator: false,
          topdon: false,
          joker: false,
          busi: false,
          king: false,
        },
        inf: false,
        infcas: 10,
        realty: {
          home: 0,
          apartment: 0,
          basement: false,
        },
        misc: {
          phone: 0,
          computer: 0,
          clock: 0,
          farm: 0,
          farm_count: 0,
          videocard_count: 0,
          videocard: 0,
        },
        pet: {
          lvl: 0,
          poterl: false,
        },
        marriage: {
          partner: 0,
          requests: [],
        },
        limitadd: {
          nicklimitadd: 16,
          banklimitadd: 50000000,
          timeradd: utils.time(),
          playerlimitadd: 50000000,
          sentadd: 0,
          paylimitadd: 50000000,
          farmlimitadd: 100,
          videocardlimitadd: 10,
        },
        limit: {
          nicklimit: 16,
          banklimit: 50000000,
          timer: utils.time(),
          playerlimit: 50000000,
          sent: 0,
          paylimit: 50000000,
          farmlimit: 100,
          videocardlimit: 10,
        },
        fir: 1.0,
        fertilizer: 0,
        water: 0,
        gift: 0,
        questcasino: 0,
        firstmsg: true,
        questcup: 0,
        questrussion: 0,
        questracer: 0,
        questdonat: 0,
        questminer: 0,
        questbrak: false,
        questhack: 0,
        questclan: false,
        questautosound: 0,
        questtictactoe: 0,
        questfollow: false,
        questdamagedealer: false,
        questbosspower: false,
        questallfucker: false,
        questbasket: 0,
        questcup2: 0,
        questrussion2: 0,
        questracer2: 0,
        questdonat2: 0,
        questminer2: 0,
        questtaxi: 0,
        questhack2: 0,
        questtrade: 0,
        questautosound2: 0,
        questtictactoe2: 0,
        questpremcase: false,
        questdamagedealer2: 0,
        questbosspower2: false,
        questallfucker2: false,
        prazdnikbussines: false,
        march8: false,
        stars1: false,
        stars2: false,
        stars3: false,
        stars4: false,
        stars5: false,
        ball: 0,
        petlim: false,
        antiget: false,
        lockdown: 0,
        kazna: 0,
        pay: 0,
        povesil: 0,
        gir: 0,
        arubli: 0,
        apromo: false,
        admid: false,
        rep: false,
        notif: {
          one: false,
        },
        time: {
          one: 0,
        },
        sms: 0,
        valentinki: 1,
        lim: 0,
        business: [],
        business2: [],

        tuk: 1,

        lastVisit: 0,

        photo: "",

        notifications: true,

        lastbet: 1,
        status: {
          work: false,
          gon: false,
          boss: false,
          mainer: false,
          rich: false,
        },
        timers: {
          bonus: false,
        },

      });
      const foundUser = double.find(x => x.id === message.senderId);


      message.user = double.find(x => x.id === message.senderId);

      // Обработка реферального источника (если есть)
      if (message.referralSource && message.referralValue) {
        if (message.user.ref) {
          return message.send(`⚠ Вы уже активировали приглашение.`);
        }

        const referrerId = Number(message.referralSource);
        const referrer = await double.find(x => x.id === referrerId);
        const activatorInfo = `Активировал: @id${message.user.id} (${message.user.tag})`;

        if (!referrer) return message.send(`⚠ Игрок не найден.`);

        message.user.ref = true;
        const multiply = utils.pick([1, 2, 3, 4]);
        referrer.refcount += 1;
        referrer.fertilizer += 2;
        referrer.water += 2;

        // Награды в зависимости от количества рефералов
        let rewardMessage = "";
        
        if (referrer.refcount < 10) {
          switch (multiply) {
            case 1:
              referrer.c3 += 1;
              rewardMessage = "начислен 1 донат-кейс";
              break;
            case 2:
              referrer.balance += 10000000;
              rewardMessage = `начислено 10.000.000 ${val1}`;
              break;
            case 3:
              referrer.c2 += 3;
              rewardMessage = "начислено 3 Золотых-кейса";
              break;
            case 4:
              referrer.rubli += 1;
              rewardMessage = "начислено 1 рубль";
              break;
          }
        } 
        else if (referrer.refcount >= 10 && referrer.refcount < 100) {
          switch (multiply) {
            case 1:
              referrer.c3 += 2;
              rewardMessage = "начислено 2 донат-кейса";
              break;
            case 2:
              referrer.balance += 20000000;
              rewardMessage = `начислено 20.000.000 ${val1}`;
              break;
            case 3:
              referrer.c2 += 5;
              rewardMessage = "начислено 5 Золотых-кейсов";
              break;
            case 4:
              referrer.rubli += 2;
              rewardMessage = "начислено 2 рубля";
              break;
          }
        } 
        else if (referrer.refcount >= 100 && referrer.refcount != 666) {
          switch (multiply) {
            case 1:
              referrer.c3 += 3;
              rewardMessage = "начислено 3 донат-кейса";
              break;
            case 2:
              referrer.balance += 50000000;
              rewardMessage = `начислено 50.000.000 ${val1}`;
              break;
            case 3:
              referrer.c2 += 10;
              rewardMessage = "начислено 10 Золотых-кейсов";
              break;
            case 4:
              referrer.rubli += 3;
              rewardMessage = "начислено 3 рубля";
              break;
          }
        }

        // Специальная награда за 666 рефералов
        if (referrer.refcount == 666) {
          referrer.stars5 = true;
          rewardMessage = "начислена лучшая звезда";
        }

        // Награда за каждые 20 рефералов
        if (referrer.refcount % 20 == 0) {
          referrer.c6 += 1;
          if (referrer.notifications) {
            await vk.api.messages.send({
              user_id: referrer.id,
              message: `УВЕДОМЛЕНИЕ ✅\n` +
                `▶ Вам начислен 1 Секретный-кейс за то что игрок активировал ваше приглашение!\n` +
                `${activatorInfo}\n` +
                `🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`,
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [[{
                  "action": {
                    "type": "text",
                    "payload": JSON.stringify({ command: "уведомления выкл" }),
                    "label": "🔕"
                  },
                  "color": "negative"
                }]]
              }),
              random_id: 0
            });
          }
        }

        // Отправка уведомления пригласившему
        if (referrer.notifications && rewardMessage) {
          await vk.api.messages.send({
            user_id: referrer.id,
            message: `УВЕДОМЛЕНИЕ ✅\n` +
              `▶ Вам ${rewardMessage} за то что игрок активировал ваше приглашение!\n` +
              `${activatorInfo}\n` +
              `🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`,
            keyboard: JSON.stringify({
              "inline": true,
              "buttons": [[{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({ command: "уведомления выкл" }),
                  "label": "🔕"
                },
                "color": "negative"
              }]]
            }),
            random_id: 0
          });
        

        // Награда для активировавшего приглашение
        message.user.c3 += 2;
        return message.send(`✅ Вы успешно активировали приглашение! Начислен бонус в виде 2 донат-кейсов! 🎁✨`);
      }

        try {
          await vk.api.messages.send({
            chat_id: chatlogi,
            message: `• Ура, новый пользователь 🥰\n- 👤 ID: @id${foundUser.id}\n👤 UID: ${foundUser.uid}`,
            random_id: 0
          });
        
          return message.send(
            `Привет! 👋😃\n\n` +
            `♻️ @club${groupId} (${groupName}) — игровой бот с крутыми командами! 🎮🔥\n` +
            `🤗 Вы успешно зарегистрированы. Приятной игры! 🌟\n` +
            `👉 Напишите «Помощь», чтобы увидеть все команды. 📜`,
            {
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                  [{
                    "action": {
                      "type": "text",
                      "payload": JSON.stringify({ command: `помощь` }),
                      "label": `♻️ Помощь`
                    },
                    "color": "positive"
                  }],
                  [{
                    action: {
                      type: "text",
                      payload: JSON.stringify({ command: `путь новичка` }),
                      label: `👀 Путь новичка`
                    },
                    color: "positive"
                  }]
                ]
              })
            }
          );
        } catch (error) {
          console.error(error); // Логируем ошибку
        
          return message.send(
            `Привет! 👋😃\n\n` +
            `♻️ @club${groupId} (${groupName}) — игровой бот с крутыми командами! 🎮🔥\n` +
            `🤗 Вы успешно зарегистрированы. Приятной игры! 🌟\n` +
            `👉 Напишите «Помощь», чтобы увидеть все команды. 📜`,
            {
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                  [{
                    "action": {
                      "type": "text",
                      "payload": JSON.stringify({ command: `помощь` }),
                      "label": `♻️ Помощь`
                    },
                    "color": "positive"
                  }],
                  [{
                    action: {
                      type: "text",
                      payload: JSON.stringify({ command: `путь новичка` }),
                      label: `👀 Путь новичка`
                    },
                    color: "positive"
                  }]
                ]
              })
            }
          );
        }


      } else {
        try {
          await vk.api.messages.send({
            chat_id: chatlogi,
            message: `• Ура, новый пользователь 🥰\n- 👤 ID: @id${foundUser.id}
              👤 UID: ${foundUser.uid}`,
            random_id: 0
          });
          return message.send(
            `Привет! 👋😃\n\n` +
            `♻️ @club${groupId} (${groupName}) — игровой бот с крутыми командами! 🎮🔥\n` +
            `🤗 Вы успешно зарегистрированы. Приятной игры! 🌟\n` +
            `👉 Напишите «Помощь», чтобы увидеть все команды. 📜`,
            {
            keyboard: JSON.stringify({
              "inline": true,
              "buttons": [
                [{
                  "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `реф 0` }),
                    "label": `Промо (${groupName})`
                  },
                  "color": "positive"
                }
              ],
              [{
                action: {
                  type: "text",
                  payload: JSON.stringify({ command: `путь новичка` }),
                  label: `👀 Путь новичка`
                },
                color: "primary"
              }],
              [
                {
                  "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `помощь` }),
                    "label": `♻️ Помощь`
                  },
                  "color": "positive"
                }
              ]
              ]
            
            })
          }
          )
        } catch  {
          return message.send(
            `Привет! 👋😃\n\n` +
            `♻️ @club${groupId} (${groupName}) — игровой бот с крутыми командами! 🎮🔥\n` +
            `🤗 Вы успешно зарегистрированы. Приятной игры! 🌟\n` +
            `👉 Напишите «Помощь», чтобы увидеть все команды. 📜`,
            {
            keyboard: JSON.stringify({
              "inline": true,
              "buttons": [
                  [{
                  "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `реф 0` }),
                    "label": `Промо (${groupName})`
                  },
                  "color": "positive"
                },
              ],
              [{
                action: {
                  type: "text",
                  payload: JSON.stringify({ command: `путь новичка` }),
                  label: `👀 Путь новичка`
                },
                color: "primary"
              }],
              [
                {
                  "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `помощь` }),
                    "label": `♻️ Помощь`
                  },
                  "color": "positive"
                }
              ]
              ]
            })
          }
          )
          console.log('')
        }

        let priglostext = ''
      }
      
    }



    if (message.messagePayload && message.messagePayload.command) {
      message.text = message.messagePayload.command;
    }




    botinfo.messagescount += 1;

    message.user = double.find(x => x.id === message.senderId);


    message.chat = chats.find(x => x.id === message.chatId)






let otvet;
let botResponseText = null;

const bot = async (text, params = {}) => {
    if (!message || !message.send) {
        console.error("Ошибка: message или message.send не определены");
        return "Ошибка: невозможно отправить сообщение";
    }

    const userId = message.user?.uid || "unknown";
    const userTag = message.user?.tag || "Неизвестный пользователь";
    const userMention = message.user?.mention ? `@id${message.user.id} (${userTag})` : userTag;

    // Формируем полный текст сообщения
    const fullMessage = `${userMention}, ${typeof text === "object" ? JSON.stringify(text) : text}`;

    try {
        if (fullMessage.length < 4000) {
            // Если сообщение короткое - отправляем сразу
            await message.send(fullMessage, params);
            return fullMessage;
        } else {
            // Для длинных сообщений разбиваем на части
            const firstPart = fullMessage.substring(0, 4000);
            await message.send(firstPart, params);
            
            // Отправляем остальные части
            for (let i = 1; i < Math.ceil(fullMessage.length / 4000); i++) {
                const part = fullMessage.substring(i * 4000, (i + 1) * 4000);
                await message.send(part, params);
                await new Promise(resolve => setTimeout(resolve, 500)); // Задержка 500 мс
            }
            
            return `Сообщение отправлено (${Math.ceil(fullMessage.length / 4000)} частей)`;
        }
    } catch (error) {
        console.error("Ошибка при отправке:", error);
        return `Ошибка: ${error.message}`;
    }
};









// Поиск команды
const command = commands.find(x => {
  if (x[0] instanceof RegExp) {
    return x[0].test(message.text);
  } else if (typeof x[0] === 'function') {
    return x[0](message, bot);
  } else if (typeof x[0] === 'string') {
    return message.text === x[0];
  }
  return false;
});

// Если команда найдена, обновляем статистику
if (command) {
  updateCommandStats(command); // Передаем саму команду, а не извлеченное имя
}

function getSimplifiedCommandName(commandPattern) {
  console.log('Получен commandPattern:', commandPattern);
  
  let result;
  
  // Для строковых команд
  if (typeof commandPattern === 'string') {
    result = commandPattern.toLowerCase().trim();
    console.log('Обработка строки. Результат:', result);
    return result;
  }

  // Для регулярных выражений
  if (commandPattern instanceof RegExp) {
    const regexStr = commandPattern.toString();
    console.log('Регулярное выражение:', regexStr);
    
    // Специальные обработки для часто используемых команд
    if (regexStr.includes('бонус')) {
      result = 'бонус';
      console.log('Определена команда "бонус". Результат:', result);
      return result;
    }
    if (regexStr.includes('профиль')) {
      result = 'профиль';
      console.log('Определена команда "профиль". Результат:', result);
      return result;
    }
    if (regexStr.includes('баланс')) {
      result = 'баланс';
      console.log('Определена команда "баланс". Результат:', result);
      return result;
    }
    
    // Общий случай - извлекаем первое русское/английское слово
    const firstWordMatch = regexStr.match(/[а-яёa-z]+/i);
    if (firstWordMatch) {
      result = firstWordMatch[0].toLowerCase();
      console.log('Извлечено первое слово. Результат:', result);
      return result;
    }
  }

  // Для функций и других типов
  console.log('Не удалось определить команду. Возвращаем "unknown_command"');
  return 'unknown_command';
}
 
function updateCommandStats(command) {
  const commandName = getSimplifiedCommandName(command[0]); // command[0] - это паттерн команды
  commandStats[commandName] = (commandStats[commandName] || 0) + 1;
  saveStats();
}


    if (double.find(x => x.id == message.senderId) && command) {
      message.user.limsms +=1
      console.log(`Команда выполнена из файла: ${command[command.length - 1]}`);
    }


    if (botinfo.wait && double.find(x => x.id == message.senderId)) {
      if (command) {
        const userIdString = String(message.user.id);
        let hasPermission = false;
    
        if (spoler) {
          const spolerValues = Object.values(spoler).map(String);
          hasPermission = spolerValues.includes(userIdString);
        }
    
        if (!hasPermission) {
          await bot(
            `🚧 Технические работы 🚧
        
        ${botinfo.prichina || '-'}.`,
            { attachment: 'doc690927947_689824058' }
          );
          await message.send({ sticker_id: 108205 });
          return;
        }
      }
    }



    if (double.find(x => x.id == message.senderId) && message.isChat && !botinfo.wait) {
      if (message.chat.antispam) {
          const userId = message.senderId;
          const now = Date.now();
  
          // Получаем историю сообщений пользователя, или создаем новую, если ее нет
          const messageHistory = userMessageHistory.get(userId) || [];
  
          messageHistory.push(now);
  
          // Удаляем старые сообщения, чтобы история не росла бесконечно
          while (messageHistory.length > 0 && messageHistory[0] <= (now - TIME_WINDOW)) {
              messageHistory.shift();
          }
  
          // Сохраняем обновленную историю
          userMessageHistory.set(userId, messageHistory);
  
          // Проверяем, не является ли пользователь спамером и имеет ли он разрешение
          const hasPermission = Object.values(spoler).includes(String(userId));
          
          if (messageHistory.length > MAX_MESSAGES) {
              if (hasPermission) {
                  // Если у пользователя есть разрешение, отправляем сообщение
return bot(`Прости меня, я попытался исключить тебя.`)
              } else {
                  try {
                      await vk.api.messages.removeChatUser({
                          chat_id: message.chatId,  // ID чата
                          user_id: userId            // ID спамера
                      });
  
                      vk.api.messages.send({
                          chat_id: chatlogi,
                          message: `
  🚨Система безопасности🚨
  
  спамер- *id${userId} !`,
                          random_id: 0
                      });
  
                  } catch (error) {
                      console.error(`Ошибка при кике [id${userId}]:`, error);
                      vk.api.messages.send({
                          chatlogi,
                          message: `
  🚨Система безопасности🚨
  Обнаружен спамер *id${userId}, но произошла ошибка при попытке кикнуть его! Ошибка: ${error.message}`,
                          random_id: 0
                      });
                  }
              }
  
              return; 
          }
      }
  }
    if (!double.find(x => x.id === message.senderId) && message.isChat && command) {
      await message.send(`Для регистрации, пожалуйста, напишите в личные сообщения! 😊`)
    }

    const startPingTime = performance.now();

if (double.find(x => x.id == message.senderId) && (message.user.settings.adm >= 6 && message.user.captcha.vid !== false)) {

  message.user.captcha.vid = false;
  message.user.captcha.otvet = false;
  message.user.captcha.primer = false;
  message.user.captcha.pred = 0;
}

    if (command && double.find(x => x.id === message.senderId)) {
      messageCount++;
      if (message.user.captcha.vid !== false) {
        const text = message.text.trim();
        const parts = text.split(' ');
    
        const answer = parts[1];
        console.log(`Ответ: ${answer}, Правильный ответ: ${message.user.captcha.otvet}`);
        if (!isNaN(parseFloat(answer)) && parseFloat(answer) === message.user.captcha.otvet) {
          message.user.captcha.vid = false;
          message.user.captcha.otvet = false;
          message.user.captcha.primer = false;
          message.user.captcha.pred = 0;
    
          return bot(`Вы успешно прошли проверку на робота! ✅`);
        } else {
          if (message.user.captcha.vid == 1) {
            return bot(
              `Подозрительная активность! ❌\nРешите и ведите ответ "капча ${message.user.captcha.primer2}", чтобы пройти проверку на робота!`,
              {
                keyboard: JSON.stringify({
                  inline: true,
                  buttons: [
                    [
                      {
                        action: {
                          type: "text",
                          payload: JSON.stringify({ command: `капча ${message.user.captcha.otvet}` }),
                          label: "✅ Я не робот",
                        },
                        color: "positive",
                      },
                    ],
                  ],
                }),
              }
            );
          } else {
            if (messageCount >= captchaThreshold) {
              const captcha = generateCaptcha();
              message.user.captcha.otvet = captcha.answer;
              message.user.captcha.primer2 = captcha.expression;
              message.user.captcha.vid = 1;
              messageCount = 0;
              captchaThreshold = getRandomInt(50, 500);
              return bot(`Подозрительная активность! ❌\nВведите "капча ${captcha.expression}", чтобы пройти проверку на робота!`);
            }
          }
        }
      }
    }


    if (command) {
      const currentTime = new Date();
      user.lastVisit = `${currentTime.getDate()}.${currentTime.getMonth() + 1
        }.${currentTime.getFullYear()}, ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    }


    if (command) {
    if (message.isChat) {
      if (message.chat.type == 5) {
        return bot (`😢 Ваш чат был отключен. 🚫`)
      }
    }
  }



    if (double.find(x => x.id === message.senderId)) {
      if (message.user.bans.ban) {
        if (message.isChat) {
          return;
        } else {
          const banReason = message.user.bans.reason || "Причина не указана";
          const datka = new Date(message.user.bans.bantimer);
          await message.send(`🚫 Вы находитесь в бане!\n\n💬 Причина: ${banReason}\n\n⏳ Блокировка действует до: ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1}.${datka.getFullYear()}`);
          return;
        }
      }
    }

    if (double.find(x => x.id === message.senderId)) {
if (!command && !message.isChat && !message.user.bans.ban) {
  const userText = message.text.toLowerCase().trim();
  
  // Функция для получения всех уникальных команд
  const getAllUniqueCommands = () => {
    const commandNames = new Set();
    
    // 1. Берем команды из уже загруженного массива commands
    if (Array.isArray(commands)) {
      commands.forEach(cmd => {
        if (cmd.alias && Array.isArray(cmd.alias)) {
          cmd.alias.forEach(alias => {
            if (typeof alias === 'string' && alias.length > 1) {
              // Очищаем от спецсимволов регулярных выражений
              const cleanAlias = alias.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();
              if (cleanAlias) commandNames.add(cleanAlias.toLowerCase());
            }
          });
        }
      });
    }
    
    // 2. Дополнительно сканируем файлы (опционально)
    const cmdDirs = [
      path.join(__dirname, 'команды'),
      path.join(__dirname, 'аниме команды'),
      path.join(__dirname, 'функции и интервалы'),
      path.join(__dirname, 'гпт'),
    ];
    
    const scanDirectory = (dir) => {
      try {
        if (!fs.existsSync(dir)) return;
        
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            scanDirectory(filePath);
          } else if (file.endsWith('.js')) {
            try {
              const content = fs.readFileSync(filePath, 'utf-8');
              
              // Ищем cmd.hear с регулярными выражениями - УПРОЩЕННАЯ ВЕРСИЯ
              const regex = /cmd\.hear\([^)]*\/[^\/]+\/[^)]*\)/g;
              let match;
              while ((match = regex.exec(content)) !== null) {
                const hearContent = match[0];
                
                // Упрощенное извлечение текста команды
                const slashMatch = hearContent.match(/\/([^\/]+)\//);
                if (slashMatch && slashMatch[1]) {
                  const commandsText = slashMatch[1];
                  // Разделяем по | и очищаем каждую команду
                  commandsText.split('|').forEach(cmd => {
                    const cleanCmd = cmd
                      .replace(/\\/g, '')
                      .replace(/\(\?::[^)]*\)/g, '') // удаляем (?:...)
                      .replace(/\([^)]*\)/g, '')     // удаляем (...)
                      .replace(/\[[^\]]*\]/g, '')    // удаляем [...]
                      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
                      .trim();
                    if (cleanCmd && cleanCmd.length > 1) {
                      commandNames.add(cleanCmd.toLowerCase());
                    }
                  });
                }
              }
            } catch (readError) {
              console.error('Ошибка чтения файла:', filePath, readError);
            }
          }
        });
      } catch (dirError) {
        console.error('Ошибка сканирования директории:', dir, dirError);
      }
    };

    cmdDirs.forEach(scanDirectory);
    return Array.from(commandNames);
  };

  // Получаем все уникальные команды
  const allCommandNames = getAllUniqueCommands();
  
  // Поиск похожих команд (ограничиваем до 3)
  const similarCommands = allCommandNames
    .map(name => ({
      name: name,
      score: calculateSimilarityScore(userText, name)
    }))
    .filter(cmd => cmd.score > 0.4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(cmd => cmd.name);

  let response = `Команды «${message.text}» не существует! 😿\n\n`;

  // Создаем клавиатуру
  const keyboardButtons = [];

  // Добавляем кнопки для похожих команд (если есть)
  if (similarCommands.length > 0) {
    response += `🔍 Возможно вы имели в виду:\n`;
    
    const similarButtons = similarCommands.map(cmd => ({
      action: {
        type: "text",
        payload: JSON.stringify({ command: cmd }),
        label: cmd
      },
      color: "secondary"
    }));
    
    // Добавляем кнопки похожих команд в клавиатуру
    keyboardButtons.push(similarButtons);
  }

  // Добавляем стандартные кнопки


  const keyboard = {
    inline: true,
    buttons: keyboardButtons
  };

  // Отправляем сообщение с кнопками
  await message.send(response, {
    keyboard: JSON.stringify(keyboard)
  });
  return;
}

// Улучшенная функция для вычисления схожести
function calculateSimilarityScore(input, target) {
  if (input === target) return 1.0;
  
  // Проверка на опечатки (перестановки букв)
  if (Math.abs(input.length - target.length) <= 2) {
    const distance = levenshteinDistance(input, target);
    const maxLength = Math.max(input.length, target.length);
    const similarity = 1 - (distance / maxLength);
    
    // Высокий балл за небольшие опечатки
    if (similarity > 0.6) return similarity;
  }
  
  // Проверка на частичное совпадение
  if (target.includes(input) && input.length >= 3) return 0.7;
  if (input.includes(target) && target.length >= 3) return 0.6;
  
  return 0;
}

function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1] 
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  
  return matrix[b.length][a.length];
}
 

    if (message.isChat) {
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        chat.statuemsg += 1;
      }
    }

    

    logMessage(message); 




    const endPingTime = performance.now();
    const pingTime = endPingTime - startPingTime;


    


    if (command && Array.isArray(command) && command[0] && typeof command[1] === 'function') {
      message.args = message.text.match(command[0]);
      if (message.args) {
        console.log("Команда найдена и выполняется!");
        let otvet; // Объявляем otvet здесь
        let botResponseText;
        const startPingTime = performance.now();
        try {
          botResponseText = await command[1](message, bot); // Выполняем команду и получаем результат
          otvet = botResponseText; // Присваиваем значение здесь

          const endPingTime = performance.now();
          const pingTime = endPingTime - startPingTime;
    
          console.log(`Пинг: ${pingTime.toFixed(2)} мс.
            (ID: ${message.user.uid}): ${message.text}`);
    
          //  Измененный код для отправки логов
          await vk.api.messages.send({
            chat_id: chatlogi,
            message: `🆘 LOGS 🆘\n🔱
              ID/Nick: ${utils.sp(message.user.uid)},
              @id${message.senderId}(${message.user.tag})\n
              ⚙ Команда: ${message.text}\n
              🤖 Ответ бота: ${otvet || 'Ответ отсутствует'}\n  
              ⏱️ Пинг: ${pingTime.toFixed(2)} мс.`, 
            random_id: 0,
          });
    
    
        } catch (error) {
          console.error("Ошибка при выполнении команды:", error);
    
          const endPingTime = performance.now();
          const pingTime = endPingTime - startPingTime;
    
          console.log(`Пинг (ошибка): ${pingTime.toFixed(2)} мс.
            (ID: ${message.user.uid}): ${message.text}`);
          await vk.api.messages.send({
            chat_id: chatlogi,
            message: `🆘 LOGS - ОШИБКА 🆘\n🔱
                ID/Nick: ${utils.sp(message.user.uid)},
                @id${message.senderId}(${message.user.tag})\n
                ⚙ Command: ${message.text}\n
                ❌ Ошибка: ${error.message}\n
                ⏱️ Пинг: ${pingTime.toFixed(2)} мс.`,  // Добавлено время пинга
            random_id: 0,
          });
    
          botResponseText = `Произошла ошибка при выполнении команды: ${error.message}`;
          otvet = botResponseText; // и тут
        }
      } else {
        console.log("Аргументы не найдены");
      }
    }
    } else {
return
    }
  });
}).catch(console.error)

 vk.updates.start();
 startBot()

    console.log('Бот запущен и слушает сообщения');










const userNotified = {};

vk.updates.on("wall_reply_new", async (message) => {

  console.error(message);

  if (message.fromId < 0) {
    return;
  }




  const userId = message.fromId;



  if (!userNotified) {
    userNotified = {};
  }


  const user = double.find(x => x.id === userId);


  if (!user) {

    if (!userNotified[userId]) {
      vk.api.call("wall.createComment", {
        owner_id: message.ownerId,
        post_id: message.objectId,
        reply_to_comment: message.id,
        message: `⛔️ Вы не являетесь игроком бота.`
      });

      userNotified[userId] = true;
    }
    return; 
  }
  else {

    if (userNotified[userId]) {
      delete userNotified[userId];
    }
  }



  if (config.fortuna == message.objectId) {

    if (message.text == "Фортуна" || message.text == "ajhneyf" || message.text == "фортуна" || message.text == "фарт" || message.text == "fortune") {

      multiply = utils.pick([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

      if (multiply == 1) {

        multiply = utils.pick([1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 5, 6]);

        if (multiply == 1 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.balance += 50000000;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли 50.000.000 $ :3 '

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения
            `,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислено 50.000.000 $

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {

            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }



        if (multiply == 2 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.balance += 100000000;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли 100.000.000 $ :3 '

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислено 100.000.000 $ ${utils.pick(['😕', '😔', '😫'])}

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {

            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }



        if (multiply == 3 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.c3 += 2;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли 2 Донат Кейса :3 Открытие по команде 'Кейс открыть 3'

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислено 2 Донат кейсов ${utils.pick(['😕', '😔', '😫'])}

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {

            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }

        if (multiply == 4 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.c6 += 1;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли Секретный кейс :3 Открытие по команде 'Кейс открыть 6'

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислен 1 Секретный кейс ${utils.pick(['😕', '😔', '😫'])}

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {

            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }

        if (multiply == 5 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.balance2 += 50000;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли 50.000 GB :3 

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислено 50.000 GB ${utils.pick(['😕', '😔', '😫'])}

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {


            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }

        if (multiply == 6 && config.fortunacount > 0) {

          config.fortunacount -= 1;

          user.bilet += 50;

          if (user.notifications) vk.api.messages.send({

            user_id: user.id,

            message: `[УВЕДОМЛЕНИЕ]

            ▶ Поздравляем! Удача улыбнулась вам и вы выиграли 50 билетов :3 

            🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,

            random_id: 0

          });

          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            reply_to_comment: message.id,

            message: `💞 Удача улыбнулась вам, на ваш баланс зачислено 50 билетов ${utils.pick(['😕', '😔', '😫'])}

            Осталось - ${config.fortunacount} призов.`

          });

          if (config.fortunacount <= 0) {

            vk.api.call("wall.createComment", {

              owner_id: message.ownerId,

              post_id: message.objectId,

              message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

            });

          }

        }

      } else {
        if (config.fortunacount > 0) {

          const emojiList = [
            '🥰', '🤑', '❤', '😎', '😈', '🎉', '😇',
            '😂', '😍', '😮', '😏', '😋', '🤩', '💖',
            '😜', '😱', '🥳', '✨', '🔥', '💔',
            '🌈', '🌟', '🎊', '🐶', '🐱', '🌸',
            '🍀', '🍕', '🍦', '🌍', '🚀', '🌊',
            '🤠', '🦄', '🥇', '🦋', '🍩', '🍉',
            '🍓', '🍒', '🌻', '🌈', '🌺', '🦉',
            '🦁', '🐸', '🐨', '🐼', '🐢', '🐗',
            '🐕', '🦄', '🐥', '🐦', '🦚', '🦙',
            '🍁', '🌾', '🍂', '🍃', '🥭', '🍊',
            '🍋', '🍍', '🍇', '🍈', '🍏', '🍎',
            '🔥', '💯', '📚', '📖', '✏️', '🖊️',
            '🖋️', '🔑', '🗝️', '🔮', '📅', '📆',
            '🗓️', '📜', '📃', '🌐', '🧭', '⏳',
            '🆘', '🚧', '⚠️', '❗', '❓', '🔔',
            '🔕', '📯', '🎺', '🎻', '🎷', '🎵',
            '🎤', '🎧', '🥁', '🎸', '🤹‍♂️', '🕺',
            '💃', '👯‍♀️', '👯‍♂️', '🙌', '👏', '👐',
            '🤲', '✊', '👊', '👍', '👎', '🤘',
            '🤙', '🤝', '👥', '👤', '🤖', '👾',
            '🕷️', '🦄', '🐉', '🦕', '🦖', '🐲',
            '🦐', '🦑', '🦕', '🦖', '🐋', '🦈',
            '🐠', '🐋', '🐟', '🐬', '🦦', '🐙',
            '🐚', '🌊', '🏝️', '🏖️', '☀️', '🌥️',
            '☁️', '🌧️', '⛈️', '🌨️', '❄️', '🌪️',
            '🌈', '🌏', '🌍', '🌌', '🔭', '🌓',
            '🌕', '🌖', '🌘', '🌑', '🌒', '🌔',
            '🌝', '🌞', '⭐', '🌠', '💫', '🌟',
            '🪐', '🌌', '✨', '🏆', '🥈', '🥉',
            '🎖️', '🎗️', '🦾', '🦿', '🦵', '🦶',
            '👣', '🦾', '🧎‍♂️', '🧎‍♀️', '🤷‍♂️', '🤷‍♀️',
            '🙇‍♂️', '🙇‍♀️', '🤦‍♂️', '🤦‍♀️', '🤷‍♂️', '🤷‍♀️',
            '💁‍♂️', '💁‍♀️', '🧖‍♂️', '🧖‍♀️', '💇‍♂️', '💇‍♀️',
            '💆‍♂️', '💆‍♀️', '🧘‍♂️', '🧘‍♀️', '🚶‍♂️', '🚶‍♀️',
            '🏃‍♂️', '🏃‍♀️', '🧍‍♂️', '🧍‍♀️', '👫', '👬',
            '👭', '🤷', '🤦', '👏', '🙌', '🙏',
            '⚽', '🏀', '🏈', '⚾', '🎾', '⛹️‍♂️',
            '⛹️‍♀️', '🤸‍♂️', '🤸‍♀️', '🤹‍♂️', '🤹‍♀️', '🏊‍♂️',
            '🏊‍♀️', '🏋️‍♂️', '🏋️‍♀️', '🚴‍♂️', '🚴‍♀️', '🚵‍♂️',
            '🚵‍♀️', '🧗‍♂️', '🧗‍♀️', '⛷️', '🏂', '🏄‍♂️',
            '🏄‍♀️', '🏇', '🤼‍♂️', '🤼‍♀️', '🤽‍♂️', '🤽‍♀️',
            '🧗‍♀️', '🧗‍♂️', '🤿', '🏌️‍♂️', '🏌️‍♀️', '🏏',
            '🏑', '🏒', '🥍', '🏹', '🎣', '🎯',
            '⛳', '🎳', '🏏', '🥇', '🥈', '🥉'
          ];

          function getRandomEmojis() {
            const emojis = [];
            while (emojis.length < 3) {
              const newEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

              if (!emojis.includes(newEmoji) || (emojis.length < 2 || emojis[emojis.length - 1] !== newEmoji)) {
                emojis.push(newEmoji);
              }
            }
            return emojis.join(' | ');
          }


          const emojiString = getRandomEmojis();

          return vk.api.call("wall.createComment", {
            owner_id: message.ownerId,
            post_id: message.objectId,
            reply_to_comment: message.id,
            message: `Удача не на вашей стороне, вам выпало ${emojiString} .Попробуйте снова!`
          });
        
        }

        if (config.fortunacount <= 0) {
          vk.api.call("wall.createComment", {

            owner_id: message.ownerId,

            post_id: message.objectId,

            message: `Конкурс завершился. Все призы разыграны 🥳

🔔 Подпишитесь на уведомления, чтобы не пропустить следующие конкурсы.`

          });
        }

      }

    }

  }

  if (!user.comments) {
    user.comments = [];
}

const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
});

if (!groupInfo || groupInfo.length === 0) {
    console.error('Не удалось получить информацию о группе.');
    return;
}

    // Проверка на длину комментария
    const commentText = message.text;

    if (commentText.length < 10 && message.text !== "фортуна") {
        await vk.api.messages.send({
            user_id: user.id,
            message: '😴 Ваш комментарий слишком скучный! Пожалуйста, напишите что-то более интересное.',
            random_id: 0
        });
        console.log(`Пользователь ${user.id} получил уведомление о скучном комментарии.`);
        return; // Прекращаем дальнейшую обработку
    }

if (!user.comments) {
  user.comments = {};
}

const postId = message.objectId; // Используем objectId из сообщения
const ownerId = message.ownerId; // Используем ownerId из сообщения

if (user.comments[postId] && message.text !== "фортуна") {
  await vk.api.messages.send({
      user_id: user.id,
      message: '🚫 Вы уже оставили комментарий к этому посту.',
      random_id: 0,
  });
  return;
}

user.comments[postId] = true; // Помечаем, что пользователь оставил комментарий

try {
  const postIdentifier = `${ownerId}_${postId}`; 
  
  const postInfo = await usert.api.wall.getById({
      posts: [postIdentifier],
      access_token: tokenData.user
  });

  // Проверяем, получили ли мы информацию о посте
  if (postInfo && postInfo.items && postInfo.items.length > 0) {
      const post = postInfo.items[0];
      const postDateTimestamp = post.date * 1000;
      const now = Date.now();

      // Проверяем, стар ли пост
      const sevenDays = 7 * 24 * 60 * 60 * 1000; 
      if (now - postDateTimestamp > sevenDays) {
          console.log(`[${new Date().toLocaleTimeString()}] Пост старше 7 дней, игнорируем комментарий.`);
          if (user.notifications) {
              await vk.api.messages.send({
                  user_id: user.id,
                  message: `⚠ Слишком старый пост, комментарии больше не учитываются.`,
                  random_id: 0
              });
          }
         
      }

      // Рассчитываем награду на основе возраста поста
      let minutesSincePost = Math.floor((now - postDateTimestamp) / (60 * 1000));
      let reward = Math.max(7500 - (minutesSincePost * 250), 250); 

      user.balance2 += reward; // Обновляем баланс пользователя

      try {
      if (user.now.kv1 && user.now.kv2 && user.now.kv3 && user.now.kv4 && user.now.kv5 && user.now.kv6 && user.now.kv7 && user.now.kv8 && !user.now.kv9) {
        user.now.kv9 = true;
        user.c4 += 1;
      
        await vk.api.messages.send({
          user_id: user.id,
          random_id: 0,
          message: `⚠️ Вы успешно выполнили 9 задание!
      
      Награда - 1 Starr Drop 
      
      💡 Регулярно участвуйте в сообществе, ведь вы поможете его развитию!`,
          keyboard: JSON.stringify({
            inline: true,
            buttons: [
              [{
                action: {
                  type: "text",
                  payload: JSON.stringify({ command: `путь новичка` }),
                  label: `👀 Путь новичка`
                },
                color: "positive"
              }]
            ]
          })
        });
      }
    if (message.text !== "фортуна") {
          await vk.api.messages.send({
              user_id: user.id,
              message: `💬 За ваш комментарий вы получаете ${utils.sp(reward)} ${val4}.`,
              random_id: 0
          });
        }
      } catch (error) {
          console.error('Ошибка при отправке сообщения о награде за комментарий:', error);
      }
  } else {
      console.error("Ошибка получения информации о посте:", postInfo);
  }
} catch (error) {
  console.error('Ошибка при обработке комментария:', error);
}
});

vk.updates.on("like_add", async (message) => {
  console.error(message);
  if (message.objectType !== "post") return;

  const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
      console.error('Не удалось получить информацию о группе.');
      return;
  }

  const groupId = groupInfo[0].id; 

  if (!message.likerId) {
      console.error("User ID not found in the message.");
      return;
  }

  let user = double.find(x => x.id === message.likerId);
  if (!user) {
      console.error(`User with ID ${message.likerId} not found in the double array.`);
      return;
  }

  if (!user.likes) {
      user.likes = {};
  }

  const postId = message.objectId; 
  const ownerId = message.objectOwnerId; 

  if (user.likes[postId]) {
      await vk.api.messages.send({
          user_id: user.id,
          message: '🚫 Вы уже оставили лайк к этому посту.',
          random_id: 0,
      });
      return;
  }

  user.likes[postId] = true;

  try {
      // Формируем строку для запроса с использованием значений из сообщения
      const postIdentifier = `${ownerId}_${postId}`; 
      
      const postInfo = await usert.api.wall.getById({
          posts: [postIdentifier],
          access_token: tokenData.user
      });

      // Проверяем, получили ли мы информацию о посте
      if (postInfo && postInfo.items && postInfo.items.length > 0) {
          const post = postInfo.items[0];
          const postDateTimestamp = post.date * 1000;
          const now = Date.now();

          // Check if post is older than 7 days
          const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
          if (now - postDateTimestamp > sevenDays) {
              console.log(`[${new Date().toLocaleTimeString()}] Post is older than 7 days, ignoring like.`);
              return;
              if (user.notifications) {
                  await vk.api.messages.send({
                      user_id: user.id,
                      message: `⚠ Слишком старый пост, лайки больше не учитываются.`,
                      random_id: 0
                  });
              }
              return; // Stop processing the like
          }

          // Calculate reward based on post age
          let minutesSincePost = Math.floor((now - postDateTimestamp) / (60 * 1000));
          let reward = Math.max(7500 - (minutesSincePost * 250), 250); // Minimum reward threshold

          // Check for special star post condition
          if (ownerId === -groupId && Number(postId) === Number(config.starPostId)) {
              user.c4 += 1; 

                    if (user.now.kv1 && user.now.kv2 && user.now.kv3 && user.now.kv4 && user.now.kv5 && user.now.kv6 && user.now.kv7 && user.now.kv8 && !user.now.kv9) {
                      user.now.kv9 = true;
                      user.c4 += 1;
                    
                      await vk.api.messages.send({
                        user_id: user.id,
                        random_id: 0,
                        message: `⚠️ Вы успешно выполнили 9 задание!
                    
                    Награда - 1 Starr Drop 
                    
                    💡 Регулярно участвуйте в сообществе, ведь вы поможете его развитию!`,
                        keyboard: JSON.stringify({
                          inline: true,
                          buttons: [
                            [{
                              action: {
                                type: "text",
                                payload: JSON.stringify({ command: `путь новичка` }),
                                label: `👀 Путь новичка`
                              },
                              color: "positive"
                            }]
                          ]
                        })
                      });
                    }

              try {
                  await vk.api.messages.send({
                      user_id: user.id,
                      message: `❤️ Лайк засчитан! ✨ Получите свой 🎁Starr Drop🎁 прямо сейчас!`,
                              keyboard: JSON.stringify({
                                "inline": true,
                                "buttons": [
                                  [{
                                    "action": {
                                      "type": "text",
                                      payload: JSON.stringify({ command: `тык` }),
                                      "label": `⭐ Открыть Starr Drop ⭐`
                                    },
                                    "color": "positive"
                                  },
                          ]
                                ]
                              }),
                              attachment: `doc690927947_682634151`,
                      random_id: 0
                  });
              } catch (error) {
                  console.error('Ошибка при отправке сообщения о награде за лайк "Постстар":', error);
              }
          } else {
              user.balance2 += reward; // Update user's balance

              try {

      if (user.now.kv1 && user.now.kv2 && user.now.kv3 && user.now.kv4 && user.now.kv5 && user.now.kv6 && user.now.kv7 && user.now.kv8 && !user.now.kv9) {
        user.now.kv9 = true;
        user.c4 += 1;
      
        await vk.api.messages.send({
          user_id: user.id,
          random_id: 0,
          message: `⚠️ Вы успешно выполнили 9 задание!
      
      Награда - 1 Starr Drop 
      
      💡 Регулярно участвуйте в сообществе, ведь вы поможете его развитию!`,
          keyboard: JSON.stringify({
            inline: true,
            buttons: [
              [{
                action: {
                  type: "text",                payload: JSON.stringify({ command: `путь новичка` }),
                  label: `👀 Путь новичка`
                                },
                                color: "positive"
                              }]
                            ]
                          })
                        });
                      }
  
                    await vk.api.messages.send({
                        user_id: user.id,
                        message: `❤️ За лайк поста вы получаете ${utils.sp(reward)} ${val4}.`,
                        random_id: 0
                    });
                } catch (error) {
                    console.error('Ошибка при отправке сообщения о награде за обычный лайк:', error);
                }
            }
        } else {
            console.error("Ошибка получения информации о посте:", postInfo);
        }
    } catch (error) {
        console.error('Ошибка при обработке лайка:', error);
    }
  });
  

setInterval(async () => {
  double.map((user) => {
    user.timers.hasWorked = Math.max(user.timers.hasWorked - 10, 0);
    user.timers.bonus = Math.max(user.timers.bonus - 10, 0);
    user.timers.poxod = Math.max(user.timers.poxod - 10, 0);
    user.timers.vipbonus = Math.max(user.timers.vipbonus - 10, 0);
    user.timers.prembonus = Math.max(user.timers.prembonus - 10, 0);
    user.timers.titanbonus = Math.max(user.timers.titanbonus - 10, 0);
    user.timers.imperatorbonus = Math.max(user.timers.imperatorbonus - 10, 0);
    user.timers.podarok = Math.max(user.timers.podarok - 10, 0);
    user.scar.gontime = Math.max(user.scar.gontime - 10, 0);
    user.limit.sent = Math.max(user.limit.sent - 10, 0);
    user.limitadd.sentadd = Math.max(user.limitadd.sentadd - 10, 0);
    user.timers.report = Math.max(user.timers.report - 10, 0);
    user.timers.ban = Math.max(user.timers.ban - 10, 0);
  });
}, 10000);

function sendMessageToUser(id, message) {
  vk.api.messages.send({
    user_id: id,
    message: message,
    random_id: 0
  }).then((response) => {
    console.log(`Отправлено сообщение пользователю ${id}: ${message}`);
  }).catch((error) => {
    console.error(`Ошибка при отправке сообщения пользователю ${id}:`, error);
  });
}






function updateGameTime(chat) {
  if (chat.gametime <= 0) {
    chat.gametime = 60;
    chat.game = false;
  } else {
    chat.gametime -= 1;
  }
}



setInterval(async () => {
  double.map(user => {
    if (user.bonustime > 0) user.bonustime -= 1
  });
}, 1000);

setInterval(() => {
  function resetNegativeBalance(user) {
    if (user.balance2 < 0) {
      user.balance2 = 0;
    }
  }
  double.forEach(resetNegativeBalance);
}, 1);

setInterval(async () => {
  double.forEach(x => {
    if (x.balance2 >= 899999999999999999999) {
      x.balance2 = 899999999999999999999;
    }
    if (x.balance >= 899999999999999999999) {
      x.balance = 899999999999999999999;
    }
    if (x.bank >= 899999999999999999999) {
      x.bank = 899999999999999999999;
    }
    if (x.bilet >= 899999999999999999999) {
      x.bilet = 899999999999999999999;
    }
    if (x.btc >= 899999999999999999999) {
      x.btc = 899999999999999999999;
    }
    if (x.energy >= 899999999999999999999) {
      x.energy = 899999999999999999999;
    }
    if (x.maxenergy >= 899999999999999999999) {
      x.maxenergy = 899999999999999999999;
    }
    if (x.sataka >= 899999999999999999999) {
      x.sataka = 899999999999999999999;
    }
    if (x.bossyr >= 899999999999999999999) {
      x.bossyr = 899999999999999999999;
    }
    if (x.rubli >= 899999999999999999999) {
      x.rubli = 899999999999999999999;
    }
    if (x.rub >= 899999999999999999999) {
      x.rubli = 899999999999999999999;
    }
    if (x.sprcoin >= 899999999999999999999) {
      x.sprcoin = 899999999999999999999;
    }
    if (x.dcoins >= 899999999999999999999) {
      x.dcoins = 899999999999999999999;
    }
    if (x.rating >= 899999999999999999999) {
      x.rating = 899999999999999999999;
    }
    if (x.c1 >= 899999999999999999999) {
      x.c1 = 899999999999999999999;
    }
    if (x.c2 >= 899999999999999999999) {
      x.c2 = 899999999999999999999;
    }
    if (x.c3 >= 899999999999999999999) {
      x.c3 = 899999999999999999999;
    }
    if (x.c4 >= 899999999999999999999) {
      x.c4 = 899999999999999999999;
    }
    if (x.c5 >= 899999999999999999999) {
      x.c5 = 899999999999999999999;
    }
    if (x.c6 >= 899999999999999999999) {
      x.c6 = 899999999999999999999;
    }
    if (x.c7 >= 899999999999999999999) {
      x.c7 = 899999999999999999999;
    }
    if (x.c8 >= 899999999999999999999) {
      x.c8 = 899999999999999999999;
    }
    if (x.c9 >= 899999999999999999999) {
      x.c9 = 899999999999999999999;
    }
    if (x.c10 >= 899999999999999999999) {
      x.c10 = 899999999999999999999;
    }
    if (x.c11 >= 899999999999999999999) {
      x.c11 = 899999999999999999999;
    }
    if (x.settings.adm >= 899999999999999999999) {
      x.settings.adm = 899999999999999999999;
    }
  });
}, 1);

function timesss() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return hours + ":" + minutes + ":" + seconds;
}
function datasss() {
  const date = new Date();
  let days = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (days < 10) days = "0" + days;
  return days + "." + month + "." + year;
}

setInterval(() => {
  double
    .filter((x) => x.tree !== 0 && x.bans.ban === false && x.leafpribil <= 1000)
    .map((x) => {
      if (x.tree === 4 || x.leafpribil === 0) x.leafpribil += 10;

      if (x.tree === 1) x.leafpribil += 1;

      if (x.tree === 2) x.leafpribil += 3;

      if (x.tree === 3) x.leafpribil += 5;

      if (x.tree === 4) x.leafpribil += 9;

      if (x.tree === 5) x.leafpribil += 15;

      x.irrigation -= 1;

      if (x.settings.imperator) x.irrigation = 100;

      if (x.irrigation <= 0) x.tree = 0;
    });
}, 3600000);

setInterval(async () => {
  double
    .filter(
      (x) =>
        (x.stars1 === true ||
          x.stars2 === true ||
          x.stars3 === true ||
          x.stars4 === true ||
          x.stars5 === true) &&
        x.bans.ban === false
    )
    .map((x) => {
      if (x.stars1 === true) {
        x.ruds.almaz += 100;
      }

      if (x.stars2 === true) {
        x.ruds.materia += 75;
      }

      if (x.stars3 === true) {
        x.ruds.obsidian += 50;
      }

      if (x.stars4 === true) {
        x.ruds.plazma += 30;
      }

      if (x.stars5 === true) {
        x.rub += 30;
      }
    });
}, 3600000);

setInterval(() => {
  double
    .filter((x) => x.energy < x.maxenergy && x.bans.ban === false)
    .map((x) => {
      x.energy += 1;
    });
}, 300000);

setInterval(async () => {
  for (const user of double) {
    if (user.bans.ban === true && user.bans.bantimer <= Date.now()) {
      const hasPermission = spolerList.includes(user.id);

      if (hasPermission) {
        user.bans.ban = false;

      }
    }else{
      user.bans.ban = false;
    }
  }
}, 60000);

setInterval(async () => {
  if (bossinfo.boss < 0) {
    bossinfo.boss = 0;
  }
}, 1);

setInterval(() => {
  double
    .filter((x) => x.prazdnikbussines === true && x.balance >= 0)
    .map((x) => {
      x.balance += 500000;
    });
}, 60000);

setInterval(() => {
  double
    .filter((x) => x.balance < 0)
    .map((x) => {
      x.balance = 1000;
    });

  chats
    .filter((x) => x.balance === null)
    .map((x) => {
      x.balance = 1000;
    });

  chats
    .filter((x) => x.statuemoney === undefined)
    .map((x) => {
      x.statuemoney = 10;
    });

 chats
    .filter((x) => x.statuemoney === null)
    .map((x) => {
      x.statuemoney = 10;
    });

  double
    .filter((x) => x.balance === undefined)
    .map((x) => {
      x.balance = 10000;
    });

  double
    .filter((x) => isNaN(x.balance))
    .map((x) => {
      x.balance = 10000;
    });

  double
    .filter((x) => !Number(x.rubli))
    .map((x) => {
      x.rubli = 0;
    });

  double
    .filter((x) => x.balance < 10000)
    .map((x) => {
      x.balance = 10000;
    });

  double
    .filter((x) => x.c1 === null)
    .map((x) => {
      x.c1 = 0;
    });

  double
    .filter((x) => x.c2 === null)
    .map((x) => {
      x.c2 = 0;
    });

  double
    .filter((x) => x.energy < 0)
    .map((x) => {
      x.energy = 0;
    });


  double.map((x) => {
    x.bank = Math.floor(Number(Math.floor(x.bank)));

    x.balance = Math.floor(Number(Math.floor(x.balance)));

    x.btc = Math.floor(Number(Math.floor(x.btc)));
  });

  double
    .filter((x) => x.settings.adm > 0)
    .map((x) => {
      x.bantop = true;

      x.limit.playerlimit = 0;
    });

}, 1000);


setInterval(() => {
  double.map((x) => {
    if (x.tegg) {
      x.tegg = false;
    }
  });
}, 34000);

setInterval(() => {
  double
    .filter((x) => x.settings.premium !== false && x.bans.ban === false)
    .forEach((x) => { // Используем forEach, т.к. не возвращаем новый массив
      if (x.settings.premium) {
        const balanceIncrease = 15000000;
        const balance2Increase = 1500;

        x.balance += balanceIncrease;
        x.balance2 += balance2Increase;

        const message = `🎉 Вы получили: \n\n` +
                        `${utils.sp(balanceIncrease)} ${val1} 💰 и \n` +
                        `${utils.sp(balance2Increase)} ${val4} 💎 за PREMIUM статус! 👑`;

        if (typeof sendMessageToUser === 'function') {  // Проверка существования функции
          sendMessageToUser(x.id, message);
        } else {
          console.error('sendMessageToUser is not defined');
        }
      }
    });
}, 86400000);


setInterval(() => {
  double
    .filter((x) => x.settings.titan !== false && x.bans.ban === false)
    .forEach((x) => { // Используем forEach, т.к. не возвращаем новый массив
      if (x.settings.titan) {
        const balanceIncrease = 25000000;
        const balance2Increase = 2500;

        x.balance += balanceIncrease;
        x.balance2 += balance2Increase;

        const message = `🎉 Вы получили: \n\n` +
                        `${utils.sp(balanceIncrease)} ${val1} 💰 и \n` +
                        `${utils.sp(balance2Increase)} ${val4} 💎 за TITAN статус! 🌟`;

        if (typeof sendMessageToUser === 'function') {  // Проверка существования функции
          sendMessageToUser(x.id, message);
        } else {
          console.error('sendMessageToUser is not defined');
        }
      }
    });
}, 86400000);


setInterval(() => {
  double
    .filter((x) => x.misc.farm !== 0 && x.bans.ban === false)
    .map((x) => {
      const farmLevel = x.misc.farm;
      const farmData = farms.find((f) => f.id === farmLevel);

      if (!farmData) {
        console.warn(`Ферма с уровнем ${farmLevel} не найдена.`);
        return;
      }

      const prib = farmData.prib;
      const limit = prib * 100;

      // Логируем *ДО* всех условий, чтобы видеть значения всегда
      console.log(`Ферма уровня ${farmLevel} обрабатывается:`);
      console.log("  farmLevel:", farmLevel);
      console.log("  x.farm_btc:", x.farm_btc);
      console.log("  limit:", limit);
      console.log("  prib:", prib);

      // Общий код для добавления prib, чтобы избежать дублирования
      const addPrib = () => {
        // const pribToAdd = Number(utils.sp(prib)); // Убираем utils.sp() здесь
        const pribToAdd = Number(prib); // Используем prib напрямую
        console.log("  pribToAdd (number):", pribToAdd);
        console.log("  typeof pribToAdd:", typeof pribToAdd);
        x.farm_btc = Number(x.farm_btc) + pribToAdd;
        console.log("  x.farm_btc после добавления:", x.farm_btc);
      };


      if (farmLevel === 1 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 1 выполнено.");
        addPrib();
      }

      if (farmLevel === 2 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 2 выполнено.");
        addPrib();
      }

      if (farmLevel === 3 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 3 выполнено.");
        addPrib();
      }

      if (farmLevel === 4 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 4 выполнено.");
        addPrib();
      }

      if (farmLevel === 5 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 5 выполнено.");
        addPrib();
      }

      if (farmLevel === 6 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 6 выполнено.");
        addPrib();
      }

      if (farmLevel === 7 && x.farm_btc <= limit) {
        console.log("  Условие farmLevel === 7 выполнено.");
        addPrib();
      }
    });
}, 3600000);



setInterval(() => {
  double
    .filter((x) => x.timers.report === true)
    .map((x) => {
      x.timers.report = false;
    });
}, 10000);

setInterval(() => {
  double
    .filter((x) => x.settings.topdon)
    .forEach((x) => {
      x.energy += 5;
      x.bilet += 2;
      x.balance += 20000000;

      const cases = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c12', 'c13', 'c14', 'c15', 'c16'];
      const randomCase = cases[Math.floor(Math.random() * cases.length)];

      if (!x[randomCase]) x[randomCase] = 0;
      x[randomCase] += 1;

      let caseType = "";
      let caseDescription = "";

      switch (randomCase) {
        case 'c1': caseType = "обычный"; break;
        case 'c2': caseType = "золотой"; break;
        case 'c3': caseType = "донат-кейс"; break;
        case 'c4': caseType = "STAR-DROPS"; break;
        case 'c5': caseType = "Halloween"; break;
        case 'c6': caseType = "секретный"; break;
        case 'c7': caseType = "автозвук"; break;
        case 'c8': caseType = "новогодних"; break;
        case 'c9': caseType = "премиум"; break;
        case 'c10': caseType = "ультра"; break;
        case 'c12': caseType = "редкий Starr Drops"; break;
        case 'c13': caseType = "сверхредкий Starr Drops"; break;
        case 'c14': caseType = "эпический Starr Drops"; break;
        case 'c15': caseType = "мифический Starr Drops"; break;
        case 'c16': caseType = "легендарный Starr Drop"; break;
        default: caseType = "хуёвый"; break;
      }

      caseDescription = `🎁 ВАУ! Вы получили ${caseType} кейс за TOPDON!
      🎉 Энергия увеличена на +5! 
      🎉 Билеты увеличены на +2!
      🎉 Баланс увеличен на +20.000.000 ! ⚡`;

      if (typeof sendMessageToUser === 'function') {
        sendMessageToUser(x.id, caseDescription);
      } else {
        console.error('sendMessageToUser is not defined, долбоёб');
      }
    });
}, 86400000);


setInterval(() => {
  double.forEach((x) => {
    // Инициализация rarityName
    if (typeof x.rarityName === 'undefined') {
      x.rarityName = ""; // Или другое начальное значение (string)
    }

    // Инициализация currentRarity
    if (typeof x.currentRarity === 'undefined') {
      x.currentRarity = "rare"; // Или другое начальное значение (string)

    }

    // Инициализация tries
    if (typeof x.tries === 'undefined') {
      x.tries = 0; // Или другое начальное значение

    }

    // Инициализация currentRarity2
    if (typeof x.currentRarity2 === 'undefined') {
      x.currentRarity2 = "rare"; // Или другое начальное значение (string)

    }

    // Инициализация c12, c13, c14, c15, c16
    if (typeof x.c12 === 'undefined') {
      x.c12 = 0; 

    }

    if (typeof x.c13 === 'undefined') {
      x.c13 = 0; 

    }

    if (typeof x.c14 === 'undefined') {
      x.c14 = 0; 

    }

    if (typeof x.c15 === 'undefined') {
      x.c15 = 0; 

    }

    if (typeof x.c16 === 'undefined') {
      x.c16 = 0; 

    }

    // Инициализация bankik
    if (typeof x.bankik === 'undefined') {
      x.bankik = false; 

    }

    // Дополнительные инициализации
    if (typeof x.kamen === 'undefined') { 
        x.kamen = 0;

    }
    
    if (typeof x.zoloto === 'undefined') { 
        x.zoloto = 0;

    }
    
    if (typeof x.diamond === 'undefined') { 
        x.diamond = 0;

    }
    
    if (typeof x.ygol === 'undefined') { 
        x.ygol = 0;

    }
    
   // Инициализация now.kv20
   if (typeof x.now !== 'undefined' && typeof x.now.kv20 === 'undefined') { 
       x.now.kv20 = false;

   }
   
   // Инициализация levl
   if (typeof x.levl === 'undefined') { 
       x.levl = 1;
   }
   
   // Инициализация currentRarity для других случаев, если нужно
   if (typeof x.currentRarity2 === 'undefined') { 
       x.currentRarity2 = "rare";

   }
   
   // Инициализация misc
   if (typeof x.misc === 'undefined') { 
       x.misc = {};

   }
// ===========================================================

if (typeof x.limc16 === 'undefined') { 
  x.limc16 = 1;
}

if (typeof x.limc16i === 'undefined') { 
  x.limc16i = 0;
}

if (typeof x.limc15 === 'undefined') { 
  x.limc15 = 1;

}

if (typeof x.limc15i === 'undefined') { 
  x.limc15i = 0;

}

if (typeof x.limc14 === 'undefined') { 
  x.limc14 = 1;

}

if (typeof x.limc14i === 'undefined') { 
  x.limc14i = 0;

}


if (typeof x.limc13 === 'undefined') { 
  x.limc13 = 1;

}

if (typeof x.limc13i === 'undefined') { 
  x.limc13i = 0;

}

if (typeof x.limc12 === 'undefined') { 
  x.limc12 = 1;

}

if (typeof x.limc12i === 'undefined') { 
  x.limc12i = 0;

}

if (typeof x.limc11 === 'undefined') { 
    x.limc11 = 1;

}

if (typeof x.limc11i === 'undefined') { 
  x.limc11i = 0;

}

if (typeof x.limc10 === 'undefined') { 
  x.limc10 = 1;

}

if (typeof x.limc10i === 'undefined') { 
  x.limc10i = 0;

}

if (typeof x.limc9 === 'undefined') { 
  x.limc9 = 1;
}

if (typeof x.limc9i === 'undefined') { 
  x.limc9i = 0;
}

if (typeof x.limc8 === 'undefined') { 
  x.limc8 = 1;

}

if (typeof x.limc8i === 'undefined') { 
  x.limc8i = 0;

}

if (typeof x.limc7 === 'undefined') { 
  x.limc7 = 1;

}

if (typeof x.limc7i === 'undefined') { 
  x.limc7i = 0;

}

if (typeof x.limc6 === 'undefined') { 
  x.limc6 = 1;

}

if (typeof x.limc6i === 'undefined') { 
  x.limc6i = 0;

}

if (typeof x.limc5 === 'undefined') { 
  x.limc5 = 1;

}

if (typeof x.limc5i === 'undefined') { 
  x.limc5i = 0;

}

if (typeof x.limc4 === 'undefined') { 
  x.limc4 = 1;

}

if (typeof x.limc4i === 'undefined') { 
  x.limc4i = 0;

}

if (typeof x.limc3 === 'undefined') { 
  x.limc3 = 1;

}

if (typeof x.limc3i === 'undefined') { 
  x.limc3i = 0;

}

if (typeof x.limc2 === 'undefined') { 
  x.limc2 = 1;

}

if (typeof x.limc2i === 'undefined') { 
  x.limc2i = 0;

}

if (typeof x.limc1 === 'undefined') { 
  x.limc1 = 1;
}

if (typeof x.limc1i === 'undefined') { 
  x.limc1i = 0;
}

if (typeof x.limbilet === 'undefined') { 
  x.limbilet = 10;
}

if (typeof x.limbileti === 'undefined') { 
  x.limbileti = 0;
}

if (typeof x.limfarm === 'undefined') { 
  x.limfarm = 5;
}

if (typeof x.limfarmi === 'undefined') { 
  x.limfarmi = 0;
}

if (typeof x.limbank === 'undefined') { 
  x.limbank = 1000000;
}

if (typeof x.limbanki === 'undefined') { 
  x.limbanki = 0;
}

if (typeof x.limbtc === 'undefined') { 
  x.limbtc = 100;
}

if (typeof x.limbtci === 'undefined') { 
  x.limbtci = 0;
}

if (typeof x.limgb === 'undefined') { 
  x.limgb = 10000;
}

if (typeof x.limgbi === 'undefined') { 
  x.limgbi = 0;
}

if (typeof x.limpos1 === 'undefined') { 
  x.limpos1 = 5;
}

if (typeof x.limpos1i === 'undefined') { 
  x.limpos1i = 0;
}

if (typeof x.limpos2 === 'undefined') { 
  x.limpos2 = 5;
}

if (typeof x.limpos2i === 'undefined') { 
  x.limpos2i = 0;
}

if (typeof x.limpos3 === 'undefined') { 
  x.limpos3 = 5;
}

if (typeof x.limpos3i === 'undefined') { 
  x.limpos3i = 0;
}

if (typeof x.limsms === 'undefined') { 
  x.limsms = 0;
}

if (typeof x.reshim === 'undefined') { 
  x.reshim = 1;
}


if (typeof x.oval === 'undefined') { 
  x.oval = 0;
}


  });
}, 1000);

const forbiddenTitles = [
  "Бизнесмен", 
  "🔥Support🔥",
  "Администратор", 
  "Удалённый титул"
];




setInterval(() => {
  double.map((x) => {
    const currentLevel = x.settings.adm || 0; // adm = уровень админа, по умолчанию 0 (не админ)
    let nextLevel = currentLevel + 1;
    let isAdministrator = (currentLevel > 0); // Проверяем, является ли игрок администратором
    let reportsNeeded = x.astats.reports; // Теперь reportsNeeded берет значение из x.astats.reports

    switch (currentLevel) {
      case 1:
          reportsNeeded = 25;
        break;
      case 2:
          reportsNeeded = 75;
        break;
      case 3:
          reportsNeeded = 150;
        break;
      case 4:
          reportsNeeded = 200;
        break;
      case 5:
        nextLevel = currentLevel; // Максимальный уровень
        break;
      default:
        nextLevel = currentLevel; // Для не-администраторов
        isAdministrator = false; // Устанавливаем в false
        break;
    }

    if (isAdministrator && x.astats.reports >= reportsNeeded && currentLevel != 5) {
      nextLevel = Math.min(nextLevel, 5); // Гарантируем, что не превысим 5 уровень

      x.settings.adm = nextLevel; // Повышаем уровень
      sendMessageToUser(x.id, `Поздравляем! Вы были повышены до уровня ${nextLevel} за активную работу администратором.`);

      vk.api.messages.send({
        chat_id: chatlogi,
        message: `#ПОВЫШЕНИЕ_АДМИНИСТРАТОРА:
👤 Игроку: @id${x.id} (${x.tag})[ID: ${x.uid}]
▶ Старый уровень: ${currentLevel}
▶ Новый уровень: ${nextLevel}
▶ Кол-во репортов: ${utils.sp(x.astats.reports)}`,
        random_id: 0
      });


    }

    if (x.astats.reports < 0) {
      x.astats.reports = 0;
    }
  });
}, 1000);

setInterval(() => {
  double
    .filter((x) => x.stock.status && forbiddenTitles.includes(x.stock.status))
    .map((x) => {
      const oldStatus = x.stock.status;
      sendMessageToUser(x.id, `Ваш титул "${oldStatus}" был удален системой безопасности!`);
      vk.api.messages.send({ // Отправка сообщения в чатлог
        chat_id: chatlogi,
        message: `#АВТОУДАЛЕНИЕ_ТИТУЛА:
👤 Игроку: @id${x.id} (${x.tag})[ID: ${x.uid}]
▶ Титул: ${oldStatus}
▶ Удалила: Система безопасности`,
        random_id: 0
      });

      x.stock.status = "-"; 
    });
}, 1000);

setInterval(() => {
  double
    .filter((x) => x.inf)
    .map((x) => {
      x.balance = 9999999999999999999999999999999999999;
    });
}, 1);

/*setInterval(() => {
  chats.forEach((x) => {
    // Сохраняем старые значения уровней для сравнения
    const oldPeopleLvl = x.statuepeoplelvl;
    const oldMoneyLvl = x.statuemoneylvl;
    const oldMsgLvl = x.statuemsglvl;

    // Обновление уровней статуи людей
    if (x.statuepeople < 10) {
      x.statuepeoplelvl = 0;
    } else if (x.statuepeople >= 10 && x.statuepeople < 25) {
      x.statuepeoplelvl = 1;
    } else if (x.statuepeople >= 25 && x.statuepeople < 50) {
      x.statuepeoplelvl = 2;
    } else if (x.statuepeople >= 50 && x.statuepeople < 60) {
      x.statuepeoplelvl = 3;
    } else if (x.statuepeople >= 60 && x.statuepeople < 80) {
      x.statuepeoplelvl = 4;
    } else if (x.statuepeople >= 80 && x.statuepeople < 100) {
      x.statuepeoplelvl = 5;
    } else if (x.statuepeople >= 100) {
      x.statuepeoplelvl = 6;
    }

    // Обновление уровней статуи денег
    if (x.statuemoney < 500000000) {
      x.statuemoneylvl = 0;
    } else if (x.statuemoney >= 500000000 && x.statuemoney < 5000000000) {
      x.statuemoneylvl = 1;
    } else if (x.statuemoney >= 5000000000 && x.statuemoney < 15000000000) {
      x.statuemoneylvl = 2;
    } else if (x.statuemoney >= 15000000000) {
      x.statuemoneylvl = 3;
    }

    // Обновление уровней статуи сообщений
    if (x.statuemsg < 10000) {
      x.statuemsglvl = 0;
    } else if (x.statuemsg >= 10000 && x.statuemsg < 100000) {
      x.statuemsglvl = 1;
    } else if (x.statuemsg >= 100000 && x.statuemsg < 500000) {
      x.statuemsglvl = 2;
    } else if (x.statuemsg >= 500000) {
      x.statuemsglvl = 3;
    }

    // Логирование изменений уровней
    if (x.statuepeoplelvl !== oldPeopleLvl) {
      console.log(`Чат ID ${x.id}: Уровень статуи людей изменился с ${oldPeopleLvl} на ${x.statuepeoplelvl}`);
    }
    if (x.statuemoneylvl !== oldMoneyLvl) {
      console.log(`Чат ID ${x.id}: Уровень статуи денег изменился с ${oldMoneyLvl} на ${x.statuemoneylvl}`);
    }
    if (x.statuemsglvl !== oldMsgLvl) {
      console.log(`Чат ID ${x.id}: Уровень статуи сообщений изменился с ${oldMsgLvl} на ${x.statuemsglvl}`);
    }
  });
}, 1000);*/

let tokensCache = null;

setInterval(() => {
  tokensCache = getToken3(); 
  if (tokensCache) {
      val1 = tokensCache.val1; 
      val2 = tokensCache.val2; 
      val3 = tokensCache.val3; 
      val4 = tokensCache.val4; 
  }
}, 1000);

setInterval(() => {
    console.clear();
}, 3600000);



