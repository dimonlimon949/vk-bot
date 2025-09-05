const fs = require('fs');
const utils = require('../utils.js');

// Импорт списков
const businesses = require("../spisok/business spisok.js");
const businesses2 = require("../spisok/бизнесы.js");
let apartments = require('../spisok/апартаменты.js');
let helicopters = require('../spisok/вертолеты.js');
let videocards = require('../spisok/видеокарты.js');
let trees = require('../spisok/деревья.js');
let farms = require('../spisok/фермы.js');
let cars = require('../spisok/машины.js');
let yachts = require('../spisok/яхты.js');
let homes = require('../spisok/дома.js');
let minertool = require('../spisok/инструменты.js');
let computers = require('../spisok/компьютеры.js');
let airplanes = require('../spisok/самолеты.js');
let phones = require('../spisok/телефоны.js');

// Импорт баз данных
let clans = require("../database/clans.json");
let botinfo = require("../database/botinfo.json");
let chats = require('../database/chats.json');
let double = require('../database/users.json');
let bossinfo = require('../database/bossinfo.json');
let casino = require("../database/casino.json");
let settings = require("../database/settings.json");

// Импорт настроек
let val = require("../настройки/валюты.json");
let chatss = require("../настройки/ссылки чатов.json");
let soz = require("../настройки/создатели бота.json");

const commands = [];

// Функции сохранения для списков
async function saveBusinesses() {
    fs.writeFileSync('./spisok/business spisok.js', `module.exports = ${JSON.stringify(businesses, null, 2)}`);
}

async function saveBusinesses2() {
    fs.writeFileSync('./spisok/бизнесы.js', `module.exports = ${JSON.stringify(businesses2, null, 2)}`);
}

async function saveApartments() {
    fs.writeFileSync('./spisok/апартаменты.js', `module.exports = ${JSON.stringify(apartments, null, 2)}`);
}

async function saveHelicopters() {
    fs.writeFileSync('./spisok/вертолеты.js', `module.exports = ${JSON.stringify(helicopters, null, 2)}`);
}

async function saveVideocards() {
    fs.writeFileSync('./spisok/видеокарты.js', `module.exports = ${JSON.stringify(videocards, null, 2)}`);
}

async function saveTrees() {
    fs.writeFileSync('./spisok/деревья.js', `module.exports = ${JSON.stringify(trees, null, 2)}`);
}

async function saveFarms() {
    fs.writeFileSync('./spisok/фермы.js', `module.exports = ${JSON.stringify(farms, null, 2)}`);
}

async function saveCars() {
    fs.writeFileSync('./spisok/машины.js', `module.exports = ${JSON.stringify(cars, null, 2)}`);
}

async function saveYachts() {
    fs.writeFileSync('./spisok/яхты.js', `module.exports = ${JSON.stringify(yachts, null, 2)}`);
}

async function saveHomes() {
    fs.writeFileSync('./spisok/дома.js', `module.exports = ${JSON.stringify(homes, null, 2)}`);
}

async function saveMinertool() {
    fs.writeFileSync('./spisok/инструменты.js', `module.exports = ${JSON.stringify(minertool, null, 2)}`);
}

async function saveComputers() {
    fs.writeFileSync('./spisok/компьютеры.js', `module.exports = ${JSON.stringify(computers, null, 2)}`);
}

async function saveAirplanes() {
    fs.writeFileSync('./spisok/самолеты.js', `module.exports = ${JSON.stringify(airplanes, null, 2)}`);
}

async function savePhones() {
    fs.writeFileSync('./spisok/телефоны.js', `module.exports = ${JSON.stringify(phones, null, 2)}`);
}

// Функции сохранения для баз данных и настроек
async function saveval() {
    fs.writeFileSync('./настройки/валюты.json', JSON.stringify(val, null, '\t'));
}

async function savechatss() {
    fs.writeFileSync('./настройки/ссылки чатов.json', JSON.stringify(chatss, null, '\t'));
}

async function savesoz() {
    fs.writeFileSync('./настройки/создатели бота.json', JSON.stringify(soz, null, '\t'));
}

async function saveSettings() {
    fs.writeFileSync('./database/settings.json', JSON.stringify(settings, null, '\t'));
}

async function kaz() {
    fs.writeFileSync("./database/casino.json", JSON.stringify(casino, null, "\t"));
}

async function saveClan() {
    fs.writeFileSync("./database/clans.json", JSON.stringify(clans, null, "\t"));
}

async function saveBoss() {
    fs.writeFileSync("./database/bossinfo.json", JSON.stringify(bossinfo, null, "\t"));
}

async function saveAll() {
    fs.writeFileSync("./database/botinfo.json", JSON.stringify(botinfo, null, "\t"));
}

async function saveC() {
    fs.writeFileSync('./database/chats.json', JSON.stringify(chats, null, '\t'));
}

async function saveU() {
    try {
        fs.writeFileSync('./database/users.json', JSON.stringify(double, null, '\t'));
        const data = fs.readFileSync('./database/users.json', 'utf8');
        const users = JSON.stringify(JSON.parse(data), null, '\t');
        
        setTimeout(() => {
            fs.writeFileSync('./database/users.txt', users + '\n');
        }, 2500 * 1000);
    } catch (err) {
        console.error('Ошибка при сохранении users:', err);
    }
}

// Функции обновления курсов
async function upzhelezo() {
    let rand = utils.random(1, 20);
    botinfo.kurszhelezo = Math.floor(Number(rand * 10000));
}

async function upzoloto() {
    let rand = utils.random(1, 40);
    botinfo.kurszoloto = Math.floor(Number(rand * 10000));
}

async function upalmaz() {
    let rand = utils.random(1, 80);
    botinfo.kursalmaz = Math.floor(Number(rand * 10000));
}

async function upmateria() {
    let rand = utils.random(1, 110);
    botinfo.kursmateria = Math.floor(Number(rand * 10000));
}

async function upobsidian() {
    let rand = utils.random(1, 120);
    botinfo.kursobsidian = Math.floor(Number(rand * 10000));
}

async function upplazma() {
    let rand = utils.random(1, 150);
    botinfo.kursplazma = Math.floor(Number(rand * 10000));
}

// Интервалы сохранения
setInterval(async () => {
    try {
        // Основные данные
        await saveAll();
        await saveU();
        await saveC();
        await saveBoss();
        await saveClan();
        await kaz();
        
        // Настройки
        await savesoz();
        await saveval();
        await savechatss();
        await saveSettings();
        
        // Списки предметов
        await saveBusinesses();
        await saveBusinesses2();
        await saveApartments();
        await saveHelicopters();
        await saveVideocards();
        await saveTrees();
        await saveFarms();
        await saveCars();
        await saveYachts();
        await saveHomes();
        await saveMinertool();
        await saveComputers();
        await saveAirplanes();
        await savePhones();

        console.log(`⚜ Все данные успешно сохранены ⚜`);
    } catch (err) {
        console.error('Ошибка при сохранении данных:', err);
    }
}, 60000);

// Интервалы обновления курсов
setInterval(async () => {
    try {
        await upplazma();
        await upobsidian();
        await upmateria();
        await upalmaz();
        await upzoloto();
        await upzhelezo();
    } catch (err) {
        console.error('Ошибка при обновлении курсов:', err);
    }
}, 301000);

module.exports = commands;