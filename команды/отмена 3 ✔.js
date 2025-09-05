let utils = require('../utils.js')

const commands =[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const fs = require('fs');

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

cmd.hear(/^(?:отмена|cancel|отменить|отмени|верни)\s(3)$/i, async (message, bot) => {
    if (message.chat.type === 2) {
        // Проверяем, не отменялась ли уже эта ставка
        if (message.chat.games[message.chat.games.length - 1].canceledBets?.some(x => x.id === message.senderId && x.type === 3)) {
            return bot(`Вы уже отменяли ставку на x3 в этом раунде.`);
        }

        // Найти последнюю ставку пользователя
        const lastBet = message.chat.games[message.chat.games.length - 1].stavki.find(x => x.id === message.senderId && x.type === 3);

        if (!lastBet) return bot(`У вас нет активной ставки на x3 для отмены.`);

        let refundAmount;

        // Определяем процент возврата в зависимости от суммы ставки
        if (lastBet.amount <= 100000) {
            refundAmount = Math.floor(lastBet.amount * 0.95); // 5% штраф
        } else if (lastBet.amount <= 1000000) {
            refundAmount = Math.floor(lastBet.amount * 0.90); // 10% штраф
        } else {
            refundAmount = Math.floor(lastBet.amount * 0.85); // 15% штраф
        }

        // Возврат средств пользователю в зависимости от режима
        if (message.user.reshim == 2) {
            message.user.balance += refundAmount;
            var currency = val1;
        } else {
            message.user.balance2 += refundAmount;
            var currency = val4;
        }

        // Удаление ставки из массива
        message.chat.games[message.chat.games.length - 1].stavki = message.chat.games[message.chat.games.length - 1].stavki.filter(x => x.id !== message.senderId || x.type !== 3);

        // Добавляем запись об отмененной ставке
        if (!message.chat.games[message.chat.games.length - 1].canceledBets) {
            message.chat.games[message.chat.games.length - 1].canceledBets = [];
        }
        message.chat.games[message.chat.games.length - 1].canceledBets.push({
            id: message.senderId,
            type: 3,
            amount: lastBet.amount
        });

        return bot(`Ваша ставка на x3 в размере ${utils.sp(lastBet.amount)} ${currency} была отменена. Вам возвращено ${utils.sp(refundAmount)} ${currency}.`);
    }
});



module.exports = commands;
