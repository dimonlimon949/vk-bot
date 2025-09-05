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


cmd.hear(/^(?:сделай|поставь|сделай|поставь)\s*(\d+)$/i, async (message) => {
  if (message.chat.type === 2) {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    // Извлекаем group_id из первого элемента массива groups
    const groupId = groupInfo[0].id;
    const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

    if (!admins.items.find(x => x.id === message.senderId)) return;
    const validResults = [0, 2, 3, 5, 50];


    const value = parseInt(message.args[1], 10);

    
    if (!validResults.includes(value)) {
      return message.send(`Значение ${value} недопустимо. Допустимые значения: ${validResults.join(', ')}`);
    }

  
    try {

      if (!message.chat.games) {
        message.chat.games = [];
      }

      const lastGame = message.chat.games[message.chat.games.length - 1] || {};

      if (lastGame) {
        lastGame.result = value;
        return message.send(`✅ Результат последней игры установлен на ${value}.`);
      } else {
        return message.send(`🔄 Нет последней игры, значение ${value} не применено.`);
      }
    } catch (e) {
      console.error('Произошла ошибка:', e);
      return message.send(`Ошибка: ${e.message}`);
    }
  }
});


module.exports = commands;
