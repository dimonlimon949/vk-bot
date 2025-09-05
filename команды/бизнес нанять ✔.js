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
const businesses2 = require("../spisok/бизнесы.js")

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
    // console.log('Токены успешно сохранены.');
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



const businesses=require('../spisok/business spisok.js')

cmd.hear(/^(?:бизнес)\s(?:нанять)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
  try {
    if (!message.isChat || message.chat.type === 1) {
      await hireWorkersPrivate(message, bot);
    } else if (message.isChat || message.chat.type === 2) {
      await hireWorkersGroup(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бизнес нанять:", error);
    await bot("⚠️ Произошла ошибка при найме работников. Пожалуйста, попробуйте позже.");
  }
});

async function hireWorkersPrivate(message, bot) {
  if (!message.user.settings) {
    message.user.settings = {};
  }

  let businessIndex = Math.floor(Number(message.args[1]));
  let workersToHire = Math.floor(Number(message.args[2].replace(/(\.|\,)/gi, "").replace(/(к|k)/gi, "000").replace(/(м|m)/gi, "000000").replace(/(вабанк|вобанк|все|всё)/gi, "1")));

  let maxBusinesses = message.user.settings.busi === true ? 5 : 4;

  if (businessIndex < 1 || businessIndex > maxBusinesses) {
    return bot(`🚫 Ошибка, данного бизнеса не существует. Используйте «Бизнес нанять [от 1 до ${maxBusinesses}] [кол-во работников]» ❓`);
  }

  if (message.user.business2.length < businessIndex) {
    return bot(`🚫 У вас нет этого бизнеса! ❌`);
  }

  businessIndex--;

  const bizData = message.user.business2[businessIndex];
  const biz = businesses2[bizData.id - 1][bizData.upgrade - 1];

  if (bizData.workers + workersToHire > biz.workers) {
    return bot(`🚫 В вашем бизнесе не может поместиться столько работников! ❌\n\n▶️ Попробуйте уменьшить кол-во.`);
  }
  const cost1 = 0
  const cost = workersToHire * cost1;


  if (cost > message.user.balance) {
    return bot(`🚫 У вас недостаточно денег для покупки рабочих! 1 работник - ${utils.sp(cost1)} ${val1}`);
  }

  message.user.balance -= cost;
  message.user.business2[businessIndex].workers += workersToHire;

  return bot(`✅ Вы наняли ${utils.sp(workersToHire)} рабочих 👷‍♂️ для бизнеса №${businessIndex + 1} 🎉`);
}

async function hireWorkersGroup(message, bot) {
  if (!message.user.settings) {
    message.user.settings = {};
  }

  let businessIndex = Math.floor(Number(message.args[1]));
  let workersToHire = Math.floor(Number(message.args[2].replace(/(\.|\,)/gi, "").replace(/(к|k)/gi, "000").replace(/(м|m)/gi, "000000").replace(/(вабанк|вобанк|все|всё)/gi, "1")));

  let maxBusinesses = message.user.settings.busi === true ? 5 : 4;

  if (businessIndex < 1 || businessIndex > maxBusinesses) {
    return bot(`🚫 Ошибка, данного бизнеса не существует. Используйте «Бизнес нанять [от 1 до ${maxBusinesses}] [кол-во работников]» ❓`);
  }

  if (message.user.business.length < businessIndex) {
    return bot(`🚫 У вас нет этого бизнеса! ❌`);
  }

  businessIndex--;

  const bizData = message.user.business[businessIndex];
  const biz = businesses[bizData.id - 1][bizData.upgrade - 1];

  if (bizData.workers + workersToHire > biz.workers) {
    return bot(`🚫 В вашем бизнесе не может поместиться столько работников! ❌\n\n▶️ Попробуйте уменьшить кол-во.`);
  }
  const cost1 = 0 
  const cost = workersToHire * cost1; 


  if (cost > message.user.balance2) {
    return bot(`🚫 У вас недостаточно денег для покупки рабочих! 1 работник - ${utils.sp(cost1)} ${val4}`);
  }

  message.user.balance2 -= cost;
  message.user.business[businessIndex].workers += workersToHire;

  return bot(`✅ Вы наняли ${utils.sp(workersToHire)} рабочих 👷‍♂️ для бизнеса №${businessIndex + 1} 🎉`);
}

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

module.exports = commands;