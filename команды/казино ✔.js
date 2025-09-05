let utils = require('../utils.js');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');

// Логирование
const logFilePath = './casino.log'; // Путь к файлу логов
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // Открываем поток для записи в файл

function log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    // console.log(logMessage); // Выводим в консоль
    logStream.write(logMessage); // Записываем в файл
}

// Переносим чтение токенов в начало файла и обрабатываем возможные ошибки сразу
const tokensFilePath = './настройки/токены.json';
let tokenData = null;
try {
    tokenData = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    log('Токены успешно загружены', 'info');
} catch (error) {
    log(`Ошибка при чтении токенов: ${error}`, 'error');
    // Можно завершить процесс или использовать значения по умолчанию
    process.exit(1); // Завершаем процесс, так как токены необходимы
}

// Аналогично для валют
const tokensFilePath3 = './настройки/валюты.json';
let tokenData3 = null;
try {
    tokenData3 = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    log('Валюты успешно загружены', 'info');
} catch (error) {
    log(`Ошибка при чтении валют: ${error}`, 'error');
    //Можно установить дефолтные значения
    tokenData3 = { val1: '?', val2: '?', val3: '?', val4: '?', val5: '?' };
    //process.exit(1);
}

let casino = require("../database/casino.json");
let double = require('../database/users.json')
let chats = require('../database/chats.json')

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 
// Разделяем логику сохранения токенов в отдельную функцию
async function saveTokens(token, spoler, chatlogi) {
    const tokens = {
        token: token,
        spoler: spoler,
        chatlogi: chatlogi
    };
    try {
        await fs.promises.writeFile(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
        log('Токены успешно сохранены.', 'info');
    } catch (error) {
        log(`Ошибка при сохранении токенов: ${error}`, 'error');
    }
}

// Кешируем значения валют, чтобы не читать файл при каждом вызове команды
let val1 = tokenData3.val1;
let val2 = tokenData3.val2;
let val3 = tokenData3.val3;
let val4 = tokenData3.val4;
let val5 = tokenData3.val5;

// Используем объект для хранения команд, чтобы избежать глобальной переменной
const commands = {
    hear: (pattern, action) => {
        commands.list.push([pattern, action]);
    },
    list: [], // Массив для хранения команд
};

// Используем Map для хранения ставок, чтобы избежать проблем с асинхронностью
const activeBets = new Map();

// Константы для конфигурации казино
const BASE_MULTIPLIERS = [0, 0.25, 0.5, 0.75, 1, 1.01, 1.05, 1.1, 1.25, 1.5, 2]; // Базовые множители
const VIP_PREMIUM_NALOG_BONUS = 0.01; // Бонус к налогу для VIP/Premium
const MAX_MULTIPLIER = 5; // Максимальный возможный множитель
const MIN_BET_FOR_ADDITIONAL_MULTIPLIERS = 10000; // Минимальная ставка для доп. множителей

// Функция для расчета налога в зависимости от ставки
function calculateTax(betAmount, isVip, isPremium) {
    let nalog = 0.01; // Базовый налог

    // Adjust tax based on bet amount ranges
    if (betAmount >= 1000) nalog = 0.015;
    if (betAmount >= 10000) nalog = 0.02;
    if (betAmount >= 100000) nalog = 0.025;
    if (betAmount >= 1000000) nalog = 0.03;
    if (betAmount >= 10000000) nalog = 0.035;

    // Apply VIP/Premium bonus
    if (isVip) nalog += VIP_PREMIUM_NALOG_BONUS;
    if (isPremium) nalog += VIP_PREMIUM_NALOG_BONUS;

    return nalog;
}

// Функция для выбора множителя
function chooseMultiplier(betAmount, isChatLevel3, hasCasinoPlus, hasCasinoMinus) {
    let multipliers = [...BASE_MULTIPLIERS];

    // Дополнительные множители для больших ставок
    if (betAmount >= MIN_BET_FOR_ADDITIONAL_MULTIPLIERS) {
        multipliers.push(0.25, 1.5, 3);
    }

    // Учет статуса чата
    if (isChatLevel3) multipliers.push(3, 1, 2, 5);

    // Учет бонусов казино
    if (hasCasinoPlus) multipliers = [1, 2];
    if (hasCasinoMinus) multipliers = [0.25, 0.5, 0.75];

    // Ensure multipliers are within acceptable range after manipulations
    multipliers = multipliers.filter(m => m <= MAX_MULTIPLIER);

    return utils.pick(multipliers);
}

// Функция для проверки на мошенничество
async function isFraudulentActivity(userId, betAmount, user) {
    let reason = null; // Переменная для хранения причины подозрительной активности

   // 4. Проверка на подозрительно низкий процент выигрышей
   const MIN_WIN_RATE = 0.1; // Минимальный процент выигрышей (10%)
   if (!user.totalWins) user.totalWins = 0;
   if (!user.totalLosses) user.totalLosses = 0;

   const totalGames = user.totalWins + user.totalLosses;

   if (totalGames >= 100) { // Проверяем, если сыграно достаточно игр
       const winRate = user.totalWins / totalGames;
       if (winRate < MIN_WIN_RATE) {
           log(`Пользователь ${userId} имеет подозрительно низкий процент выигрышей (${winRate.toFixed(2)}).`, 'warning');
           reason = 'Низкий процент выигрышей';
           return reason; // Низкий процент выигрышей
       }
   }

   return reason; // Если подозрительной активности не обнаружено
}

// Функция для очистки старых данных о ставках (пример)
function cleanupOldStakeData(users) {
  const now = Date.now();
  const MAX_DATA_AGE_DAYS = 30;
  const MAX_DATA_AGE_MS = MAX_DATA_AGE_DAYS * 24 * 60 * 60 * 1000;

  for (const user of users) {
    if (user.stakeTimestamps) {
      user.stakeTimestamps = user.stakeTimestamps.filter(timestamp => timestamp > now - MAX_DATA_AGE_MS);
    }
  }
}

commands.hear(/^(?:казино|🎲 Казино|азино|🎰 Казино)\s(.*)$/i, async (message, bot) => {
   
    if (!message.isChat ) {
        const userId = message.senderId; // Получаем ID пользователя
         // Получаем значение betAmountInput из аргументов команды
        const betAmountInput = message.args[1];

        if (!betAmountInput) {
            log(`Пользователь ${userId} не ввел сумму ставки.`, 'warning');
            return bot(`Вы не указали сумму ставки.`);
        }

          // Очистка и преобразование введенной суммы (дубликат, чтобы betAmount был доступен для кнопок)
          let betAmount = betAmountInput.replace(/(\.|\,)/gi, "");
          betAmount = betAmount.replace(/(к|k)/gi, "000");
          betAmount = betAmount.replace(/(м|m)/gi, "000000");
          betAmount = betAmount.replace(/(вабанк|вобанк|все|всё)/gi, message.user.balance);
  
          if (!Number(betAmount)) {
              log(`Пользователь ${userId} ввел некорректное значение ставки: ${betAmountInput}.`, 'warning');
              return bot(`Вы ввели буквы, а не число`);
          }
        betAmount = Math.floor(Math.round(Number(betAmount)));

        // Определение кнопок с использованием betAmount
        const isTrapFirst = Math.random() < 0.5;
        let buttons;

       if (isTrapFirst) {
            buttons = [
                [{
                    action: {
                        type: 'text',
                        payload: {
                            command: `казино все`,
                        },
                        label: `😈`,
                    },
                    color: 'negative', // красный
                }],
                [{
                    action: {
                        type: 'text',
                        payload: {
                            command: `казино ${betAmount}`,
                        },
                        label: `🎰 Поставить повторно (${utils.sp(betAmount)})`,
                    },
                    color: 'positive', // зеленая
                }]
            ];
        } else {
            buttons = [
                [{
                    action: {
                        type: 'text',
                        payload: {
                            command: `казино ${betAmount}`,
                        },
                        label: `🎰 Поставить повторно (${utils.sp(betAmount)})`,
                    },
                    color: 'positive', // зеленая
                }],
                [{
                    action: {
                        type: 'text',
                        payload: {
                            command: `казино все`,
                        },
                        label: `😈`,
                    },
                    color: 'negative', // красный
                }]
            ];
        }
         if (Number(betAmountInput) <= 0) {
            log(`Пользователь ${userId} ввел некорректную сумму ставки.`, 'warning');
            return bot(`Вы ввели неверное значение`);
        }

        const smileos = utils.pick(["🙂", "😇", "😊", "🥰", "😍", "🤩", "😘", "😗", "😙", "😚"]);
        const smileyes = utils.pick(["🙂", "😃", `😄`, `🤑`, `☺`, `😂`, `🤩`, `😎`, `🥳`, `🤗`]);
        const smileno = utils.pick([`😕`, `😔`, `😫`, `😩`, `😒`, `😓`, `😥`, `😢`, `😞`, `😟`]);

        if (betAmount > message.user.balance) {
            log(`Пользователь ${userId} попытался поставить ${betAmount}, имея на балансе ${message.user.balance}.`, 'warning');
            return bot(`у вас нет данной суммы на балансе - ${utils.sp(message.user.balance)} ${val1}`);
        }

        // Проверка на мошенничество
        const fraudReason = await isFraudulentActivity(userId, betAmount, message.user);
        if (fraudReason) {
            log(`Обнаружена подозрительная активность у пользователя ${userId}. Причина: ${fraudReason}. Ставка отклонена.`, 'warning');
            return bot(`Ваша ставка отклонена из-за подозрительной активности. Причина: ${fraudReason}`);
        }

        // Проверяем, есть ли уже активная ставка у пользователя
        if (activeBets.has(userId)) {
            log(`Пользователь ${userId} попытался сделать ставку, имея активную.`, 'warning');
            return bot('У вас уже есть активная ставка. Дождитесь ее завершения.');
        }

        // Устанавливаем флаг активной ставки
        activeBets.set(userId, true);
        log(`Пользователь ${userId} начал игру в казино со ставкой ${betAmount}.`);

        try {
            const isVip = message.user.settings.vip === true;
            const isPremium = message.user.settings.premium === true;
            const isChatLevel3 = message.isChat && chats && chats.find(chat => chat.id === message.chatId)?.statuepeoplelvl >= 3;
            const hasCasinoPlus = message.user.casinoplus > 0;
            const hasCasinoMinus = message.user.casinominus > 0;

            //Уменьшаем баланс юзера
            message.user.balance -= betAmount;

            let multiply = 1; // Множитель по умолчанию
            let questCondition = false; // Добавляем флаг для квеста
            let nalog = 0; // Объявляем nalog по умолчанию
            let winnings = 0; // Объявляем выигрыш

            // Если ставка равна 1, то гарантированно устанавливаем множитель 2
            if (betAmount === 1) {
                multiply = 2;
                questCondition = true; // Квест будет засчитан
                 nalog = calculateTax(betAmount, isVip, isPremium);
                winnings = Math.max(0, Math.floor(Math.round(betAmount * multiply * (1 - nalog) + betAmount * nalog)))//Минимальный выигрышь 0
                log(`Пользователь ${userId} поставил 1 и гарантированно получил x2.`, 'info');
            } else {
                // Рассчитываем налог
                nalog = calculateTax(betAmount, isVip, isPremium);

                // Выбираем множитель
                let multipliers = [0, 0.25, 0.5, 0.75, 1, 1.01,0.5, 1.05, 0.5,  1.1, 1.25, 1.5, 2];  // переопределить, чтобы использовать только эти значения
                multiply = utils.pick(multipliers); // берем из того что надо
                
                // Дополнительный бонус для особых случаев (Joker)
                if (message.user.settings.joker === true && message.user.inf === true) {
                    multiply = message.user.infcas;
                }

                // Учет бонусов казино
                if (message.isChat && chats) {
                    const chat = chats.find(chat => chat.id === message.chatId);
                    if (chat) {
                        if (chat.statuepeoplelvl >= 1) {
                            multiply = utils.pick([multiply, 3]);
                        }
                        if (chat.statuepeoplelvl >= 2) {
                            multiply = utils.pick([multiply, 100]);
                        }
                        if (chat.statuepeoplelvl >= 3) {
                            multiply = utils.pick([multiply, 200]);
                        }
                    }
                }
               winnings = Math.floor(Math.round(betAmount * multiply * (1 - nalog) + betAmount * nalog))
            }

             message.user.balance += winnings;

            // Обновление баланса казино
            if (multiply < 1 && message.user.settings.adm < 1) {
                casino.balance += Number(Math.floor(Math.round(betAmount - Math.floor(Math.round(betAmount * multiply)))));
            }

            if (multiply > 1 && message.user.settings.adm < 1) {
                casino.balance -= Number(Math.floor(Math.round((Math.floor(Math.round(betAmount * multiply)) - betAmount) * (1 - nalog))));
            }

             // Обновляем статистику пользователя (для защиты от мошенничества)
           if (betAmount === 1 ) {
               if(winnings > 0)  message.user.totalWins = (message.user.totalWins || 0) + 1;
            } else {
                if (multiply >= 1) message.user.totalWins = (message.user.totalWins || 0) + 1;
                else message.user.totalLosses = (message.user.totalLosses || 0) + 1;
            }

            message.user.lastResult = multiply >= 1 ? 'win' : 'loss'; // Устанавливаем результат, кроме случая со ставкой 1

             // Бонусные призы для чата
            if (message.isChat && chats) {
                const chat = chats.find(chat => chat.id === message.chatId);
                if (chat && chat.statuepeoplelvl >= 3) {
                    const multileaf = utils.pick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
                        0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
                        0, 0, 0, 0,
                    ]);

                    if (multileaf === 1) {
                        message.user.leaf += 20;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: листики (20 шт)');
                    } else if (multileaf === 2) {
                        message.user.ruds.plazma += 10;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: плазма (10 шт)');
                    } else if (multileaf === 3) {
                        message.user.ruds.obsidian += 30;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: обсидиан (30 шт)');
                    } else if (multileaf === 4) {
                        message.user.руб += 50;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: ${val2} (50 шт)');
                    } else if (multileaf === 5) {
                        message.user.bilet += 2;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: Билеты для фортуны (2 шт)');
                    } else if (multileaf === 6) {
                        message.user.sprcoin += 10;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: SpringCoin (10 шт)');
                    } else if (multileaf === 7) {
                        message.user.balance2 += 5000;
                        await bot('🎰Удача на вашей стороне!\n🎲Дополнительный приз: ${val4} (5.000 шт)');
                    }
                }
            }


             if (typeof message.user.questcasino === "number" && message.user.questcasino !== true) {
                 if (questCondition && winnings > 0) {
                    message.user.questcasino++;



                    if (message.user.questcasino >= 5) {
                        await bot(`Поздравляем, Вы 5 раз выиграли в казино и получаете 📦 1 Донат-кейс.`);
                        message.user.c3 += 1;
                         message.user.questcasino = true; 

                    }
                } else {
                     message.user.questcasino = Math.max(0, message.user.questcasino); 
                 
                }
            }

            let photo = ``;
            if (multiply > 1) photo = ``;
            if (multiply === 1) photo = ``;
            if (multiply < 1) photo = ``;

            let wow = utils.pick([`😃`, `😄`, `😏`, `🙃`, `🙂`, `😲`, `🤤`]);
            let txt = utils.pick([`Вам очень повезло!`, `Вы везучий!`, `Повезло-повезло`, `Удача — с вами!`, `Да ты везучий!`]);

            const resultMessage = `${multiply === 1
                ? `${txt} — ваши деньги остаются при вас (x${multiply}) ${smileos}`
                : `${multiply < 1
                    ? `вы проиграли ${utils.sp(betAmount - betAmount * multiply)} ${val1} 🚫\n❌ » Ставка сгорела на x${multiply} ${smileno}`
                    : `вы выиграли ${utils.sp(Math.floor((betAmount * multiply - betAmount) * (1 - nalog)))} ${val1} 💵\n${wow} » ${txt}\n♻️ » Умножена ставка на x${multiply} ${smileyes}`
                }`
                }\n💰 » Баланс: ${utils.sp(message.user.balance)} ${val1}`;

                if (multiply > 1){
                    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && !message.user.now.kv4){
                        
                        message.user.c6 += 1;
                        message.user.now.kv4 = true;
await bot(`✔ ты выйграл в казино и получаешь подарок - 1 секретный кейс

💡 Не забывай, что каждая ставка в казино приближает тебя к срыву большого приза!`, {
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


                }



            await bot(resultMessage, {
                attachment: photo,
                keyboard: JSON.stringify({
                    inline: true,
                    buttons: buttons,
                }),
            });
            log(`Пользователь ${userId} завершил игру. Ставка: ${betAmount}, множитель: ${multiply}, выигрыш: ${winnings}, баланс: ${message.user.balance}.`);

        } catch (error) {
            log(`Ошибка во время игры пользователя ${userId}: ${error}`, 'error');
            await bot('Произошла ошибка во время игры. Попробуйте позже.'); // Сообщение пользователю об ошибке
        } finally {
            activeBets.delete(userId);
        }
    } else {
        return bot(`казино работает только в лс`)
    }
});



//Обновление кеша валют
setInterval(async () => {
    try {
        const data = await fs.promises.readFile(tokensFilePath3, 'utf8');
        const newTokens = JSON.parse(data);
        val1 = newTokens.val1;
        val2 = newTokens.val2;
        val3 = newTokens.val3;
        val4 = newTokens.val4;
        log('Валюты успешно обновлены', 'info');
    } catch (error) {
        log(`Ошибка при обновлении валют: ${error}`, 'error');
    }
}, 5000);
// Очистка старых данных о ставках пользователей (пример - каждый час)
setInterval(() => {
  cleanupOldStakeData(double); // double - предполагается, что это массив пользователей
}, 3600000);

module.exports = commands.list;
// module.exports = commands;