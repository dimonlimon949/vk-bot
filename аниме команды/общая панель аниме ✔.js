const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');
let chats = require('../database/chats.json');

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

const tokenData = getToken();

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js'); 

const commands = [];
const cmd = {
    hear: (pattern, action) => {
         commands.push([pattern, action]);

    }
};

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

const async = require('async');

// Команда для получения топ-аниме
cmd.hear(/^(?:топик)\s?/i, async (message, bot) => {
    return bot(`Выберите действие:`,{
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `321`}),
                        "label": `🍭 Лоли-аниме`
                    },
                    "color": "positive"
                },
                {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `123`}),
                        "label": `✨ Аниме хентай`
                    },
                    "color": "positive"
                }]
            ]
        })
    })
});

   
cmd.hear(/^(?:Дополнительно)\s?/i, async (message, bot) => {
    return bot(`Выберите действие:`,{
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `бизнесы`}),
                        "label": `🍭 бизнесы`
                    },
                    "color": "positive"
                }],
                [
                {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `вернуть гб`}),
                        "label": `✨${val4} `
                    },
                    "color": "positive"
                },
                            {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `вернуть рубли`}),
                        "label": `✨${val1}`
                    },
                    "color": "positive"
                }]
            ]
        })
    })
});


// Функция проверки активных ставок
const hasActiveBets = (userId, chats) => {
    for (const chat of chats) {
        if (chat.games && chat.games.length > 0) {
            const lastGame = chat.games[chat.games.length - 1];
            if (lastGame.stavki && lastGame.stavki.some(stavka => stavka.id === userId)) {
                return true;
            }
        }
    }
    return false;
};

cmd.hear(/^(?:вернуть рубли)\s?/i, async (message, bot) => {
    if (message.user.reshim == 2) {
        return bot(`вы итак используете этот режим`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({command: `вернуть гб`}),
                            "label": `🍭 сменить режим`
                        },
                        "color": "positive"
                    }],
                ]
            })
        });
    }

    // Проверка активных ставок
    if (hasActiveBets(message.user.id, chats)) {
        return bot(`❌ Нельзя сменить режим во время активной ставки! Дождитесь окончания раунда.`);
    }

    message.user.reshim = 2;
    return bot(`✅ Готово, режим изменен на рубли`);
});

cmd.hear(/^(?:вернуть гб)\s?/i, async (message, bot) => {
    if (message.user.reshim == 1) {
        return bot(`вы итак используете этот режим`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({command: `вернуть рубли`}),
                            "label": `🍭 сменить режим`
                        },
                        "color": "positive"
                    }],
                ]
            })
        });
    }

    // Проверка активных ставок
    if (hasActiveBets(message.user.id, chats)) {
        return bot(`❌ Нельзя сменить режим во время активной ставки! Дождитесь окончания раунда.`);
    }

    message.user.reshim = 1;
    return bot(`✅ Готово, режим изменен на GB`);
});

module.exports = commands;