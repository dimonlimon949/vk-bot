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

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let presidents = require("../database/presidents.json");


let yachts = require('../spisok/яхты.js')
let airplanes = require('../spisok/самолеты.js')
let helicopters = require('../spisok/вертолеты.js')
let apartments = require('../spisok/апартаменты.js')
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
let farms = require('../spisok/фермы.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')

let businesses2 = require("../spisok/бизнесы.js")
const phones = require("../spisok/телефоны.js")

let businesses = require("../spisok/business spisok.js")


const tokensFilePath4 = './настройки/создатели бота.json';

const tokensFilePath2 = './настройки/ид бесед.json';

const tokensFilePath3 = './настройки/валюты.json';

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2(); 
const tokenData3 = getToken3(); 
const tokenData4 = getToken4(); 

const tokensFilePath5 = './настройки/ссылки чатов.json';

function getToken5() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath5, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}



let val1 = tokenData3.val1 
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4


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

const chatlogi = tokenData2.chatlogi;
const spoler = tokenData4;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

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

let scheduledHour = 0;  // Час обновления лимитов (например, полночь)
let scheduledMinute = 0; // Минута обновления лимитов

function scheduleTask() {
  const now = new Date();
  let targetTime = new Date(now);

  function calculateNextTargetTime() {
    targetTime = new Date(now);
    targetTime.setHours(scheduledHour);
    targetTime.setMinutes(scheduledMinute);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
  }

  calculateNextTargetTime();

  const timeUntilTarget = targetTime.getTime() - now.getTime();

    //Проверка при запуске, нужно ли немедленно обновить
    if (timeUntilTarget <= 0) {
      console.log("Время обновления уже прошло. Обновляем лимиты немедленно.");
      updateLimits(); //Вызов функции для немедленного обновления
    } else {
      console.log(`Следующее обновление лимитов запланировано на: ${targetTime.toLocaleString()}`);
      console.log(`Осталось времени: ${timeUntilTarget} ms`);
    }


  setTimeout(() => {
    console.log("Обновление лимитов запущено.");
    updateLimits();
    scheduleTask();
  }, timeUntilTarget);
}

function updateLimits() {
  double.forEach(user => {
    if (user.settings && user.settings.adm >= 2) {
      user.limc16 = calculateNewLimitc16(user.settings.adm);
      user.limc16i = 0;
      user.limc15 = calculateNewLimitc15(user.settings.adm);
      user.limc15i = 0;
      user.limc14 = calculateNewLimitc14(user.settings.adm);
      user.limc14i = 0;
      user.limc13 = calculateNewLimitc13(user.settings.adm);
      user.limc13i = 0;
      user.limc12 = calculateNewLimitc12(user.settings.adm);
      user.limc12i = 0;
      user.limc11 = calculateNewLimitc11(user.settings.adm);
      user.limc11i = 0;
      user.limc10 = calculateNewLimitc10(user.settings.adm);
      user.limc10i = 0;
      user.limc9 = calculateNewLimitc9(user.settings.adm);
      user.limc9i = 0;
      user.limc8 = calculateNewLimitc8(user.settings.adm);
      user.limc8i = 0;
      user.limc7 = calculateNewLimitc7(user.settings.adm);
      user.limc7i = 0;
      user.limc6 = calculateNewLimitc6(user.settings.adm);
      user.limc6i = 0;
      user.limc5 = calculateNewLimitc5(user.settings.adm);
      user.limc5i = 0;
      user.limc4 = calculateNewLimitc4(user.settings.adm);
      user.limc4i = 0;
      user.limc3 = calculateNewLimitc3(user.settings.adm);
      user.limc3i = 0;
      user.limc2 = calculateNewLimitc2(user.settings.adm);
      user.limc2i = 0;
      user.limc1 = calculateNewLimitc1(user.settings.adm);
      user.limc1i = 0;
      user.limbilet = calculateNewLimitbilet(user.settings.adm);
      user.limbileti = 0;
      user.limgb = calculateNewLimitgb(user.settings.adm);
      user.limgbi = 0;
      user.limbtc = calculateNewLimitbtc(user.settings.adm);
      user.limbtci = 0;
      user.limbank = calculateNewLimitbank(user.settings.adm);
      user.limbanki = 0;
      user.limfarm = calculateNewLimitfarm(user.settings.adm);
      user.limfarmi = 0;
      user.limpos1 = calculateNewLimitpos1(user.settings.adm);
      user.limpos1i = 0;
      user.limpos2 = calculateNewLimitpos2(user.settings.adm);
      user.limpos2i = 0;
      user.limpos3 = calculateNewLimitpos3(user.settings.adm);
      user.limpos3i = 0;
    }
    user.limsms = 0;
    let bon = utils.random(1, 3)
    user.oval += bon
  });
}

scheduleTask();

function calculateNewLimitc16(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc15(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc14(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc13(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc12(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc11(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc10(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc9(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return null; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc8(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc7(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc6(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc5(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc4(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc3(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc2(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitc1(adminLevel) {
  if (adminLevel == 2) {
    return 1;
  } else if (adminLevel == 3) {
    return 3;
  } else if (adminLevel == 4) {
    return 5;
  } else if (adminLevel == 5) {
    return 10;
  } else if (adminLevel == 6) {
    return 15;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitbilet(adminLevel) {
  if (adminLevel == 2) {
    return 10;
  } else if (adminLevel == 3) {
    return 20;
  } else if (adminLevel == 4) {
    return 30;
  } else if (adminLevel == 5) {
    return 40;
  } else if (adminLevel == 6) {
    return 50;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitgb(adminLevel) {
  if (adminLevel == 2) {
    return 15000;
  } else if (adminLevel == 3) {
    return 25000;
  } else if (adminLevel == 4) {
    return 50000;
  } else if (adminLevel == 5) {
    return 100000;
  } else if (adminLevel == 6) {
    return 200000;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitbtc(adminLevel) {
  if (adminLevel == 2) {
    return 100;
  } else if (adminLevel == 3) {
    return 200;
  } else if (adminLevel == 4) {
    return 300;
  } else if (adminLevel == 5) {
    return 400;
  } else if (adminLevel == 6) {
    return 500;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitbank(adminLevel) {
  if (adminLevel == 2) {
    return 1000000;
  } else if (adminLevel == 3) {
    return 10000000;
  } else if (adminLevel == 4) {
    return 15000000;
  } else if (adminLevel == 5) {
    return 20000000;
  } else if (adminLevel == 6) {
    return 25000000;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitfarm(adminLevel) {
  if (adminLevel == 2) {
    return 5;
  } else if (adminLevel == 3) {
    return 10;
  } else if (adminLevel == 4) {
    return 15;
  } else if (adminLevel == 5) {
    return 20;
  } else if (adminLevel == 6) {
    return 25;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitpos1(adminLevel) {
  if (adminLevel == 2) {
    return 5;
  } else if (adminLevel == 3) {
    return 10;
  } else if (adminLevel == 4) {
    return 15;
  } else if (adminLevel == 5) {
    return 20;
  } else if (adminLevel == 6) {
    return 25;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitpos2(adminLevel) {
  if (adminLevel == 2) {
    return 5;
  } else if (adminLevel == 3) {
    return 10;
  } else if (adminLevel == 4) {
    return 15;
  } else if (adminLevel == 5) {
    return 20;
  } else if (adminLevel == 6) {
    return 25;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

function calculateNewLimitpos3(adminLevel) {
  if (adminLevel == 2) {
    return 5;
  } else if (adminLevel == 3) {
    return 10;
  } else if (adminLevel == 4) {
    return 15;
  } else if (adminLevel == 5) {
    return 20;
  } else if (adminLevel == 6) {
    return 25;
  } else if (adminLevel > 6) {
    return Infinity; // Безлимит
  } else {
    return 0; 
  }
}

// ===========лимитное========

cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {

  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (
    message.user.settings.adm < 2
  )
    return bot(`Вы не админ`);

  if (message.user.bans.pban)
    return bot(`Вам запрещено выдавать деньги другим игрокам и самому себе. 💥`);

  if (!Number(message.args[2])) return bot(`ошибка`);

  message.args[2] = Math.floor(Number(message.args[2]));


  if (message.args[2] <= 0) return;


  let user = double.find((x) => x.uid === Number(message.args[1]));
  if (!user) return bot(`неверный ID игрока.`);


  if (message.user.limitadd == null)
    message.user.limitadd = { timeradd: utils.time(), sent: 0, paylimitadd: message.user.limitadd?.playerlimitadd || 0 }; // Инициализация paylimitadd

  if (utils.time() - message.user.limitadd.timeradd >= 3600) {
    message.user.limitadd.timeradd = utils.time();
    message.user.limitadd.sent = 0;
    message.user.limitadd.paylimitadd = message.user.limitadd.playerlimitadd;
  }

  if (message.args[2] + message.user.limitadd.sent > message.user.limitadd.playerlimitadd) {
      return bot(`Вы превысили лимит выдачи.\n✅ Доступно: ${utils.sp(message.user.limitadd.playerlimitadd - message.user.limitadd.sent)} $`);
  }

  message.user.limitadd.sent += message.args[2];

  user.balance += message.args[2];


  await bot(
    `Вы выдали игроку ${user.tag} ${utils.sp(
      message.args[2]
    )}$ 💵\n\n😸 Игрок успешно получил об этом уведомление!`
  );

  if (user.notifications)
    await vk.api.messages.send({
      user_id: user.id,
      message: `▶️ УВЕДОМЛЕНИЕ

🤗 Администратор @id${message.user.id} (${message.user.tag
        }) выдал Вам ${utils.sp(message.args[2])}$ 💵
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
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

  await vk.api.messages.send({
    chat_id: chatlogi,
    forward_messages: message.id,
    message: `# ВЫДАЧА:

▶️ Выдал: @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}]
👤 Получил: @id${user.id} (${user.tag})[ID: ${user.uid}]
💰 Сумма: ${utils.sp(message.args[2])}$`,
    random_id: 0,
  });


});

cmd.hear(/^(?:выдать билеты)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {

  const adminLevel = message.user.settings.adm;

  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);
  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  // **Инициализация и проверка лимита для билетов**
  const adminId = message.user.id;

  // Инициализируем limbileti, если оно undefined
  if (message.user.limbileti === undefined) {
    message.user.limbileti = 0;
  }

  // Обрабатываем случай, когда limbilet равно null (безлимит)
  const limbilet = message.user.limbilet === null ? Infinity : message.user.limbilet;


  let availableLimit = limbilet - message.user.limbileti;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи билетов. Вы можете выдать еще ${availableLimit} билетов.`);
  }

  // **Выдача билетов**
  user.bilet += quantity;
  message.user.limbileti += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Фортуна 1 крутить`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} билетов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Выдал ${quantity} билетов пользователю [id${user.id}|${user.tag}] с ${user.uid} uid.`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} билетов.`);
});

cmd.hear(/^(?:к11|дай админ кейс)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {

  const adminLevel = message.user.settings.adm;

  if (adminLevel < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);
  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  const adminId = message.user.id;

  // Инициализация limc11i, если оно undefined
  if (message.user.limc11i === undefined) {
    message.user.limc11i = 0;
  }

  // Обработка случая когда limc11 === null (безлимит)
  const limc11 = message.user.limc11 === null ? Infinity : message.user.limc11;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc11 - message.user.limc11i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать еще ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c11 += quantity;
  message.user.limc11i += quantity;

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 11`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} админ кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Выдал ${quantity} админ кейсов пользователю [id${user.id}|${user.tag}] с ${user.uid} uid.`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} админ кейсов.`);

});

cmd.hear(/^(?:к10|c10)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  const adminLevel = message.user.settings.adm;

  if (adminLevel < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);
  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  const adminId = message.user.id;

  // Инициализируем limc10i, если оно undefined
  if (message.user.limc10i === undefined) {
    message.user.limc10i = 0;
  }

  // Обрабатываем случай, когда limc10 равно null (безлимит)
  const limc10 = message.user.limc10 === null ? Infinity : message.user.limc10;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc10 - message.user.limc10i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c10 += quantity;
  message.user.limc10i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 10`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} ультра кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Выдал ${quantity} ультра кейсов пользователю [id${user.id}|${user.tag}] с ${user.uid} uid.`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} ультра кейсов.`);
});

cmd.hear(/^(?:посылка 1)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  const adminLevel = message.user.settings.adm;
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 2) return bot("У вас недостаточно прав");

  if (!Number(message.args[2])) return bot("Укажите корректное число посылок.");

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return bot("Количество посылок должно быть больше 0.");

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot("Пользователя не существует.");

  // Инициализация limpos1i, если оно undefined
  if (message.user.limpos1i === undefined) {
    message.user.limpos1i = 0;
  }

  // Обработка null для limpos1 (безлимит)
  const limpos1 = message.user.limpos1 === null ? Infinity : message.user.limpos1;


  let availableLimit = limpos1 - message.user.limpos1i;
  if (message.args[2] > availableLimit)
    return bot(
      `превышен лимит кол-во посылок. Максимум: ${availableLimit} шт. ❌`
    );

  user.possilka1 = message.args[2];
  message.user.limpos1i += message.args[2];

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Установил денежные посылки  [id${user.id}|${user.tag}] ${user.tag}  в количестве ${message.args[2]}`, // Использовать message.args[2]
    random_id: 0
  });
  return bot(
    `Количество денежных посылок у @id${user.id} (${user.tag
    }) изменено на ${utils.sp(message.args[2])}` // Использовать message.args[2]
  );
});

cmd.hear(/^(?:посылка 2)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  const adminLevel = message.user.settings.adm;
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 2) return bot("У вас недостаточно прав");

  if (!Number(message.args[2])) return bot("Укажите корректное число посылок.");

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return bot("Количество посылок должно быть больше 0.");

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot("Пользователя не существует.");

  // Инициализируем limpos2i, если оно undefined
  if (message.user.limpos2i === undefined) {
    message.user.limpos2i = 0;
  }

  // Обрабатываем случай, когда limpos2 равно null (безлимит)
  const limpos2 = message.user.limpos2 === null ? Infinity : message.user.limpos2;


  let availableLimit = limpos2 - message.user.limpos2i;
  if (message.args[2] > availableLimit)
    return bot(
      `превышен лимит кол-во посылок. Максимум: ${availableLimit} шт. ❌`
    );

  user.possilka2 = message.args[2];
  message.user.limpos2i += message.args[2];

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Установил элитные посылки  [id${user.id}|${user.tag}] ${user.tag}  в количестве ${message.args[2]}`, // Использовать message.args[2]
    random_id: 0
  });
  return bot(
    `Количество элитных посылок у @id${user.id} (${user.tag
    }) изменено на ${utils.sp(message.args[2])}` // Использовать message.args[2]
  );
});

cmd.hear(/^(?:посылка 3)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  const adminLevel = message.user.settings.adm;
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 2) return bot("У вас недостаточно прав");

  if (!Number(message.args[2])) return bot("Укажите корректное число посылок.");

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return bot("Количество посылок должно быть больше 0.");

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot("Пользователя не существует.");

  // Инициализация limpos3i, если оно undefined
  if (message.user.limpos3i === undefined) {
    message.user.limpos3i = 0;
  }

  // Обработка null для limpos3 (безлимит)
  const limpos3 = message.user.limpos3 === null ? Infinity : message.user.limpos3;

  let availableLimit = limpos3 - message.user.limpos3i;

  if (message.args[2] > availableLimit)
    return bot(
      `превышен лимит кол-во посылок. Максимум: ${availableLimit} шт. ❌`
    );

  user.possilka3 = message.args[2];
  message.user.limpos3i += message.args[2];

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Установил премиум посылки  [id${user.id}|${user.tag}] ${user.tag}  в количестве ${message.args[2]}`, // Используем message.args[2] для количества
    random_id: 0
  });
  return bot(
    `Количество премиум посылок у @id${user.id} (${user.tag
    }) изменено на ${utils.sp(message.args[2])}` // Используем message.args[2] для количества
  );
});

cmd.hear(/^(?:выдать btc|выдать биткоины|выдать биткоин|выдать бит)\s([0-9]+)\s(.*)$/i, async (message, bot) => {

  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (!Number(message.args[2])) return bot("Укажите корректное число BTC.");

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return bot("Количество BTC должно быть больше 0.");

  const userId = Number(message.args[1]);
  const btcAmount = message.args[2];
  const adminLevel = message.user.settings.adm;

  let user = double.find((x) => x.uid === userId);

  if (!user) {
    return bot(`неверный ID игрока.`);
  }

  // Инициализируем limbtci, если оно undefined
  if (message.user.limbtci === undefined) {
    message.user.limbtci = 0;
  }

  // Обрабатываем случай, когда limbtc равно null (безлимит)
  const limbtc = message.user.limbtc === null ? Infinity : message.user.limbtc;

  // Check if the quantity exceeds the available limit
  let availableLimit = limbtc - message.user.limbtci;
  if (btcAmount > availableLimit) {
    return bot(`❌ Превышен лимит выдачи btc. Вы можете выдать максимум ${availableLimit} btc.`);
  }

  // **Выдача BTC**
  user.btc += btcAmount;
  message.user.limbtci += btcAmount; // Update the issued quantity

  await bot(
    `Вы выдали игроку ${user.tag} ${utils.sp(
      btcAmount
    )} биткоинов! 🌐`
  );

  if (user.notifications)
    await vk.api.messages.send({
      user_id: user.id,
      message: `▶️ УВЕДОМЛЕНИЕ

🤗 Администратор @id${message.user.id} (${message.user.tag
        }) выдал Вам ${utils.sp(btcAmount)} биткоинов! 🌐
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
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

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `# ВЫДАЧА:

▶️ Выдал: @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}]
👤 Получил: @id${user.id} (${user.tag})[ID: ${user.uid}]
💰 Сумма: ${utils.sp(btcAmount)}$`,
    random_id: 0,
  });


});

cmd.hear(/^(?:выдать фермы)\s([0-9]+)\s(.*)\s(.*)$/i, async (message, bot) => {
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");
  message.args[3] = message.args[3].replace(/(\.|\,)/gi, "");
  message.args[3] = message.args[3].replace(/(к|k)/gi, "000");
  message.args[3] = message.args[3].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
  const adminLevel = message.user.settings.adm;

  const userId = Number(message.args[1]);
  const farmNumber = parseInt(message.args[2], 10); // Номер фермы
  const farmCount = parseInt(message.args[3], 10); // Количество ферм

  if (isNaN(farmNumber) || isNaN(farmCount)) {
    return bot("Неверный формат ввода.");
  }

  if (farmCount <= 0) return bot("Количество ферм должно быть больше 0.");

  let user = double.find((x) => x.uid === userId);

  if (!user) return bot(`неверный ID игрока.`);

  // Инициализация limfarmi, если оно undefined
  if (message.user.limfarmi === undefined) {
    message.user.limfarmi = 0;
  }

  // Обработка null для limfarm (безлимит)
  const limfarm = message.user.limfarm === null ? Infinity : message.user.limfarm;

  // Check if the quantity exceeds the available limit
  let availableLimit = limfarm - message.user.limfarmi;
  if (farmCount > availableLimit) {
    return bot(`❌ Превышен лимит выдачи ферм. Вы можете выдать максимум ${availableLimit} ферм.`);
  }

  if (user.limit.farmlimit < user.misc.farm_count + farmCount) { // Добавлена проверка на лимит игрока
    return bot(`У данного игрока лимит в ${user.limit.farmlimit} ферм`);
  }

  user.misc.farm = farmNumber; // номер фермы
  user.misc.farm_count += farmCount; // кол-во ферм
  message.user.limfarmi += farmCount; // Update the issued quantity

  await message.send(
    `вы выдали фермы игроку @id${user.id}(${user.tag})\n\n💽 Номер фермы ${farmNumber
    }\n▶️ Кол-во: ${utils.sp(farmCount)}`
  );

  if (user.notifications) {
    await vk.api.messages.send({
      user_id: user.id,
      message: `▶️ УВЕДОМЛЕНИЕ:

🔥 Вам зачислено ${utils.sp(farmCount)}шт. ферм (${farms[farmNumber - 1].name
        })
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: `уведомления выкл` }),
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

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал фермы номер ${farmNumber} в количестве ${farmCount}  [id${user.id}|${user.tag}] ${user.tag}`,
    random_id: 0
  });

});

cmd.hear(/^(?:выдать банк)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  if (!Number(message.args[2])) return bot("Укажите корректную сумму для банка.");

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return bot("Сумма должна быть больше 0.");

  const userId = Number(message.args[1]);
  const bankAmount = message.args[2];
  const adminLevel = message.user.settings.adm;

  let user = double.find((x) => x.uid === userId);

  if (!user) return bot(`неверный ID игрока.`);

  // Инициализируем limbanki, если оно undefined
  if (message.user.limbanki === undefined) {
    message.user.limbanki = 0;
  }

  // Обрабатываем случай, когда limbank равно null (безлимит)
  const limbank = message.user.limbank === null ? Infinity : message.user.limbank;

  // Check if the quantity exceeds the available limit
  let availableLimit = limbank - message.user.limbanki;
  if (bankAmount > availableLimit) {
    return bot(`❌ Превышен лимит выдачи на банк. Вы можете выдать максимум ${availableLimit}$.`);
  }

  // Выдача на банк
  user.bank += bankAmount;
  message.user.limbanki += bankAmount; // Update the issued quantity

  await bot(
    `вы выдали игроку @id${user.id}(${user.tag}) на банк ${utils.sp(
      bankAmount
    )}$ 💵`
  );

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал на банк  [id${user.id}|${user.tag}] ${user.tag}  в количестве ${bankAmount}`,
    random_id: 0
  });

  if (user.notifications)
    await vk.api.messages.send({
      user_id: user.id,
      message: `▶️ УВЕДОМЛЕНИЕ:

🤗 Администратор @id${message.user.id} (${message.user.tag
        }) выдал Вам ${utils.sp(bankAmount)}$ на банковский счёт 💳
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: `уведомления выкл` }),
              "label": `🔕`
            },
            "color": "negative"
          },
          ]
        ]
      }),
      random_id: 0,
    });
});

cmd.hear(/^(?:выдать редкий|редкий выдать|редкий)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const targetUid = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === targetUid);

  if (!user) {
    return bot(`❌ Пользователь с uid ${targetUid} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc12i, если оно undefined
  if (message.user.limc12i === undefined) {
    message.user.limc12i = 0;
  }

  // Обрабатываем случай, когда limc12 равно null (безлимит)
  const limc12 = message.user.limc12 === null ? Infinity : message.user.limc12;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc12 - message.user.limc12i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи редких стардропов. Вы можете выдать максимум ${availableLimit} редких стардропов.`);
  }
  // Выдача редких стардропов
  user.c12 += quantity;
  message.user.limc12i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `⭐ Тык редкий ⭐`
        },
        "color": "positive"
      }]
    ]
  });

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "rare";
  const attachment = RARITIES.rare.image;

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} редких стардропов.`,
    keyboard: keyboard,
    random_id: 0,
    attachment: attachment
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал редкий стардроп [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });
  fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
  console.log("Изменения сохранены в users.json");

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} редких стардропов.`);
});

cmd.hear(/^(?:выдать сверхредкий|сверхредкий выдать|сверхредкий)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const targetUid = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === targetUid);

  if (!user) {
    return bot(`❌ Пользователь с uid ${targetUid} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc13i, если оно undefined
  if (message.user.limc13i === undefined) {
    message.user.limc13i = 0;
  }

  // Обрабатываем случай, когда limc13 равно null (безлимит)
  const limc13 = message.user.limc13 === null ? Infinity : message.user.limc13;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc13 - message.user.limc13i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи сверхредкий стардроп. Вы можете выдать максимум ${availableLimit} сверхредкий стардроп.`);
  }

  // Выдача сверхредких стардропов
  user.c13 += quantity;
  message.user.limc13i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `⭐ Тык сверхредкий ⭐`
        },
        "color": "positive"
      }]
    ]
  });

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "super_rare";
  const attachment = RARITIES.super_rare.image;

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} сверхредкий стардропов.`,
    keyboard: keyboard,
    random_id: 0,
    attachment: attachment
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал сверхредкий стардроп [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });
  fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
  console.log("Изменения сохранены в users.json");

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} сверхредкий стардропов.`);
});

cmd.hear(/^(?:выдать эпик|эпик выдать|эпик)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const targetUid = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === targetUid);

  if (!user) {
    return bot(`❌ Пользователь с uid ${targetUid} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc14i, если оно undefined
  if (message.user.limc14i === undefined) {
    message.user.limc14i = 0;
  }

  // Обрабатываем случай, когда limc14 равно null (безлимит)
  const limc14 = message.user.limc14 === null ? Infinity : message.user.limc14;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc14 - message.user.limc14i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи эпический стардроп. Вы можете выдать максимум ${availableLimit} эпический стардроп.`);
  }

  // Выдача эпических стардропов
  user.c14 += quantity;
  message.user.limc14i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `⭐ Тык эпический ⭐`
        },
        "color": "positive"
      }]
    ]
  });

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "epic";
  const attachment = RARITIES.epic.image;

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} эпических стардропов.`,
    keyboard: keyboard,
    random_id: 0,
    attachment: attachment
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал эпический стардроп [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
  console.log("Изменения сохранены в users.json");
  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} эпических стардропов.`);
});

cmd.hear(/^(?:миф выдать|миф выдать стардроп|миф|выдать миф)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const targetUid = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === targetUid);

  if (!user) {
    return bot(`❌ Пользователь с uid ${targetUid} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc12i, если оно undefined
  if (message.user.limc12i === undefined) {
    message.user.limc12i = 0;
  }

  // Обрабатываем случай, когда limc12 равно null (безлимит)
  const limc12 = message.user.limc12 === null ? Infinity : message.user.limc12;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc12 - message.user.limc12i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи мифический стардроп. Вы можете выдать максимум ${availableLimit} мифический стардроп.`);
  }

  // Выдача мифических стардропов
  user.c15 += quantity;
  message.user.limc12i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `⭐ Тык Мифический ⭐`
        },
        "color": "positive"
      }]
    ]
  });

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "mythical";
  const attachment = RARITIES.mythical.image;

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} мифических стардропов.`,
    keyboard: keyboard,
    random_id: 0,
    attachment: attachment
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал мифический стардроп [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
  console.log("Изменения сохранены в users.json");
  
  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} мифических стардропов.`);
});

cmd.hear(/^(?:легу выдать|лег|легендарку|выдать легу|легу|лега|c16|к16)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const targetUid = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === targetUid);

  if (!user) {
    return bot(`❌ Пользователь с uid ${targetUid} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc16i, если оно undefined
  if (message.user.limc16i === undefined) {
    message.user.limc16i = 0;
  }

  // Обрабатываем случай, когда limc16 равно null (безлимит)
  const limc16 = message.user.limc16 === null ? Infinity : message.user.limc16;


  // Check if the quantity exceeds the available limit
  let availableLimit = limc16 - message.user.limc16i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи легендарный стардроп. Вы можете выдать максимум ${availableLimit} легендарный стардроп.`);
  }

  // Log the quantity of user.c16 before the update
  console.log(`[BEFORE] user.c16: ${user.c16}`);

  // Log the quantity of message.user.limc16i before the update
  console.log(`[BEFORE] message.user.limc16i: ${message.user.limc16i}`);


  // Выдача легендарных стардропов
  user.c16 += quantity;
  message.user.limc16i += quantity; // Update the issued quantity

  // Log the quantity of user.c16 after the update
  console.log(`[AFTER] user.c16: ${user.c16}`);

  // Log the quantity of message.user.limc16i after the update
  console.log(`[AFTER] message.user.limc16i: ${message.user.limc16i}`);


  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `⭐ Тык легендарный ⭐`
        },
        "color": "positive"
      }]
    ]
  });

  // Устанавливаем нужную редкость и изображение при выдаче
  user.currentRarity2 = "legendary";
  const attachment = RARITIES.legendary.image;

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} легендарных стардропов.`,
    keyboard: keyboard,
    random_id: 0,
    attachment: attachment
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал легендарный стардроп [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));
  console.log("Изменения сохранены в users.json");

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} легендарных стардропов.`);
});

cmd.hear(/^(?:к1|дай об|c1)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
  const adminLevel = message.user.settings.adm;

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;

  // Инициализация limc1i, если undefined
  if (message.user.limc1i === undefined) {
    message.user.limc1i = 0;
  }

  // Обработка null для limc1 (безлимит)
  const limc1 = message.user.limc1 === null ? Infinity : message.user.limc1;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc1 - message.user.limc1i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c1 += quantity;
  message.user.limc1i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 1`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} обычных кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c1 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} обычных кейсов.`);

});

cmd.hear(/^(?:к2|дай зол|c2)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
  const adminLevel = message.user.settings.adm;

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;

  // Инициализируем limc2i, если оно undefined
  if (message.user.limc2i === undefined) {
    message.user.limc2i = 0;
  }

  // Обрабатываем случай, когда message.user.limc2 равно null (безлимит)
  const limc2 = message.user.limc2 === null ? Infinity : message.user.limc2;


  // Check if the quantity exceeds the available limit
  let availableLimit = limc2 - message.user.limc2i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c2 += quantity;
  message.user.limc2i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 2`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} золотых кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c2 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} золотых кейсов.`);

});

cmd.hear(/^(?:к3|дай донк|c3)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализация limc3i, если оно undefined
  if (message.user.limc3i === undefined) {
    message.user.limc3i = 0;
  }

  // Обработка null для limc3 (безлимит)
  const limc3 = message.user.limc3 === null ? Infinity : message.user.limc3;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc3 - message.user.limc3i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c3 += quantity;
  message.user.limc3i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 3`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} донат кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c3 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} донат кейсов.`);

});

cmd.hear(/^(?:к4|дай приз стардроп|c4)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем message.user.limc4i, если оно undefined
  if (message.user.limc4i === undefined) {
    message.user.limc4i = 0;
  }

  // Обрабатываем случай, когда message.user.limc4 равно null (безлимит)
  const limc4 = message.user.limc4 === null ? Infinity : message.user.limc4;


  // Check if the quantity exceeds the available limit
  let availableLimit = limc4 - message.user.limc4i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c4 += quantity;
  message.user.limc4i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 4`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} Starr Drop.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c4 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} Starr Drop.`);
});

cmd.hear(/^(?:хелл|дай хелл|к5|c5)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем limc5i, если undefined
  if (message.user.limc5i === undefined) {
    message.user.limc5i = 0;
  }

  // Учитываем, что limc5 может быть null (безлимит)
  const limc5 = message.user.limc5 === null ? Infinity : message.user.limc5;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc5 - message.user.limc5i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c5 += quantity;
  message.user.limc5i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 5`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} Halloween кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c5 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} Halloween кейсов.`);
});

cmd.hear(/^(?:к6|дай секрет|c6)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализируем message.user.limc6i, если оно undefined
  if (message.user.limc6i === undefined) {
    message.user.limc6i = 0;
  }

  // Учитываем возможность message.user.limc6 быть null (безлимит)
  const limc6 = message.user.limc6 === null ? Infinity : message.user.limc6;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc6 - message.user.limc6i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c6 += quantity;
  message.user.limc6i += quantity; // Обновляем выданное количество

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 6`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} секретных кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c6 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} секретных кейсов.`);
});

cmd.hear(/^(?:к7|дай авто|c7)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // Инициализация limc7i, если оно undefined
  if (message.user.limc7i === undefined) {
    message.user.limc7i = 0;
  }

  // Учитываем возможность limc7 быть null (безлимит)
  const limc7 = message.user.limc7 === null ? Infinity : message.user.limc7;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc7 - message.user.limc7i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c7 += quantity;
  message.user.limc7i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 7`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} автозвук кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c7 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${message.user.tag}) ${quantity} автозвук кейсов.`);
});

cmd.hear(/^(?:нг|дай нг|к8|c8)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;

  // **Инициализация и проверка лимита для c8 кейсов**
  if (message.user.limc8i === undefined) {
      message.user.limc8i = 0; // Initialize to zero
  }

  // **Преобразуем limc8 в число, если оно равно null**
  const limc8 = message.user.limc8 === null ? Infinity : message.user.limc8;

  // Check if the quantity exceeds the available limit
  let availableLimit = limc8 - message.user.limc8i;
  if (quantity > availableLimit) {
      return bot(`❌ Превышен лимит выдачи кейсов. Вы можете выдать максимум ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c8 += quantity;
  message.user.limc8i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
      "inline": true,
      "buttons": [
          [{
              "action": {
                  "type": "text",
                  "payload": "{}",
                  "label": `Кейс открыть 8`
              },
              "color": "positive"
          }]
      ]
  });

  await vk.api.messages.send({
      user_id: user.id,
      message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} новогодних кейсов.`,
      keyboard: keyboard,
      random_id: 0,
  });

  await vk.api.messages.send({
      chat_id: chatlogi,
      message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c8 [id${user.id}|${user.tag}] ${user.tag}  в количестве ${quantity}`,
      random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} новогодних кейсов.`);

});

cmd.hear(/^(?:к9|дай прем|c9)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  const userId = parseInt(message.args[1], 10);
  const quantity = parseInt(message.args[2], 10);

  if (isNaN(quantity) || quantity <= 0) {
    return bot("❌ Укажите корректное количество (целое число больше 0).");
  }

  let user = double.find(x => x.uid === userId);

  if (!user) {
    return bot(`❌ Пользователь с id ${userId} не найден.`);
  }

  const adminId = message.user.id;
  const adminLevel = message.user.settings.adm;



  // **Учитываем возможность limc9 быть null (безлимит)**
  const limc9 = message.user.limc9 === null ? Infinity : message.user.limc9;

  let availableLimit = limc9 - message.user.limc9i;
  if (quantity > availableLimit) {
    return bot(`❌ Превышен лимит выдачи кейсов. Вы можете еще выдать ${availableLimit} кейсов.`);
  }

  // **Выдача кейсов**
  user.c9 += quantity;
  message.user.limc9i += quantity; // Update the issued quantity

  const keyboard = JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": "{}",
          "label": `Кейс открыть 9`
        },
        "color": "positive"
      }]
    ]
  });

  await vk.api.messages.send({
    user_id: user.id,
    message: `✅ Вам выдал *id${adminId} (${message.user.tag}) ${quantity} премиум кейсов.`,
    keyboard: keyboard,
    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    message: `👤Админ:  [id${message.user.id}|${message.user.tag}]\n📦 Выдал кейсы c9 [id${user.id}|${user.tag}] ${user.tag} в количестве ${quantity}`,
    random_id: 0
  });

  return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} премиум кейсов.`);
});

cmd.hear(/^(?:-гб)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  
  if (message.user.settings.adm < 2) return bot(`нужен уровень администратора`)

    message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
    message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
    message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
  
    if(!Number(message.args[2])) return;
    message.args[2] = Math.floor(Number(message.args[2]));
  
    if(message.args[2] <= 0) return bot(`укажите сумму, которую хотите забрать.`)
  
    
    else if(message.args[2])
    {
      let user = double.find(x=> x.uid === Number(message.args[1]));
      if(!user) return bot(`укажите ID игрока из его профиля. `);
  

      user.balance2 -= message.args[2];
      await bot(`вы забрали у [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} ${val4}`);
        }
          try{
     vk.api.messages.send({chat_id: chatlogi, message: `🔱 Super - [id${message.user.id}|${message.user.tag}]
🆔 Забрал у игрока - ${ Number(message.args[1])} 
👑 Сумма ${val4} - ${utils.sp(message.args[2])} `, random_id: 0})
          }catch(e) {
  console.log('Забрали ${val4}.')
};
});

cmd.hear(/^(?:гб)(?:\s+([0-9]+)\s*(.*))?$/i, async (message, bot) => {
  try {
    if (message.user.settings.adm < 2) return bot(`нужен уровень администратора`);

    // Получение UID получателя (если указан)
    const targetUid = message.args[1];

    // Если сумма не указана
    if (!message.args[2]) {
      return bot(`использование: Гб <uid> <сумма>.`);
    }

    // Обработка суммы
    let sumString = message.args[2];
    sumString = sumString.replace(/(\.|\,)/ig, ''); // Удаление точек или запятых
    sumString = sumString.replace(/(к|k)/ig, '000'); // Замена 'к' на '000'
    sumString = sumString.replace(/(м|m)/ig, '000000'); // Замена 'м' на '000000'

    let sum = Math.floor(Number(sumString)); // Преобразование в число
    if (isNaN(sum) || sum <= 0) {
      return bot(`Для выдачи валюты напишите - Гб <uid> 100.`);
    }

    // Поиск пользователя по UID
    let user = double.find(x => x.uid === Number(targetUid));
    if (!user) {
      return bot(`❌ Пользователь с UID ${targetUid} не найден.`);
    }

    // Инициализация limgbi, если оно undefined
    if (message.user.limgbi === undefined) {
      message.user.limgbi = 0;
    }

    // Обработка null для limgb (безлимит)
    const limgb = message.user.limgb === null ? Infinity : message.user.limgb;

    let availableLimit = limgb - message.user.limgbi;

    if (sum > availableLimit) {
        return bot(`❌ Превышен лимит выдачи ${val4}. Вы можете еще выдать ${availableLimit} GB.`);
    }

    // Выдача суммы пользователю
    user.balance2 += sum; 
    message.user.limgbi += sum; // Увеличиваем счетчик использованного лимита у админа
    
    await message.send("✅");

    // Проверка ID перед отправкой сообщения
    if (user.id > 0) {
      // Отправка уведомления пользователю
      await vk.api.messages.send({
        random_id: 0,
        user_id: user.id,
        message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : message.user.tag}, ${utils.sp(sum, true)} ${val4} добавлено на баланс! 🚀`
      });
    } else {
      console.warn(`Не удалось отправить сообщение пользователю с UID ${targetUid}, ID пользователя недействителен.`);
    }
    
    await vk.api.messages.send({
        chat_id: chatlogi,
        message: `👤Админ: [id${message.user.id}|${message.user.tag}]\n💰 Выдал ${val4} [id${user.id}|${user.tag}] в количестве ${sum}`,
        random_id: 0
    });

  } catch (e) {
    console.error("Ошибка при выдаче GB:", e);
    bot(`Произошла ошибка при выдаче GB: ${e.message}`);
  }
});

// ==========не лимитное=============

cmd.hear(/^(?:-bal)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");

  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");

  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");

  if (message.user.settings.adm < 3) return;

  if (!Number(message.args[2])) return;

  message.args[2] = Math.floor(Number(message.args[2]));

  if (message.args[2] <= 0) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока.`);

    user.balance -= message.args[2];

    await bot(
      `вы сняли со счета игрока ${user.tag} ${utils.sp(message.args[2])}$`
    );

    await vk.api.messages.send({
      chat_id: chatlogi,
      forward_messages: message.id,
      message: `# РЕМУВ - БАЛАНСА:

▶️ Снял: @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}]
👤 Кому: @id${user.id} (${user.tag})[ID: ${user.uid}]
💰 Сумма: ${utils.sp(message.args[2])}$ 💵`,
      random_id: 0,
    });
  }
});

cmd.hear(/^(?:забрать билеты|-билеты)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }


    if (user.bilet <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет билетов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }


    if (quantity > user.bilet) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно билетов. У него всего ${user.bilet} билетов.`);
    }

    user.bilet -= quantity;

    const adminId = message.user.id;

    const keyboard = JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": "{}",
            "label": `Кейс открыть 11`
          },
          "color": "positive"
        }]
      ]
    });

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);


    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} билетов.`,
      // keyboard: keyboard,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} билетов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} билетов.`);
  
});

cmd.hear(/^(?:Удалить титул)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

  let user = double.find((x) => x.uid == message.args[1]);

  if (!user) return bot(`неверный ID игрока! ❌`);

  if (
    user.stock.status === "Администратор" ||
    user.stock.status === "Игрок" ||
    user.stock.status === "Premium" ||
    user.stock.status === "Джокер" ||
    user.stock.status === "Бизнесмен" ||
    user.stock.status === "VIP" ||
    user.stock.status === "🔥Support🔥"
  )
    return bot(`У игрока нет титула!`);

  const oldStatus = user.stock.status;
  user.stock.status = "-";

  await bot(
    `Вы удалили титул игроку @id${user.id} (${user.tag}) 👤\n\n➖ Удаление статуса просто так — запрещено! ➖`
  );

  if (user.notifications)
    await vk.api.messages.send({
      user_id: user.id,
      message: `Нарушение правил титула! 😥
👤 Администратор @id${message.user.id}(${message.user.tag}) удалил Вам титул! ❌`,
      random_id: 0,
    });

  await vk.api.messages.send({
    chat_id: chatlogi,
    forward_messages: message.id,
    message: `#УДАЛЕНИЕ - ТИТУЛА:
👤 Игроку: @id${user.id} (${user.tag})[ID: ${user.uid}]
▶ Удалил: @id${message.user.id}(${message.user.tag})[ID: ${message.user.uid}]`,
    random_id: 0,
  });
});

cmd.hear(/^(?:-к10|-c10)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }


    if (user.c10 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет ультра кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }


    if (quantity > user.с10) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно ультра кейсов. У него всего ${user.bilet} билетов.`);
    }

    user.c10 -= quantity;

    const adminId = message.user.id;

    const keyboard = JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": "{}",
            "label": `Кейс открыть 11`
          },
          "color": "positive"
        }]
      ]
    });

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);


    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} ультра кейсов.`,
      // keyboard: keyboard,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} ультра кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} ультра кейсов.`);
  
});

cmd.hear(/^(?:-к11|дай админ кейс)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }


    if (user.c11 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет админ кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }


    if (quantity > user.c11) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно админ кейсов. У него всего ${user.c11}.`);
    }

    user.c11 -= quantity;

    const adminId = message.user.id;

    const keyboard = JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": "{}",
            "label": `Кейс открыть 11`
          },
          "color": "positive"
        }]
      ]
    });

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);


    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} админ кейсов.`,
      // keyboard: keyboard,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} админ кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} админ кейсов.`);
  
});

cmd.hear(/^(?:-к12|-c12)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет редкого кейса для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно редких кейсов. У него всего ${user.c12} кейсов.`);
    }

    user.c12 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} редких кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} редких кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} редких кейсов.`);
  
});

cmd.hear(/^(?:-к13|-c13)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет сверхредкого кейса для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно сверхредких кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c13 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} сверхредких кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} сверхредких кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} сверхредких кейсов.`);
  
});

cmd.hear(/^(?:-к14|-c14)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет эпических кейса для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно эпических кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c14 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} эпических кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} эпических кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} эпических кейсов.`);
  
});

cmd.hear(/^(?:-к15|-c15)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);
    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет мифического кейса для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно мифических кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c15 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} мифических кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} мифических кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} мифических кейсов.`);
  
});

cmd.hear(/^(?:-к16|-c16)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет легендарного кейса для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно легендарных кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c16 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} легендарных кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} легендарных кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} легендарных кейсов.`);
  
});

cmd.hear(/^(?:-к9|-c9)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }


    if (user.c9 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет премиум кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }


    if (quantity > user.с9) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно премиум кейсов. У него всего ${user.bilet} билетов.`);
    }

    user.c10 -= quantity;

    const adminId = message.user.id;

    const keyboard = JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": "{}",
            "label": `Кейс открыть 11`
          },
          "color": "positive"
        }]
      ]
    });

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);


    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} премиум кейсов.`,
      // keyboard: keyboard,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} премиум кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} премиум кейсов.`);
  
});

cmd.hear(/^(?:-к1|-c1)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c1 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет обычных кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c1) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно обычных кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c1 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} обычных кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} обычных кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} обычных кейсов.`);
  
});

cmd.hear(/^(?:-к2|-c2)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c2 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет золотых кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c2) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно золотых кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c2 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} золотых кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} золотых кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} золотых кейсов.`);
  
});

cmd.hear(/^(?:-к3|-c3)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c3 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет донат кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c3) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно донат кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c3 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} донат кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} донат кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} донат кейсов.`);
  
});

cmd.hear(/^(?:-к4|-c4)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c4 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет Starr Drop для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c4) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно Starr Drop. У него всего ${user.c8} Starr Drop.`);
    }

    user.c4 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} Starr Drop.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} Starr Drop у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} Starr Drop.`);
  
});

cmd.hear(/^(?:-к5|-c5)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c5 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет Halloween кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c5) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно Halloween кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c5 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} Halloween кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} Halloween кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} Halloween кейсов.`);
  
});

cmd.hear(/^(?:-к6|-c6)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c6 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет секретных кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c6) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно секретных кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c6 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} автозвук кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} секретных кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} секретных кейсов.`);
  
});

cmd.hear(/^(?:-к7|-c7)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c7 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет автозвук кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c7) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно автозвук кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c7 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} автозвук кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} автозвук кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} автозвук кейсов.`);
  
});

cmd.hear(/^(?:-к8|-c8)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) return bot(`доступно администратору 2 уровня и выше`);

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (user.c8 <= 0) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] нет новогодних кейсов для забирания.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    if (quantity > user.c8) {
      return bot(`❌ У пользователя [id${user.id}|${user.tag}] недостаточно новогодних кейсов. У него всего ${user.c8} кейсов.`);
    }

    user.c8 -= quantity;

    const adminId = message.user.id;

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${quantity} новогодних кейсов.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал ${quantity} новогодних кейсов у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid.`,
      random_id: 0
    });

    return bot(`${randomEmoji} Забрал у пользователя *id${user.id} (${user.tag}) ${quantity} премиум кейсов.`);
  
});


cmd.hear(/^(?:лв)$/i, async (message, bot) => {
  if (message.user.settings.adm < 2) {
    return bot(`доступна для администратора и выше`);
  }

    const formatLimit = (limit) => {
        if (limit === null || limit === undefined) {
            return '∞';
        }
        if (limit === Infinity) {
            return '∞';
        }
        return utils.sp(limit);
    };

  const limitsText = `
Ваши лимиты:
- Билеты: ${formatLimit(message.user.limbilet)}
- Ферма: ${formatLimit(message.user.limfarm)}
- Банк: ${formatLimit(message.user.limbank)}
- BTC: ${formatLimit(message.user.limbtc)}
- GB: ${formatLimit(message.user.limgb)}
- Pos1: ${formatLimit(message.user.limpos1)}
- Pos2: ${formatLimit(message.user.limpos2)}
- Pos3: ${formatLimit(message.user.limpos3)}
- Limc1: ${formatLimit(message.user.limc1)}
- Limc2: ${formatLimit(message.user.limc2)}
- Limc3: ${formatLimit(message.user.limc3)}
- Limc4: ${formatLimit(message.user.limc4)}
- Limc5: ${formatLimit(message.user.limc5)}
- Limc6: ${formatLimit(message.user.limc6)}
- Limc7: ${formatLimit(message.user.limc7)}
- Limc8: ${formatLimit(message.user.limc8)}
- Limc9: ${formatLimit(message.user.limc9)}
- Limc10: ${formatLimit(message.user.limc10)}
- Limc11: ${formatLimit(message.user.limc11)}
- Limc12: ${formatLimit(message.user.limc12)}
- Limc13: ${formatLimit(message.user.limc13)}
- Limc14: ${formatLimit(message.user.limc14)}
- Limc15: ${formatLimit(message.user.limc15)}
- Limc16: ${formatLimit(message.user.limc16)}
`;

  bot(limitsText);
});


module.exports = commands;
