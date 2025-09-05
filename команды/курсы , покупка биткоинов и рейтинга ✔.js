let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

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
        chatlogi: chatlogi
    };

    try {
        fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
        console.log('Токены успешно сохранены.');
    } catch (error) {
        console.error('Ошибка при сохранении токенов:', error);
    }
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

const tokenData = getToken();

const chatlogi = tokenData.chatlogi;
const spoler = tokenData.spoler;
const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js');

let btc = 'N/A';
let dog = 'N/A';
let btcAdvice = "Не удалось получить данные по BTC.";
let dogAdvice = "Не удалось получить данные по DOGE.";

let previousBtc = null;
let previousDog = null;

function unixStampLefta(stampa) {
  stampa = stampa / 1000;
  let s = stampa % 60;
  stampa = (stampa - s) / 60;
  let m = stampa % 60;
  let text = ``;
  if (m > 0) text += addZero(Math.floor(m)) + " мин. ";
  if (s > 0) text += addZero(Math.floor(s)) + " сек.";
  return text;
}

function addZero(i) {
  return i < 10 ? "0" + i : i;
}

let kursrudtime = Date.now() + 301000;

let btcPriceHistory = [];
const btcHistoryMaxLength = 24;

function formatNumber(number) {
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

function formatDog(number) {
    return number.toFixed(3);
}

async function getCoinGeckoPrice(ids) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        if (!response.ok) {
            throw new Error(``)
        }
        return await response.json();
    } catch (error) {
        console.log("Ошибка при запросе к CoinGecko:", error);
        return null;
    }
}

const cursFilePath = './курс/curs.json';

function getCursData() {
    try {
        const data = JSON.parse(fs.readFileSync(cursFilePath, 'utf8'));
        return data;
    } catch (error) {
        console.error('Ошибка при чтении файла curs.json:', error);
        return {
            btc: 'N/A',
            dog: 'N/A',
            btcAdvice: "Не удалось получить данные по BTC.",
            dogAdvice: "Не удалось получить данные по DOGE."
        };
    }
}

function saveCursData(data) {
    try {
        const saveData = {
            btc: typeof data.btc === 'string' ? parseFloat(data.btc.replace(/,/g, '')) : data.btc,
            dog: typeof data.dog === 'string' ? parseFloat(data.dog) : data.dog,
            btcAdvice: data.btcAdvice,
            dogAdvice: data.dogAdvice
        };

        fs.writeFileSync(cursFilePath, JSON.stringify(saveData, null, 2), 'utf8');
        console.log('Данные о курсах успешно сохранены в curs.json.');
    } catch (error) {
        console.error('Ошибка при сохранении данных в curs.json:', error);
    }
}

let cursData = getCursData();
btc = cursData.btc;
dog = cursData.dog;
btcAdvice = cursData.btcAdvice;
dogAdvice = cursData.dogAdvice;

async function updatePrice(coin, setter, formatter, previous, coinName, adviceSetter) {
    const data = await getCoinGeckoPrice(coin);
    if (data && data[coin] && data[coin].usd) {
        const newPrice = data[coin].usd;
        const formattedPrice = formatter(newPrice);
        setter(formattedPrice);

        let changeMessage = '';
        let advice = '';
        let difference = 0;

        if (previous !== null) {
            difference = newPrice - previous;

            if (Math.abs(difference) >= 0.0005) {
                if (difference > 0) {
                    changeMessage = `+${formatter(difference)} (Подорожал)`;
                    advice = `${coinName} подорожал!`;
                } else if (difference < 0) {
                    changeMessage = `${formatter(difference)} (Подешевел)`;
                    advice = `${coinName} подешевел!`;
                }
            } else {
                changeMessage = "Цена не изменилась";
                advice = `${coinName} стабилен.`;
            }
        } else {
            advice = `Нет данных об изменении цены на ${coinName}.`;
        }

        if (coin === "bitcoin") {
            btcPriceHistory.push({
                price: newPrice,
                timestamp: Date.now()
            });
            if (btcPriceHistory.length > btcHistoryMaxLength) {
                btcPriceHistory.shift();
            }
        }

        console.log(`${coinName} - ${formattedPrice} ${changeMessage}`);
        adviceSetter(advice);

        if (coin === "bitcoin") {
            cursData.btc = parseFloat(formattedPrice.replace(/,/g, ''));
            cursData.btcAdvice = advice;
        } else if (coin === "dogecoin") {
            cursData.dog = parseFloat(formattedPrice);
            cursData.dogAdvice = advice;
        }

        return {
            price: formattedPrice,
            rawPrice: newPrice,
            difference,
        };
    } else {
        const errorMessage = `Не удалось получить цену ${coinName}`;
        console.log(errorMessage);
        adviceSetter(errorMessage);
        return null;
    }
}

async function updateBtc() {
    return await updatePrice(
        "bitcoin",
        (price) => (btc = price),
        formatNumber,
        previousBtc,
        "BTC",
        (advice) => (btcAdvice = advice)
    );
}

async function updateDog() {
    return await updatePrice(
        "dogecoin",
        (price) => (dog = price),
        formatDog,
        previousDog,
        "DOGE",
        (advice) => (dogAdvice = advice)
    );
}

async function updatePrices() {
    const btcResult = await updateBtc();
    const dogResult = await updateDog();

    if (btcResult) {
        previousBtc = btcResult.rawPrice;
    }
    if (dogResult) {
        previousDog = dogResult.rawPrice;
    }

    saveCursData(cursData);
}

setInterval(updatePrices, 60000);
updatePrices();

function calculatePriceChange(history, periodInHours) {
    const now = Date.now();
    const cutoff = now - periodInHours * 60 * 60 * 1000;

    const recentHistory = history.filter(item => item.timestamp >= cutoff);

    if (recentHistory.length < 2) {
        return "Недостаточно данных";
    }

    const firstPrice = recentHistory[0].price;
    const lastPrice = recentHistory[recentHistory.length - 1].price;
    const change = lastPrice - firstPrice;

    return change > 0 ? `+${formatNumber(change)}` : formatNumber(change);
}

// Основная команда курса с кнопками выбора
cmd.hear(/^(?:курс|📈 Курс)$/i, (message, bot) => {
    return bot("Выберите тип курса:", {
        keyboard: JSON.stringify({
            inline: true,
            buttons: [
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: "курс валют"
                        }),
                        label: "📈 Курс валют"
                    },
                    color: "positive"
                }],
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: "курс руды"
                        }),
                        label: "💎 Курс руды"
                    },
                    color: "positive"
                }]
            ]
        })
    });
});

// Команда курса валют
cmd.hear(/^(?:курс валют)$/i, (message, bot) => {
    const btcChange1h = calculatePriceChange(btcPriceHistory, 1);
    const btcChange24h = calculatePriceChange(btcPriceHistory, 24);

    let btcInfo = `
₿ BTC: ${btc}
💡 - ${btcAdvice}
📈 Изменение за час: ${btcChange1h} $
📉 Изменение за 24 часа: ${btcChange24h} $
`;

    let dogInfo = `
🐶 DOGE: ${dog}
💡 - ${dogAdvice}
`;

    return bot(btcInfo + dogInfo, {
        keyboard: JSON.stringify({
            inline: true,
            buttons: [
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: `история`
                        }),
                        label: `📈 История BTC`
                    },
                    color: "primary"
                }, {
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: `курс`
                        }),
                        label: `🔙 Назад`
                    },
                    color: "secondary"
                }]
            ]
        })
    });
});

// Команда курса руды
cmd.hear(/^(?:курс руды|💎 Курс руды)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let text = `Курс руды:\n`;

    if (botinfo.kursplazma > 1400000)
      text += `🆙 Руду «Плазма» сейчас можно продать за дорого.\n`;

    if (botinfo.kursobsidian > 1100000)
      text += `🆙 Руду «Обсидиан» сейчас можно продать за дорого.\n`;

    if (botinfo.kursmateria > 1000000)
      text += `🆙 Руду «Материя» сейчас можно продать за дорого.\n`;

    if (botinfo.kursalmaz > 700000)
      text += `🆙 Руду «Алмаз» сейчас можно продать за дорого.\n`;

    if (botinfo.kurszoloto > 300000)
      text += `🆙 Руду «Золото» сейчас можно продать за дорого.\n`;

    if (botinfo.kurszhelezo > 100000)
      text += `🆙 Руду «Железо» сейчас можно продать за дорого.\n`;

    text += `\n⚙️ 1 железо - ${utils.sp(botinfo.kurszhelezo)} ${val1}`;

    text += `\n🏵 1 золото - ${utils.sp(botinfo.kurszoloto)} ${val1}`;

    text += `\n💎 1 алмаз - ${utils.sp(botinfo.kursalmaz)} ${val1}`;

    text += `\n🌌 1 материя - ${utils.sp(botinfo.kursmateria)} ${val1}`;

    text += `\n🌌 1 обсидиан - ${utils.sp(botinfo.kursobsidian)} ${val1}`;

    text += `\n🌌 1 плазма - ${utils.sp(botinfo.kursplazma)} ${val1}`;

    text += `\n\n🔄 Курс руды обновится через ${unixStampLefta(
      kursrudtime - Date.now()
    )} ⏳`;

    return bot(text, {
        keyboard: JSON.stringify({
            inline: true,
            buttons: [
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: `курс`
                        }),
                        label: `🔙 Назад`
                    },
                    color: "secondary"
                }]
            ]
        })
    });
  }
});

setInterval(() => {
  if (kursrudtime > Date.now()) {
    kursrudtime -= 1;
  }
  if (kursrudtime <= Date.now()) {
    kursrudtime = Date.now() + 301000;
  }
}, 1000);

cmd.hear(/^(?:история)$/i, (message, bot) => {
    if (btcPriceHistory.length === 0) {
        return bot("История цен BTC пуста.");
    }

    const historyLength = btcPriceHistory.length;
    const startIndex = Math.max(0, historyLength - 10);

    let historyText = "История цен BTC (последние 10):\n";
    for (let i = startIndex; i < historyLength; i++) {
        const item = btcPriceHistory[i];
        const date = new Date(item.timestamp);
        historyText += `${date.toLocaleTimeString()}: ${formatNumber(item.price)}\n`;
    }

    return bot(historyText, {
        keyboard: JSON.stringify({
            inline: true,
            buttons: [
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: `курс валют`
                        }),
                        label: `🔙 Назад`
                    },
                    color: "secondary"
                }]
            ]
        })
    });
});

// Остальные команды (рейтинг, биткоин) остаются без изменений
cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");
        message.args[1] = message.args[1].replace(/([кk])/gi, "000");
        message.args[1] = message.args[1].replace(/[мm]/gi, "000000");

        if (message.user.inf === true) return bot(`Выключите безлимитный баланс`);

        if (!Number(message.args[1])) return bot("Введите корректное число.");

        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.args[1] <= 0) return bot("Введите число больше нуля.");

        const ratingCost = 1000000;
        const maxAffordableRating = Math.floor(message.user.balance / ratingCost);

        if (message.args[1] > maxAffordableRating) {
            return bot(
                `У вас недостаточно денег. Вы можете купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `рейтинг ${maxAffordableRating}`
                                    },
                                    label: `Купить максимум`,
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else if (message.args[1] * ratingCost > message.user.balance) {
            return bot(
                `У вас недостаточно денег. Вы можете купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `рейтинг ${maxAffordableRating}`
                                    },
                                    label: `Купить максимум`,
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else if (message.args[1] * ratingCost <= message.user.balance) {
            message.user.balance -= message.args[1] * ratingCost;
            message.user.rating += message.args[1];

            return bot(
                `Вы успешно повысили свой рейтинг на ${utils.sp(message.args[1])} ед. 👑 за ${utils.sp(message.args[1] * ratingCost)}${val1}\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n` +
                `Вы могли купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`
            );
        }
    }
});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type == 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");
        message.args[1] = message.args[1].replace(/(к|k)/gi, "000");
        message.args[1] = message.args[1].replace(/(м|m)/gi, "000000");

        if (/(вабанк|вобанк|все|всё)/gi.test(message.args[1])) {
            if (previousBtc) {
                message.args[1] = Math.floor(Number(message.user.balance / (previousBtc * 1.5)));
            } else {
                return bot("Не удалось получить текущую цену BTC.");
            }
        } else {
            message.args[1] = Number(message.args[1]);
        }

        if (!Number(message.args[1]) && message.args[1] !== 0) return bot("Некорректное количество.");
        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.user.inf === true) return bot(`Выключите безлимитный баланс`);

        if (message.args[1] <= 0 && !/(вабанк|вобанк|все|всё)/gi.test(message.args[1])) return bot("Количество должно быть больше нуля.");

        if (!previousBtc) {
            return bot("Не удалось получить текущую цену BTC.");
        }
        const cost = message.args[1] * previousBtc * 1.5;

        if (cost > message.user.balance) {
            const maxAffordable = Math.floor(message.user.balance / (previousBtc * 1.5));
            return bot(
                `у Вас недостаточно денег! ❌\n` +
                `Вы можете купить максимум: ${utils.sp(maxAffordable)} BTC\n\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1} 💵\n` +
                `🌐 Курс биткоина: ${(btc * 1.5).toFixed(2)} ${val1}`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `биткоин ${maxAffordable}`
                                    },
                                    label: `Купить максимум`,
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else {
            message.user.balance -= cost;
            message.user.btc += message.args[1];

            return bot(
                `Вы купили ${utils.sp(message.args[1])} биткоинов за ${utils.sp(cost)} ${val1}\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}`
            );
        }
    }
});

module.exports = commands;