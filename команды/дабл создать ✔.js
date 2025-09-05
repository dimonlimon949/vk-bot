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

cmd.hear(/^(?:Дабл создать)$/i, async (message, bot) => {

 if(message.chat.type == 2) return message.send(`Ошибка чат итак DOUBLE.`)

     if (message.user.settings.adm >= 6) {
        message.chat.type = 2
       return message.send('Обновляю...',
            {
                keyboard: JSON.stringify(
                    {
                        "one_time": false, "buttons": [
                            [
                                { "action": { "type": "text", "payload": "{}", "label": "Банк" }, "color": "positive" },
                                { "action": { "type": "text", "payload": "{}", "label": "Баланс" }, "color": "positive" }
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



    if (message.user.balance2 < 100000) return bot(`Недостаточно средств! Нужно 1ОО.ООО ${val4}.`)
    message.user.balance2 -= 100000
    message.chat.type = 2


  return  message.send('Обновляю...',
        {
            keyboard: JSON.stringify(
                {
                    "one_time": false, "buttons": [
                        [
                            { "action": { "type": "text", "payload": "{}", "label": "Банк" }, "color": "positive" },
                            { "action": { "type": "text", "payload": "{}", "label": "Баланс" }, "color": "positive" }
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

    return bot(`⚡ Чат был переведён в режим дабла! 🚀`)

})

cmd.hear(/^(?:Дабл стандарт)$/i, async (message, bot) => {

    // Проверяем, является ли пользователь администратором или выше
    const isAdmin = await checkAdmin(message.peerId, message.senderId);

    if (!isAdmin) {
        return message.send("⚠️ У вас недостаточно прав для выполнения этой команды.");
    }

    message.chat.type = 1

    return bot(`⚡ Чат был переведён в режим стандарт! 🚀`)

})

// Функция для проверки, является ли пользователь администратором или выше
async function checkAdmin(peerId, userId) {
  try {
    const chatMembers = await vk.api.messages.getConversationMembers({
      peer_id: peerId,
    });

    const member = chatMembers.items.find((item) => item.member_id === userId);

    if (!member) {
      return false; // Пользователь не найден в чате.
    }
    
    //Проверяем, является ли пользователь владельцем чата
    if(chatMembers.owner_id === userId){
      return true;
    }

    // Проверяем, является ли пользователь администратором или выше
    return member.is_admin === true;

  } catch (error) {
    console.error("Ошибка при проверке прав администратора:", error);
    return false; // В случае ошибки считаем, что прав нет.
  }
}


setInterval(() => {
    tokensCache = getToken3(); 
    if (tokensCache) {
        val1 = tokensCache.val1; 
        val2 = tokensCache.val2; 
        val3 = tokensCache.val3; 
        val4 = tokensCache.val4; 
    }
  }, 1000);

module.exports = commands;
