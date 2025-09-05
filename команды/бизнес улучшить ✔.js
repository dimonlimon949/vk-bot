let utils = require('../utils.js')

const commands =[];

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
    chatlogi: chatlogi };

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
let fink=true

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


const businesses = require('../spisok/business spisok.js')
const businesses2 = require("../spisok/бизнесы.js")

cmd.hear(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
  try {
    if (!message.isChat || message.chat.type === 1) {
      await upgradeBusinessPrivate(message, bot);
    } else if (message.chat.type === 2) {
      await upgradeBusinessGroup(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бизнес улучшить:", error);
    await bot("⚠️ Произошла ошибка при улучшении бизнеса. Пожалуйста, попробуйте позже.");
  }
});

async function upgradeBusinessPrivate(message, bot) {
  const businessIndex = parseInt(message.args[1], 10) - 1;

  if (isNaN(businessIndex) || businessIndex < 0) {
    return bot('🚫 Укажите номер бизнеса от 1. 🔢');
  }

  if (!message.user.business2 || !message.user.business2[businessIndex]) {
    return bot('🚫 У вас нет бизнеса с таким номером. 🏢');
  }

  let maxIndex = 4;
  if (message.user.settings && message.user.settings.busi === true) {
    maxIndex = 5;
  }

  if (businessIndex + 1 > maxIndex) {
    return bot(`🚫 Используйте: Бизнес улучшить [от 1 до ${maxIndex}]. 🔢`);
  }

  const businessId = message.user.business2[businessIndex].id - 1;
  const upgradeLevel = message.user.business2[businessIndex].upgrade;

  if (!businesses2[businessId] || !businesses2[businessId][upgradeLevel]) {
    return bot('🚫 Нет доступных улучшений для этого бизнеса! ❌');
  }

  const cost = businesses2[businessId][upgradeLevel].cost;

  if (cost > message.user.balance) {
    return bot('🚫 У вас недостаточно денег для улучшения этого бизнеса! 💰');
  }

  message.user.balance -= cost;
  message.user.business2[businessIndex].upgrade++;

  return bot(
    `✅ Вы улучшили бизнес №${businessIndex + 1} 🎉\n 💸 С Вашего баланса списано: ${utils.sp(cost)} ${val1}\n 💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}`
  );
}

async function upgradeBusinessGroup(message, bot) {
  const businessIndex = parseInt(message.args[1], 10) - 1;

  if (isNaN(businessIndex) || businessIndex < 0) {
    return bot('🚫 Укажите номер бизнеса от 1. 🔢');
  }

  if (!message.user.business || !message.user.business[businessIndex]) {
    return bot('🚫 У вас нет бизнеса с таким номером. 🏢');
  }

  const businessId = message.user.business[businessIndex].id - 1;
  const upgradeLevel = message.user.business[businessIndex].upgrade;

  if (!businesses[businessId] || !businesses[businessId][upgradeLevel]) {
    return bot('🚫 Нет доступных улучшений для этого бизнеса! ❌');
  }

  const cost = businesses[businessId][upgradeLevel].cost;

  if (cost > message.user.balance2) {
    return bot('🚫 У вас недостаточно денег для улучшения этого бизнеса! 💰');
  }

  message.user.balance2 -= cost;
  message.user.business[businessIndex].upgrade++;

  return bot(
    `✅ Вы улучшили бизнес №${businessIndex + 1} 🎉\n 💸 С Вашего баланса списано: ${utils.sp(cost)} ${val4}\n 💰 Ваш баланс: ${utils.sp(message.user.balance2)} ${val4}`
  );
}

setInterval(() => {
  tokensCache = getToken3(); 
  if (tokensCache) {
      val1 = tokensCache.val1; 
      val2 = tokensCache.val2; 
      val3 = tokensCache.val3; 
      val4 = tokensCache.val4; 
  }
}, 1000);

module.exports = commands;
