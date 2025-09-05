let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let chats = require('../database/chats.json')

let double = require('../database/users.json')

let botinfo = require('../database/botinfo.json')

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



// Пример использования
const tokenData = getToken();


const tokensFilePath2 = './настройки/ид бесед.json';

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens; // Возвращаем все данные из файла
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

const tokenData2 = getToken2();

const podarok = tokenData2.podarok;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

function unixStampLeft(stamp) {
  stamp = stamp / 1000;
  let s = stamp % 60;
  stamp = (stamp - s) / 60;
  let m = stamp % 60;
  stamp = (stamp - m) / 60;
  let h = stamp % 24;
  let d = (stamp - h) / 24;

  let text = ``;

  if (d > 0) text += Math.floor(d) + " д. ";
  if (h > 0) text += Math.floor(h) + " ч. ";
  if (m > 0) text += Math.floor(m) + " м. ";
  if (s > 0) text += Math.floor(s) + " с.";
  return text;
}

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




cmd.hear(/^(?:Подарок|🌟 Подарок|🎁 Забрать подарок)$/i,

  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.user.settings.adm > 1) return bot(`администрации нельзя забирать подарки бесед.`)
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (message.chatId !== podarok)
          return message.send(`🎁 @id${message.user.id} (${message.user.tag}), подарок можно получить только в нашей официальной беседе!
📩 Беседа: `);

        if (chat.podarok === undefined) {
          chat.podarok = 3600000;
        }

        let user = double.find((x) => x.uid === botinfo.podarok);

        if (!message.isChat)
          return message.send(`🎁 @id${message.user.id} (${message.user.tag}), подарок можно получить только в нашей официальной беседе!
📩 Беседа: `);



        if (chat.podarok > Date.now())
          return bot(`Подождите немного! 💡

⌛ Следующий подарок через: ${unixStampLeft(chat.podarok - Date.now())}
📥 Предыдущий подарок забрал игрок ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`
            } (🆔: ${user.uid})`);

        chat.podarok = Date.now() + 1800000;

        botinfo.podarok = message.user.uid;

        if (message.isChat) {
          setTimeout(() => {
            message.send({ sticker_id: utils.pick([108219, 108230, 79421, 108246, 62796, 52982, 110710, 110670]), });

            vk.api.messages.send({
              chat_id: podarok,
              random_id: 0,
              message: `@all
            ▶️ Подарок снова доступен для открытия!`,

              keyboard: JSON.stringify({
                inline: true,
                buttons: [
                  [
                    {
                      action: {
                        type: "text",
                        payload: "{}",
                        label: "🎁 Забрать подарок",
                      },
                      color: "default",
                    },
                  ],
                ],
              }),
            });
          }, 1800000);
        }

        let prize = utils.pick([1, 1, 2, 2, 3, 3, 4, 4, 5,6,6]);

        if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && message.user.now.kv8 && message.user.now.kv9 && !message.user.now.kv10){

          message.user.now.kv10 = true;
          message.user.rubli += 50;
          await bot(`⚠️ Вы успешно выполнили последнее задание!
    
    Награда - 50 донат-рублей (их нельзя вывести) 
    
    💡 Спасибо за то что прошли путь новичка!`, {
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              payload: JSON.stringify({ command: `путь новичка` }),
              "label": `👀 Путь новичка`
            },
            "color": "positive"
          }]
        ]
      })
    })
    
        }

        if (prize === 1) {
          let denga = utils.random(1000000, 7000000);

          message.user.balance += denga;

          return message.send(`🎁 @id${message.user.id} (${message.user.tag
            }), вы открыли подарок! С него Вам выпало ${utils.sp(denga)} ${val1} 💰

💡 Узнать свой баланс: «баланс»`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `баланс` }),
          "label": `💰 Баланс`
        },
        "color": "positive"
      }]
    ]
  })
});
        }

        if (prize === 2) {
          let rate = utils.random(1, 50);

          message.user.rating += rate;

          return message.send(`🎁 @id${message.user.id} (${message.user.tag
            }), вы открыли подарок! С него Вам выпало ${utils.sp(rate)} 👑

💡 Узнать свой рейтинг: «рейтинг»`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `рейтинг` }),
          "label": `👑 Рейтинг`
        },
        "color": "positive"
      }]
    ]
  })
});
        }

        if (prize === 3) {
          let bitc = utils.random(100, 1000);

          message.user.btc += bitc;

          return message.send(`🎁 @id${message.user.id} (${message.user.tag
            }), вы открыли подарок! С него Вам выпало ${utils.sp(bitc)} биткоинов 💾

💡 Узнать свои биткоины: «биткоины»`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `биткоины` }),
          "label": `💰 Биткоины`
        },
        "color": "positive"
      }]
    ]
  })
});
        }

        if (prize === 4) {
          let dc = utils.random(1, 3);

          message.user.c3 += dc;

          return message.send(`🎁 @id${message.user.id} (${message.user.tag
            }), вы открыли подарок! С него Вам выпало ${utils.sp(dc)} донат-кейсов 📦

💡 Открыть данные кейсы: «Кейс открыть 3»`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `кейс открыть 3` }),
          "label": `🎁 Открыть донат-кейс`
        },
        "color": "positive"
      }]
    ]
  })
});
        }

        if (prize === 5) {
          let rubl = utils.random(1, 5);

          message.user.rubli += rubl;

          return message.send(`🎁 @id${message.user.id} (${message.user.tag
            }), вы открыли подарок! С него Вам выпало ${utils.sp(
              rubl
            )} донат-рублей! 💸

💡 На рубли можно купить донат, по команде: «донат»`);
        }

if (prize == 6) {
    let rands = utils.random(1, 25);

    message.user.rub += rands;

    return message.send(`🎁 @id${message.user.id} (${message.user.tag
      }), вы открыли подарок! С него Вам выпало ${utils.sp(
        rands
      )} ${val2} 💸`);

  }

      }
    }
  }
);



module.exports = commands;
