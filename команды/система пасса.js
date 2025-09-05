const axios = require('axios');
const fs = require('fs');

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

const confic = require('../database/settings.json'); 

const commands = [];
const cmd = {
    hear: (pattern, action) => {
         commands.push([pattern, action]);

    }
};

const async = require('async');


cmd.hear(/^(?:пасс бота|⭐Pass Cold⭐)\s?/i, async (message, bot) => {

      if (message.user.settings.titan !== true) return bot(`доступен topdon игрокам`)

  try {
    await message.send(`≽ܫ≼♛♛♛≽ܫ≼`, {
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [
            {
              "action": {
                "type": "text",
                payload: JSON.stringify({ command: `пасс 1` }),
                "label": `🍭 Путь пасса`
              },
              "color": "positive"
            },
            {
              "action": {
                "type": "text",
                payload: JSON.stringify({ command: `пасс 2` }),
                "label": `💎 Купить Рубиновый пасс`
              },
              "color": "positive"
            }
          ],
          [
            {
              "action": {
                "type": "text",
                payload: JSON.stringify({ command: `пасс 3` }),
                "label": `🎁 Список наград`
              },
              "color": "positive"
            },
            {
              "action": {
                "type": "text",
                payload: JSON.stringify({ command: `пасс 4` }),
                "label": `ℹ️ Информация о сезоне`
              },
              "color": "positive"
            }
          ]
        ]
      })
    });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
  }
});

cmd.hear(/^(?:пасс 1|путь пасса)\s?/i, async (message, bot) => {
      if (message.user.settings.titan !== true) return bot(`доступен topdon игрокам`)

});

cmd.hear(/^(?:пасс 2|Купить Рубиновый пасс)\s?/i, async (message, bot) => {
      if (message.user.settings.titan !== true) return bot(`доступен topdon игрокам`)

});


cmd.hear(/^(?:пасс 3|список наград)\s?/i, async (message, bot) => {
      if (message.user.settings.titan !== true) return bot(`доступен topdon игрокам`)

});


cmd.hear(/^(?:пасс 4|о сезоне)\s?/i, async (message, bot) => {
      if (message.user.settings.titan !== true) return bot(`доступен topdon игрокам`)

});



module.exports = commands;