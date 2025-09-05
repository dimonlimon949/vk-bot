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

const tokensFilePath3 = './настройки/валюты.json';

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData3 = getToken3(); 

let val1 = tokenData3.val1
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4
let val5 = tokenData3.val5

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

cmd.hear(/^(?:VIP help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.vip !== true) return;

 

    return bot(`Преимущества VIP игроков:

🔥 Увеличен лимит передачи до 100.000.000 $.
💲 Максимальная сумма вклада в банке 100.000.000 $.
👑 «VIP» отметка в профиле.
🔋 Увеличен лимит ферм до 300.
⚡ Увеличена максимальная энергия до 20.
🔱 Увеличен ежедневный бонус (X2).
🔱 Ускорено получение новых работ.
⭐ Ежедневный VIP бонус [Бонус VIP].
⭐ Повышен шанс в казино.
✒ Возможность ставить ник на 5 символов длиннее.

▶️ При возникновении проблемы напишите в репорт.`);
  }
});

cmd.hear(/^(?:Premium help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.premium !== true) return;



    return bot(`Преимущества Premium игроков:



🔥 Увеличен лимит передачи до 200.000.000$.
💰 Максимальная сумма вклада в банке 200.000.000$.
👑 «PREMIUM» отметка в профиле.
💰 Ежедневная выдача валюты (15.000.000 $).
🔋 Увеличен лимит ферм до 500.
⚡ Увеличена максимальная энергия до 30.
👤 Возможность просматривать чужие профили .
⭐ Ежедневный Premium бонус [Бонус Premium].
⭐ Повышен шанс в казино.
💎 Возможность копать алмазы.
✒ Возможность ставить длинный ник.

▶️ При возникновении проблемы напишите в репорт.`);
  }
});

cmd.hear(/^(?:Titan help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.titan !== true) return;



    return bot(`Преимущества TITAN игроков:

🔥 Увеличен лимит передачи до 300.000.000$.
💲 Максимальная сумма вклада в банке 500.000.000$.
⚙️ «TITAN» отметка в профиле.
🔋 Увеличен лимит ферм до 1000.
💰 Ежедневная выдача валюты (2.500 ${val4})
⚡ Увеличена максимальная энергия до 100.
⚡ Повышен уровень работы
👤 Возможность просматривать чужие профили .
⭐ Ежедневный Titan бонус [Бонус Titan].
⭐ Повышен шанс в казино
💎 Возможность копать материю.
✒ Возможность ставить длинный ник.

▶️ При возникновении проблемы напишите в репорт.`);
  }
});
cmd.hear(/^(?:Imperator help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.imperator !== true) return;



    return bot(`Преимущества Imperator игроков:

1️⃣ МЕГА-КРУТАЯ отметка в ПРОФИЛЕ.
2️⃣ Покупка титула бесплатно.
3️⃣ Безлимитный банк.
4️⃣ Кол-во ферм увеличено до 10.000.
5️⃣ Император бонус (падают даже донат-кейсы).
6️⃣ Увеличение кубков при победе в гонках, и т.п.
7️⃣ Уменьшение коммисии при продаже рейтинга
8️⃣ ФЕЙК АЙДИ!
9️⃣ Увеличены шансы в казино.

▶️ При возникновении проблемы напишите в репорт.`);
  }
});
cmd.hear(/^(?:Бизнесмен помощь|Бизнесмен help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.busi !== true) return;

  

    return bot(`🤵 Преимущества «БИЗНЕСМЕНА»:

• 🆙 Лимит БИЗНЕСОВ увеличен до 5!
• 🕳 Выдача ПРЕМИУМ'а игрокам НАВСЕГДА! [1 раз в неделю]
• 🔋 Лимит ферм увеличен до 150.000
• 🏦 Безлимитный банк

- Дополнительно:
📆 Вы получаете доступ к РАННЕМУ обновлению!
🦸‍♂ Вы получаете Анти-гет (его цена: 199₽, а в данной привилегии бесплатно)

▶️ При возникновении проблемы напишите в репорт.`);
  }
});

cmd.hear(/^(?:Topdon help)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.topdon !== true) return;

    return bot(`Преимущества Topdon игроков:

🔥 Бонус к выйгрышу в ${val4}.
💲 Безлимит смс боту
⚙️ «Topdon» отметка в профиле.
🔋 Огромные лимиты
💰 Каждый день 1 случайный кейс и валют
⚡ Доступ к аниме хентай
⚡ доступ к Pass
👤 
⭐ 
⭐
💎 
✒ 

▶️ При возникновении проблемы напишите в репорт.`);
  }
});


module.exports = commands;
