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






cmd.hear(/^(?:гараж|гаражи|garage)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const garagePrices = [10000000, 100000000, 1000000000, 200];
    const parkingSpaces = [1, 3, 5, 10]; 

    if (!message.user.garage) {
      return bot(`гаражи:

🚙 1. Гараж ➤ Обычный
💰 Стоимость: ${utils.sp(garagePrices[0])} ${val1}
🅿️ Парковочных мест: ${parkingSpaces[0]}

🚙 2. Гараж ➤ Средний
💰 Стоимость: ${utils.sp(garagePrices[1])} ${val1}
🅿️ Парковочных мест: ${parkingSpaces[1]}

🚙 3. Гараж ➤ Элитный
💰 Стоимость: ${utils.sp(garagePrices[2])} ${val1}
🅿️ Парковочных мест: ${parkingSpaces[2]}

🚙 4. Гараж ➤ Донатный (люкс)
💰 Стоимость: ${utils.sp(garagePrices[3])} рублей
🅿️ Парковочных мест: ${parkingSpaces[3]}

🛒 Купить гараж ➤ Гараж купить [номер] ♻️`);
    } else {
      return bot(`Информация о Вашем гараже: ☃️

🛑 Тип гаража ➤ ${message.user.garage
          .toString()
          .replace(/1/gi, "Обычный")
          .replace(/2/gi, "Средний")
          .replace(/3/gi, "Элитный")
          .replace(/4/gi, "Донатный (Люкс)")}
🔒 Мест ➤ [${message.user.parkedLength}/${message.user.garage
          .toString()
          .replace(/1/gi, "1")
          .replace(/2/gi, "3")
          .replace(/3/gi, "5")
          .replace(/4/gi, "10")}]
➖➖➖➖➖
🚙 Автомобили в гараже:
${message.user.parkedOne > 0
          ? `• 1. ${cars[message.user.parkedOne - 1].name}`
          : ``}
${message.user.parkedTwo > 0
          ? `• 2. ${cars[message.user.parkedTwo - 1].name}`
          : ``}
${message.user.parkedThree > 0
          ? `• 3. ${cars[message.user.parkedThree - 1].name}`
          : ``}
${message.user.parkedFour > 0
          ? `• 4. ${cars[message.user.parkedFour - 1].name}`
          : ``}
${message.user.parkedFive > 0
          ? `• 5. ${cars[message.user.parkedFive - 1].name}`
          : ``}

🚗 Выбрать автомобиль ➤ Гараж взять [номер] ❄️`);
    }
  }
});


cmd.hear(/^(?:гараж купить)\s+(\d+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const garageId = parseInt(message.args[1]) - 1;
    const garagePrices = [10000000, 100000000, 1000000000, 200];
    const parkingSpaces = [1, 3, 5, 10];

    if (garageId < 0 || garageId > 3) {
      return bot(`Гараж с указанным номером не существует. Пожалуйста, выберите номер от 1 до 4.`);
    }

 
    if (garageId === 3) {

      if (message.user.rubli < garagePrices[garageId]) {
        return bot(`У вас недостаточно рублей для покупки этого гаража. Вам нужно ${utils.sp(garagePrices[garageId])} рублей.`);
      }

      message.user.rubli -= garagePrices[garageId];
    } else {

      if (message.user.balance < garagePrices[garageId]) {
        return bot(`У вас недостаточно средств на балансе для покупки этого гаража. Вам нужно ${utils.sp(garagePrices[garageId])} $`);
      }

      message.user.balance -= garagePrices[garageId];
    }

    message.user.garage = garageId + 1;

    return bot(`Поздравляем! Вы приобрели ${garageId + 1} гараж - ${garageId === 0 ? "Обычный" : garageId === 1 ? "Средний" : garageId === 2 ? "Элитный" : "Донатный (люкс)"}!`);
  }
  });

  let tokensCache = null;

  setInterval(() => {
    tokensCache = getToken3(); 
    if (tokensCache) {
        val1 = tokensCache.val1; 
    }
  }, 1000);

module.exports = commands;
