let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json') 

let chats = require('../database/chats.json')


const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './database/tokens.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}


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


const tokenData = getToken();

const chatlogi = tokenData.chatlogi;  
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


 
// Полный массив данных по уровням (цена перехода и бонусы)
const levelData = require('../spisok/уровни.js');

function calculateTotalCost(currentLevel) {
  let total = 0;
  for (let i = currentLevel; i < levelData.length - 1; i++) {
    if (levelData[i] !== null) {
      total += levelData[i].price;
    }
  }
  return total;
}

function formatBonusMessage(bonus) {
  if (!bonus) return 'нет';
  
  const messages = [];
  if (bonus.balance) messages.push(`+${bonus.balance.toLocaleString()} ${val1}`);
  if (bonus.premium) messages.push('Premium статус');
  if (bonus.vip) messages.push('VIP статус');
  if (bonus.bilet) messages.push(`+${bonus.bilet} билетов`);
  if (bonus.busi) messages.push('Открыт редкий бизнес');
  if (bonus.farm) messages.push('Открыта редкая ферма');
  if (bonus.case10) messages.push(`+${bonus.case10} редких starr drops`);
  if (bonus.case7) messages.push(`+${bonus.case7} мифический starr drops`);
  if (bonus.case6) messages.push(`+${bonus.case6} легендарный starr drops`);
  if (bonus.case4) messages.push(`+${bonus.case4} starr drops`);
  if (bonus.limit) messages.push(`+${bonus.limit} к лимиту`);
  if (bonus.rating) messages.push(`+${bonus.rating} к рейтингу`);
  if (bonus.bitkoin) messages.push(`+${bonus.bitkoin} биткоинов`);
  if (bonus.cars) messages.push('Открыт редкий автомобиль');
  if (bonus.GB) messages.push(`+${bonus.GB} ${val4}`);
  if (bonus.ruds) messages.push('Открыта редкая руда');
  if (bonus.donat) messages.push(`+${bonus.donat} донат-рублей`);
  if (bonus.titan) messages.push('Titan статус');
  if (bonus.topdon) messages.push('Topdon статус');
  
  return messages.length > 0 ? messages.join('\n') : 'нет';
}

cmd.hear(/^(?:уровень|level|😴 Уровень)$/i, async (message, bot) => {

return bot(`в доработке`)

  if (!message.isChat || message.chat.type === 1) {
    const currentLevel = message.user.levl || 1;
    const nextLevel = levelData[currentLevel];
    const totalCost = calculateTotalCost(currentLevel);
    const bonusInfo = nextLevel ? formatBonusMessage(nextLevel.bonus) : 'нет';
    const currencySymbol = ` ${val1}`; // Замените на нужный символ валюты

    return bot(
      `🔹 Твой уровень: ${currentLevel}\n` +
      `💰 Следующий уровень: ${nextLevel ? nextLevel.price.toLocaleString() + ` ${currencySymbol}` : 'MAX'}\n` +
      `🎁 Бонусы за уровень: ${bonusInfo}\n` +
      `📈 До максимума надо потратить: ${totalCost.toLocaleString()} ${val1}`,
      {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({ command: "уровень улучшить" }),
                "label": `✅ Улучшить (${nextLevel ? nextLevel.price.toLocaleString() + ` ${val1}` : 'MAX'})`
              },
              "color": "positive"
            }]
          ]
        })
      }
    );
  }
});

cmd.hear(/^(?:уровень улучшить)$/i, async (message, bot) => {
  return bot(`в доработке`)
  if (!message.isChat || message.chat.type === 1) {
    const currentLevel = message.user.levl || 0;
    const userBalance = message.user.balance || 0;
    const nextLevelData = levelData[currentLevel];
    
    if (!nextLevelData) {
      return bot('🎉 Вы достигли максимального уровня!');
    }
    
    if (userBalance < nextLevelData.price) {
      return bot(`❌ Недостаточно средств! Нужно ${nextLevelData.price.toLocaleString()} ${val1}, у вас ${userBalance.toLocaleString()} ${val1}`);
    }
    
    // Обновляем данные пользователя
    message.user.balance -= nextLevelData.price;
    message.user.levl = currentLevel + 1;
    
    // Добавляем бонусы
    const bonus = nextLevelData.bonus || {};
    message.user.balance += bonus.balance || 0;
    if (bonus.premium) message.user.settings.premium = true;
    if (bonus.vip) message.user.settings.vip = true;
    message.user.bilet = (message.user.bilet || 0) + (bonus.bilet || 0);
    if (bonus.busi) message.user.business2.push({

      "id": 32,

      "upgrade": 1,

      "workers": 1,

      "moneys": 0

    });
    if (bonus.farm) message.user.farm = true;//посмотреть код
    message.user.c10 = (message.user.c10 || 0) + (bonus.case10 || 0);
    message.user.c7 = (message.user.c7 || 0) + (bonus.case7 || 0);
    message.user.c6 = (message.user.c6 || 0) + (bonus.case6 || 0);
    message.user.c4 = (message.user.c4 || 0) + (bonus.case4 || 0);
    message.user.limit.playerlimit = (message.user.limit.playerlimit || 0) + (bonus.limit || 0);
    message.user.rating = (message.user.rating || 0) + (bonus.rating || 0);
    message.user.btc = (message.user.btc || 0) + (bonus.bitkoin || 0);
    if (bonus.cars) message.user.cars = true;//посмотреть код
    message.user.balance2 = (message.user.balance2 || 0) + (bonus.GB || 0);
    if (bonus.ruds) message.user.ruds = true;//посмотреть код
    message.user.rubli = (message.user.rubli || 0) + (bonus.donat || 0);
    if (bonus.titan) message.user.settings.titan = true;
    if (bonus.topdon) message.user.settings.topdon = true;
    
    return bot(
      `🎉 Поздравляем! Вы перешли на уровень ${message.user.levl}\n` +
      `💰 Ваш баланс: ${message.user.balance.toLocaleString()} ${val1}\n` +
      `🎁 Полученные бонусы:\n${formatBonusMessage(bonus)}`
    );
  }
});

module.exports = commands;
