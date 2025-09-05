let utils = require('../utils.js')

const commands =[];

const fs = require('fs'); 

let chats = require('../database/chats.json')

let double = require('../database/users.json')
let config = require('../database/settings.json');
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens; 
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; 
  }
}

const tokensFilePath4 = './настройки/создатели бота.json';

function getToken4() {
    try {
      const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
      return tokens;
    } catch (error) {
      console.error('Ошибка при чтении токенов:', error);
      return null;
    }
  }

const tokenData4 = getToken4();

const spoler = tokenData4 ? Object.values(tokenData4)
    .map(id => Number(id))
    .filter(id => Number.isInteger(id) && id > 0) : [];


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


const tokenData = getToken();

const chatlogi = tokenData.chatlogi; 
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
const val4 = tokenData3.val4



cmd.hear(/^токен\s+(.+)$/i, async (message, bot) => {
  try {
    if (!message.isChat) {
      const inputToken = message.args[1].trim(); // Добавляем trim() для удаления возможных пробелов
      
      // Упрощенная проверка формата токена
      if (!inputToken || !inputToken.startsWith('vk1.a.')) {
        return bot("❌ Неверный формат токена. Токен должен начинаться с 'vk1.a.'");
      }

      // Проверка прав доступа (с защитой от undefined)
      const spoler = global.spoler || [];
      const isMainAdmin = Array.isArray(spoler) 
        ? spoler.includes(String(message.user.id))
        : Object.values(spoler || {}).includes(String(message.user.id));
      
      const adminLevel = message.user?.settings?.adm || 0;

      if (adminLevel < 6 && !isMainAdmin) {
        return bot("❌ Доступ запрещен: только создатель может изменять токены");
      }

      // Чтение/создание файла токенов
      let tokens = {};
      try {
        tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8')) || {};
      } catch (e) {
        console.log('Создаем новый файл токенов');
      }

      // Поиск свободного слота
      let tokenKey = 'token';
      const tokenKeys = Object.keys(tokens).filter(k => k.startsWith('token'));
      
      // Проверяем существующие токены
      for (let i = 1; i <= 20; i++) {
        const currentKey = i === 1 ? 'token' : `token${i}`;
        if (!tokens[currentKey] || !tokens[currentKey].startsWith('vk1.a.')) {
          tokenKey = currentKey;
          break;
        }
      }
      
      // Если все слоты заняты, создаем новый
      if (tokenKeys.includes(tokenKey) && tokens[tokenKey]?.startsWith('vk1.a.')) {
        const newIndex = tokenKeys.length + 1;
        tokenKey = `token${newIndex}`;
      }
      
      // Сохраняем токен
      tokens[tokenKey] = inputToken;
      fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));

      // Управление экземплярами VK
      if (!global.vkInstances) global.vkInstances = {};
      
      // Останавливаем старый экземпляр
      if (global.vkInstances[tokenKey]) {
        try {
          await global.vkInstances[tokenKey].updates.stop();
        } catch (e) {
          console.error('Ошибка при остановке экземпляра:', e);
        }
      }
      
      // Создаем и запускаем новый экземпляр
      global.vkInstances[tokenKey] = new VK({ token: inputToken });
      await global.vkInstances[tokenKey].updates.start();

      bot(`✅ Токен успешно сохранен как ${tokenKey}\n` +
          `Последние 5 символов: ...${inputToken.slice(-5)}`);
          
    } else {
      bot("⚠️ Команда доступна только в личных сообщениях");
    }
  } catch (error) {
    console.error('Ошибка в команде токен:', error);
    bot("❌ Ошибка: " + (error.message || 'неизвестная ошибка'));
  }
});


module.exports = commands;
