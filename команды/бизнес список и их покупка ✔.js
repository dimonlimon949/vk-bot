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
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData = getToken();

const chatlogi = tokenData.chatlogi;
const spoler = tokenData.spoler;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

const businesses = require("../spisok/business spisok.js")
const businesses2 = require("../spisok/бизнесы.js")

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


// Функция для получения эмодзи номера
function getNumberEmoji(number) {
    if (number >= 1 && number <= 9) {
        const circleNumbers = [
            "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"
        ];
        return circleNumbers[number - 1];
    }
    else if (number >= 10 && number <= 20) {
        const circleNumbers = [
            "1️⃣0️⃣", "1️⃣1️⃣", "1️⃣2️⃣", "1️⃣3️⃣", "1️⃣4️⃣", "1️⃣5️⃣", "1️⃣6️⃣", "1️⃣7️⃣", "1️⃣8️⃣", "1️⃣9️⃣", "2️⃣0️⃣"
        ];
        return circleNumbers[number - 10];
    }
    else if (number >= 21 && number <= 30) {
        const circleNumbers = [
            "2️⃣1️⃣", "2️⃣2️⃣", "2️⃣3️⃣", "2️⃣4️⃣", "2️⃣5️⃣", "2️⃣6️⃣", "2️⃣7️⃣", "2️⃣8️⃣", "2️⃣9️⃣", "3️⃣0️⃣"
        ];
        return circleNumbers[number - 21]
    }
    else {
        return number.toString();
    }
}

// Показать список бизнесов (приватный чат)
async function showBusinessListPrivate(message, bot) {
    let businessList = `🏢 Доступные бизнесы: 🏢 ✨\n\n`;
    for (let i = 0; i < businesses2.length && i < 13; i++) {
        const business = businesses2[i][0];
        const numberEmoji = getNumberEmoji(i + 1);
        let totalEarn = parseInt(business.earn);
        
        // Проверяем наличие скидки
        const hasDiscount = business.sell > 0;
        const currentPrice = hasDiscount ? business.cost2 : business.cost;
        
        for (let j = 1; j < businesses2[i].length; j++) {
            const upgrade = businesses2[i][j];
            totalEarn += parseInt(upgrade.earn)
        }
        
        businessList += `${numberEmoji} ${business.icon} ${business.name}\n`;
        businessList += `   💵 Цена: ${utils.sp(currentPrice)} ${val1}`;
        
        if (hasDiscount) {
            businessList += ` 🔥 Скидка ${business.sell}%`;
        }
        
        businessList += `\n   💰 Прибыль: ${utils.sp(business.earn)} ${val1}/час\n\n`;
    }

    businessList += `📝 Для покупки введите «Бизнесы [номер бизнеса]»`;
    return bot(businessList);
}

// Обработка покупки бизнеса (приватный чат)
async function processBusinessPurchasePrivate(message, bot, businessIndex) {
    if (message.user.inf === true) return bot(`🚫 Выключите безлимитный баланс`);

    if (message.user.settings.busi === true) {
        if (message.user.business2.length >= 2)
            return bot(`🚫 Максимум можно иметь 2 бизнеса`);
    } else {
        if (message.user.business2.length >= 1)
            return bot(`🚫 Максимум можно иметь 1 бизнес`);
    }

    const businessGroup = businesses2[businessIndex];
    if (!businessGroup || !Array.isArray(businessGroup) || businessGroup.length === 0) {
        console.error("Ошибка: неверный индекс бизнеса");
        return bot("⚠️ Произошла ошибка при получении информации о бизнесе.");
    }

    const business = businessGroup[0];
    const priceToPay = business.sell > 0 ? business.cost2 : business.cost;

    if (message.user.balance < priceToPay) {
        return bot(
            `🚫 У Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                message.user.balance
            )} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
        );
    }

    message.user.balance -= priceToPay;
    message.user.business2.push({
        id: businessIndex + 1,
        upgrade: 1,
        workers: 1,
        moneys: 0,
    });

    let purchaseMessage = `🎉 Вы купили «${business.name}» за ${utils.sp(priceToPay)} ${val1} 🚀`;
    if (business.sell > 0) {
        purchaseMessage += ` (скидка ${business.sell}%, экономия ${utils.sp(business.cost - priceToPay)} ${val1})`;
    }

    // Проверка выполнения задания
    if (message.user.now.kv1 && message.user.now.kv2 && !message.user.now.kv3) {
        message.user.now.kv3 = true;
        message.user.bank += 50000000;
        const taskCompleteMessage = `✅ Ты успешно выполнил 3 задание! Покупка бизнеса награда - 50.000.000 ${val1} на свой банковский счет\n\n💡 Регулярно проверяй бизнесы и забирай прибыль!`;
        await bot(taskCompleteMessage, {
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
        });
    }

    return bot(purchaseMessage);
}

// Показать список бизнесов (групповой чат)
async function showBusinessListGroup(message, bot) {
    let businessList = `🏢 Доступные бизнесы: 🏢 ✨\n\n`;
    for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i][0];
        const numberEmoji = getNumberEmoji(i + 1);
        let totalEarn = parseInt(business.earn);
        
        // Проверяем наличие скидки
        const hasDiscount = business.sell > 0;
        const currentPrice = hasDiscount ? business.cost2 : business.cost;
        
        for (let j = 1; j < businesses[i].length; j++) {
            const upgrade = businesses[i][j];
            totalEarn += parseInt(upgrade.earn)
        }
        
        businessList += `⭐ ${numberEmoji} ${business.icon} ${business.name} (ID: ${business.id})\n`;
        businessList += `   💵 Цена: ${utils.sp(currentPrice)} ${val4}`;
        
        if (hasDiscount) {
            businessList += ` 🔥 Скидка ${business.sell}%`;
        }
        
        businessList += `\n   💰 Прибыль: ${utils.sp(business.earn)} ${val4}/час\n\n`;
    }
    
    businessList += `📝 Выберите бизнес для покупки:`;
    
    // Создаем кнопки для каждого бизнеса
    const buttons = [];
    const maxButtonsPerRow = 3;
    
    for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i][0];
        const button = {
            "action": {
                "type": "text",
                "payload": JSON.stringify({ command: `бизнесы ${i+1}` }),
                "label": `${i+1} ${business.icon}`
            },
            "color": "primary"
        };
        
        if (i % maxButtonsPerRow === 0) {
            buttons.push([button]);
        } else {
            buttons[buttons.length - 1].push(button);
        }
    }
    
    return bot(businessList, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": buttons
        })
    });
}
// Обработка покупки бизнеса (групповой чат)
async function processBusinessPurchaseGroup(message, bot, businessIndex) {
    if (!message.user.settings) {
        message.user.settings = {};
    }

    if (message.user.settings.busi === true) {
        if (message.user.business.length >= 2)
            return bot(`🚫 Максимум можно иметь 2 бизнеса`);
    } else {
        if (message.user.business.length >= 1)
            return bot(`🚫 Максимум можно иметь 1 бизнес`);
    }

    const businessGroup = businesses[businessIndex];
    if (!businessGroup || !Array.isArray(businessGroup) || businessGroup.length === 0) {
        return bot("🚫 Неверный номер бизнеса.");
    }

    const business = businessGroup[0];
    const priceToPay = business.sell > 0 ? business.cost2 : business.cost;

    if (message.user.balance2 < priceToPay) {
        return bot(
            `🚫 У вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                message.user.balance2
            )} ${val4}\n💳 Требуется: ${utils.sp(priceToPay)} ${val4}`
        );
    }

    message.user.balance2 -= priceToPay;
    message.user.business.push({
        id: businessIndex + 1,
        upgrade: 1,
        workers: 1,
        moneys: 0,
    });

    let purchaseMessage = `🎉 Вы купили «${business.name}» за ${utils.sp(priceToPay)} ${val4} 🚀`;
    if (business.sell > 0) {
        purchaseMessage += ` (скидка ${business.sell}%, экономия ${utils.sp(business.cost - priceToPay)} ${val4})`;
    }

    // Проверка выполнения квеста
    if (message.user.questbrak == false) {
        message.user.questbrak = true;
        message.user.rating += 200;
        await bot(`Поздравляем, Вы купили бизнес на ${val4} и получаете 📦 200 рейтинга.`);
    }

    // Проверка выполнения задания
    if (message.user.now.kv1 && message.user.now.kv2 && !message.user.now.kv3) {
        message.user.balance2 += 25000;
        message.user.now.kv3 = true;
        const taskCompleteMessage = `✅ Ты успешно выполнил 3 задание! Покупка бизнеса награда - 25.000 ${val4}\n\n💡 Регулярно проверяй бизнесы и забирай прибыль!`;
        await bot(taskCompleteMessage, {
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
        });
    }

    return bot(purchaseMessage);
}

// Основная команда для работы с бизнесами
cmd.hear(/^(?:бизнесы|💼 Бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
  try {
    let response = null;
    if (!message.isChat || message.chat.type === 1) {
      if (!message.args[1]) {
        response = await showBusinessListPrivate(message, bot);
      } else {
        const businessIndex = Number(message.args[1]) - 1;
        if (isNaN(businessIndex)) {
            return bot("🚫 Неверный номер бизнеса (не число).");
        }
        if (businessIndex < 0 || businessIndex >= businesses2.length) {
            return bot("🚫 Неверный номер бизнеса (вне диапазона).");
        }
        response = await processBusinessPurchasePrivate(message, bot, businessIndex);
      }
    } else if (message.chat.type === 2) {
      if (!message.args[1]) {
        response = await showBusinessListGroup(message, bot);
      } else {
        const businessIndex = Number(message.args[1]) - 1;
        if (isNaN(businessIndex)) {
            return bot("🚫 Неверный номер бизнеса (не число).");
        }
        if (businessIndex < 0 || businessIndex >= businesses.length) {
            return bot("🚫 Неверный номер бизнеса (вне диапазона).");
        }
        response = await processBusinessPurchaseGroup(message, bot, businessIndex);
      }
    }
    return response;
  } catch (error) {
    console.error("Ошибка в команде /бизнесы:", error);
    const errorText = "⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.";
    await bot(errorText);
    return errorText;
  }
});

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

module.exports = commands;