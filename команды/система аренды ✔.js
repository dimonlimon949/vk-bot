let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

let yachts = require('../spisok/яхты.js')
let homes = require('../spisok/дома.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')
let apartments = require('../spisok/апартаменты.js')
let airplanes = require('../spisok/самолеты.js')
let phones = require('../spisok/телефоны.js')
let helicopters = require('../spisok/вертолеты.js')


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
const {VK} = require('vk-io');
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

function addZero(num) {
    return num < 10 ? '' + num : num;
}

function unixStampLefta(stampa) {
    stampa = stampa / 1000; // Преобразуем миллисекунды в секунды
    let s = Math.floor(stampa % 60); // Остаток от деления на 60 для секунд
    stampa = Math.floor(stampa / 60); // Убираем секунды

    let m = Math.floor(stampa % 60); // Остаток от деления на 60 для минут
    stampa = Math.floor(stampa / 60); // Убираем минуты

    let h = Math.floor(stampa % 24); // Остаток от деления на 24 для часов
    let d = Math.floor(stampa / 24); // Делим на 24 для дней
    let y = Math.floor(d / 365); // Делим на 365 для лет
    d = d % 365; // Остаток от деления на 365 для дней

    // Формируем текст с учетом всех единиц времени
    let text = '';
    if (y > 0) text += `${y} г. `;
    if (d > 0) text += `${d} д. `;
    if (h > 0) text += `${addZero(h)} ч. `;
    text += `${addZero(m)} м. ${addZero(s)} с.`;

    return text.trim(); // Убираем лишние пробелы
}
cmd.hear(/^(?:магазин|shop)$/i, async (message, bot) => {
    await message.send('Добро пожаловать в магазин. Выберите категорию:', {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `дома`}),
                        "label": `🏠 Дома`
                    },
                    "color": "positive"
                }, {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `яхты`}),
                        "label": `🛥️ Яхты`
                    },
                    "color": "positive"
                }],
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `инструменты`}),
                        "label": `⛏️ Инструменты`
                    },
                    "color": "positive"
                }, {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `компьютеры`}),
                        "label": `💻 Компьютеры`
                    },
                    "color": "positive"
                }],
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `квартиры`}),
                        "label": `🏢 Квартиры`
                    },
                    "color": "positive"
                }, {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `телефоны`}),
                        "label": `📱 Телефоны`
                    },
                    "color": "positive"
                }],
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `самолеты`}),
                        "label": `🛩️ Самолеты`
                    },
                    "color": "positive"
                }, {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `вертолеты`}),
                        "label": `🚁 Вертолеты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
});

cmd.hear(/^(?:аренда|арендовать|🎉 Аренда)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        try {
            const now = Date.now();

            const getYachtColor = () => (message.user.transport.yacht ? (message.user.arend.yaxta >= now ? "secondary" : "positive") : "negative");
            const getHomeColor = () => (message.user.realty.home ? (message.user.arend.dom >= now ? "secondary" : "positive") : "negative");
            const getToolColor = () => (message.user.minertool ? (message.user.arend.instrm >= now ? "secondary" : "positive") : "negative");
            const getComputerColor = () => (message.user.misc.computer ? (message.user.arend.pk >= now ? "secondary" : "positive") : "negative");
            const getApartmentColor = () => (message.user.realty.apartment ? (message.user.arend.kvar >= now ? "secondary" : "positive") : "negative");
            const getAirplaneColor = () => (message.user.transport.airplane ? (message.user.arend.sam >= now ? "secondary" : "positive") : "negative");
            const getPhoneColor = () => (message.user.misc.phone ? (message.user.arend.tel >= now ? "secondary" : "positive") : "negative");
            const getHelicopterColor = () => (message.user.transport.helicopter ? (message.user.arend.vert >= now ? "secondary" : "positive") : "negative");

            await message.send('Выберите, что хотите сдать в аренду:', {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать яхту`}),
                                "label": `🛥️ Яхты`
                            },
                            "color": getYachtColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать дом`}),
                                    "label": `🏠 Дома`
                                },
                                "color": getHomeColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать инструменты`}),
                                "label": `⛏️ Инструменты`
                            },
                            "color": getToolColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать комп`}),
                                    "label": `💻 Компьютеры`
                                },
                                "color": getComputerColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать квартиру`}),
                                "label": `🏢 Квартиры`
                            },
                            "color": getApartmentColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать самолет`}),
                                    "label": `✈️ Самолеты`
                                },
                                "color": getAirplaneColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать телефон`}),
                                "label": `📱 Телефоны`
                            },
                            "color": getPhoneColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать вертолет`}),
                                    "label": `🚁 Вертолеты`
                                },
                                "color": getHelicopterColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `магазин`}),
                                "label": `🛒 Магазин`
                            },
                            "color": "primary"
                        }]
                    ]
                })
            });
        } catch (error) {
            console.error("Ошибка при отправке сообщения с кнопками:", error);
            message.send('Произошла ошибка при обработке запроса.');
        }
    } else {
        return;
    }
});

cmd.hear(/^(?:арендовать дом)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (message.user.arend.dom >= Date.now()) {
            return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.dom - Date.now())} ⏳`);
        }
        if (!message.user.realty.home) return bot(`у вас нет дома`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({command: `дома`}),
                            "label": `🏠 Дома`
                        },
                        "color": "positive"
                    }]
                ]
            })
        });

        let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.02);

        message.user.balance += Math.floor(
            homes[message.user.realty.home - 1].cost * 0.02
        );

        message.user.arend.dom = Date.now() + 10800000;


        if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
            message.user.now.kv6 = true;
            message.user.misc.farm_count += 10;
            await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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

        return bot(
            `вы арендовали свой дом за ${utils.sp(
                a
            )} ${val1} 🏡`
        );

    } else {
        return
    }
})

cmd.hear(/^(?:арендовать яхту)$/i, async (message, bot) => {
    if (message.user.arend.yaxta >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.yaxta - Date.now())} ⏳`);
    }
    if (!message.user.transport.yacht) return bot(`у вас нет яхты`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `яхты`}),
                        "label": `🛥️ Яхты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.02);

    message.user.balance += Math.floor(
        yachts[message.user.transport.yacht - 1].cost * 0.02
    );
    message.user.arend.yaxta = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
    return bot(
        `вы арендовали свою яхту за ${utils.sp(
            a
        )} ${val1} 🚤`
    );

})

cmd.hear(/^(?:арендовать инструменты)$/i, async (message, bot) => {
    if (message.user.arend.instrm >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.instrm - Date.now())} ⏳`);
    }
    if (!message.user.minertool) return bot(`у вас нет инструмента`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `инструменты`}),
                        "label": `⛏️ Инструменты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(minertool[message.user.minertool - 1].cost * 0.02);

    message.user.balance += Math.floor(
        minertool[message.user.minertool - 1].cost * 0.02
    );

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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

    message.user.arend.instrm = Date.now() + 10800000;
    return bot(
        `вы арендовали свои инструменты за ${utils.sp(
            a
        )} ${val1} 🔧`
    );

})

cmd.hear(/^(?:арендовать комп)$/i, async (message, bot) => {
    if (message.user.arend.pk >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.pk - Date.now())} ⏳`);
    }
    if (!message.user.misc.computer) return bot(`у вас нет компьютера`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `компьютеры`}),
                        "label": `💻 Компьютеры`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(computers[message.user.misc.computer - 1].cost * 0.02);

    message.user.balance += Math.floor(
        computers[message.user.misc.computer - 1].cost * 0.02
    );

    message.user.arend.pk = Date.now() + 10800000;

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
    return bot(
        `вы арендовали свой компьютер за ${utils.sp(
            a
        )} ${val1} 🖥️`
    );

})


cmd.hear(/^(?:арендовать квартиру)$/i, async (message, bot) => {
    if (message.user.arend.kvar >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.kvar - Date.now())} ⏳`);
    }
    if (!message.user.realty.apartment) return bot(`у вас нет квартиры`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `квартиры`}),
                        "label": `🏠 Квартиры`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        apartments[message.user.realty.apartment - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        apartments[message.user.realty.apartment - 1].cost * 0.02
    );
    message.user.arend.kvar = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
    return bot(
        `вы арендовали свою квартиру за ${utils.sp(
            a
        )} ${val1} 🌆`
    );

})

cmd.hear(/^(?:арендовать телефон)$/i, async (message, bot) => {
    if (message.user.arend.tel >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.tel - Date.now())} ⏳`);
    }
    if (!message.user.misc.phone) return bot(`у вас нет телефона`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `телефоны`}),
                        "label": `📱 Телефоны`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.02);

    message.user.balance += Math.floor(
        phones[message.user.misc.phone - 1].cost * 0.02
    );
    message.user.arend.tel = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
    return bot(
        `вы арендовалии свой телефон за ${utils.sp(
            a
        )} ${val1} 📲`
    );

})

cmd.hear(/^(?:арендовать самолет)$/i, async (message, bot) => {
    if (message.user.arend.sam >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.sam - Date.now())} ⏳`);
    }
    if (!message.user.transport.airplane) return bot(`у вас нет самолёта`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `самолеты`}),
                        "label": `🛩️ Самолеты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        airplanes[message.user.transport.airplane - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        airplanes[message.user.transport.airplane - 1].cost * 0.02
    );
    message.user.arend.sam = Date.now() + 10800000;
    return bot(
        `вы арендовали свой самолёт за ${utils.sp(
            a
        )} ${val1} 🛩️`
    );

})

cmd.hear(/^(?:арендовать вертолет)$/i, async (message, bot) => {
    if (message.user.arend.vert >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.vert - Date.now())} ⏳`);
    }
    if (!message.user.transport.helicopter) return bot(`у вас нет вертолета`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `вертолеты`}),
                        "label": `🚁 Вертолеты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        helicopters[message.user.transport.helicopter - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        helicopters[message.user.transport.helicopter - 1].cost * 0.02
    );
    message.user.arend.vert = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
    return bot(
        `вы арендовали свой вертолёт за ${utils.sp(
            a
        )} ${val1} 🚁`
    );

})



// Яхты с поддержкой скидок
cmd.hear(/^(?:яхты|🛥 Яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let yachtList = `яхты:\n\n`;
            
            yachts.forEach(yacht => {
                const hasDiscount = yacht.sell > 0;
                const currentPrice = hasDiscount ? yacht.cost2 : yacht.cost;
                
                yachtList += `${message.user.transport.yacht === yacht.id ? "✔️" : "✖️"} ${yacht.id}. ${yacht.name}\n`;
                yachtList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    yachtList += ` 🔥 Скидка ${yacht.sell}%`;
                }
                
                yachtList += `\n\n`;
            });
            
            yachtList += `🛒 Для покупки введите «Яхта [номер]»`;
            
            return bot(yachtList);
        }
                    
        const sell = yachts.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.transport.yacht) {
            return bot(
                `у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать яхту`}),
                                    "label": `💸 Продать яхту`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.transport.yacht = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Самолеты с поддержкой скидок
cmd.hear(/^(?:самол[её]т|🛩 Самолеты|самол[её]ты)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let airplaneList = `самолеты:\n\n`;
            
            airplanes.forEach(airplane => {
                const hasDiscount = airplane.sell > 0;
                const currentPrice = hasDiscount ? airplane.cost2 : airplane.cost;
                
                airplaneList += `${message.user.transport.airplane === airplane.id ? "✔️" : "✖️"} ${airplane.id}. ${airplane.name}\n`;
                airplaneList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    airplaneList += ` 🔥 Скидка ${airplane.sell}%`;
                }
                
                airplaneList += `\n\n`;
            });
            
            airplaneList += `🛒 Для покупки введите «Самолет [номер]»`;
            
            return bot(airplaneList);
        }
                    
        const sell = airplanes.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.transport.airplane) {
            return bot(
                `у вас уже есть самолет (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолет"`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать самолет`}),
                                    "label": `💸 Продать самолет`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.transport.airplane = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Вертолеты с поддержкой скидок
cmd.hear(/^(?:вертол[её]т|🚁 Вертолеты|вертол[её]ты)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let helicopterList = `вертолеты:\n\n`;
            
            helicopters.forEach(helicopter => {
                const hasDiscount = helicopter.sell > 0;
                const currentPrice = hasDiscount ? helicopter.cost2 : helicopter.cost;
                
                helicopterList += `${message.user.transport.helicopter === helicopter.id ? "✔️" : "✖️"} ${helicopter.id}. ${helicopter.name}\n`;
                helicopterList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    helicopterList += ` 🔥 Скидка ${helicopter.sell}%`;
                }
                
                helicopterList += `\n\n`;
            });
            
            helicopterList += `🛒 Для покупки введите «Вертолет [номер]»`;
            
            return bot(helicopterList);
        }
                    
        const sell = helicopters.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.transport.helicopter) {
            return bot(
                `у вас уже есть вертолет (${helicopters[message.user.transport.helicopter - 1].name}), введите "Продать вертолет"`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать вертолет`}),
                                    "label": `💸 Продать вертолет`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.transport.helicopter = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Квартиры с поддержкой скидок
cmd.hear(/^(?:квартира|🌇 Квартиры|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let apartmentList = `квартиры:\n\n`;
            
            apartments.forEach(apartment => {
                const hasDiscount = apartment.sell > 0;
                const currentPrice = hasDiscount ? apartment.cost2 : apartment.cost;
                
                apartmentList += `${message.user.realty.apartment === apartment.id ? "✔️" : "✖️"} ${apartment.id}. ${apartment.name}\n`;
                apartmentList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    apartmentList += ` 🔥 Скидка ${apartment.sell}%`;
                }
                
                apartmentList += `\n\n`;
            });
            
            apartmentList += `🛒 Для покупки введите «Квартира [номер]»`;
            
            return bot(apartmentList);
        }
                    
        const sell = apartments.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.realty.apartment) {
            return bot(
                `у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать квартиру`}),
                                    "label": `💸 Продать квартиру`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.realty.apartment = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Телефоны с поддержкой скидок
cmd.hear(/^(?:телефон|📱 Телефоны|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let phoneList = `телефоны:\n\n`;
            
            phones.forEach(phone => {
                const hasDiscount = phone.sell > 0;
                const currentPrice = hasDiscount ? phone.cost2 : phone.cost;
                
                phoneList += `${message.user.misc.phone === phone.id ? "✔️" : "✖️"} ${phone.id}. ${phone.name}\n`;
                phoneList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    phoneList += ` 🔥 Скидка ${phone.sell}%`;
                }
                
                phoneList += `\n\n`;
            });
            
            phoneList += `🛒 Для покупки введите «Телефоны [номер]»`;
            
            return bot(phoneList);
        }
                    
        const sell = phones.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.misc.phone) {
            return bot(
                `у Вас уже есть телефон «${phones[message.user.misc.phone - 1].name}» ❌\nЧтобы его продать, введите «Продать телефон»`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать телефон`}),
                                    "label": `💸 Продать телефон`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.misc.phone = sell.id;
        message.user.procent.phone = utils.random(50, 100);
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Компьютеры с поддержкой скидок
cmd.hear(/^(?:компьютер|🖥 Компьютеры|компьютеры)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let computerList = `компьютеры:\n\n`;
            
            computers.forEach(computer => {
                const hasDiscount = computer.sell > 0;
                const currentPrice = hasDiscount ? computer.cost2 : computer.cost;
                
                computerList += `${message.user.misc.computer === computer.id ? "✔️" : "✖️"} ${computer.id}. ${computer.name}\n`;
                computerList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    computerList += ` 🔥 Скидка ${computer.sell}%`;
                }
                
                computerList += `\n\n`;
            });
            
            computerList += `🛒 Для покупки введите «Компьютеры [номер]»`;
            
            return bot(computerList);
        }
                    
        const sell = computers.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.misc.computer) {
            return bot(
                `у Вас уже есть компьютер «${computers[message.user.misc.computer - 1].name}» ❌\nЧтобы его продать, введите «Продать компьютер»`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать компьютер`}),
                                    "label": `💸 Продать компьютер`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.misc.computer = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Инструменты с поддержкой скидок
cmd.hear(/^(?:Инструменты|🔧Инструменты|🔧 Инструменты)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let toolList = `инструменты:\n\n`;
            
            minertool.forEach(tool => {
                const hasDiscount = tool.sell > 0;
                const currentPrice = hasDiscount ? tool.cost2 : tool.cost;
                
                toolList += `${message.user.minertool === tool.id ? "✔️" : "✖️"} ${tool.id}. ${tool.name}\n`;
                toolList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    toolList += ` 🔥 Скидка ${tool.sell}%`;
                }
                
                toolList += `\n\n`;
            });
            
            toolList += `🛒 Для покупки введите «Инструменты [номер]»`;
            
            return bot(toolList);
        }
                    
        const sell = minertool.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.minertool) {
            return bot(
                `у Вас уже есть «${minertool[message.user.minertool - 1].name}» ❌\nЧтобы его продать, введите «Продать инструмент»`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать инструмент`}),
                                    "label": `💸 Продать инструмент`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.minertool = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});

// Дома с поддержкой скидок
cmd.hear(/^(?:дом|🏠 Дома|дома)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (!message.args[1]) {
            let homeList = `дома:\n\n`;
            
            homes.forEach(home => {
                const hasDiscount = home.sell > 0;
                const currentPrice = hasDiscount ? home.cost2 : home.cost;
                
                homeList += `${message.user.realty.home === home.id ? "✔️" : "✖️"} ${home.id}. ${home.name}\n`;
                homeList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    homeList += ` 🔥 Скидка ${home.sell}%`;
                }
                
                homeList += `\n\n`;
            });
            
            homeList += `🛒 Для покупки введите «Дом [номер]»`;
            
            return bot(homeList);
        }
                    
        const sell = homes.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.realty.home) {
            return bot(
                `у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать дом`}),
                                    "label": `💸 Продать дом`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.realty.home = sell.id;
        
        let purchaseMessage = `вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        return bot(purchaseMessage);
    }
});



















module.exports = commands;