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

cmd.hear(/^(?:редкости валют)$/i, async (message, bot) => {
  if (!message.isChat) {
    return bot(`Выберите редкость валюты:`, { // Уточняем текст
      keyboard: JSON.stringify({
        inline: true,
        buttons: [
          [{
            action: {
              type: "text",
              payload: JSON.stringify({command: `редкость обычная`}), // Добавляем payload для определения выбора
              label: `Обычные`
            },
            color: "default"
          },
          {
            action: {
              type: "text",
              payload: JSON.stringify({command: `редкость редкие`}), // Добавляем payload для определения выбора
              label: `Редкие`
            },
            color: "positive"
          }],
          [{
            action: {
              type: "text",
              payload: JSON.stringify({command: `редкость легендарные`}),// Добавляем payload для определения выбора
              label: `Легендарные`
            },
            color: "negative"
          }]
        ]
      })
    });
  }
});

cmd.hear(/^(?:редкость обычная)$/i, async (message, bot) => {
  return bot(`Валюты обычной редкости:
${val1},
биткоины,
рейтинг,
железо,
золото,
алмазы
`) 
})

cmd.hear(/^(?:редкость редкие)$/i, async (message, bot) => {
  return bot(`Валюты редкой редкости:
${val2},
${val4}
Листики

`) 
})

cmd.hear(/^(?:редкость легендарные)$/i, async (message, bot) => {
  return bot(`Валюты легендарной редкости:
Донат рубли,
Материя,
Обсидиан,
Билеты
SpringCoins
`) 
})


module.exports = commands;
