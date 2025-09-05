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



cmd.hear(/^(?:фортуна|🎡 Фортуна|⏲ Фортуна)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(
      `🎰 *Колесо Фортуны* 🎰

🎁 Система редкостей призов:
▸ ○ ОБЫЧНЫЙ (50%) - билеты, опыт
▸ ✩ РЕДКИЙ (30%) - элитные посылки, донат-кейсы
▸ ✪ СВЕРХРЕДКИЙ (12%) - Starr Drops
▸ ✦ ЭПИЧЕСКИЙ (5%) - ${val1}
▸ ✧ МИФИЧЕСКИЙ (2%) - ${val4}
▸ ★ ЛЕГЕНДАРНЫЙ (1%) - VIP статус

🔥 *Чем выше редкость - тем сложнее выбить!*
💎 Фортуна дает шанс каждому, но только избранные получают лучшие награды!

🎫 Стоимость прокрута: 10 билетов`,
      { 
        attachment: `photo-211261524_457239021`,
        keyboard: JSON.stringify({
          inline: true,
          buttons: [[{
            action: {
              type: "text",
              payload: JSON.stringify({ command: `фортуна ебать` }),
              label: "🎡 Крутить Фортуну [10🎫]",
            },
            color: "positive",
          }]]
        }),
      }
    );
  }
});

cmd.hear(/^(?:фортуна ебать)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    // Улучшенная система шансов
    const roll = Math.random() * 100;
    let prize, rarityData;

    if (roll < 1) {          // 1% - Легендарный (VIP)
      prize = 6;
      rarityData = { name: "★ ЛЕГЕНДАРНЫЙ", color: '#FFEB3B', emoji: "🌟", chance: 1 };
    } else if (roll < 3) {   // 2% - Мифический (val4)
      prize = 7;
      rarityData = { name: "✧ МИФИЧЕСКИЙ", color: '#F44336', emoji: "🔥", chance: 2 };
    } else if (roll < 8) {   // 5% - Эпический
      prize = 4;
      rarityData = { name: "✦ ЭПИЧЕСКИЙ", color: '#9C27B0', emoji: "💎", chance: 5 };
    } else if (roll < 20) {  // 12% - Сверхредкий
      prize = 2;
      rarityData = { name: "✪ СВЕРХРЕДКИЙ", color: '#2196F3', emoji: "🔮", chance: 12 };
    } else if (roll < 50) {  // 30% - Редкий
      prize = utils.random(1, 3) === 1 ? 1 : 3;
      rarityData = { name: "✩ РЕДКИЙ", color: '#4CAF50', emoji: "🍀", chance: 30 };
    } else {                 // 50% - Обычный
      prize = utils.random(1, 2) === 1 ? 5 : 8;
      rarityData = { name: "○ ОБЫЧНЫЙ", color: '#9E9E9E', emoji: "▫️", chance: 50 };
    }

    if (message.user.bilet < 10) {
      return bot(`❌ Недостаточно билетов для прокрута! Нужно 10🎫`);
    }

    message.user.bilet -= 10;
    let rewardText = "";
    const keyboard = createKeyboard();

    switch(prize) {
      case 1: {
        const count = utils.random(1, 3);
        message.user.possilka2 += count;
        rewardText = `элитная(-ые) посылку(-и) (Х${count}) 📦`;
        break;
      }
      case 2: {
        message.user.c4 += 1;
        rewardText = `Starr Drops`;
        break;
      }
      case 3: {
        const count = utils.random(1, 2);
        message.user.c3 += count;
        rewardText = `донат-кейс(-ы, -ов) (Х${count})`;
        break;
      }
      case 4: {
        const amount = utils.random(1000000, 50000000);
        message.user.balance += amount;
        rewardText = `${utils.sp(amount)} ${val1}`;
        break;
      }
      case 5: {
        const count = utils.random(1, 15);
        message.user.bilet += count;
        rewardText = `${count} билетов 🎫`;
        break;
      }
      case 6: {
        if (message.user.settings.vip) {
          message.user.bilet += 20;
          rewardText = `VIP статус (компенсация 20 билетов)`;
        } else {
          activateVip(message.user);
          rewardText = `VIP СТАТУС АКТИВИРОВАН!`;
        }
        break;
      }
      case 7: {
        const amount = utils.random(1, 20000);
        message.user.balance2 += amount;
        rewardText = `${utils.sp(amount)} ${val4}`;
        break;
      }
      case 8: {
        const amount = utils.random(10, 2000);
        message.user.opit += amount;
        rewardText = `${utils.sp(amount)} опыта`;
        break;
      }
    }

    const randEmoji = utils.pick(["😍", "🤩", "😱", "🎉", "💰", "🤑"]);
    const chanceText = `(Шанс: ${rarityData.chance}%)`;

    return message.send(
      `🎡 *${rarityData.emoji} [${rarityData.name}] ${chanceText}*\n` +
      `Выпало: ${rewardText} ${randEmoji}\n` +
      `▸ Осталось билетов: ${utils.sp(message.user.bilet)}🎫`,
      { 
        attachment: getPrizeAttachment(prize),
        keyboard
      }
    );
  }
});

// Вспомогательные функции остаются без изменений
function createKeyboard() {
  return JSON.stringify({
    inline: true,
    buttons: [[{
      action: {
        type: "text",
        payload: JSON.stringify({ command: `фортуна ебать` }),
        label: "🎡 Крутить снова [10🎫]",
      },
      color: "positive",
    }]]
  });
}

function getPrizeAttachment(prize) {
  const attachments = {
    1: 'photo-211261524_457239022',
    2: 'photo-211261524_457239023',
    3: 'photo-211261524_457239027',
    4: 'photo-211261524_457239022',
    5: 'photo-211261524_457239022',
    6: 'photo-211261524_457239026',
    7: 'photo-211261524_457239022',
    8: 'photo-211261524_457239022'
  };
  return attachments[prize] || 'photo-211261524_457239021';
}

function activateVip(user) {
  user.settings.vip = true;
  user.stock.status = "VIP";
  user.limit.nicklimit = 21;
  user.level += 5;
  user.limit.banklimit = 100000000000000;
  user.limit.farmlimit = 3000;
  user.limit.videocardlimit = 50;
  user.limit.playerlimit = 100000000000000;
  user.limit.sent = 0;
  user.maxenergy = 20;
}





module.exports = commands;
