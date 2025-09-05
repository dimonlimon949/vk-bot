let utils = require('../utils.js')

const commands = [];

const fs = require('fs');


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


let double = require('../database/users.json')

cmd.hear(/^(?:бизнес)\s(?:снять)\s(\d)\s(.*)$/i, async (message, bot) => {
  try {
    if (!message.isChat || message.chat.type === 1) {
      await withdrawMoneyPrivate(message, bot);
    } else if (message.chat.type === 2) {
      await withdrawMoneyGroup(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бизнес снять:", error);
    await bot("⚠️ Произошла ошибка при снятии средств. Пожалуйста, попробуйте позже.");
  }
});

async function withdrawMoneyPrivate(message, bot) {
  if (!message.user.settings) {
    message.user.settings = {};
  }

  let businessIndex = Math.floor(Number(message.args[1]));

  if (message.user.settings.busi === true) {
    if (businessIndex < 1 || businessIndex > 5)
      return bot(`🚫 Используйте: Бизнес снять [от 1 до 5] [количество]`);
  } else {
    if (businessIndex < 1 || businessIndex > 4)
      return bot(`🚫 Используйте: Бизнес снять [от 1 до 4] [количество]`);
  }

  if (message.user.business2.length < businessIndex)
    return bot(`🚫 У вас нет этого бизнеса`);

  businessIndex--;

  let amountStr = message.args[2];
  amountStr = amountStr.replace(/(\.|\,)/gi, "");
  amountStr = amountStr.replace(/(к|k)/gi, "000");
  amountStr = amountStr.replace(/(м|m)/gi, "000000");
  amountStr = amountStr.replace(/(вабанк|вобанк|все|всё)/gi, message.user.business2[businessIndex].moneys);


  let amount = Math.floor(Number(amountStr));

  if (isNaN(amount)) return;


  if (amount <= 0)
    return bot(`🚫 Вы не можете снять такую сумму со счёта бизнеса 😔`);

  if (amount > message.user.business2[businessIndex].moneys)
    return bot(
      `🚫 У вас недостаточно средств на счёте этого бизнеса! ❌\n\n💰 Баланс бизнеса: ${utils.sp(
        message.user.business2[businessIndex].moneys
      )} ${val1} 🏦`
    );

  message.user.balance += amount;
  message.user.business2[businessIndex].moneys -= amount;

  return bot(
    `✅ Вы сняли со счёта бизнеса ${utils.sp(
      amount
    )} ${val1} 💵\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1} 💸`
  );
}

async function withdrawMoneyGroup(message, bot) {
  if (!message.user.settings) {
    message.user.settings = {};
  }

  let businessIndex = Math.floor(Number(message.args[1]));

  if (message.user.settings.busi === true) {
    if (businessIndex < 1 || businessIndex > 5)
      return bot(`🚫 Используйте: Бизнес снять [от 1 до 5] [количество]`);
  } else {
    if (businessIndex < 1 || businessIndex > 4)
      return bot(`🚫 Используйте: Бизнес снять [от 1 до 4] [количество]`);
  }

  if (message.user.business.length < businessIndex)
    return bot(`🚫 У вас нет этого бизнеса`);

  businessIndex--;

  let amountStr = message.args[2];
  amountStr = amountStr.replace(/(\.|\,)/gi, "");
  amountStr = amountStr.replace(/(к|k)/gi, "000");
  amountStr = amountStr.replace(/(м|m)/gi, "000000");
  amountStr = amountStr.replace(/(вабанк|вобанк|все|всё)/gi, message.user.business[businessIndex].moneys);

  let amount = Math.floor(Number(amountStr));

  if (isNaN(amount)) return;

  if (amount <= 0)
    return bot(`🚫 Вы не можете снять такую сумму со счёта бизнеса 😔`);

  if (amount > message.user.business[businessIndex].moneys)
    return bot(
      `🚫 У вас недостаточно средств на счёте этого бизнеса! ❌\n\n💰 Баланс бизнеса: ${utils.sp(
        message.user.business[businessIndex].moneys
      )} ${val4} 🏦`
    );

  message.user.balance2 += amount;
  message.user.business[businessIndex].moneys -= amount;

  return bot(
    `✅ Вы сняли со счёта бизнеса ${utils.sp(
      amount
    )} ${val4} 💵\n💰 Ваш баланс: ${utils.sp(message.user.balance2)} ${val4} 💸`
  );
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