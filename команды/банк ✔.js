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
        // console.log('Токены успешно сохранены.');
    } catch (error) {
        console.error('Ошибка при сохранении токенов:', error);
    }
}

let tokensCache = null;

// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
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


cmd.hear(/^(?:банк|🏦 Банк|💳 Банк)$/i, async (message, bot) => {

  if (message.user.astats.tema === 2) {
    if (!message.isChat || message.chat.type == 1) {
        let amount = message.user.bank || 0;
        let formattedAmount = utils.sp(amount);
        
        let response;
        if (amount === 0) {
            response = `🏦 ТВОЙ БАНКОВСКИЙ СЧЁТ ПУСТ, КАК ТВОЯ ГОЛОВА! 0 ${val1} — ТЫ СЕРЬЁЗНО ТАКОЙ НИЩИЙ? 🤡`;
        } else if (amount < 1000) {
            response = `🏦 ${formattedAmount} ${val1} НА СЧЁТУ — ЭТО ЧТО, ШУТКА? ДАЖЕ БЕЗДОМНЫЕ БОГАЧЕ! 🐀`;
        } else if (amount < 10000) {
            response = `🏦 ${formattedAmount} ${val1} — НУ ХОТЬ ЧТО-ТО ЕСТЬ, НО ВСЁ РАВНО ЖИВЁШЬ В КОРТОЧКАХ! 📦`;
        } else if (amount < 100000) {
            response = `🏦 ${formattedAmount} ${val1} — НЕПЛОХО, НО ДО ОЛИГАРХА ТЕБЕ КАК ДО ЛУНЫ! 🌕`;
        } else {
            response = `🏦 ${formattedAmount} ${val1} — ОГО, ДА ТЫ НАСТОЯЩИЙ БОГАТЫЙ ПИЗД... ЭМ... БОГАЧ! 💰`;
        }
        
        await bot(response);
        return;
    }
    if (message.chat.type === 2) {
        const chat = message.chat;
        
        // Проверка времени раунда
        if (chat.gametime <= 5) {
            return bot(`🖕 БЛЯТЬ, ОПЯТЬ ПРОСРАЛ МОМЕНТ, ДАУН? ${chat.gametime} СЕКУНД ОСТАЛОСЬ - ИДИ НАХУЙ С ТАКИМИ ТИМИНГАМИ!`);
        }
    
        const currentGame = message.chat.games[message.chat.games.length - 1];
        
        // Проверка ставок
        if (!currentGame.stavki[0]) {
            return bot(`💩 НИКТО НЕ СТАВИТ, КАК И ТЫ, ПИДОРАС БЕЗЯИЦОВЫЙ!\n\n🔐 Хеш игры: ${currentGame.hash}\n\n`);
        }
    
        // Создаем объект для ставок с флагами и матерными описаниями
        let stakes = {
            x2: { text: '\n🟢 СТАВКИ НА x2 (НИЩЕТА ПРОТОКОЛИРУЕТСЯ):\n', hasBets: false },
            x3: { text: '\n🟡 СТАВКИ НА x3 (ВСЁ РАВНО ПРОСРЕШЬ):\n', hasBets: false },
            x5: { text: '\n🔴 СТАВКИ НА x5 (НАДЕЮСЬ, ЭТО НЕ ТВОИ ДЕНЬГИ?):\n', hasBets: false },
            x50: { text: '\n💣 СТАВКИ НА x50 (ОХУЕТЬ, ДА ТЫ ПОЛНЫЙ ДЕГЕНЕРАТ!):\n', hasBets: false }
        };
    
        // Обработка ставок с матерными комментариями
        for (let id in currentGame.stavki) {
            let user = currentGame.stavki[id];
            let userTag = `[id${user.id}|${double.find(x => x.id === user.id).tag}] - ${utils.sp(user.amount)} ${val4} `;
            userTag += user.amount < 1000 ? '🤏 (НА ЧТО ЭТИ ГРОШИ? НА ПРЕЗЕРВАТИВ?)' : '💰 (НАКОНЕЦ-ТО НОРМАЛЬНЫЙ ДОНАТ, НО ВСЁ РАВНО ПРОСРЁШЬ)';
    
            switch (user.type) {
                case 2:
                    stakes.x2.text += userTag + '\n';
                    stakes.x2.hasBets = true;
                    break;
                case 3:
                    stakes.x3.text += userTag + '\n';
                    stakes.x3.hasBets = true;
                    break;
                case 5:
                    stakes.x5.text += userTag + '\n';
                    stakes.x5.hasBets = true;
                    break;
                case 50:
                    stakes.x50.text += userTag + '\n';
                    stakes.x50.hasBets = true;
                    break;
            }
        }
    
        // Формирование итогового сообщения только с заполненными ставками
        let text = '';
        if (stakes.x2.hasBets) text += stakes.x2.text;
        if (stakes.x3.hasBets) text += stakes.x3.text;
        if (stakes.x5.hasBets) text += stakes.x5.text;
        if (stakes.x50.hasBets) text += stakes.x50.text;
    
        const totalStaked = currentGame.stavki.reduce((sum, stake) => sum + stake.amount, 0);
        const totalComment = totalStaked < 10000 
            ? '🤮 (ЭТО ВСЁ? СТЫДНО ДАЖЕ СМОТРЕТЬ, УЁБИЩЕ!)' 
            : '🤑 (НА ЭТИ ДЕНЬГИ МОЖНО БЫЛО КУПИТЬ СЕБЕ МОЗГИ, НО ТЫ ЖЕ ПИДОР!)';
    
        bot(`💸 ВСЕГО ПРОСРАНО: ${utils.sp(totalStaked)} ${val4} ${totalComment}\n${text}\n🔐 Хеш игры: ${currentGame.hash}\n\n⏳ До конца раунда: ${message.chat.gametime} сек. (ГОТОВЬСЯ К РАЗОЧАРОВАНИЮ, ЛОХ)`);
        return;
    }
}
  if (message.user.astats.tema === 1) {
    if (!message.isChat || message.chat.type == 1 ) {
        await bot(`🏦 На вашем банковском счету находится ${utils.sp(message.user.bank)} ${val1} 🌧️`)
        return
    }
if (message.chat.type === 2) {
    const chat = message.chat;
    const currency = message.user.reshim == 1 ? val4 : val1;
    
    if (chat.gametime <= 5) {
        return bot(`до конца раунда осталось менее пяти секунд, ставки не принимаются`);
    }

    const currentGame = message.chat.games[message.chat.games.length - 1];
    if (!currentGame.stavki[0]) {
        return bot(`в этом раунде еще никто не поставил\n\nХеш игры: ${currentGame.hash}\n\n`);
    }

    let stakes = {
        x2: '\nСтавки на x2:\n',
        x3: '\nСтавки на x3:\n',
        x5: '\nСтавки на x5:\n',
        x50: '\nСтавки на x50:\n'
    };

    for (let id in currentGame.stavki) {
        let user = currentGame.stavki[id];
        let dbUser = double.find(x => x.id === user.id);
        let userTag = `[id${user.id}|${dbUser.tag}] - ${utils.sp(user.amount)} ${currency}\n`;

        switch (user.type) {
            case 2:
                stakes.x2 += userTag;
                break;
            case 3:
                stakes.x3 += userTag;
                break;
            case 5:
                stakes.x5 += userTag;
                break;
            case 50:
                stakes.x50 += userTag;
                break;
        }
    }

    let text = '';
    if (stakes.x2.length > 15) text += stakes.x2;
    if (stakes.x3.length > 15) text += stakes.x3;
    if (stakes.x5.length > 15) text += stakes.x5;
    if (stakes.x50.length > 16) text += stakes.x50;

    const totalStaked = utils.sp(currentGame.stavki.reduce((sum, stake) => sum + stake.amount, 0));

    bot(`всего поставлено: ${totalStaked} ${currency} 💸
${text}
Хеш игры: 
${currentGame.hash}

До конца раунда: ${message.chat.gametime} сек.
    `);
    return;
}
}





});


cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type == 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");

        message.args[1] = message.args[1].replace(/([кk])/gi, "000");

        message.args[1] = message.args[1].replace(/([мm])/gi, "000000");

        message.args[1] = message.args[1].replace(
            /(вабанк|вобанк|все|всё)/gi,
            message.user.bank
        );

        if (message.user.inf === true) return bot(`выключите безлимитный баланс`);

        if (!Number(message.args[1])) return;

        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.args[1] <= 0) return;

        if (message.args[1] > message.user.bank) return bot(`у вас нет данной суммы`);
        else if (message.args[1] <= message.user.bank) {
            message.user.balance += message.args[1];

            message.user.bank -= message.args[1];

            return bot(
                `вы успешно сняли ${utils.sp(
                    message.args[1]
                )} ${val1} со своего банковского счёта 💳

▶️ Остаток на счёте: ${utils.sp(message.user.bank)} ${val1}
💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}`,
                { attachment: `photo-228669263_457239017` }
            );
        }
    }
});

cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type == 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");
        message.args[1] = message.args[1].replace(/([кk])/gi, "000");
        message.args[1] = message.args[1].replace(/([мm])/gi, "000000");
        message.args[1] = message.args[1].replace(
            /(вабанк|вобанк|все|всё)/gi,
            message.user.balance
        );
        if (message.user.inf === true) return bot(`выключите безлимитный баланс`);

        if (!Number(message.args[1])) return;

        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.args[1] <= 0) return;
        if (message.args[1] <= 14) return bot(`минимальная сумма вклада 50 ${val1}`);
        if (message.user.banklim === undefined) {
            message.user.banklim = false;
        }

        if (!message.user.settings.imperator) {
            if (
                message.args[1] + message.user.bank - 1 >= message.user.limit.banklimit &&
                !message.user.banklim
            )
                return bot(
                    `максимальная сумма вклада ${utils.sp(message.user.limit.banklimit)} ${val1}`
                );
            if (
                message.args[1] + message.user.bank - 1 >= 100000000000000000 &&
                message.user.banklim
            )
                return bot(`максимальная сумма вклада 100.000.000.000.000.000 ${val1} ❌`);
        }

        if (message.args[1] > message.user.balance)
            return bot(`у вас нет данной суммы`);
        else if (message.args[1] <= message.user.balance) {
            message.user.balance -= message.args[1];
            message.user.bank += message.args[1];
            return bot(
                `вы успешно положили на свой банковский счёт ${utils.sp(
                    message.args[1]
                )} ${val1} 💵💰`
            );
        }
    }
});

setInterval(() => {
    tokensCache = getToken3(); 
    if (tokensCache) {
        val1 = tokensCache.val1; 
        val2 = tokensCache.val2; 
        val3 = tokensCache.val3; 
        val4 = tokensCache.val4; 
    }
  }, 1000);

module.exports = commands;
