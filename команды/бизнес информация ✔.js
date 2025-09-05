let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

// Переменная double больше не используется, удалил ее
// let double = require('../database/users.json')

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

let chatlogi = tokenData?.chatlogi; // чат для логов
let spoler = tokenData?.spoler;

const {VK} = require('vk-io');
const vk = require('../vk-api.js'); 

let fink = true;

const businesses = require('../spisok/business spisok.js');
const businesses2 = require("../spisok/бизнесы.js");


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

let tokenData3 = getToken3();

let val1 = tokenData3?.val1 || 'руб.'; // Валюта по умолчанию
let val2 = tokenData3?.val2 || '$'; // Валюта по умолчанию
let val3 = tokenData3?.val3 || '€'; // Валюта по умолчанию
let val4 = tokenData3?.val4 || 'голдов'; // Валюта по умолчанию
let val5 = tokenData3?.val5 || 'коинов'; // Валюта по умолчанию


cmd.hear(/^(?:бизнес|биз|🏢 Бизнес)$/i, async (message, bot) => {

    let helpText;
    let keyboardButtons = [];

    if (message.user.settings.busi === true) {

        helpText = `🏢 Управление бизнесом 🏢

        🔥 Бизнес 1/2 -  Показывает текущую активность бизнеса.
        📈 Бизнес улучшить 1/2 -  Улучшите свой бизнес для увеличения прибыли.
    
        Управляйте своим бизнесом эффективно!`;

        keyboardButtons = [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес 1` }),
                    "label": `🔥 Бизнес 1`
                },
                "color": "primary"
            },
            {
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес 2` }),
                    "label": `🔥 Бизнес 2`
                },
                "color": "primary"
            }],
             [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес улучшить 1` }),
                    "label": `📈 Улучшить Бизнес 1`
                },
                "color": "default"
            },
            {
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес улучшить 2` }),
                    "label": `📈 Улучшить Бизнес 2`
                },
                "color": "default"
            }]
        ];

    } else {

        helpText = `🏢 Управление бизнесом 🏢

        🔥 Бизнес 1 -  Показывает текущую активность бизнеса.
        📈 Бизнес улучшить 1 -  Улучшите свой бизнес для увеличения прибыли.

        Управляйте своим бизнесом эффективно!`;

        keyboardButtons = [
            [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес 1` }),
                    "label": `🔥 Бизнес 1`
                },
                "color": "primary"
            }],
             [{
                "action": {
                    "type": "text",
                    payload: JSON.stringify({ command: `бизнес улучшить 1` }),
                    "label": `📈 Улучшить Бизнес 1`
                },
                "color": "default"
            }]
        ];
    }

    const keyboard = JSON.stringify({
        "inline": true,
        "buttons": keyboardButtons
    });

    try {
        await message.send(`${message.user.mention ? `@id${message.user.id2} (${message.user.tag})` : `${message.user.tag}`}, ${helpText}`, { keyboard: keyboard });
    } catch (error) {
        console.error("Ошибка в команде /бизнес (помощь):", error);
        await bot("⚠️ Ошибка при отображении помощи по бизнесу.");
    }

});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
    try {
        let businessType;
        let businessArray;
        let businessesData;
        let currency;

        if (!message.isChat || message.chat.type === 1) {
            businessType = 2;
            businessArray = message.user.business2;
            businessesData = businesses2;
            currency = val1;
        } else if (message.isChat || message.chat.type === 2) {
            businessType = 1;
            businessArray = message.user.business;
            businessesData = businesses;
            currency = val4;
        }
        else {
            return bot("⚠️ Данная команда не доступна");
        }

        if (!message.user.settings) {
            message.user.settings = {};
        }

        let businessIndex = Math.floor(Number(message.args[1]));
        let maxBusinesses = message.user.settings.busi === true ? 2 : 1;

        if (businessIndex < 1 || businessIndex > maxBusinesses) {
            return bot(`🚫 Используйте: Бизнес [от 1 до ${maxBusinesses}].`);
        }

        if (!businessArray || businessArray.length < businessIndex) {
            return bot(`🚫 У вас нет этого бизнеса.`);
        }

        businessIndex--;


        const bizData = businessArray[businessIndex];
        const biz = businessesData[bizData.id - 1][bizData.upgrade - 1];

        let text = '';
        if (!fink) {
            text += `❗ Внимание! Прибыль в бизнес сейчас не поступает. Ведутся тех.работы.\n`;
        }

        const currentProfit = Math.floor(biz.earn / biz.workers * bizData.workers);
        const availableUpgrade = businessesData[bizData.id - 1][bizData.upgrade];

        let businessStats = `🏢 Статистика бизнеса «${biz.name}» 🏢\n\n`;
        businessStats += `💰 Прибыль: ${utils.sp(currentProfit)} ${currency} /ч\n`;
        businessStats += `👷‍♂️ Рабочих: ${utils.sp(bizData.workers)}/${utils.sp(biz.workers)}\n`;
        businessStats += `💵 На балансе бизнеса: ${utils.sp(bizData.moneys)} ${currency}\n\n`;
        businessStats += text + "\n";

        let keyboardButtons = [];

        if (availableUpgrade != null) {
            businessStats += `✨ Доступно улучшение бизнеса!\n💰 Цена: ${utils.sp(availableUpgrade.cost)} ${currency}`;
            keyboardButtons.push([
                {
                    action: {
                        type: "text",
                        payload: JSON.stringify({command: `бизнес улучшить ${businessIndex + 1}`}),
                        label: `✨ Улучшить (${utils.sp(availableUpgrade.cost)} ${currency})`,
                    },
                    color: "positive",
                },
            ]);
        } else {
            businessStats += `🏆 Бизнес улучшен до максимума!`;
        }

        // Добавляем кнопку найма только если есть кого нанимать
        if (biz.workers - bizData.workers > 0) {
          keyboardButtons.push([
            {
                action: {
                    type: "text",
                    payload: {
                        command: `Бизнес нанять ${businessIndex + 1} ${biz.workers - bizData.workers}`
                    },
                    "label": `+👷‍♂ ${biz.workers - bizData.workers}`
                },
                color: "primary",
            },
          ]);
        }


        keyboardButtons.push([
            {
                action: {
                    type: "text",
                    payload: JSON.stringify({command: `бизнес снять ${businessIndex + 1} все`}),
                    label: "💰 Снять деньги",
                },
                color: "primary",
            }
        ]);



        try {
            return bot(businessStats, {
                attachment: utils.pick([`${biz.photo}`]),
                keyboard: JSON.stringify({
                    inline: true,
                    buttons: keyboardButtons,
                }),
            });
        } catch (error) {
            console.error("Ошибка в команде /бизнес (статистика):", error);
            await bot("⚠️ Ошибка при отображении статистики бизнеса.");
        }


    } catch (error) {
        console.error("Ошибка в команде /бизнес:", error);
        await bot("⚠️ Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.");
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
        val5 = tokensCache.val5
    }
}, 1000);

module.exports = commands;