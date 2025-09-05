let utils = require('../utils.js')
const fs = require('fs'); 
let chats = require('../database/chats.json')
let double = require('../database/users.json')
let botinfo = require('../database/botinfo.json')
let yachts = require('../spisok/яхты.js')
let homes = require('../spisok/дома.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')
let apartments = require('../spisok/апартаменты.js')
let airplanes = require('../spisok/самолеты.js')
let phones = require('../spisok/телефоны.js')
let helicopters = require('../spisok/вертолеты.js')

const commands = [];

const tokensFilePath = './настройки/токены.json';
const tokensFilePath3 = './настройки/валюты.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
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
    console.error('Ошибка при чтении валют:', error);
    return null;
  }
}

const tokenData = getToken();
const tokenData3 = getToken3(); 

const chatlogi = tokenData?.chatlogi; 
const spoler = tokenData?.spoler;
const val4 = tokenData3?.val4 || "$"; // значение по умолчанию
const val1 = tokenData3?.val1 || "€"; // вторая валюта

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

// Глобальный объект для хранения последних состояний пользователей
const userStates = new Map();
// Объект для хранения времени последнего уведомления и счетчиков игнорирования
const userNotificationState = new Map();

// Обновленная функция getOreAdvice
function getOreAdvice(user, botinfo) {
    const advice = [];
    const oreButtons = []; // Новый массив для данных кнопок
    
    const oreChecks = [
        { condition: user.ruds?.plazma > 0 && botinfo.kursplazma > 1400000, key: 'ore_plazma', name: 'plazma', emoji: '⚡', label: 'плазма' },
        { condition: user.ruds?.obsidian > 0 && botinfo.kursobsidian > 1100000, key: 'ore_obsidian', name: 'obsidian', emoji: '🌑', label: 'обсидиан' },
        { condition: user.ruds?.materia > 0 && botinfo.kursmateria > 1000000, key: 'ore_materia', name: 'materia', emoji: '🔮', label: 'материя' },
        { condition: user.ruds?.almaz > 0 && botinfo.kursalmaz > 700000, key: 'ore_almaz', name: 'almaz', emoji: '💎', label: 'алмаз' },
        { condition: user.ruds?.zoloto > 0 && botinfo.kurszoloto > 300000, key: 'ore_zoloto', name: 'zoloto', emoji: '🟨', label: 'золото' },
        { condition: user.ruds?.zhelezo > 0 && botinfo.kurszhelezo > 100000, key: 'ore_zhelezo', name: 'zhelezo', emoji: '⚙️', label: 'железо' }
    ];

    oreChecks.forEach(check => {
        if (check.condition) {
            const amount = user.ruds[check.name] || 0;
            const price = botinfo[`kurs${check.name}`] || 0;
            advice.push(`${check.emoji} Продать ${check.label} (${amount} шт. по ${utils.sp(price)} ${val1}) → продать ${check.label}`);
            
            // Добавляем данные для кнопки
            oreButtons.push({
                emoji: check.emoji,
                name: check.label,
                command: `продать ${check.label}`
            });
        }
    });

    return { advice, oreButtons };
}



cmd.hear(/^(?:скучно|скука|чем заняться|хелпми|я забыл|инфо мне)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let text = `🤔 Тебе скучно? Давай я подскажу, чем можно заняться!\n\n`;
    
    const advice = [];
    const now = Date.now();
    
    // Массив для кнопок (ограничиваем до 8)
    const keyboardButtons = [];
    
    // Проверка возможности получения бонуса
    const bonusTypes = [
      { timer: 'bonus', available: true, name: 'Обычный бонус', cooldown: 3600000, command: 'бонус' },
      { timer: 'vipbonus', available: message.user.settings?.vip, name: 'VIP бонус', cooldown: 86400000, command: 'вип бонус' },
      { timer: 'prembonus', available: message.user.settings?.premium, name: 'PREMIUM бонус', cooldown: 86400000, command: 'премиум бонус' },
      { timer: 'titanbonus', available: message.user.settings?.titan, name: 'TITAN бонус', cooldown: 86400000, command: 'титан бонус' },
      { timer: 'imperatorbonus', available: message.user.settings?.imperator, name: 'IMPERATOR бонус', cooldown: 86400000, command: 'император бонус' }
    ];
    
    let hasAvailableBonus = false;
    bonusTypes.forEach(bonus => {
      if (bonus.available && (!message.user.timers?.[bonus.timer] || message.user.timers[bonus.timer] <= now)) {
        hasAvailableBonus = true;
        // Добавляем кнопку для бонуса
        if (keyboardButtons.length < 8) {
          keyboardButtons.push({
            action: {
              type: "text",
              payload: JSON.stringify({ command: "бонус" }),
              label: `🎁 забрать бонус`
            },
            color: "positive"
          });
        }
      }
    });
    
    if (hasAvailableBonus) {
      advice.push(`🎁 Забрать бонус (доступно сейчас!) → бонус`);
    }
    
    // Проверка наличия кейсов
    const caseTypes = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
    let hasCases = false;
    
    caseTypes.forEach(caseType => {
      if (message.user[caseType] > 0) {
        hasCases = true;
      }
    });
    
    if (hasCases && keyboardButtons.length < 8) {
      advice.push(`📦 Открыть кейсы → кейсы`);
      keyboardButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: "кейсы" }),
          label: "📦 Кейсы"
        },
        color: "secondary"
      });
    }
    
    // Проверка возможности участия в гонке
    if (message.user.transport?.car && message.user.scar?.gontime <= now && keyboardButtons.length < 8) {
      advice.push(`🏁 Участвовать в гонке → гонка`);
      keyboardButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: "гонка" }),
          label: "🏁 Гонка"
        },
        color: "primary"
      });
    }
    
    // Проверка наличия биткоинов на ферме
    if (message.user.misc?.farm && message.user.farm_btc > 0 && keyboardButtons.length < 8) {
      let btc_ = message.user.farm_btc * (message.user.misc?.farm_count || 1);
      if (message.user.farm_count >= 10000000) {
        btc_ = Math.floor(btc_ / 2);
      }
      advice.push(`💰 Снять биткоины с фермы (${utils.sp(btc_)} ₿ доступно!) → ферма`);
      keyboardButtons.push({
        action: {
          type: "text",
          payload: JSON.stringify({ command: "ферма" }),
          label: `💰 Ферма`
        },
        color: "positive"
      });
    }
    
    // Проверка доступности аренды для каждого типа имущества
    const rentActions = [
      { condition: message.user.realty?.home && message.user.arend?.dom <= now, 
        emoji: '🏠', name: 'Арендовать дом', command: 'арендовать дом', 
        amount: homes[message.user.realty?.home - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.transport?.yacht && message.user.arend?.yaxta <= now, 
        emoji: '🛥️', name: 'Арендовать яхту', command: 'арендовать яхту', 
        amount: yachts[message.user.transport?.yacht - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.minertool && message.user.arend?.instrm <= now, 
        emoji: '⛏️', name: 'Арендовать инструменты', command: 'арендовать инструменты', 
        amount: minertool[message.user.minertool - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.misc?.computer && message.user.arend?.pk <= now, 
        emoji: '💻', name: 'Арендовать компьютер', command: 'арендовать комп', 
        amount: computers[message.user.misc?.computer - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.realty?.apartment && message.user.arend?.kvar <= now, 
        emoji: '🏢', name: 'Арендовать квартиру', command: 'арендовать квартиру', 
        amount: apartments[message.user.realty?.apartment - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.misc?.phone && message.user.arend?.tel <= now, 
        emoji: '📱', name: 'Арендовать телефон', command: 'арендовать телефон', 
        amount: phones[message.user.misc?.phone - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.transport?.airplane && message.user.arend?.sam <= now, 
        emoji: '🛩️', name: 'Арендовать самолет', command: 'арендовать самолет', 
        amount: airplanes[message.user.transport?.airplane - 1]?.cost * 0.02 || 0 },
      
      { condition: message.user.transport?.helicopter && message.user.arend?.vert <= now, 
        emoji: '🚁', name: 'Арендовать вертолет', command: 'арендовать вертолет', 
        amount: helicopters[message.user.transport?.helicopter - 1]?.cost * 0.02 || 0 }
    ];
    
    rentActions.forEach(rent => {
      if (rent.condition && keyboardButtons.length < 8) {
        const rentAmount = Math.floor(rent.amount);
        advice.push(`${rent.emoji} ${rent.name} (+${utils.sp(rentAmount)} ${val1}) → ${rent.command}`);
        keyboardButtons.push({
          action: {
            type: "text",
            payload: JSON.stringify({ command: rent.command }),
            label: `${rent.emoji} ${rent.name.split(' ')[0]}`
          },
          color: "secondary"
        });
      }
    });


    // Проверка руд
const oreResult = getOreAdvice(message.user, botinfo);
if (oreResult.advice.length > 0) {
    advice.push(...oreResult.advice);
    
    // Создаем кнопки для каждой доступной руды
    oreResult.oreButtons.forEach(oreBtn => {
        if (keyboardButtons.length < 8) {
            keyboardButtons.push({
                action: {
                    type: "text",
                    payload: JSON.stringify({ command: oreBtn.command }),
                    label: `${oreBtn.emoji} ${oreBtn.name}`
                },
                color: "secondary"
            });
        }
    });
}
    

    // Добавляем советы в текст
    if (advice.length > 0) {
      text += `🎯 Вот что можно сделать прямо сейчас:\n`;
      advice.forEach((item, index) => {
        text += `${index + 1}. ${item}\n`;
      });
      
      text += `\n💡 Просто используй команды указанные после →`;
    } else {
      const randomPhrases = [
        `🎮 Выполняйте ежедневные квесты для получения наград!`,
        `🎲 Играйте в DOUBLE для быстрого заработка!`,
        `🎁 Забирайте ежедневные подарки в беседе!`,
        `💱 Обменивайте валюты на бирже для прибыли!`,
        `🏆 Участвуйте в турнирах и соревнованиях!`,
        `🛒 Покупайте и продавайте имущество на рынке!`,
        `🤝 Взаимодействуйте с другими игроками!`,
        `⚡ Повышайте уровень и открывайте новые возможности!`
      ];
      
      const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
      text += `📝 Пока особых рекомендаций нет. ${randomPhrase}`;
      
      // Добавляем общие кнопки, если нет конкретных действий
      if (keyboardButtons.length < 8) {
        keyboardButtons.push({
          action: {
            type: "text",
            payload: JSON.stringify({ command: "помощь" }),
            label: "❓ Помощь"
          },
          color: "primary"
        });
      }
    }

    // Создаем клавиатуру только если есть кнопки
    if (keyboardButtons.length > 0) {
      const keyboard = {
        inline: true,
        buttons: [keyboardButtons.slice(0, 8)] // Ограничиваем до 8 кнопок в одном ряду
      };
      
      await bot(text, {
        keyboard: JSON.stringify(keyboard)
      });
    } else {
      await bot(text);
    }
  }
});

// Система мгновенных уведомлений о доступных действиях
setInterval(async () => {
  try {
    const users = require('../database/users.json')
    const botinfo = require('../database/botinfo.json')
    
    for (const user of users) {
      if (!user.id) continue;
      
      const currentState = [];
      const now = Date.now();
      
      // Проверка возможности получения бонуса
      const bonusTypes = [
        { timer: 'bonus', available: true, name: 'Обычный бонус', cooldown: 3600000 },
        { timer: 'vipbonus', available: user.settings?.vip, name: 'VIP бонус', cooldown: 86400000 },
        { timer: 'prembonus', available: user.settings?.premium, name: 'PREMIUM бонус', cooldown: 86400000 },
        { timer: 'titanbonus', available: user.settings?.titan, name: 'TITAN бонус', cooldown: 86400000 },
        { timer: 'imperatorbonus', available: user.settings?.imperator, name: 'IMPERATOR бонус', cooldown: 86400000 }
      ];
      
      let hasAvailableBonus = false;
      bonusTypes.forEach(bonus => {
        if (bonus.available && (!user.timers?.[bonus.timer] || user.timers[bonus.timer] <= now)) {
          hasAvailableBonus = true;
          currentState.push(`bonus_${bonus.timer}`);
        }
      });
      
      if (hasAvailableBonus) {
        currentState.push('has_bonus');
      }
      
      // Проверка наличия кейсов
      const caseTypes = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
      let hasCases = false;
      
      caseTypes.forEach(caseType => {
        if (user[caseType] > 0) {
          hasCases = true;
          currentState.push(`case_${caseType}_${user[caseType]}`);
        }
      });
      
      if (hasCases) {
        currentState.push('has_cases');
      }
      
      // Проверка возможности участия в гонке
      if (user.transport?.car && user.scar?.gontime <= now) {
        currentState.push('race_available');
      }
      
      // Проверка наличия биткоинов на ферме
      if (user.misc?.farm && user.farm_btc > 0) {
        let btc_ = user.farm_btc * (user.misc?.farm_count || 1);
        if (user.farm_count >= 10000000) {
          btc_ = Math.floor(btc_ / 2);
        }
        currentState.push(`farm_btc_${btc_}`);
      }
      
      // Проверка доступности аренды
      const rentChecks = [
        { condition: user.realty?.home && user.arend?.dom <= now, key: 'rent_home', type: 'home' },
        { condition: user.transport?.yacht && user.arend?.yaxta <= now, key: 'rent_yacht', type: 'yacht' },
        { condition: user.minertool && user.arend?.instrm <= now, key: 'rent_tools', type: 'tools' },
        { condition: user.misc?.computer && user.arend?.pk <= now, key: 'rent_computer', type: 'computer' },
        { condition: user.realty?.apartment && user.arend?.kvar <= now, key: 'rent_apartment', type: 'apartment' },
        { condition: user.misc?.phone && user.arend?.tel <= now, key: 'rent_phone', type: 'phone' },
        { condition: user.transport?.airplane && user.arend?.sam <= now, key: 'rent_airplane', type: 'airplane' },
        { condition: user.transport?.helicopter && user.arend?.vert <= now, key: 'rent_helicopter', type: 'helicopter' }
      ];
      
      rentChecks.forEach(check => {
        if (check.condition) {
          currentState.push(check.key);
        }
      });
      
      // Проверка бизнесов
      if (user.business2 && Array.isArray(user.business2)) {
        user.business2.forEach((biz, index) => {
          if (biz && biz.moneys > 0) {
            currentState.push(`business2_${index}_${biz.moneys}`);
          }
        });
      }
      
      if (user.business && Array.isArray(user.business)) {
        user.business.forEach((biz, index) => {
          if (biz && biz.moneys > 0) {
            currentState.push(`business_${index}_${biz.moneys}`);
          }
        });
      }
      
      // Проверка руд - ИСПРАВЛЕННЫЙ БЛОК
      const oreChecks = [
        { condition: user.ruds?.plazma > 0 && botinfo.kursplazma > 1400000, key: 'ore_plazma', name: 'plazma', label: 'плазма' },
        { condition: user.ruds?.obsidian > 0 && botinfo.kursobsidian > 1100000, key: 'ore_obsidian', name: 'obsidian', label: 'обсидиан' },
        { condition: user.ruds?.materia > 0 && botinfo.kursmateria > 1000000, key: 'ore_materia', name: 'materia', label: 'материя' },
        { condition: user.ruds?.almaz > 0 && botinfo.kursalmaz > 700000, key: 'ore_almaz', name: 'almaz', label: 'алмаз' },
        { condition: user.ruds?.zoloto > 0 && botinfo.kurszoloto > 300000, key: 'ore_zoloto', name: 'zoloto', label: 'золото' },
        { condition: user.ruds?.zhelezo > 0 && botinfo.kurszhelezo > 100000, key: 'ore_zhelezo', name: 'zhelezo', label: 'железо' }
      ];
      
      oreChecks.forEach(check => {
        if (check.condition) {
          currentState.push(check.key);
          currentState.push(`ore_${check.name}_${user.ruds[check.name]}`); // Добавляем количество
        }
      });
      
      // Получаем предыдущее состояние пользователя
      const previousState = userStates.get(user.id) || [];
      
      // Получаем состояние уведомлений пользователя
      let notificationState = userNotificationState.get(user.id) || {
        lastNotificationTime: 0,
        ignoreCount: 0,
        lastState: []
      };
      
      const threeHours = 3 * 3600000; // 3 часа в миллисекундах
      const hasChanges = JSON.stringify(currentState) !== JSON.stringify(previousState);
      const shouldRemind = Date.now() - notificationState.lastNotificationTime >= threeHours;
      const hasActions = currentState.length > 0;
      
      // Проверяем, было ли состояние изменено или нужно напомнить
      if (hasActions && (hasChanges || shouldRemind)) {
        const advice = [];
        
        if (hasAvailableBonus) {
          advice.push(`🎁 Забрать бонус → бонус`);
        }
        
        if (hasCases) {
          advice.push(`📦 Открыть кейсы → кейсы`);
        }
        
        if (user.transport?.car && user.scar?.gontime <= now) {
          advice.push(`🏁 Участвовать в гонке → гонка`);
        }
        
        if (user.misc?.farm && user.farm_btc > 0) {
          let btc_ = user.farm_btc * (user.misc?.farm_count || 1);
          if (user.farm_count >= 10000000) {
            btc_ = Math.floor(btc_ / 2);
          }
          advice.push(`💰 Снять биткоины с фермы (${utils.sp(btc_)} ₿) → ферма`);
        }
        
        // Аренда
        rentChecks.forEach(check => {
          if (check.condition) {
            let rentAmount = 0;
            switch(check.type) {
              case 'home':
                rentAmount = Math.floor(homes[user.realty.home - 1]?.cost * 0.02 || 0);
                advice.push(`🏠 Арендовать дом (+${utils.sp(rentAmount)} ${val1}) → арендовать дом`);
                break;
              case 'yacht':
                rentAmount = Math.floor(yachts[user.transport.yacht - 1]?.cost * 0.02 || 0);
                advice.push(`🛥️ Арендовать яхту (+${utils.sp(rentAmount)} ${val1}) → арендовать яхту`);
                break;
              case 'tools':
                rentAmount = Math.floor(minertool[user.minertool - 1]?.cost * 0.02 || 0);
                advice.push(`⛏️ Арендовать инструменты (+${utils.sp(rentAmount)} ${val1}) → арендовать инструменты`);
                break;
              case 'computer':
                rentAmount = Math.floor(computers[user.misc.computer - 1]?.cost * 0.02 || 0);
                advice.push(`💻 Арендовать компьютер (+${utils.sp(rentAmount)} ${val1}) → арендовать комп`);
                break;
              case 'apartment':
                rentAmount = Math.floor(apartments[user.realty.apartment - 1]?.cost * 0.02 || 0);
                advice.push(`🏢 Арендовать квартиру (+${utils.sp(rentAmount)} ${val1}) → арендовать квартиру`);
                break;
              case 'phone':
                rentAmount = Math.floor(phones[user.misc.phone - 1]?.cost * 0.02 || 0);
                advice.push(`📱 Арендовать телефон (+${utils.sp(rentAmount)} ${val1}) → арендовать телефон`);
                break;
              case 'airplane':
                rentAmount = Math.floor(airplanes[user.transport.airplane - 1]?.cost * 0.02 || 0);
                advice.push(`🛩️ Арендовать самолет (+${utils.sp(rentAmount)} ${val1}) → арендовать самолет`);
                break;
              case 'helicopter':
                rentAmount = Math.floor(helicopters[user.transport.helicopter - 1]?.cost * 0.02 || 0);
                advice.push(`🚁 Арендовать вертолет (+${utils.sp(rentAmount)} ${val1}) → арендовать вертолет`);
                break;
            }
          }
        });
        
        // Бизнесы
        if (user.business2 && Array.isArray(user.business2)) {
          user.business2.forEach((biz, index) => {
            if (biz && biz.moneys > 0) {
              advice.push(`🏢 Снять с бизнеса ${index + 1} (${utils.sp(biz.moneys)} ${val1}) → бизнес снять ${index + 1}`);
            }
          });
        }
        
        if (user.business && Array.isArray(user.business)) {
          user.business.forEach((biz, index) => {
            if (biz && biz.moneys > 0) {
              advice.push(`🏢 Снять с бизнеса ${index + 1} (${utils.sp(biz.moneys)} ${val4}) → бизнес снять ${index + 1}`);
            }
          });
        }
        
        // Руда - ИСПРАВЛЕННЫЙ БЛОК
        oreChecks.forEach(check => {
          if (check.condition) {
            const amount = user.ruds[check.name] || 0;
            const price = botinfo[`kurs${check.name}`] || 0;
            let emoji = '⛰️';
            switch(check.name) {
              case 'plazma': emoji = '⚡'; break;
              case 'obsidian': emoji = '🌑'; break;
              case 'materia': emoji = '🔮'; break;
              case 'almaz': emoji = '💎'; break;
              case 'zoloto': emoji = '🟨'; break;
              case 'zhelezo': emoji = '⚙️'; break;
            }
            advice.push(`${emoji} Продать ${check.label} (${amount} шт. по ${utils.sp(price)} ${val1}) → продать ${check.label}`);
          }
        });
        
        if (advice.length > 0) {
          let notificationText = ``;
          
          if (hasChanges) {
            notificationText = `🔔 Новые возможности в боте!\n\n`;
            notificationState.ignoreCount = 0; // Сбрасываем счетчик игнорирования при новых действиях
          } else if (shouldRemind) {
            notificationText = `⏰ Напоминание: доступные действия в боте!\n\n`;
            notificationState.ignoreCount++; // Увеличиваем счетчик игнорирования
          }
          
          notificationText += `🎯 Доступные действия:\n`;
          
          const maxAdvice = 6;
          advice.slice(0, maxAdvice).forEach((item, index) => {
            notificationText += `${index + 1}. ${item}\n`;
          });
          
          if (advice.length > maxAdvice) {
            notificationText += `... и еще ${advice.length - maxAdvice} действий\n`;
          }
          
          notificationText += `\n💡 Используй команды после →`;
          
          try {
            await vk.api.messages.send({
              user_id: user.id,
              random_id: 0,
              message: notificationText,
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                  [{
                    "action": {
                      "type": "text",
                      "payload": JSON.stringify({ command: `скучно` }),
                      "label": `👀 Посмотреть все`
                    },
                    "color": "positive"
                  }]
                ]
              })
            });
            
            // Обновляем время последнего уведомления
            notificationState.lastNotificationTime = Date.now();
            notificationState.lastState = [...currentState];
            userNotificationState.set(user.id, notificationState);
          } catch (error) {
            console.error('Ошибка отправки уведомления пользователю', user.id, error);
          }
        }
      }
      
      // Сохраняем текущее состояние
      userStates.set(user.id, currentState);
    }
    
  } catch (error) {
    console.error('Ошибка в системе уведомлений:', error);
  }
}, 5000); // Проверяем каждую минуту

module.exports = commands;