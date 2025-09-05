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

function addZero(num) {
  return num < 10 ? '0' + num : num;
}

function unixStampLefta(stampa) {
  stampa = stampa / 1000;
  let s = Math.floor(stampa % 60);
  stampa = Math.floor(stampa / 60);

  let m = Math.floor(stampa % 60);
  stampa = Math.floor(stampa / 60);

  let h = Math.floor(stampa % 24);
  let d = Math.floor(stampa / 24);
  let y = Math.floor(d / 365);
  d = d % 365;

  let text = '';
  if (y > 0) text += `${y} г. `;
  if (d > 0) text += `${d} д. `;
  if (h > 0) text += `${addZero(h)} ч. `;
  text += `${addZero(m)} мин. ${addZero(s)} сек.`;

  return text.trim();
}

// Основная команда бонуса
cmd.hear(/^(?:бонус|🎁 Бонус)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }

    // Обработка групповых чатов
    if (message.isChat && message.chat.type === 2) {
      if (message.user.reshim == 1) {
        return await handleGroupBonus(message, bot);
      } else if (message.user.reshim == 2) {
        return await handleGroupBonus2(message, bot);
      }
    }

    // Для личных сообщений
    const availableBonuses = {
      'Обычный': { 
        command: 'обычный бонус', 
        emoji: '🎁',
        available: true,
        handler: handlePrivateBonus,
        timerField: 'bonus',
        cooldown: 3600000 // 1 час
      },
      'VIP': { 
        command: 'вип бонус', 
        emoji: '💎',
        available: message.user.settings.vip,
        handler: handleVipBonus,
        timerField: 'vipbonus',
        cooldown: 86400000 // 24 часа
      },
      'PREMIUM': { 
        command: 'премиум бонус', 
        emoji: '🌟',
        available: message.user.settings.premium,
        handler: handlePremiumBonus,
        timerField: 'prembonus',
        cooldown: 86400000 // 24 часа
      },
      'TITAN': { 
        command: 'титан бонус', 
        emoji: '🔥',
        available: message.user.settings.titan,
        handler: handleTitanBonus,
        timerField: 'titanbonus',
        cooldown: 86400000 // 24 часа
      },
      'IMPERATOR': { 
        command: 'император бонус', 
        emoji: '👑',
        available: message.user.settings.imperator,
        handler: handleImperatorBonus,
        timerField: 'imperatorbonus',
        cooldown: 86400000 // 24 часа
      }
    };

    // Формируем кнопки только для доступных бонусов
    let buttons = [];
    
    // Функция для определения цвета кнопки
    const getButtonColor = (bonusType) => {
      const bonus = availableBonuses[bonusType];
      if (!bonus.available) return "negative"; // Серый, если привилегия не доступна
      
      const timerValue = message.user.timers[bonus.timerField] || 0;
      const isReady = timerValue <= Date.now();
      return isReady ? "positive" : "secondary"; // Зеленый если готов, синий если в cooldown
    };
    
    // Функция для формирования текста кнопки
    const getButtonLabel = (bonusType) => {
      const bonus = availableBonuses[bonusType];
      if (!bonus.available) return `${bonus.emoji} ${bonusType} (недоступно)`;
      
      const timerValue = message.user.timers[bonus.timerField] || 0;
      const isReady = timerValue <= Date.now();
      
      if (isReady) return `${bonus.emoji} ${bonusType} (готово)`;
      
      return `${bonus.emoji} ${bonusType}`;
    };

    // Первый ряд - обычный бонус (всегда доступен)
    buttons.push([{
      action: {
        type: "text",
        payload: JSON.stringify({ command: availableBonuses['Обычный'].command }),
        label: getButtonLabel('Обычный')
      },
      color: getButtonColor('Обычный')
    }]);

    // Второй ряд - VIP и PREMIUM (если доступны)
    let premiumButtons = [];
    
    if (availableBonuses['VIP'].available) {
      premiumButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: availableBonuses['VIP'].command }),
          label: getButtonLabel('VIP')
        },
        color: getButtonColor('VIP')
      });
    }
    
    if (availableBonuses['PREMIUM'].available) {
      premiumButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: availableBonuses['PREMIUM'].command }),
          label: getButtonLabel('PREMIUM')
        },
        color: getButtonColor('PREMIUM')
      });
    }
    
    if (premiumButtons.length > 0) {
      buttons.push(premiumButtons);
    }

    // Третий ряд - TITAN и IMPERATOR (если доступны)
    let eliteButtons = [];
    
    if (availableBonuses['TITAN'].available) {
      eliteButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: availableBonuses['TITAN'].command }),
          label: getButtonLabel('TITAN')
        },
        color: getButtonColor('TITAN')
      });
    }
    
    if (availableBonuses['IMPERATOR'].available) {
      eliteButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: availableBonuses['IMPERATOR'].command }),
          label: getButtonLabel('IMPERATOR')
        },
        color: getButtonColor('IMPERATOR')
      });
    }
    
    if (eliteButtons.length > 0) {
      buttons.push(eliteButtons);
    }

    // Если доступен только обычный бонус - сразу выдаем его
    if (buttons.length === 1 && buttons[0].length === 1) {
      return await handlePrivateBonus(message, bot);
    }

    return bot("🎁 Выберите тип бонуса:", {
      keyboard: JSON.stringify({
        inline: true,
        buttons: buttons
      })
    });

  } catch (error) {
    console.error("Ошибка в команде бонус:", error);
    await bot("⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.");
  }
});

// Обработчик обычного бонуса
async function handlePrivateBonus(message, bot) {
  if (message.user.timers.bonus >= Date.now()) {
    return bot(`⏳ Бонус можно будет получить через ${unixStampLefta(message.user.timers.bonus - Date.now())} ⏳`);
  }

  const randbal = utils.random(5000000, 50000000);
  const randrating = utils.random(5, 20);
  const randbank = utils.random(1000000, 5000000);
  const randbtc = utils.random(10, 100);
  const randbil = utils.random(1, 3);
  const randgb = utils.random(100, 1000);

  message.user.timers.bonus = Date.now() + 3600000; 
  const prize = utils.random(1, 6);

  if (!message.user.now.kv1 && message.user.now.kv) { 
    message.user.now.kv1 = true;
    message.user.bilet += 10;
    await bot(`✅ Ты успешно выполнил 1 задание! 
  Награда - 10 билетов 🎟️. 
  
  💡 Не забывай, что каждый час ты можешь забирать бонус и получать призы!`, {
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

  switch (prize) {
    case 1:
      message.user.balance += randbal;
      return bot(`💰 Вы выиграли ${utils.sp(randbal)} ${val1}! 💰`);
    case 2:
      message.user.rating += randrating;
      return bot(`👑 Вы выиграли ${utils.sp(randrating)} рейтинга! 👑\n🏆 Рейтинг: ${utils.sp(message.user.rating)}`);
    case 3:
      message.user.bank += randbank;
      return bot(`🏦 Вы выиграли ${utils.sp(randbank)}$ на свой банковский счёт! 🏦\n💳 Счёт в банке: ${utils.sp(message.user.bank)} ${val1}`);
    case 4:
      message.user.btc += randbtc;
      return bot(`₿ Вы выиграли ${utils.sp(randbtc)} биткоинов! ₿\n🌐 Биткоинов: ${utils.sp(message.user.btc)}₿`);
    case 5:
      message.user.bilet += randbil;
      return bot(`🎟️ Вы выиграли ${utils.sp(randbil)} билетов! 🎟️`);
    case 6:
        message.user.balance2 += randgb;
        return bot(`🎟️ Вы выиграли ${utils.sp(randgb)} ${val4}! 🎟️`);
    default:
      console.warn("Неизвестный приз:", prize);
      return bot("⚠️ Произошла ошибка при определении приза. Попробуйте позже.");
  }
}

// Обработчик VIP бонуса
async function handleVipBonus(message, bot) {
  if (!message.user.settings.vip) {
    return bot("🚫 VIP бонус доступен только для пользователей с VIP статусом!");
  }

  if (message.user.timers.vipbonus > Date.now()) {
    return bot(`⏳ VIP бонус можно будет получить через ${unixStampLefta(message.user.timers.vipbonus - Date.now())} ⏳`);
  }

  const vipbonus = utils.random(1, 4);
  message.user.timers.vipbonus = Date.now() + 86400000;

  let bonusMessage, attachment;

  switch (vipbonus) {
    case 1:
      const bonuscash = utils.random(30000000, 300000000);
      message.user.balance += bonuscash;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`;
      attachment = `photo-219408161_457239349`;
      break;
    case 2:
      const bonusbtc = utils.random(5, 1150);
      message.user.btc += bonusbtc;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusbtc)}₿! 💎`;
      attachment = `photo-219408161_457239350`;
      break;
    case 3:
      const bonusrating = utils.random(10, 100);
      message.user.rating += bonusrating;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`;
      attachment = `photo-219408161_457239351`;
      break;
    case 4:
      const bonusopit = utils.random(100, 1000);
      message.user.opit += bonusopit;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`;
      attachment = `photo-219408161_457239352`;
      break;
    default:
      console.warn("Неизвестный VIP бонус:", vipbonus);
      return bot("⚠️ Произошла ошибка при определении VIP бонуса. Попробуйте позже.");
  }

  return bot(bonusMessage, { attachment });
}

// Обработчик PREMIUM бонуса
async function handlePremiumBonus(message, bot) {
  if (!message.user.settings.premium) {
    return bot("🚫 PREMIUM бонус доступен только для пользователей с PREMIUM статусом!");
  }

  if (message.user.timers.prembonus > Date.now()) {
    return bot(`⏳ PREMIUM бонус можно будет получить через ${unixStampLefta(message.user.timers.prembonus - Date.now())} ⏳`);
  }

  const premiumbonus = utils.random(1, 5);
  message.user.timers.prembonus = Date.now() + 86400000;

  switch (premiumbonus) {
    case 1:
      const bonuscash = utils.random(5000000, 50000000);
      message.user.balance += bonuscash;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`);
    case 2:
      const bonusbtc = utils.random(10, 500);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusbtc)} ₿! 💎`);
    case 3:
      const bonusrating = utils.random(30, 300);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(300, 3000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      const bonusbilet = utils.random(1, 4);
      message.user.bilet += bonusbilet;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusbilet)} билетов! 🎫`);
    default:
      console.warn("Неизвестный PREMIUM бонус:", premiumbonus);
      return bot("⚠️ Произошла ошибка при определении PREMIUM бонуса. Попробуйте позже.");
  }
}

// Обработчик TITAN бонуса
async function handleTitanBonus(message, bot) {
  if (!message.user.settings.titan) {
    return bot("🚫 TITAN бонус доступен только для пользователей с TITAN статусом!");
  }

  if (message.user.timers.titanbonus > Date.now()) {
    return bot(`⏳ TITAN бонус можно будет получить через ${unixStampLefta(message.user.timers.titanbonus - Date.now())} ⏳`);
  }

  const titanbonus1 = utils.random(1, 5);
  message.user.timers.titanbonus = Date.now() + 86400000;

  switch (titanbonus1) {
    case 1:
      const bonuscash = utils.random(0, 0);
      message.user.balance += bonuscash;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`);
    case 2:
      const bonusbtc = utils.random(100, 500);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbtc)} ₿! 💎`);
    case 3:
      const bonusrating = utils.random(30, 40);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(300, 3000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      const bonusbilet = utils.random(1, 4);
      message.user.bilet += bonusbilet;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbilet)} билетов! 🎫`);
    default:
      console.warn("Неизвестный TITAN бонус:", titanbonus1);
      return bot("⚠️ Произошла ошибка при определении TITAN бонуса. Попробуйте позже.");
  }
}

// Обработчик IMPERATOR бонуса
async function handleImperatorBonus(message, bot) {
  if (!message.user.settings.imperator) {
    return bot("🚫 IMPERATOR бонус доступен только для пользователей с IMPERATOR статусом!");
  }

  if (message.user.timers.imperatorbonus >= Date.now()) {
    return bot(`👑 IMPERATOR бонус будет доступен через ${unixStampLefta(message.user.timers.imperatorbonus - Date.now())}. 👑`);
  }

  const imperatorbonus1 = utils.random(1, 6);
  message.user.timers.imperatorbonus = Date.now() + 86400000;

  switch (imperatorbonus1) {
    case 1:
      const bonuscash = utils.random(10000000, 100000000);
      message.user.balance += bonuscash;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonuscash)} ${val1}! 🎉`);
    case 2:
      const bonusbtc = utils.random(1000, 5000);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbtc)} ₿! 🎉`);
    case 3:
      const bonusrating = utils.random(10, 65);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(3000, 5000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      message.user.c3 += 1;
      message.send({ sticker_id: 108235 });
      return bot(`🎉 УХ-ТЫ! Вы выиграли донат-кейсо! 🎁`);
    case 6:
      message.user.c5 += 2;
      message.send({ sticker_id: 108225 });
      return bot(`🎉 ВОТ ЭТО УДАЧА! Вы выиграли 2 супер кейса! 🎁`);
    default:
      console.warn("Неизвестный IMPERATOR бонус:", imperatorbonus1);
      return bot("⚠️ Произошла ошибка при определении IMPERATOR бонуса. Попробуйте позже.");
  }
}

// Обработчики групповых бонусов
async function handleGroupBonus(message, bot) {
  if (message.user.balance2 > 999999) {
    return bot("🚫 Бонус не начислен, у вас слишком большой баланс. 🚫");
  }

  if (message.user.timers.bonus2 > Date.now()) {
    let timeLeft = unixStampLefta(message.user.timers.bonus2 - Date.now());
    return bot(`⏳ До получения бонуса: ${timeLeft} ⏳`);
  }

  const bonusConfigs = [
    { condition: () => message.user.settings.vip, bonus: 1000, name: 'VIP бонус' },
    { condition: () => message.user.settings.premium, bonus: 1500, name: 'PREMIUM бонус' },
    { condition: () => message.user.settings.topdon, bonus: 5000, name: 'TOP DONATOR бонус' },
    { condition: () => message.user.settings.adm > 0, bonus: 2500, name: 'ADMIN бонус' },
    { condition: () => true, bonus: 500, name: 'Обычный бонус' }
  ];

  let totalBonus = 0;
  let bestBonus = {bonus: 0, name: 'Обычный бонус'};

  for (const config of bonusConfigs) {
    if (config.condition()) {
      totalBonus += config.bonus;
      if (config.bonus > bestBonus.bonus) {
        bestBonus = config;
      }
    }
  }

  message.user.balance2 += totalBonus;
  message.user.timers.bonus2 = Date.now() + 1200000;
  message.user.bonusCounter = (message.user.bonusCounter || 0) + 1;

  const formattedBonus = utils.sp(totalBonus).replace(/,/g, '.');
  await bot(`🎉 ${bestBonus.name}: +${formattedBonus} ${val4}! 💵`);
}

async function handleGroupBonus2(message, bot) {
  if (message.user.balance > 1000000000) {
    return bot("🚫 Бонус не начислен, у вас слишком большой баланс. 🚫");
  }

  if (message.user.timers.bonus2 > Date.now()) {
    let timeLeft = unixStampLefta(message.user.timers.bonus2 - Date.now());
    return bot(`⏳ До получения бонуса: ${timeLeft} ⏳`);
  }

  const bonusConfigs = [
    { condition: () => message.user.settings.vip, bonus: 1000000, name: 'VIP бонус' },
    { condition: () => message.user.settings.premium, bonus: 5000000, name: 'PREMIUM бонус' },
    { condition: () => message.user.settings.topdon, bonus: 50000000, name: 'TOP DONATOR бонус' },
    { condition: () => message.user.settings.adm > 0, bonus: 25000000, name: 'ADMIN бонус' },
    { condition: () => true, bonus: 500000, name: 'Обычный бонус' }
  ];

  let totalBonus = 0;
  let bestBonus = {bonus: 0, name: 'Обычный бонус'};

  for (const config of bonusConfigs) {
    if (config.condition()) {
      totalBonus += config.bonus;
      if (config.bonus > bestBonus.bonus) {
        bestBonus = config;
      }
    }
  }

  message.user.balance += totalBonus;
  message.user.timers.bonus2 = Date.now() + 1200000;
  message.user.bonusCounter = (message.user.bonusCounter || 0) + 1;

  const formattedBonus = utils.sp(totalBonus).replace(/,/g, '.');
  await bot(`🎉 ${bestBonus.name}: +${formattedBonus} ${val1}! 💵`);
}

setInterval(() => {
  let tokensCache = getToken3(); 
  if (tokensCache) {
      val1 = tokensCache.val1; 
      val2 = tokensCache.val2; 
      val3 = tokensCache.val3; 
      val4 = tokensCache.val4; 
  }
}, 1000);

cmd.hear(/^(?:обычный бонус)$/i, async (message, bot) => {
  await handlePrivateBonus(message, bot);
});

cmd.hear(/^(?:вип бонус)$/i, async (message, bot) => {
  await handleVipBonus(message, bot);
});

cmd.hear(/^(?:премиум бонус)$/i, async (message, bot) => {
  await handlePremiumBonus(message, bot);
});

cmd.hear(/^(?:титан бонус)$/i, async (message, bot) => {
  await handleTitanBonus(message, bot);
});

cmd.hear(/^(?:император бонус)$/i, async (message, bot) => {
  await handleImperatorBonus(message, bot);
});

module.exports = commands;