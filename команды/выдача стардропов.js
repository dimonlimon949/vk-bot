let utils = require('../utils.js')

const commands = [];

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



const tokenData = getToken();


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

const chatlogi = tokenData2.chatlogi;
let spoler = tokenData ? tokenData.spoler : null;

const {
    VK
} = require('vk-io');
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



const RARITIES = {
    rare: {
        name: "Редкий",
        image: "doc690927947_682634151",
        prizes: async (user) => {
            const roll = Math.random(); // Generate a number between 0 and 1

            if (roll <= 0.4190) { // 41.90% chance
                const minBalance = 1000000;
                const maxBalance = 5000000;
                const amount = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`; // Number formatting
            } else if (roll <= 0.745) { // 32.60% chance (41.90 + 32.60 = 74.5)
                const minGB = 5000;
                const maxGB = 10000;
                const amount = Math.floor(Math.random() * (maxGB - minGB + 1)) + minGB;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`; // Number formatting
            } else if (roll <= 0.954) { // 20.90% chance (74.5 + 20.9 = 95.4)
                const minTickets = 1;
                const maxTickets = 10;
                const amount = Math.floor(Math.random() * (maxTickets - minTickets + 1)) + minTickets;
                user.bilet = (user.bilet || 0) + amount;
                return `${amount} билетов`;
            } else if (roll <= 0.977) { // 2.30% chance (95.4 + 2.3 = 97.7)
                const minCase = 1;
                const maxCase = 3;
                const amount = Math.floor(Math.random() * (maxCase - minCase + 1)) + minCase;
                user.c3 = (user.c3 || 0) + amount;
                return `${amount} донат кейсов`;
            } else { // 2.30% chance (97.7 + 2.3 = 100)
                const minFarm = 1;
                const maxFarm = 5;
                const amount = Math.floor(Math.random() * (maxFarm - minFarm + 1)) + minFarm;
                user.misc = user.misc || {}; // Ensure user.misc exists
                user.misc.farm_count = (user.misc.farm_count || 0) + amount;
                return `${amount} ферм`;
            }
        },
    },
    super_rare: {
        name: "Сверхредкий",
        image: "doc690927947_682634165",
        prizes: async (user) => {
            const roll = Math.random();

            if (roll <= 0.4238) { // 42.38%
                const minBalance = 2000000;
                const maxBalance = 5000000;
                const amount = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.7549) { // 42.38 + 33.11 = 75.49
                const minGB = 5000;
                const maxGB = 15000;
                const amount = Math.floor(Math.random() * (maxGB - minGB + 1)) + minGB;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`;
            } else if (roll <= 0.8874) { // 75.49 + 13.25 = 88.74
                const minFarm = 1;
                const maxFarm = 10;
                const amount = Math.floor(Math.random() * (maxFarm - minFarm + 1)) + minFarm;
                user.misc = user.misc || {};
                user.misc.farm_count = (user.misc.farm_count || 0) + amount;
                return `${amount} ферм`;
            } else if (roll <= 0.9205) { // 88.74 + 3.31 = 92.05
                const minCase = 1;
                const maxCase = 3;
                const amount = Math.floor(Math.random() * (maxCase - minCase + 1)) + minCase;
                user.c3 = (user.c3 || 0) + amount;
                return `${amount} донат кейсов`;
            } else {
                if (user.settings.vip !== true) {
                    user.settings.vip = true;
                    user.stock = user.stock || {};
                    user.stock.status = "VIP";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 21;
                    user.level = (user.level || 0) + 5;
                    user.limit.banklimit = 100000000;
                    user.limit.farmlimit = 200;
                    user.limit.videocardlimit = 20;
                    user.limit.playerlimit = 100000000;
                    user.limit.sent = 0;
                    user.maxenergy = 20;
                    return "VIP статус!";
                } else {
                    user.balance = (user.balance || 0) + 10000000;
                    return `10.000.000 ${val1}`;

                }
            }

        },
    },
    epic: {
        name: "Эпический",
        image: "doc690927947_682634169",
        prizes: async (user) => {
            const roll = Math.random();

            if (roll <= 0.2105) { // 21.05%
                const minBalance = 3000000;
                const maxBalance = 10000000;
                const amount = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.4210) { // 21.05 + 21.05 = 42.10
                const minGB = 10000;
                const maxGB = 20000;
                const amount = Math.floor(Math.random() * (maxGB - minGB + 1)) + minGB;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`;
            } else if (roll <= 0.5263) { // 42.10 + 10.53 = 52.63
                const minCase = 2;
                const maxCase = 5;
                const amount = Math.floor(Math.random() * (maxCase - minCase + 1)) + minCase;
                user.c3 = (user.c3 || 0) + amount;
                return `${amount} донат кейсов`;
            } else if (roll <= 0.5789) { // 52.63 + 5.26 = 57.89
                const minFarm = 1;
                const maxFarm = 15;
                const amount = Math.floor(Math.random() * (maxFarm - minFarm + 1)) + minFarm;
                user.misc = user.misc || {};
                user.misc.farm_count = (user.misc.farm_count || 0) + amount;
                return `${amount} ферм`;
            } else if (roll <= 0.6315) { // 57.89 + 5.26 = 63.15
                if (user.settings === undefined) user.settings = {};

                if (user.settings.vip !== true) {
                    user.settings.vip = true;
                    user.stock = user.stock || {};
                    user.stock.status = "VIP";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 21;
                    user.level = (user.level || 0) + 5;
                    user.limit.banklimit = 100000000;
                    user.limit.farmlimit = 200;
                    user.limit.videocardlimit = 20;
                    user.limit.playerlimit = 100000000;
                    user.limit.sent = 0;
                    user.maxenergy = 20;
                    return "VIP статус!";
                } else {
                    user.balance = (user.balance || 0) + 10000000;
                    return `10.000.000 ${val1} (Компенсация за VIP)`;
                }
            } else if (roll <= 0.7894) { // 63.15 + 15.79 = 78.94
                const amount = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                user.rub = (user.rub || 0) + amount;
                return `${amount} ${val2}`;
            } else if (roll <= 0.9473) { // 78.94 + 15.79 = 94.73
                user.c6 = (user.c6 || 0) + 1;
                return `Секретный кейс`;
            } else { // 94.73 + 5.26 = 99.99 (Округление до 100)
                if (user.settings === undefined) user.settings = {};
                if (user.settings.premium !== true) {
                    user.settings.premium = true;
                    user.stock = user.stock || {};
                    user.stock.status = "Premium";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 32;
                    user.level = (user.level || 0) + 35;
                    user.opit = (user.opit || 0) + 5000;
                    user.limit.banklimit = 200000000;
                    user.limit.farmlimit = 500;
                    user.limit.videocardlimit = 30;
                    user.limit.playerlimit = 200000000;
                    user.limit.sent = 0;
                    user.maxenergy = 30;
                    return "Premium статус!";
                } else {
                    user.balance = (user.balance || 0) + 20000000;
                    return `20.000.000 ${val1} (Компенсация за Premium)`;
                }

            }
        },
    },
    mythical: {
        name: "Мифический",
        image: "doc690927947_682634968",
        prizes: async (user) => {
            const roll = Math.random();

            if (roll <= 0.0949) { // Билеты от 1 до 20 (9,49%)
                const amount = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                user.bilet = (user.bilet || 0) + amount;
                return `${amount} билетов`;
            } else if (roll <= 0.2848) { // Баланс от 10.000.000 до 20.000.000 (18,99%)
                const amount = Math.floor(Math.random() * (20000000 - 10000000 + 1)) + 10000000;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.3797) { // VIP (9,49%)
                if (user.settings === undefined) user.settings = {};

                if (user.settings.vip !== true) {
                    user.settings.vip = true;
                    user.stock = user.stock || {};
                    user.stock.status = "VIP";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 21;
                    user.level = (user.level || 0) + 5;
                    user.limit.banklimit = 100000000;
                    user.limit.farmlimit = 200;
                    user.limit.videocardlimit = 20;
                    user.limit.playerlimit = 100000000;
                    user.limit.sent = 0;
                    user.maxenergy = 20;
                    return "VIP статус!";
                } else {
                    user.balance = (user.balance || 0) + 5000000; //Компенсация
                    return `5.000.000 ${val1} (Компенсация за VIP)`;
                }
            } else if (roll <= 0.443) { // Баланс от 20.000.000 до 40.000.000 (6,33%)
                const amount = Math.floor(Math.random() * (40000000 - 20000000 + 1)) + 20000000;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.462) { // TITAN (1,90%)
                if (user.settings === undefined) user.settings = {};

                if (user.settings.titan !== true) {
                    user.settings.titan = true;
                    user.stock = user.stock || {};
                    user.stock.status = "Titan";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 48;
                    user.level = (user.level || 0) + 50;
                    user.opit = (user.opit || 0) + 50000;
                    user.limit.banklimit = 500000000;
                    user.limit.farmlimit = 1000;
                    user.limit.playerlimit = 300000000;
                    user.limit.sent = 0;
                    user.limit.videocardlimit = 50;
                    user.maxenergy = 100;
                    return "TITAN статус!";
                } else {
                    user.balance = (user.balance || 0) + 50000000; //компенсация
                    return `50.000.000 ${val1} (Компенсация за TITAN)`;
                }
            } else if (roll <= 0.6202) { // Фермы от 1 до 10 (15,82%)
                const amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                user.misc = user.misc || {};
                user.misc.farm_count = (user.misc.farm_count || 0) + amount;
                return `${amount} ферм`;
            } else if (roll <= 0.6835) { // Баланс от 20.000.000 до 40.000.000 (6,33%)
                const amount = Math.floor(Math.random() * (40000000 - 20000000 + 1)) + 20000000;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.7468) { // Баланс от 20.000.000 до 40.000.000 (6,33%)
                const amount = Math.floor(Math.random() * (40000000 - 20000000 + 1)) + 20000000;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.7784) { // user.rub от 10 до 500 (3,16%)
                const amount = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
                user.rub = (user.rub || 0) + amount;
                return `${amount} RUB`;
            } else if (roll <= 0.8417) { // Premium (6,33%)
                if (user.settings === undefined) user.settings = {};
                if (user.settings.premium !== true) {
                    user.settings.premium = true;
                    user.stock = user.stock || {};
                    user.stock.status = "Premium";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 32;
                    user.level = (user.level || 0) + 35;
                    user.opit = (user.opit || 0) + 5000;
                    user.limit.banklimit = 200000000;
                    user.limit.farmlimit = 500;
                    user.limit.videocardlimit = 30;
                    user.limit.playerlimit = 200000000;
                    user.limit.sent = 0;
                    user.maxenergy = 30;
                    return "Premium статус!";
                } else {
                    user.balance = (user.balance || 0) + 25000000; //компенсация
                    return `25.000.000 ${val1} (Компенсация за Premium)`;
                }
            } else { // ГБ от 15.000 до 30.000 (15,82%)
                const amount = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`;
            }
        },
    },
    legendary: {
        name: "Легендарный",
        image: "doc690927947_682634175",
        prizes: async (user) => {
            const roll = Math.random();

            if (roll <= 0.1087) { // Фермы от 1 до 20 (10,87%)
                const amount = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                user.misc = user.misc || {};
                user.misc.farm_count = (user.misc.farm_count || 0) + amount;
                return `${amount} ферм`;
            } else if (roll <= 0.163) { // VIP (5,43%)
                if (user.settings === undefined) user.settings = {};

                if (user.settings.vip !== true) {
                    user.settings.vip = true;
                    user.stock = user.stock || {};
                    user.stock.status = "VIP";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 21;
                    user.level = (user.level || 0) + 5;
                    user.limit.banklimit = 100000000;
                    user.limit.farmlimit = 200;
                    user.limit.videocardlimit = 20;
                    user.limit.playerlimit = 100000000;
                    user.limit.sent = 0;
                    user.maxenergy = 20;
                    return "VIP статус!";
                } else {
                    user.balance = (user.balance || 0) + 15000000; // Компенсация за VIP
                    return `15.000.000 ${val1} (Компенсация за VIP)`;
                }
            } else if (roll <= 0.1847) { // Premium (2,17%)
                if (user.settings === undefined) user.settings = {};

                if (user.settings.premium !== true) {
                    user.settings.premium = true;
                    user.stock = user.stock || {};
                    user.stock.status = "Premium";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 32;
                    user.level = (user.level || 0) + 35;
                    user.opit = (user.opit || 0) + 5000;
                    user.limit.banklimit = 200000000;
                    user.limit.farmlimit = 500;
                    user.limit.videocardlimit = 30;
                    user.limit.playerlimit = 200000000;
                    user.limit.sent = 0;
                    user.maxenergy = 30;
                    return "Premium статус!";
                } else {
                    user.balance = (user.balance || 0) + 25000000; // Компенсация за Premium
                    return `25.000.000 ${val1} (Компенсация за Premium)`;
                }
            } else if (roll <= 0.5434) { // от 10.000.000 до 100.000.000 (35,87%)
                const amount = Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`;
            } else if (roll <= 0.5651) { // Premium (2,17%)
                if (user.settings === undefined) user.settings = {};

                if (user.settings.premium !== true) {
                    user.settings.premium = true;
                    user.stock = user.stock || {};
                    user.stock.status = "Premium";
                    user.limit = user.limit || {};
                    user.limit.nicklimit = 32;
                    user.level = (user.level || 0) + 35;
                    user.opit = (user.opit || 0) + 5000;
                    user.limit.banklimit = 200000000;
                    user.limit.farmlimit = 500;
                    user.limit.videocardlimit = 30;
                    user.limit.playerlimit = 200000000;
                    user.limit.sent = 0;
                    user.maxenergy = 30;
                    return "Premium статус!";
                } else {
                    user.balance = (user.balance || 0) + 25000000; // Компенсация за Premium
                    return `25.000.000 ${val1} (Компенсация за Premium)`;
                }
            } else if (roll <= 0.8368) { // от 10.000 до 50.000 гб (27,17%)
                const amount = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`;
            } else { // от 10.000 до 100.000 гб (16,30%)
                const amount = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
                user.balance2 = (user.balance2 || 0) + amount;
                return `${amount.toLocaleString()} ${val4}`;
            }
        },
    },
};




    




//Общий код для каждого типа стардропа с проверкой
async function openLegendaryStarDrop(message, bot) {
  const userId = message.user.id;
  const user = double.find((x) => x.id === userId);

  if (!user) {
    return bot(`Произошла ошибка`);
  }

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "legendary";


  console.log("openLegendaryStarDrop called"); // Добавлено
  console.log("Params:", {
    starDropProperty: "c16",
    starDropName: "Легендарный",
  }); // Добавлено
  await processStarDropOpening(message, bot, "c16", "Легендарный");
}

async function openEpicStarDrop(message, bot) {
  const userId = message.user.id;
  const user = double.find((x) => x.id === userId);

  if (!user) {
    return bot(`Произошла ошибка`);
  }

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "epic";


  console.log("openEpicStarDrop called"); // Добавлено
  console.log("Params:", {
    starDropProperty: "c14",
    starDropName: "Эпический",
  }); // Добавлено
  await processStarDropOpening(message, bot, "c14", "Эпический");
}

async function openMythicalStarDrop(message, bot) {
  const userId = message.user.id;
  const user = double.find((x) => x.id === userId);

  if (!user) {
    return bot(`Произошла ошибка`);
  }

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "mythical";


  console.log("openMythicalStarDrop called"); // Добавлено
  console.log("Params:", {
    starDropProperty: "c15",
    starDropName: "Мифический",
  }); // Добавлено
  await processStarDropOpening(message, bot, "c15", "Мифический");
}

async function openSuperRareStarDrop(message, bot) {
  const userId = message.user.id;
  const user = double.find((x) => x.id === userId);

  if (!user) {
    return bot(`Произошла ошибка`);
  }

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "super_rare";


  console.log("openSuperRareStarDrop called"); // Добавлено
  console.log("Params:", {
    starDropProperty: "c13",
    starDropName: "Сверхредкий",
  }); // Добавлено
  await processStarDropOpening(message, bot, "c13", "Сверхредкий");
}

async function openRareStarDrop(message, bot) {
  const userId = message.user.id;
  const user = double.find((x) => x.id === userId);

  if (!user) {
    return bot(`Произошла ошибка`);
  }

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "rare";


  console.log("openRareStarDrop called"); // Добавлено
  console.log("Params:", {
    starDropProperty: "c12",
    starDropName: "Редкий",
  }); // Добавлено
  await processStarDropOpening(message, bot, "c12", "Редкий");
}

async function processStarDropOpening(message, bot, starDropProperty, starDropName) {
    const userId = message.user.id;
    const user = double.find((x) => x.id === userId);

    if (!user) return bot(`Произошла ошибка`);

    const hasStarDrop = message.user[starDropProperty] >= 1;


    if (!hasStarDrop) return bot(`У вас нет "${starDropName} Starr Drop".`);


    const keyboard = {
        "inline": true,
        "buttons": [
            [{
                "action": {
                    "type": "text",
                    "payload": "{}",
                    "label": `⭐ Тык ${starDropName} ⭐`
                },
                "color": "positive"
            }]
        ]
    };

    // Инициализация tries, currentRarity (делаем это здесь, чтобы убедиться, что они есть)
    if (typeof user.tries !== 'number') {
        user.tries = 0;
    }

    if (!user.currentRarity2 || typeof user.currentRarity2 !== 'string') {
        user.currentRarity2 = "rare";
    }

    if (user.messageId === undefined || user.messageId === null) {
        user.messageId = null;
    }

    // LOGGING - BEFORE
    console.log(`User ${user.id}: tries=${user.tries}, currentRarity2=${user.currentRarity2}`);

    const previousRarity = user.currentRarity2;

    user.tries = 5;

    let prize = null;
    let rarityName = RARITIES[user.currentRarity2].name;
    let rarityImage = RARITIES[user.currentRarity2].image;

    if (RARITIES[user.currentRarity2] && typeof RARITIES[user.currentRarity2].prizes === 'function') {
        prize = await RARITIES[user.currentRarity2].prizes(user);
    } else {
        prize = 'Неизвестно';
    }
    user.tries = 0;

    // LOGGING - AFTER
    console.log(`User ${user.id}: tries=${user.tries}, currentRarity2=${user.currentRarity2}`);

    // Определение attachment и text
    let attachment = rarityImage; // Оставьте это здесь
    let text;

    console.log("starDropProperty:", starDropProperty);
    console.log("starDropName:", starDropName);
    console.log("rarityName:", rarityName);
    console.log("rarityImage:", rarityImage);

    if (prize) {
        text = `Награда - ${prize}`;
        message.user[starDropProperty] -= 1; // Уменьшаем количество стардропов
    } else {
        text = `Крутим... Следующая редкость: ${rarityName}. Попыток: ${user.tries} / 5`;
    }

    if (previousRarity !== user.currentRarity2 && user.tries !== 0) {
        text += `\nРедкость повышена до ${rarityName}!`
    }

    try {
        await message.send(text, {
            keyboard: JSON.stringify(keyboard),
            attachment: attachment
        });

    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        return bot("Произошла ошибка при отправке сообщения.");
    }
    fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
}


// --------------открытие--------------------//

cmd.hear(/^(?:тык легендарный|⭐ Тык Легендарный ⭐|кейс открыть 16)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        await openLegendaryStarDrop(message, bot);
    }
});

cmd.hear(/^(?:тык эпический|⭐ Тык Эпический ⭐|кейс открыть 14)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        await openEpicStarDrop(message, bot);
    }
});

cmd.hear(/^(?:тык мифический|⭐ Тык Мифический ⭐|кейс открыть 15)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        await openMythicalStarDrop(message, bot);
    }
});

cmd.hear(/^(?:тык сверхредкий|⭐ Тык Сверхредкий ⭐|кейс открыть 13)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        await openSuperRareStarDrop(message, bot);
    }
});

cmd.hear(/^(?:тык редкий|⭐ Тык Редкий ⭐|кейс открыть 12)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        await openRareStarDrop(message, bot);
    }
});


// --------выдачи-------//



// ---------------------забрать ---------------//




setInterval(async () => {
    double.map(user => {
        if (user.tries > 5) user.tries = 0
    });
}, 1000);

module.exports = commands;