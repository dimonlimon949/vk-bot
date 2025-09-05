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

cmd.hear(/^(?:баланс|💰 Баланс|бал|money|my balance)$/i, async (message, bot) => {
      if (message.user.astats.tema === 2) {
        try {
            if (!message.isChat || message.chat.type == 1) {
                let text = "💰 ТВОЙ ЖАЛКИЙ БАЛАНС, НИЩЕБРОД:\n\n";
        
                if (message.user.balance2 > 0) {
                    text += `💸 ${utils.sp(message.user.balance2)} ${val4} (мелочь по карманам звенит)\n`;
                } else {
                    text += `💸 0 ${val4} (вообще пиздец как беден)\n`;
                }
        
                if (message.user.inf) {
                    text += "💵 Наличными: ∞ (ну ты и жирный кот, блядь)\n";
                } else {
                    text += `💵 Наличными: ${utils.sp(message.user.balance)} ${val1} (хватит только на пачку дошика)\n`;
                }
        
                if (message.user.btc > 0) {
                    text += `💽 Биткоинов: ${utils.sp(message.user.btc)} ฿ (неплохо для дебила)\n`;
                } else {
                    text += `💽 Биткоинов: 0 ฿ (где твой биток, лузер?)\n`;
                }
        
                message.send({ sticker_id: 110670 }); // Стикер "деньги-говно"
                return bot(text, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": "{}",
                                    "label": `💎 ресурсы`
                                },
                                "color": "default"
                            }]
                        ]
                    })
                });
            }
        
            if ([2, 3].includes(message.chat.type)) {
                let text = `ТВОЙ ДОХУЯЩИРСКИЙ БАЛАНС: ${utils.sp(message.user.balance2)} ${val4} 💸 (всё равно нихуя)\n`;
                return bot(text);
            }
        } catch (error) {
            console.error("БЛЯТЬ, ОШИБКА В БАЛАНСЕ:", error);
            await bot("Чёт хуйня какая-то с балансом, иди нахуй и попробуй позже, криворук!"); 
        }

      }
      if (message.user.astats.tema === 1) {
    try {
        if (!message.isChat || message.chat.type == 1) {
            let text = "баланс:\n\n";

            if (message.user.balance2 > 0) {
                text += `💸 ${utils.sp(message.user.balance2)} ${val4}\n`;
            }

            if (message.user.inf) {
                text += "💵 Наличными: ∞ \n";
            } else {
                text += `💵 Наличными: ${utils.sp(message.user.balance)} ${val1}\n`;
            }

            if (message.user.btc > 0) {
                text += `💽 Биткоинов: ${utils.sp(message.user.btc)} ฿\n`;
            }

            message.send({ sticker_id: 110670 });
            return bot(text, {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                "payload": "{}",
                                "label": `💎 ресурсы`
                            },
                            "color": "default"
                        }]
                    ]
                })
            });
        }

if ([2].includes(message.chat.type)) {
    const balance = message.user.reshim == 1 ? message.user.balance2 : message.user.balance;
    const currency = message.user.reshim == 1 ? val4 : val1;
    
    let text = `ваш баланс: ${utils.sp(balance)} ${currency} 💸 \n`;
    return bot(text);
}
    } catch (error) {
        console.error("Ошибка в команде /баланс:", error);
        await bot("Произошла ошибка при получении баланса. Пожалуйста, попробуйте позже."); 
    }
}
});

async function sendMessageWithSticker(bot, message, text, stickerId, keyboard = null) {
    message.send({ sticker_id: stickerId });
    await bot(text, keyboard ? { keyboard: JSON.stringify(keyboard) } : undefined);
}


cmd.hear(/^(?:ресурсы|💎 ресурсы)$/i, async (message, bot) => {
    if (message.user.astats.tema === 2) {
        try {
            if (!message.isChat || message.chat.type == 1) {
                let text = "💢 ТВОИ ЖАЛКИЕ РЕСУРСЫ, ШМОТЬЕ:";
                let hasResources = false;
        
                const resources = {
                    zhelezo: { name: "ржавого железа", emoji: "🦾" }, 
                    zoloto: { name: "фальшивого золота", emoji: "💩" },
                    almaz: { name: "мутных алмазов", emoji: "🔮" },
                    materia: { name: "грязной материи", emoji: "☠️" },
                    obsidian: { name: "хуёвианового обсидиана", emoji: "🗿" },
                    plazma: { name: "спермы плазмы", emoji: "💦" },
                };
        
                for (const key in resources) {
                    if (message.user.ruds && message.user.ruds[key]) {
                        text += `\n${resources[key].emoji} ${message.user.ruds[key]} ${resources[key].name}`;
                        hasResources = true;
                    }
                }
        
                if (hasResources) {
                    await sendMessageWithSticker(bot, message, text, 52995); // стикер "ты лох"
                } else {
                    const noResourcesText = "У ТЕБЯ ПУСТО, КАК В ТВОЕЙ ГОЛОВЕ, ДЕБИЛ! ❌\n⛏ ИДИ В ШАХТУ, МУДАК, МОЖЕТ ЧТО-ТО НАКОПАЕШЬ!";
                    const keyboard = {
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    "payload": "{}",
                                    "label": `⛏ Шахта`
                                },
                                "color": "default"
                            }]
                        ]
                    };
                    await sendMessageWithSticker(bot, message, noResourcesText, 52980, keyboard); // стикер "пусто"
                }
            }
        } catch (error) {
            console.error("ЁБАНЫЙ В РОТ, ОШИБКА В РЕСУРСАХ:", error);
            await bot("БЛЯТЬ, ЧТО-ТО ПОШЛО НЕ ТАК! ИДИ НАХУЙ И ПОПРОБУЙ ПОЗЖЕ, КРИВОРУКИЙ УЁБИЩЕ!"); 
        }
    }
    if (message.user.astats.tema === 1) {
    try {
        if (!message.isChat || message.chat.type == 1) {
            let text = "ресурсы:";
            let hasResources = false;

            const resources = {
                zhelezo: { name: "железа", emoji: "🎛" },
                zoloto: { name: "золота", emoji: "🏵" },
                almaz: { name: "алмаза", emoji: "💎" },
                materia: { name: "материи", emoji: "🌌" },
                obsidian: { name: "обсидиана", emoji: "🌌" },
                plazma: { name: "плазмы", emoji: "🌌" },
            };

            for (const key in resources) {
                if (message.user.ruds && message.user.ruds[key]) {
                    text += `\n${resources[key].emoji} ${message.user.ruds[key]} ${resources[key].name}`;
                    hasResources = true;
                }
            }

            if (hasResources) {
                await sendMessageWithSticker(bot, message, text, 52995);
            } else {
                const noResourcesText = "У вас нет никаких ресурсов ❌\n💪 Добыть их можно в шахте!";
                const keyboard = {
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                "payload": "{}",
                                "label": `⛏ Шахта`
                            },
                            "color": "default"
                        }]
                    ]
                };
                await sendMessageWithSticker(bot, message, noResourcesText, 52980, keyboard);
            }
        }
    } catch (error) {
        console.error("Ошибка в команде /ресурсы:", error);
        await bot("Произошла ошибка при получении ресурсов. Пожалуйста, попробуйте позже."); // Сообщение пользователю об ошибке
    }
}
});
 



module.exports = commands;
