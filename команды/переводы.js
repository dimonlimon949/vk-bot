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


const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

const tokensFilePath2 = './настройки/ид бесед.json';

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2();

const chatlogi = tokenData2.reports;

const transferHistoryFilePath = './database/история.json';

function loadTransferHistory() {
    try {
        const data = fs.readFileSync(transferHistoryFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.warn('Не удалось загрузить историю переводов, создаем новый файл.', error.message);
        return {}; // Возвращаем пустой объект, если файл не существует или поврежден
    }
}

function saveTransferHistory(history) {
    try {
        fs.writeFileSync(transferHistoryFilePath, JSON.stringify(history, null, 2), 'utf8');
        console.log('История переводов успешно сохранена.');
    } catch (error) {
        console.error('Ошибка при сохранении истории переводов:', error);
    }
}

// Объект для хранения истории переводов
let transferHistory = loadTransferHistory();

async function getResolve(identifier, vkApi) {
    // Ваш код для получения ID пользователя из имени или ссылки
    try {
        const resolved = await vkApi.utils.resolveScreenName({ screen_name: identifier });
        return { id: resolved.object_id };
    } catch (error) {
        console.error("Ошибка при разрешении screen_name:", error);
        return null; // Или обработайте ошибку другим способом
    }
}

cmd.hear(/^(?:передать|перевести|передай|перидать|пиредать|пиредай|перевод)\s?(.*)?\s(.*)$/i, async (message, bot) => {
    if (message.user.bans.pban)
        return bot(`Вам запрещено передавать деньги другим игрокам! ❌`);

    if (!message.isChat || message.chat.type === 1) {

        let smileng = utils.pick([
            `🌷`,
            `🌸`,
            `🌹`,
            `🌺`,
            `🌼`,
            `💐`,
            `❤️`,
            `💓`,
            `💕`,
        ]);
    
    
        message.args[2] = message.args[2].replace(/([.,])/gi, "");
    
        message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
    
        message.args[2] = message.args[2].replace(/([мm])/gi, "000000");
    
        message.args[2] = message.args[2].replace(
            /(вабанк|вобанк|все|всё)/gi,
            message.user.balance
        );
    
        if (message.user.inf === true)
            return bot(`Выключите безлимитный баланс ${smileng}`);
    
        if (!Number(message.args[2])) return;
    
        message.args[2] = Math.floor(Number(message.args[2]));
    
        if (message.args[2] <= 0) return;
    
        if (message.args[2] > message.user.bank)
            return bot(`Недостаточно средств на балансе банка! ❌
    
    💳 Баланс банка: ${utils.sp(message.user.bank)}$`);
        else if (message.args[2] <= message.user.bank) {
            if (message.user.limit == null)
                message.user.limit = { timer: utils.time(), sent: 0 };
    
            if (utils.time() - message.user.limit.timer >= 10800) {
                message.user.limit.timer = utils.time();
    
                message.user.limit.sent = 0;
    
                message.user.limit.paylimit = message.user.limit.playerlimit;
            }
    
            if (message.args[2] > message.user.limit.paylimit)
                return bot(
                    `Вы указали число, больше Вашего лимита на данный момент!\n✅ Доступно ещё к передаче: ${utils.sp(
                        message.user.limit.paylimit
                    )}$\n🔄 Лимит восстанавливается каждые 3 часа.`
                );
    
            let user = double.find((x) => x.uid === Number(message.args[1]));
    
            if (!user) return bot(`убедитесь в правильности ID игрока`);
            if (user.bans.ban) return bot('🚫 Данный игрок находится в бане.');
            if (user.uid === message.user.uid) return bot(`Неверный ID`);
    
            if (message.user.pay < Date.now()) {
                message.user.pay = Date.now() + 5000;
    
                return bot(`Вы точно хотите перевести игроку @id${user.id} (${user.tag
                    }) ${utils.sp(message.args[2])}$ 💵
    
    ⏳ У Вас есть 5 сек. на повторный ввод команды, чтобы передать средства.`);
            }

            if (user.notifications){
                await vk.api.messages.send({
                    user_id: user.id,
                    message: `🔔 Уведомление:
    👤 Игрок @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid
                        }] перевел Вам ${utils.sp(
                            message.args[2]
                        )} $ (с учётом комиссии пришло ${utils.sp(message.args[2] * 0.95)} $) 💵
    🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения ${smileng}`,
    keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              payload: JSON.stringify({ command: `уведомления выкл` }),
              "label": `🔕`
            },
            "color": "negative"
          },
  ]
        ]
      }),
                    random_id: 0,
                });
        }

    
            if (message.user.pay > Date.now()) {
                await vk.api.messages.send({
                    chat_id: chatlogi,
                    forward_messages: message.id,
                    message: `# LOG-BANK:\n\n👤 Передал: @id${message.user.id} (${message.user.tag
                        })[ID: ${message.user.uid}]\n🤑 Получил: @id${user.id} (${user.tag})[${user.uid
                        }]\n💵 Сумма: ${utils.sp(message.args[2])}$`,
                    random_id: 0,
                });


    
    
                message.user.pay = Date.now() + 1000;
    
                

    
                // Сохраняем информацию о переводе
                if (!transferHistory[message.user.id]) {
                    transferHistory[message.user.id] = [];
                }
    
                transferHistory[message.user.id].push({
                    recipientId: user.id,
                    amount: message.args[2], // Сумма перевода
                    timestamp: Date.now(), // Добавим время перевода
                    currency: '$', // Укажите валюту по умолчанию или определите ее другим способом
                    senderId: message.user.id,
                    resolved: false // Добавляем поле resolved
                });
    
                saveTransferHistory(transferHistory); // Сохраняем историю в файл
    
                message.user.bank -= Math.floor(Number(message.args[2]));
    
                message.user.limit.paylimit -= Math.floor(Number(message.args[2]));
    
                message.user.limit.sent += Math.floor(Number(message.args[2]));
    
                user.bank += Math.floor(Number(message.args[2] * 0.95));
    

                if (typeof message.user.questrussion === "number") {

                    message.user.questrussion++;
              
                    if (message.user.questrussion >= 50) {
              
                      message.user.questrussion = true;
              
                      await bot(`Поздравляем, Вы 50 раз передали игрокам валюту и получаете 📦 5 Starr Drops.`);
              
                      message.user.c4 += 5;
              
                    }
              
                  }


                return bot(
                    `Успешно! Игрок получил Ваши средства. Детальная информация о переводе:\n\n➡️ Переведено ${utils.sp(
                        message.args[2]
                    )}$\n➖ С учётом коммисии пришло ${utils.sp(
                        message.args[2] * 0.95
                    )}$\n👤 Получатель: ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`
                    }\n▶️ Оставшийся лимит: ${utils.sp(
                        message.user.limit.paylimit
                    )}$\n${smileng}`, {
                        keyboard: JSON.stringify({
                          "inline": true,
                          "buttons": [
                            [{
                              "action": {
                                "type": "text",
                                payload: JSON.stringify({ command: `заскамили` }),
                                "label": `Меня обманули`
                              },
                              "color": "negative"
                            },
            ]
                          ]
                        })
                      }
                );
            }
    
            await bot(
                `вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$ ${smileng}`
            );


            

    
    }
}
    
         

    if (message.chat.type === 2) {

        let userId = 0;
        if ((message.replyMessage || message.forwards[0]) && !message.args[1]) {
            userId = message.replyMessage.senderId || message.forwards[0].senderId;
        } else if (!(message.replyMessage || message.forwards[0]) && message.args[1]) {
            userId = (await getResolve(message.args[1], vk.api)).id;
        }

        let user = double.find(x => x.id === userId || x.uid == Number(message.args[1]));

        if (!user) return bot('🚫 Этот игрок не играет в бота.');


        if (!message.args[2]) return bot('💬 Укажите сумму, которую хотите отправить.');

        message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
        message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
        message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
        message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

        if (!Number(message.args[2])) return bot('🚫 Укажите сумму, которую хотите отправить.');
        message.args[2] = Math.floor(Number(message.args[2]));

        if (message.args[2] <= 0) return bot('🚫 Укажите сумму, которую хотите отправить.');
        if (message.args[2] > message.user.balance2) return bot('🚫 У вас недостаточно коинов.');
        else if (message.args[1] !== 'найдено') {
            if (user.id === message.user.id) return bot('🚫 Нельзя перевести самому себе.');

            const recipientId = user.id; // ID получателя

            // Сохраняем информацию о переводе
            if (!transferHistory[message.user.id]) {
                transferHistory[message.user.id] = [];
            }

            transferHistory[message.user.id].push({
                recipientId: recipientId,
                amount: message.args[2], // Сумма перевода
                timestamp: Date.now(), // Добавим время перевода
                currency: 'GB', // Укажите валюту по умолчанию или определите ее другим способом
                senderId: message.user.id,
                resolved: false // Добавляем поле resolved
            });

            saveTransferHistory(transferHistory); // Сохраняем историю в файл

            message.user.balance2 -= message.args[2];
            user.balance2 += message.args[2];

            await bot('вы зашли в мобильный банк, создаём транзакцию..');

            if (user.bans.ban) return bot('🚫 Данный игрок находится в бане.');

            if (typeof message.user.questrussion === "number") {

                message.user.questrussion++;
          
                if (message.user.questrussion >= 50) {
          
                  message.user.questrussion = true;
          
                  await bot(`Поздравляем, Вы 50 раз передали игрокам валюту и получаете 📦 5 Starr Drops.`);
          
                  message.user.c4 += 5;
          
                }
          
              }



        if (user.notifications){
            await vk.api.messages.send({
                user_id: user.id,
                message: `📢 [id${user.id}|${user.tag}], новый перевод!
Игрок [id${message.user.id}|${message.user.tag}] отправил Вам ${utils.sp(message.args[2])} ${val4}

🔕 Нажмите кнопку ниже, если не хотите получать подобные сообщения`,

    keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `уведомления выкл` }),
            "label": `🔕`
          },
          "color": "negative"
        },
]
      ]
    }),
                random_id: 0,
            });
    }

            setTimeout(async () => {
                await bot(`вы перевели [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} ${val4} 💳`, {
                    keyboard: JSON.stringify({
                      "inline": true,
                      "buttons": [
                        [{
                          "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `заскамили` }),
                            "label": `Меня обманули`
                          },
                          "color": "negative" // Красный цвет для кнопки
                        },
        ]
                      ]
                    })
                  });
            }, 1000);



        }
    }


});



cmd.hear(/^уведомления\s(выкл|вкл)$/i, async (message, bot) => {
    if (!message.isChat) {
        if (message.args[1].toLowerCase() === "выкл") {
            if (message.user.notifications !== false) {
                message.user.notifications = false;
                return bot(`уведомления отключены! 🔕`, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": JSON.stringify({
                                        command: `уведомления вкл`
                                    }),
                                    "label": `🔔`
                                },
                                "color": "positive"
                            }]
                        ]
                    }),
                });
            } else {
                return bot(`Уведомления уже отключены! 🔕`, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": JSON.stringify({
                                        command: `уведомления вкл`
                                    }),
                                    "label": `🔔`
                                },
                                "color": "positive"
                            }]
                        ]
                    }),
                });
            }
        }

        if (message.args[1].toLowerCase() === "вкл") {
            if (message.user.notifications !== true) {
                message.user.notifications = true;
                return bot(`уведомления включены! 🔔`, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": JSON.stringify({
                                        command: `уведомления выкл`
                                    }),
                                    "label": `🔕`
                                },
                                "color": "negative"
                            }]
                        ]
                    }),
                });
            } else {
                return bot(`Уведомления уже включены! 🔔`, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": JSON.stringify({
                                        command: `уведомления выкл`
                                    }),
                                    "label": `🔕`
                                },
                                "color": "negative"
                            }]
                        ]
                    }),
                });
            }
        }
    }
});
// Объект для хранения истории переводов


cmd.hear(/^(?:заскамили)$/i, async (message, bot) => {
    const userId = message.user.id;

    if (!transferHistory[userId] || transferHistory[userId].length === 0) {
        return bot("Вы еще не совершали переводов, чтобы кого-то заскамливать!");
    }

    const lastTransferIndex = transferHistory[userId].length - 1;
    const lastTransfer = transferHistory[userId][lastTransferIndex];

    if (!lastTransfer) {
        return bot("Нечего скамливать. История переводов пуста.");
    }

    if (lastTransfer.resolved) {
        return bot("Эта заявка уже была рассмотрена.");
    }

    saveTransferHistory(transferHistory);

    const recipientId = lastTransfer.recipientId;
    const senderId = lastTransfer.senderId; // Получаем ID отправителя
    let recipient = double.find(x => x.id === recipientId);
    let sender = double.find(x => x.id === senderId); //Ищем Заявителя

    if (!recipient) {
        return bot("Не удалось найти получателя перевода.");
    }
    if (!sender) {
        return bot("Не удалось найти отправителя перевода.");
    }

    const amount = lastTransfer.amount;
    const currency = lastTransfer.currency; // Получаем валюту

    try {
        await vk.api.messages.send({
            chat_id: chatlogi,
            random_id: 0,
            message: `⚠️ НОВАЯ ЗАЯВКА НА ОБМАН ⚠️\n\n👤 Заявитель: @id${sender.id} (${sender.tag})\n🤑 Обвиняемый: @id${recipientId} (${recipient.tag})\n💵 Сумма: ${utils.sp(amount)} ${currency || ''}\n\nВыберите действие:`,
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            // Добавляем amount и currency в payload
                            payload: JSON.stringify({ command: `банц час ${recipient.uid} обман игрока ${amount} ${currency} ${senderId}` }),
                            label: "Заблокировать"
                        },
                        "color": "negative"
                    }],
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `асмс ${sender.uid} ваша заявка на обман отклонена.` }),
                            label: "Отклонить"
                        },
                        "color": "secondary"
                    }]
                ]
            })
        });

        await bot("Ваша заявка на обман отправлена на рассмотрение администрации.");
    } catch (error) {
        console.error("Ошибка при отправке заявки в чат логов:", error);
        return bot("Произошла ошибка при отправки заявки. Попробуйте позже.");
    }
});





module.exports = commands;