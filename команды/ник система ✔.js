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


const badWordsList = [
  'писька', 'хуй', 'бля', 'сука', 'еблан', 'пидор', 'мудак' 
];

cmd.hear(/^(?:!ник|ник)\s(.*)$/i, async (message, bot) => {

  if (message.args[1] === undefined || message.args[1].trim() === "") {
    return bot('🚫 Укажите новый ник после команды.');
  }

  const newNickname = message.args[1].trim();

  if (newNickname.length > 40) {
    return bot('🚫 Максимум 40 символов.');
  }

  if (newNickname.length < 3) {
    return bot('🚫 Минимально 3 символа.');
  }

  if (
    newNickname.length > message.user.limit.nicklimit &&
    newNickname.length > message.user.nicklimit
  ) {
    return bot(`🚫 Вы указали слишком длинный ник.`);
  }

  // Проверка на мат (без модуля)
  const lowerCaseNickname = newNickname.toLowerCase(); // Приводим к нижнему регистру для регистронезависимости
  for (const badWord of badWordsList) {
    if (lowerCaseNickname.includes(badWord)) {
      return bot('🚫 Нельзя использовать нецензурную лексику в нике.');
    }
  }

  // Разрешаем менять ник без оплаты
  message.user.tag = newNickname;
  let smilenick = utils.pick(['😯', '🙂', '☺']);
  let ggtext = utils.pick(['фантастический ник!', 'крутой ник!', 'классный ник!', 'прикольный ник!', 'таких ников я ещё не видел!']);
  return bot(`${ggtext} ${smilenick}`);
});
  



module.exports = commands;
