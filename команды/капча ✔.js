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



cmd.hear(/^(?:капча)\s(.*)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (message.user.captcha.vid == false) return bot(`у вас нету капчи, но я за вами слежу! 🤖`)

    if (message.args[1] == message.user.captcha.otvet) {

      message.user.captcha.vid = false

      message.user.captcha.otvet = false

      message.user.captcha.primer = false

      message.user.captcha.pred = 0

      return bot(`вы успешно прошли проверку на робота! ✅`)

    } else {

      if (message.user.captcha.vid == 1) return bot(`подозрительная активность! ❌

Введите "капча ${message.user.captcha.otvet}", чтобы пройти проверку на робота!`)

      if (message.user.captcha.vid == 2) return bot(`подозрительная активность! ❌

Решите пример «${message.user.captcha.otvet / 2} + ${message.user.captcha.otvet / 2}» и введите "капча [ответ]"`)

    }
  }
})

module.exports = commands;
