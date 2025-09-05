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

setInterval(() => {
    tokensCache = getToken3(); 
    if (tokensCache) {
        val1 = tokensCache.val1; 
        val2 = tokensCache.val2; 
        val3 = tokensCache.val3; 
        val4 = tokensCache.val4; 
    }
  }, 1000);



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

const spoler = tokenData4;



const chatlogi = tokenData.chatlogi; // чат для логов 

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


cmd.hear(/^(?:обновить кнопки|начать|кнопки вкл|ок1)$/i, async (message, bot) => { 




    if (!message.isChat || message.chat.type === 1) {

        return message.send(
            `🧬 @id${message.user.id} (${message.user.tag}), кнопки успешно включены!`,
            {
                keyboard: JSON.stringify({
                    one_time: false,

                    buttons: [
                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "♻️ Помощь",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "📦 Кейсы",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "📈 Обмен",
                                },

                                color: "positive",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "💰 Баланс",
                                },

                                color: "secondary",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "🔅 Профиль",
                                },

                                color: "secondary",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "🎁 Бонус",
                                },

                                color: "secondary",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "☄️ Донат",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "🏁 Гонка",
                                },

                                color: "positive",
                            },
                            {
                            action: {
                                type: "text",

                                payload: '{"button": "1"}',

                                label: "⏲ Фортуна",
                            },

                            color: "positive",
                        },
                        ],
                    ],
                }),
            }
        );
    }

    if ( message.chat.type === 2)  {

        message.send('🔄 Обновляю...',
            {
                keyboard: JSON.stringify(
                    {
                        "one_time": false, "buttons": [
                            [
                                { "action": { "type": "text", "payload": "{}", "label": "Банк" }, "color": "positive" },
                                { "action": { "type": "text", "payload": "{}", "label": "Баланс" }, "color": "positive" },
                            ],
                            [
                                { "action": { "type": "text", "payload": "{}", "label": "x2" }, "color": "primary" },
                                { "action": { "type": "text", "payload": "{}", "label": "x3" }, "color": "primary" },
                                { "action": { "type": "text", "payload": "{}", "label": "x5" }, "color": "primary" }
                            ],
                            [
                                { "action": { "type": "text", "payload": "{}", "label": "x50" }, "color": "positive" }
                            ],
                            [
                                { "action": { "type": "text", "payload": "{}", "label": "Рейтинг" }, "color": "negative" },
                                { "action": { "type": "text", "payload": "{}", "label": "Дополнительно" }, "color": "default" },
                                { "action": { "type": "text", "payload": "{}", "label": "Бонус" }, "color": "default" }
                            ]
                        ]
                    })
            })
    }

    if (!message.isChat || message.chat.type === 4) {

        return message.send(
            `🧬 @id${message.user.id} (${message.user.tag}), кнопки успешно включены!`,
            {
                keyboard: JSON.stringify({
                    one_time: false,

                    buttons: [
                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "🅰 Астата",
                                },

                                color: "negative",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "✨ Нреп",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "❤ топ ответы",
                                },

                                color: "positive",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "secondary",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "secondary",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "secondary",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "positive",
                            },
                            {
                                action: {
                                    type: "text",

                                    payload: '{"button": "1"}',

                                    label: "скоро",
                                },

                                color: "positive",
                            },
                        ],
                    ],
                }),
            }
        );
    }


})





cmd.hear(/^кнопки (выкл|off|отключить)$/i, async (message, bot) => {
const hasPermission = Object.values(spoler).includes(String(message.user.id)); 

if (!hasPermission) return bot(`Отключать кнопки можно только в ЛС бота 📩`);
await bot(`кнопки были успешно отключены 🔥\n▶️ Включить обратно - «кнопки вкл» ✅`,
{
keyboard: JSON.stringify({ buttons: [] }),
}

);

});



module.exports = commands;
