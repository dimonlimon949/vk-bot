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

let chatlogi = tokenData ? tokenData.chatlogi : null;
let spoler = tokenData ? tokenData.spoler : null;

const {
    VK
} = require('vk-io');
const vk = new VK({
    token: tokenData ? tokenData.token : null
});

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
            const roll = Math.random(); 

            if (roll <= 0.4190) { // 41.90% chance
                const minBalance = 1000000;
                const maxBalance = 5000000;
                const amount = Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
                user.balance = (user.balance || 0) + amount;
                return `${amount.toLocaleString()} ${val1}`; 
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
                    user.settings = user.settings || {};
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



const rarityProbabilities = {
    rare: {
        super_rare: 15,
        epic: 3,
        mythical: 0.5,
        legendary: 0.05
    },
    super_rare: {
        epic: 12,
        mythical: 2,
        legendary: 0.2
    },
    epic: {
        mythical: 8,
        legendary: 1
    },
    mythical: {
        legendary: 3
    },
    legendary: {}
};
    
cmd.hear(/^(?:тык|⭐ Тык ⭐|кейс открыть 4|⭐ Тык, если не пидор ⭐)$/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {

    if (!message.isChat || message.chat.type === 1) {
        if (message.user.c4 < 1) return bot('🖕 У тебя нет "Starr Drop", нищеброд! Иди нахуй!');
    
        if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5) {
            message.user.now.kv5 = true;
            message.user.balance2 += 50000;
            return bot(`✔ Ну бля, вот твой жалкий подачек – 50.000 ${val4}, соси. 
    
    💡 А теперь иди открывай ещё кейсы, дебил, может, повезёт!`, {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({ command: `путь новичка` }),
                                "label": `👀 Путь новичка (для даунов)`
                            },
                            "color": "positive"
                        }]
                    ]
                })
            });
        }
    
        const keyboard = {
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        "payload": "{}",
                        "label": "⭐ Тык, если не пидор ⭐"
                    },
                    "color": "positive"
                }]
            ]
        };
    
        const previousRarity = message.user.currentRarity;
        message.user.tries += 1;
    
        let prize = null;
        let rarityName = RARITIES[message.user.currentRarity].name;
        let rarityImage = RARITIES[message.user.currentRarity].image;
    
        if (message.user.tries === 5 || message.user.currentRarity === "legendary") {
            if (RARITIES[message.user.currentRarity] && typeof RARITIES[message.user.currentRarity].prizes === 'function') {
                prize = await RARITIES[message.user.currentRarity].prizes(message.user);
            } else {
                prize = 'Хуйня какая-то, а не приз!';
            }
            message.user.tries = 0;
            message.user.currentRarity = "rare";
            rarityName = RARITIES.rare.name;
        } else {
            const roll = Math.random() * 100;
            let newRarityKey = message.user.currentRarity;
            let cumulativeProbability = 0;
            const probabilities = rarityProbabilities[message.user.currentRarity];
    
            if (probabilities) {
                for (const rarityKey in probabilities) {
                    cumulativeProbability += probabilities[rarityKey];
                    if (roll < cumulativeProbability) {
                        newRarityKey = rarityKey;
                        break;
                    }
                }
            }
    
            message.user.currentRarity = newRarityKey;
            rarityName = RARITIES[newRarityKey].name;
            rarityImage = RARITIES[newRarityKey].image;
        }
    
        let attachment = rarityImage;
        let text;
    
        if (prize) {
            text = `🎉 Ну бля, вот твой убогий приз – ${prize}, радуйся, лузер.`;
            if (typeof message.user.questcup === "number") {
                message.user.questcup++;
                if (message.user.questcup >= 20) {
                    message.user.questcup = true;
                    await bot(`Ну ты и терпила, 20 раз открыл Starr Drops. Держи 📦 1 секретный кейс, идиот.`);
                    message.user.c6 += 1;
                }
            }
            message.user.c4 -= 1;
        } else {
            text = ``;
        }
    
        if (previousRarity !== message.user.currentRarity && message.user.tries !== 0) {
            text += ``;
        }
    
        try {
            await message.send(` ${text}`, {
                keyboard: JSON.stringify(keyboard),
                attachment: attachment
            });
        } catch (error) {
            console.error("Блядь, ошибка при отправке сообщения:", error);
            return bot("Чёт пошло не так, иди нахуй или попробуй ещё раз, криворук.");
        }
        fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
    }

  }
  if (message.user.astats.tema === 1) {
    if (!message.isChat || message.chat.type === 1) {

        if (message.user.c4 < 1) return bot(`У вас нет "Starr Drop".`)


        if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
            message.user.now.kv5 = true;
            message.user.balance2 += 50000;
            return bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}
        
        💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
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


        const keyboard = {
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        "payload": "{}",
                        "label": "⭐ Тык ⭐"
                    },
                    "color": "positive"
                }]
            ]
        };



        const previousRarity = message.user.currentRarity;

        message.user.tries += 1;

        let prize = null;
        let rarityName = RARITIES[message.user.currentRarity].name;
        let rarityImage = RARITIES[message.user.currentRarity].image;

        if (message.user.tries === 5 || message.user.currentRarity === "legendary") {
            if (RARITIES[message.user.currentRarity] && typeof RARITIES[message.user.currentRarity].prizes === 'function') {
                prize = await RARITIES[message.user.currentRarity].prizes(message.user);
            } else {
                prize = 'Неизвестно';
            }
            message.user.tries = 0;
            message.user.currentRarity = "rare";
            rarityName = RARITIES.rare.name;
        } else {


            const roll = Math.random() * 100;
            let newRarityKey = message.user.currentRarity;
            let cumulativeProbability = 0;
            const probabilities = rarityProbabilities[message.user.currentRarity];

            if (probabilities) {
                for (const rarityKey in probabilities) {
                    cumulativeProbability += probabilities[rarityKey];
                    if (roll < cumulativeProbability) {
                        newRarityKey = rarityKey;
                        break;
                    }
                }
            }

            message.user.currentRarity = newRarityKey;
            rarityName = RARITIES[newRarityKey].name;
            rarityImage = RARITIES[newRarityKey].image;
        }

        let attachment = rarityImage;
        let text;

        if (prize) {
            text = `Награда - ${prize}`;
            if (typeof message.user.questcup === "number") {

                message.user.questcup++;
          
                if (message.user.questcup >= 20) {
          
                  message.user.questcup = true;
          
                  await bot(`Поздравляем, Вы 20 раз открыли Starr Drops и получаете 📦 1 секретный кейс.`);
          
                  message.user.c6 += 1;
          
                }
          
              }
            message.user.c4 -= 1;
        } else {
            text = ``;
        }

        if (previousRarity !== message.user.currentRarity && message.user.tries !== 0) {
            text += ``;
        }

        try {
            await message.send(` ${text}`, {
                keyboard: JSON.stringify(keyboard),
                attachment: attachment
            });

        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            return bot("Произошла ошибка при отправке сообщения.");
        }
        fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));

    }
}
});

setInterval(async () => {
    double.map(user => {
        if (user.tries > 5) user.tries = 0
    });
}, 1000);

module.exports = commands;