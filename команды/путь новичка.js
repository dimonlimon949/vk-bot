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


cmd.hear(/^(?:путь новичка|👀 Путь новичка)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

    message.user.now.kv = true

     if (!message.user.now.kv1) return bot(`👋 Привет! Давай начнем играть! 
1️⃣ Задание - забери свой бонус!`,
 {
  keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
          [{
              "action": {
                  "type": "text",
                  payload: JSON.stringify({command: `бонус`}),
                  "label": `🎁 Бонус`
              },
              "color": "positive"
          }]
      ]
  })
});

if (message.user.now.kv1 && !message.user.now.kv2) return bot(`🚀 Второе задание: купи ферму!`,
  {
   keyboard: JSON.stringify({
       "inline": true,
       "buttons": [
           [{
               "action": {
                   "type": "text",
                   payload: JSON.stringify({command: `фермы`}),
                   "label": `🎁 Фермы`
               },
               "color": "positive"
           }]
       ]
   })
 });

 if (message.user.now.kv1 && message.user.now.kv2 && !message.user.now.kv3) return bot(`🚀 Третье задание: купи бизнес!`,
  {
   keyboard: JSON.stringify({
       "inline": true,
       "buttons": [
           [{
               "action": {
                   "type": "text",
                   payload: JSON.stringify({command: `бизнесы`}),
                   "label": `🎁 Бизнесы`
               },
               "color": "positive"
           }]
       ]
   })
 });



 if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && !message.user.now.kv4) return bot(`🚀 Четвертое задание: выйграй в казино!`,
  {
   keyboard: JSON.stringify({
       "inline": true,
       "buttons": [
           [{
               "action": {
                   "type": "text",
                   payload: JSON.stringify({command: `казино 100`}),
                   "label": `🎁 Казино`
               },
               "color": "positive"
           }]
       ]
   })
 });


 if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5) return bot(`🚀 Пятое задание: открой любой кейс!`,{
  keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
          [{
              "action": {
                  "type": "text",
                  payload: JSON.stringify({command: `кейсы`}),
                  "label": `🎁 Кейсы`
              },
              "color": "positive"
          }]
      ]
  })
});

 if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6) return bot(`🚀 Шестое задание: сдать в аренду имущество!`,{
  keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
          [{
              "action": {
                  "type": "text",
                  payload: JSON.stringify({command: `аренда`}),
                  "label": `🎁 Аренда`
              },
              "color": "positive"
          }]
      ]
  })
});

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && !message.user.now.kv7) return bot(`🚀 Седьмое задание: выкопай в шахте алмазную руду!`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `шахта`}),
                    "label": `🎁 Шахта`
                },
                "color": "positive"
            }]
        ]
    })
  });

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && !message.user.now.kv8) return bot(`🚀 Восьмое задание: участвуй в гонках!`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `гонка`}),
                    "label": `🎁 Гонка`
                },
                "color": "positive"
            }]
        ]
    })
  });

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && !message.user.now.kv9) return bot(`🚀 Девятое задание: напиши коментарий или лайкни пост в группе!`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `путь новичка`}),
                    "label": `🎁 Беседы`
                },
                "color": "positive"
            }]
        ]
    })
  });

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && !message.user.now.kv10) return bot(`🚀 Десятое задание: забери подарок в чате с ботом! 🎁`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `беседы`}),
                    "label": `🎁 Подарок`
                },
                "color": "positive"
            }]
        ]
    })
  }) 



/*
// ===============================================

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && message.user.now.kv10 && !message.user.now.kv11) return bot(`🚀 Одиннадцатое задание: Выполни все квесты в боте.`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `квесты`}),
                    "label": `🧐 Квесты`
                },
                "color": "positive"
            }]
        ]
    })
  }) 


    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && message.user.now.kv10 && message.user.now.kv11 && !message.user.now.kv12) return bot(`🚀 Двенадцатое задание: Открой Легендарный STARR DROP`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: `кейсы`}),
                    "label": `⁉ Кейсы`
                },
                "color": "positive"
            }]
        ]
    })
  }) 


      if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && message.user.now.kv10 && message.user.now.kv11 && message.user.now.kv12 && !message.user.now.kv13) return bot(`🚀 Тринадцатое задание: найди в боте секретную команду`,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: ``}),
                    "label": ``
                },
                "color": "positive"
            }]
        ]
    })
  }) 


    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && message.user.now.kv10 && message.user.now.kv11 && message.user.now.kv12 && message.user.now.kv13 && !message.user.now.kv14) return bot(`🚀 Четырнадцатое задание: `,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: ``}),
                    "label": ``
                },
                "color": "positive"
            }]
        ]
    })
  }) 


    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && message.user.now.kv10 && message.user.now.kv11 && message.user.now.kv12 && message.user.now.kv13 && message.user.now.kv14 && !message.user.now.kv15) return bot(`🚀 Пятнадцатое задание: `,{
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({command: ``}),
                    "label": ``
                },
                "color": "positive"
            }]
        ]
    })
  }) 




*/


else { 

  return bot(`🎉 Поздравляю! Ты прошел все задания! 🎉 Скоро будут новые задания. 🚀`)

}


}
})

module.exports = commands;
