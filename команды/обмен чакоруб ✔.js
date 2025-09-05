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
    console.log('Токены успешно сохранены.');
  } catch (error) {
    console.error('Ошибка при сохранении токенов:', error);
  }
}

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



cmd.hear(new RegExp(`^(?:обмен ${val2}|обменник|о|🛑 Обмен ${val2})$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type == 1) {
    utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);
    return bot(`Обмен ${val2}:

🏆 ➖ Привилегии
1&#8419; Titan | 10.000 ${val2}
2&#8419; Premium | 5.500 ${val2}
3&#8419; VIP | 1.000 ${val2}

📦 ➖ Кейсы
4&#8419; Донат-кейс | 150 ${val2}

💰 ➖ Валюта
5&#8419; 350.000.000 ${val1} | 349 ${val2}
6&#8419; 300.000.000 ${val1} | 299 ${val2}
7&#8419; 100.000.000 ${val1} | 100 ${val2}
8&#8419; 20.000.000 ${val1} | 20 ${val2}
9&#8419; 15.000.000 ${val1}  | 15 ${val2}
1&#8419;0&#8419; 10.000.000 ${val1} | 10 ${val2}
1&#8419;1&#8419; 5.000.000 ${val1} | 5 ${val2}
1&#8419;2&#8419; 3.000.000 ${val1} | 3 ${val2}

💬 ➖ Другое
1&#8419;3&#8419; Киностудия - 3.000.000 ${val1}/час | 2.999 ${val2}
1&#8419;4&#8419; Длинный ник | 14 ${val2}

🌟 ➖ Новинки
1&#8419;5&#8419; Донатный Гигант - 30 ${val2}/час | 15.000 ${val2}
1&#8419;6&#8419; TITAN VIP | 25.000 ${val2}

📦 ➖ Посылки
1&#8419;7&#8419; Денежная посылка | 250 ${val2}
1&#8419;8&#8419; Элитная посылка | 1.000 ${val2}
1&#8419;9&#8419; Премиум посылка | 5.000 ${val2}

💵 ➖ Баланс: ${utils.sp(message.user.rub)} ${val2}

🛒 Для покупки введите "${val2} [номер]".`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 1)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (30000 > message.user.rub) return bot(`недостаточно ${val2}й. ⛔`);

    if (message.user.settings.titan == true) return bot(`у вас уже имеется данный товар. ✅`);

    message.user.rub -= 10000;
    message.user.settings.titan = true;
    message.user.bantop = true;
    message.user.stock.status = 'TITAN';

    return message.send(`▶️ Успешная покупка! -10.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели TITAN.`);

  }
  });

cmd.hear(new RegExp(`^(?:${val2} 2)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (1499 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.settings.premium) return bot(`у вас уже имеется статус [Premium]. ✅`);

    if (!message.user.settings.premium) {

      message.user.settings.premium = true;

      message.user.rub -= 5500;

      return message.send(`▶️ Успешная покупка! -5.500 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «PREMIUM»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «Premium help» 🤗`);

    } 
  }

});



cmd.hear(new RegExp(`^(?:${val2} 3)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (1149 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.settings.vip) return bot(`у вас уже имеется статус [VIP]. ✅`);

    if (!message.user.settings.vip) {

      message.user.settings.vip = true;

      message.user.rub -= 1000;

      return message.send(`▶️ Успешная покупка! -1.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «VIP»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «VIP help» 🤗`);

    }
  }

});

cmd.hear(new RegExp(`^(?:${val2} 4)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (150 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.c3 += 1

    message.user.rub -= 150

    return message.send(`▶️ Успешная покупка! -150 ${val2} 💰\n\n💬 Донат-кейс уже начислен на Ваш аккаунт. 📦`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 5)$`, 'i'), async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

    if (149 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 149;

    message.user.balance += 350000000;



    return message.send(`▶️ Успешная покупка! -149 ${val2} 💰\n\n💵 +350.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 6)$`, 'i'), async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

    if (299 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 299;

    message.user.balance += 300000000;



    return message.send(`▶️ Успешная покупка! -299 ${val2} 💰\n\n💵 +300.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 7)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (100 > message.user.rub) return bot(`недостаточно Чако-рублей. ⛔`);



    message.user.rub -= 100;

    message.user.balance += 100000000;



    return message.send(`▶️ Успешная покупка! -100 ${val2} 💰\n\n💵 +100.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 8)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (20 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 20;

    message.user.balance += 20000000;



    return message.send(`▶️ Успешная покупка! -20 ${val2} 💰\n\n💵 +20.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 9)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (15 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 15;

    message.user.balance += 15000000;



    return message.send(`▶️ Успешная покупка! -15 ${val2} 💰\n\n💵 +15.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 10)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (10 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 10;

    message.user.balance += 50000000;



    return message.send(`▶️ Успешная покупка! -10 ${val2} 💰\n\n💵 +50.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 11)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (5 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 5;

    message.user.balance += 15000000;



    return message.send(`▶️ Успешная покупка! -5 ${val2} 💰\n\n💵 +15.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 12)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (3 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 3;

    message.user.balance += 50000000;



  return message.send(`▶️ Успешная покупка! -3 ${val2} 💰\n\n💵 +5.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 13)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (2999 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.business2.length > 0) return bot(`у вас уже есть бизнес`,
    {
      keyboard: JSON.stringify({
        inline: true,
        buttons: [
          [{
            action: {
              type: "text",
              payload: JSON.stringify({ command: "продать бизнес" }),
              label: "❎ Продать"
            },
            color: "primary"
          }]
        ]
      })
    });



    message.user.rub -= 2999;

    message.user.business2.push({

      "id": 16,

      "upgrade": 1,

      "workers": 7500,

      "moneys": 0

    });



      return message.send(`▶️ Успешная покупка! -2999 ${val2} 💰\n\n🎥 Бизнес «Киностудия по всему миру» выдана на Ваш аккаунт! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 14)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (14 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.nicklimit > 31) return bot(`у вас уже имеется данный товар. ✅`);



    message.user.rub -= 14;

    message.user.nicklimit = 32;



    return message.send(`▶️ Успешная покупка! -14 ${val2} 💰\n\n💬 Вы приобрели длинный ник-нейм, теперь его длина составляет 32 символа. 🔥`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 15)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.stars5) return bot(`Вы уже купили данную звезду ❌`);

    if (message.user.rub >= 15000) {

      message.user.stars5 = true;

      message.user.rub -= 15000;

      return message.send(`▶️ Успешная покупка! -15.000 ${val2} 💰\n\n⭐ Звезда «Донатный гигант» выдана на Ваш аккаунт! 🎉`);

    } else {

      return bot(`недостаточно ${val2}. ⛔`);

    }


  }
});

cmd.hear(new RegExp(`^(?:${val2} 16)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (25000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 25000;

    message.user.settings.titan = true;

    message.user.limit.nicklimit = 48;

    message.user.level += 50;

    message.user.opit += 50000;

    message.user.limit.banklimit = 500000000000000;

    message.user.limit.farmlimit = 10000;

    message.user.limit.playerlimit = 300000000000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 100;



    return message.send(`▶️ Успешная покупка! -25.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «TITAN»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «TITAN help» 🤗`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 17)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (250 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka1 += 1;

    message.user.rub -= 250;

    return message.send(`▶️ Успешная покупка! -250 ${val2} 💰\n\n📦 Денежная посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 1» 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 18)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (1000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka2 += 1;

    message.user.rub -= 1000;

    return message.send(`▶️ Успешная покупка! -1000 ${val2} 💰\n\n📦 Элитная посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 2» 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 19)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (5000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka3 += 1;

    message.user.rub -= 5000;

    return message.send(`▶️ Успешная покупка! -5000 ${val2} 💰\n\n📦 Премиум посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 3» 🎉`);
  }

});



// Общая функция для создания клавиатуры обмена
function createExchangeKeyboard(command, maxAmount, currency) {
  return JSON.stringify({
    inline: true,
    buttons: [[{
      action: {
        type: "text",
        payload: JSON.stringify({ command: `${command} ${maxAmount}` }),
        label: `🛒 Купить ${maxAmount} (${currency})`,
      },
      color: "positive",
    }]]
  });
}

cmd.hear(/^(?:📈 Обмен|Обмен)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    await bot(`Выберите какой обменик вы будите использовать?`, {
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен 1" }),
              "label": "💎 Старый"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "маничек 2" }),
              "label": "💰 Новый"
            },
            "color": "primary"
          }]
        

        ]
      })
    });
  }
})





cmd.hear(/^(?:📈 Обмен 1|Обмен 1)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    await bot(`💰 Обменник ${val4}

💱 Валюта

1⃣ 1.000 ${val4} ➜ 20.000.000 ${val1}

🎁 Starr Drop

2⃣ 150.000 ${val4} ➜ Starr Drop

💵 Донат – Рубли

3⃣ 1.000.000 ${val4} ➜ 10 рублей

💳 Обмен на ${val4}

4⃣ 60.000.000 ${val1} ➜ 1.000 ${val4}
5⃣ 1.000 ${val2} ➜ 10.000 ${val4}
6⃣ 1 билет ➜ 5.000 ${val4}


📊 Ваш баланс валют:

💰 Баланс: ${utils.sp(message.user.balance)} ${val1}

💸 Баланс: ${utils.sp(message.user.rubli)} рублей

🎟️ Баланс: ${utils.sp(message.user.bilet)} билетов

💸 Баланс: ${utils.sp(message.user.rub)} ${val2}ов

💾 Баланс: ${utils.sp(message.user.balance2)} ${val4}

🛒 Для покупки введите "Обмен [номер] [кол-во]"`)
  }
})
// Обмен 1
cmd.hear(/^(?:Обмен 1)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 1000;
        const gainPerExchange = 20000000;

        const maxAmount = Math.floor(message.user.balance2 / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.balance2 < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 1", maxAmount, val4);
            return bot(
                `❌ Недостаточно ${val4}!\n` +
                `▸ У вас: ${message.user.balance2.toLocaleString()} ${val4}\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} ${val4}\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.balance += totalGain;
        message.user.balance2 -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} ${val4}\n` +
            `▸ Получено: ${totalGain.toLocaleString()} ${val1}`
        );
    }
});

// Обмен 2
cmd.hear(/^(?:Обмен 2)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 150000;
        const gainPerExchange = 1;

        const maxAmount = Math.floor(message.user.balance2 / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.balance2 < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 2", maxAmount, val4);
            return bot(
                `❌ Недостаточно ${val4}!\n` +
                `▸ У вас: ${message.user.balance2.toLocaleString()} ${val4}\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} ${val4}\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.c4 += totalGain;
        message.user.balance2 -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} ${val4}\n` +
            `▸ Получено: ${totalGain.toLocaleString()} Starr Drop`
        );
    }
});

// Обмен 3
cmd.hear(/^(?:Обмен 3)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 1000000;
        const gainPerExchange = 10;

        const maxAmount = Math.floor(message.user.balance2 / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.balance2 < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 3", maxAmount, val4);
            return bot(
                `❌ Недостаточно ${val4}!\n` +
                `▸ У вас: ${message.user.balance2.toLocaleString()} ${val4}\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} ${val4}\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.rubli += totalGain;
        message.user.balance2 -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} ${val4}\n` +
            `▸ Получено: ${totalGain.toLocaleString()} рублей`
        );
    }
});

// Обмен 4
cmd.hear(/^(?:Обмен 4)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 60000000;
        const gainPerExchange = 1000;

        const maxAmount = Math.floor(message.user.balance / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.balance < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 4", maxAmount, val1);
            return bot(
                `❌ Недостаточно ${val1}!\n` +
                `▸ У вас: ${message.user.balance.toLocaleString()} ${val1}\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} ${val1}\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.balance2 += totalGain;
        message.user.balance -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} ${val1}\n` +
            `▸ Получено: ${totalGain.toLocaleString()} ${val4}`
        );
    }
});

// Обмен 5
cmd.hear(/^(?:Обмен 5)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 1000;
        const gainPerExchange = 10000;

        const maxAmount = Math.floor(message.user.rub / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.rub < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 5", maxAmount, val2);
            return bot(
                `❌ Недостаточно ${val2}!\n` +
                `▸ У вас: ${message.user.rub.toLocaleString()} ${val2}\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} ${val2}\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.balance2 += totalGain;
        message.user.rub -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} ${val2}\n` +
            `▸ Получено: ${totalGain.toLocaleString()} ${val4}`
        );
    }
});

// Обмен 6
cmd.hear(/^(?:Обмен 6)(?: (\d+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = Number(message.args[1]) || 1;
        const costPerExchange = 1;
        const gainPerExchange = 5000;

        const maxAmount = Math.floor(message.user.bilet / costPerExchange);
        const totalCost = costPerExchange * count;
        const totalGain = gainPerExchange * count;

        if (message.user.bilet < totalCost) {
            const keyboard = createExchangeKeyboard("Обмен 6", maxAmount, "билетов");
            return bot(
                `❌ Недостаточно билетов!\n` +
                `▸ У вас: ${message.user.bilet.toLocaleString()} билетов\n` +
                `▸ Нужно: ${totalCost.toLocaleString()} билетов\n` +
                `▸ Максимум можно купить: ${maxAmount}`,
                { keyboard }
            );
        }

        message.user.balance2 += totalGain;
        message.user.bilet -= totalCost;

        return message.send(
            `✅ Успешный обмен!\n` +
            `▸ Потрачено: ${totalCost.toLocaleString()} билетов\n` +
            `▸ Получено: ${totalGain.toLocaleString()} ${val4}`
        );
    }
});



cmd.hear(/^(?:📈 Обманичек 2|маничек 2)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    await bot(`Выберите что хотите получить:
    Ваш баланс - ${utils.sp(message.user.oval)} sealcoins
    
    sealcoins - можно получить за участия в гонках. от 1 до 5.`, {
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен GB" }),
              "label": "💎 GB"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Валюта" }),
              "label": "💰 Валюта"
            },
            "color": "primary"
          }],
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Кейар" }),
              "label": "🎁 Кейсы"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Star Drop" }),
              "label": "⭐ Star Drop"
            },
            "color": "primary"
          }],
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Билеты" }),
              "label": "🎫 Билеты"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Рубли" }),
              "label": "₽ Рубли"
            },
            "color": "primary"
          }],
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Статусы" }),
              "label": "🏆 Статусы"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Фермы" }),
              "label": "🚜 Фермы"
            },
            "color": "primary"
          }],
          [{
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен рандом" }),
              "label": "🎡 Mystery Boxs"
            },
            "color": "primary"
          }, {
            "action": {
              "type": "text",
              "payload": JSON.stringify({ command: "Обмен Руда" }),
              "label": "⛏️ Руда"
            },
            "color": "primary"
          }],

        ]
      })
    });
  }
})

cmd.hear(/^(?:справка овала)$/i, async (message, bot) => {
return bot(`💰 Как получить SealCoins?

Просто участвуй в гонках 🏁, и у тебя будет шанс выиграть:  
🎯 1-5 SealCoins за заезд!  

Также каждый день будет сам бот давать от 1-2 штук  

Чем чаще играешь — тем больше получаешь! 🚀  
Удачи на треке! 🏎️💨 `)

})

cmd.hear(/^(?:Обмен Руда)$/i, async (message, bot) => {
return bot(`Выбери:

 1. Железо - 1 sealcoin
 2. Золото - 1 sealcoin
 3. Алмазы - 5 sealcoin
 4. Материя - 10 sealcoin
 5. Обсидиан - 15 sealcoin
 6. Плазма - 25 sealcoin

Для покупки напишите - ор (номер) (кол-во)

  `)

})

cmd.hear(/^(?:Обмен рандом)$/i, async (message, bot) => {
return bot(`🎁 Выбери вариант:

1. Mystery Box 🎁✨ - 50 sealcoin

   Внимание! Здесь может быть абсолютно любой предмет из бота: от валюты 💵 до статуса 👑.  

   🔹 Для покупки напиши:
   об 1 (количество)
 `)

})

cmd.hear(/^(?:Обмен Фермы)$/i, async (message, bot) => {
return bot(`Выбери:

  1. 1 шт - 20 sealcoin
  
  Для покупки напишите - оф 1 (кол-во)
  `)

})

cmd.hear(/^(?:Обмен Рубли)$/i, async (message, bot) => {
return bot(`Выбери:

  1. 1 донат рубль - 10 sealcoin
  2. 10 ${val2} - 15 sealcoin

  Для покупки напишите - ору (номер) (кол-во)`)

})

cmd.hear(/^(?:Обмен Билеты)$/i, async (message, bot) => {
return bot(`Выбери:

  1. 1 билет - 5 sealcoin
  2. 5 билетов - 23 sealcoin
  3. 10 билетов - 45 sealcoin
  
  Для покупки напишите - об (номер) (кол-во)`)

})

cmd.hear(/^(?:Обмен Star Drop)$/i, async (message, bot) => {
return bot(`Выбери:

  1.Редкий - 15 sealcoin
  2.Сверхредкий - 20 sealcoin
  3.Эпический - 35 sealcoin
  4.Мифический - 50 sealcoin
  5.Легендарный - 90 sealcoin

Для покупки напишите - ос (номер) (кол-во)
`)

})

cmd.hear(/^(?:Обмен Кейар)$/i, async (message, bot) => {
return bot(`Выбери:

  1. Обычный - 5 sealcoin
  2. Золотой - 5 sealcoin
  3. Донатный - 10 sealcoin
  4. Star Drop - 10 sealcoin
  5. Halloween - 20 sealcoin
  6. Секретный - 15 sealcoin
  7. Автозвук - 5 sealcoin
  8. Новоголдний - 25 sealcoin
  9. Премиум - 30 sealcoin
  10. Ультра - 40 sealcoin
  11. Рандомный - 20 sealcoin
  
  Для покупки напишите - ок (номер) (кол-во)`)

})

cmd.hear(/^(?:Обмен Валюта)$/i, async (message, bot) => {
return bot(`Выбери:

  1. 1.000.000 ${val1} - 1 sealcoin
  2. 1.000.000.000 ${val1} - 700 sealcoin
  
  Для покупки напишите - ов (номер) (кол-во)`)

})

cmd.hear(/^(?:Обмен GB)$/i, async (message, bot) => {
return bot(`Выбери:

  1. 1.000 ${val4} - 5 sealcoin
  2. 10.000 ${val4} - 8 sealcoin
  3. 50.000 ${val4} - 30 sealcoin
  4. 100.000 ${val4} - 60 sealcoin
  5. 1.000.000 ${val4} - 500 sealcoin
  
  Для покупки напишите - ог (номер) (кол-во)`)

})

cmd.hear(/^(?:Обмен Статусы)$/i, async (message, bot) => {
return bot(`Выбери:
 
   1. VIP - 100 sealcoin
   2. PREMIUM - 200 sealcoin
   3. TITAN - 300 sealcoin
   4. JOKER - 400 sealcoin
   5. IMPERATOR - 500 sealcoin
   6. TOPDON - 600 sealcoin
   7. ADMIN - 1000 sealcoin

   Для покупки напишите - остатус (номер)
  `)

})
// Обработчики покупки руды
cmd.hear(/^(?:ор|ОР)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  try {
    // Получаем аргументы с дефолтными значениями
    const item = parseInt(message.args[1] || 1);
    const amountInput = message.args[2];
    const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

    if (isNaN(item) || item < 1 || item > 6) {
      return bot("❌ Неверный номер руды. Доступные варианты: 1-6");
    }

    if (isNaN(amount) || amount < 1) {
      return bot("❌ Количество должно быть числом от 1 до 1.000.000");
    }

    const prices = {
      1: 1,   // Железо
      2: 1,   // Золото
      3: 5,   // Алмазы
      4: 10,  // Материя
      5: 15,  // Обсидиан
      6: 25   // Плазма
    };

    const itemNames = {
      1: "Железо",
      2: "Золото",
      3: "Алмазы",
      4: "Материя",
      5: "Обсидиан",
      6: "Плазма"
    };

    const itemKeys = {
      1: "zhelezo",
      2: "zoloto",
      3: "almaz",
      4: "materia",
      5: "obsidian",
      6: "plazma"
    };

    const totalPrice = prices[item] * amount;
    
    // Проверка баланса
    if (message.user.oval < totalPrice) {
      return bot(`❌ Недостаточно sealcoins. Нужно: ${totalPrice}, у вас: ${message.user.oval}`);
    }

    // Инициализация руд
    message.user.ruds = message.user.ruds || {
      zhelezo: 0,
      zoloto: 0,
      almaz: 0,
      materia: 0,
      obsidian: 0,
      plazma: 0
    };

    // Обновление количества руды
    const itemKey = itemKeys[item];
    message.user.ruds[itemKey] = (message.user.ruds[itemKey] || 0) + amount;
    
    // Списание средств
    message.user.oval -= totalPrice;

    // Успешное сообщение
    return bot(`✅ Успешная покупка!\n` +
               `▸ Куплено: ${amount} ${itemNames[item]}\n` +
               `▸ Стоимость: ${totalPrice} sealcoins\n` +
               `▸ Теперь у вас: ${message.user.ruds[itemKey]} ${itemNames[item]}\n` +
               `▸ Остаток: ${message.user.oval} sealcoins`);

  } catch (error) {
    console.error("Ошибка в обработчике руды:", error);
    return bot("⚠ Произошла ошибка при обработке запроса. Попробуйте позже.");
  }
});

// Обработчик покупки боксов
cmd.hear(/^(?:об|ОБ)(?:\s+1)?(?:\s+(\d+))?$/i, async (message, bot) => {
  const amountInput = message.args[1];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  if (isNaN(amount) || amount < 1) {
    return bot("❌ Количество должно быть числом от 1 до 1.000.000");
  }

  const pricePerBox = 50;
  const totalPrice = pricePerBox * amount;

  if (message.user.oval < totalPrice) {
    return bot(`❌ Недостаточно sealcoins. Нужно: ${totalPrice}, у вас: ${message.user.oval}`);
  }

  // Списываем валюту
  message.user.oval -= totalPrice;

  // Инициализация структур если нет
  if (!message.user.ruds) {
    message.user.ruds = {
      zhelezo: 0, zoloto: 0, almaz: 0,
      materia: 0, obsidian: 0, plazma: 0
    };
  }
  if (!message.user.settings) {
    message.user.settings = {};
  }
  if (!message.user.misc) {
    message.user.misc = { farm_count: 0 };
  }

  // Настройки статусов для компенсации
  const statusData = {
    vip: { name: "VIP", price: 100 },
    premium: { name: "PREMIUM", price: 200 },
    titan: { name: "TITAN", price: 300 },
    joker: { name: "JOKER", price: 400 },
    imperator: { name: "IMPERATOR", price: 500 },
    topdon: { name: "TOPDON", price: 600 },
    adm: { name: "ADMIN", price: 1000 }
  };

  // Улучшенная система редкостей с весами для призов
  const raritySystem = [
    { 
      name: "Легендарная", 
      emoji: "🟡",
      chance: 1,
      prizes: [
        { name: "VIP статус", field: "settings.vip", amount: 1, weight: 10 },
        { name: "PREMIUM статус", field: "settings.premium", amount: 1, weight: 8 },
        { name: "TITAN статус", field: "settings.titan", amount: 1, weight: 6 },
        { name: "JOKER статус", field: "settings.joker", amount: 1, weight: 4 },
        { name: "IMPERATOR статус", field: "settings.imperator", amount: 1, weight: 3 },
        { name: "TOPDON статус", field: "settings.topdon", amount: 1, weight: 2 },
        { name: "ADMIN статус", field: "settings.adm", amount: 1, weight: 1 }
      ]
    },
    {
      name: "Мифическая",
      emoji: "🟠",
      chance: 4,
      prizes: [
        { name: "Обычный кейс", field: "c1", amount: 1, weight: 100 },
        { name: "Золотой кейс", field: "c2", amount: 1, weight: 80 },
        { name: "Донатный кейс", field: "c3", amount: 1, weight: 60 },
        { name: "Star Drop кейс", field: "c4", amount: 1, weight: 40 },
        { name: "Halloween кейс", field: "c5", amount: 1, weight: 30 },
        { name: "Секретный кейс", field: "c6", amount: 1, weight: 20 },
        { name: "Автозвук кейс", field: "c7", amount: 1, weight: 15 },
        { name: "Новогодний кейс", field: "c8", amount: 1, weight: 10 },
        { name: "Премиум кейс", field: "c9", amount: 1, weight: 5 },
        { name: "Ультра кейс", field: "c10", amount: 1, weight: 2 },
        { name: "Редкий Star Drop", field: "c12", amount: 1, weight: 50 },
        { name: "Сверхредкий Star Drop", field: "c13", amount: 1, weight: 30 },
        { name: "Эпический Star Drop", field: "c14", amount: 1, weight: 20 },
        { name: "Мифический Star Drop", field: "c15", amount: 1, weight: 10 },
        { name: "Легендарный Star Drop", field: "c16", amount: 1, weight: 5 }
      ]
    },
    {
      name: "Эпическая",
      emoji: "🟣", 
      chance: 15,
      prizes: [
        { name: "150 железа", field: "ruds.zhelezo", amount: 150, weight: 100 },
        { name: "70 золота", field: "ruds.zoloto", amount: 70, weight: 70 },
        { name: "50 алмазов", field: "ruds.almaz", amount: 50, weight: 50 },
        { name: "30 материи", field: "ruds.materia", amount: 30, weight: 30 },
        { name: "20 обсидиана", field: "ruds.obsidian", amount: 20, weight: 20 },
        { name: "10 плазма", field: "ruds.plazma", amount: 10, weight: 10 }
      ]
    },
    {
      name: "Редкая",
      emoji: "🔵",
      chance: 30,
      prizes: [
        { name: "5 sealcoins", field: "oval", amount: 5, weight: 100 },
        { name: "10 sealcoins", field: "oval", amount: 10, weight: 70 },
        { name: "15 sealcoins", field: "oval", amount: 15, weight: 50 },
        { name: "2 билета", field: "bilet", amount: 2, weight: 80 },
        { name: "5 билетов", field: "bilet", amount: 5, weight: 50 },
        { name: "10 билетов", field: "bilet", amount: 10, weight: 30 },
        { name: "1 ферма", field: "misc.farm_count", amount: 1, weight: 90 },
        { name: "5 ферм", field: "misc.farm_count", amount: 5, weight: 60 },
        { name: "10 ферм", field: "misc.farm_count", amount: 10, weight: 40 },
        { name: "15 ферм", field: "misc.farm_count", amount: 15, weight: 20 }
      ]
    },
    {
      name: "Обычная",
      emoji: "🟢",
      chance: 50,
      prizes: [
        { name: "1.000.000 валюты", field: "balance", amount: 1000000, weight: 100 },
        { name: "5.000.000 валюты", field: "balance", amount: 5000000, weight: 60 },
        { name: "10.000.000 валюты", field: "balance", amount: 10000000, weight: 30 },
        { name: "30.000.000 валюты", field: "balance", amount: 30000000, weight: 15 },
        { name: "50.000.000 валюты", field: "balance", amount: 50000000, weight: 10 },
        { name: "100.000.000 валюты", field: "balance", amount: 100000000, weight: 5 },
        { name: "1.000 GB", field: "balance2", amount: 1000, weight: 100 },
        { name: "5.000 GB", field: "balance2", amount: 5000, weight: 70 },
        { name: "10.000 GB", field: "balance2", amount: 10000, weight: 50 },
        { name: "25.000 GB", field: "balance2", amount: 25000, weight: 30 },
        { name: "50.000 GB", field: "balance2", amount: 50000, weight: 20 },
        { name: "100.000 GB", field: "balance2", amount: 100000, weight: 10 }
      ]
    }
  ];

  let results = [];
  let compensation = 0;

  // Функция для выбора приза с учетом весов
  const selectPrize = (prizes) => {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const prize of prizes) {
      cumulativeWeight += prize.weight;
      if (random <= cumulativeWeight) {
        return prize;
      }
    }
    return prizes[0];
  };

  // Открытие боксов
  for (let i = 0; i < amount; i++) {
    const roll = Math.random() * 100;
    let cumulativeChance = 0;
    let selectedRarity = null;

    // Выбираем редкость
    for (const rarity of raritySystem) {
      cumulativeChance += rarity.chance;
      if (roll <= cumulativeChance) {
        selectedRarity = rarity;
        break;
      }
    }

    // Выбираем приз
    const prize = selectPrize(selectedRarity.prizes);

    // Проверка на статусы и компенсация
    if (prize.field.startsWith('settings.')) {
      const statusType = prize.field.split('.')[1];
      if (message.user.settings[statusType]) {
        // Выдаем компенсацию
        compensation += statusData[statusType].price;
        results.push({
          name: `Компенсация за ${statusData[statusType].name}`,
          amount: statusData[statusType].price,
          rarity: selectedRarity.name,
          emoji: selectedRarity.emoji
        });
        continue;
      }
    }

    // Начисляем приз
    const fieldPath = prize.field.split('.');
    let target = message.user;
    
    for (let i = 0; i < fieldPath.length - 1; i++) {
      target = target[fieldPath[i]] = target[fieldPath[i]] || {};
    }
    
    target[fieldPath[fieldPath.length - 1]] = 
      (target[fieldPath[fieldPath.length - 1]] || 0) + prize.amount;
    
    results.push({
      name: prize.name,
      amount: prize.amount,
      rarity: selectedRarity.name,
      emoji: selectedRarity.emoji
    });
  }

  // Добавляем компенсацию если есть
  if (compensation > 0) {
    message.user.oval += compensation;
  }

  // Формируем ответ
  let responseText = `🎁 Открыто ${amount} боксов за ${totalPrice} SC\n`;

  // Группируем результаты по редкости
  const rarityGroups = {};
  results.forEach(item => {
    if (!rarityGroups[item.rarity]) {
      rarityGroups[item.rarity] = {
        emoji: item.emoji,
        items: {}
      };
    }
    
    const key = item.name;
    if (!rarityGroups[item.rarity].items[key]) {
      rarityGroups[item.rarity].items[key] = {
        count: 0,
        total: 0
      };
    }
    
    rarityGroups[item.rarity].items[key].count++;
    rarityGroups[item.rarity].items[key].total += item.amount;
  });

  // Добавляем в сообщение только те редкости, которые выпали
  for (const [rarity, data] of Object.entries(rarityGroups)) {
    responseText += `\n${data.emoji} ${rarity}:\n`;
    
    for (const [item, info] of Object.entries(data.items)) {
      responseText += `• ${item} ×${info.count} (Σ ${info.total})\n`;
    }
  }

  // Статистика редкостей
  const rarityStats = {};
  results.forEach(item => {
    rarityStats[item.rarity] = (rarityStats[item.rarity] || 0) + 1;
  });

  responseText += `\n📊 Статистика:\n`;
  for (const [rarity, count] of Object.entries(rarityStats)) {
    const emoji = raritySystem.find(r => r.name === rarity)?.emoji || '';
    responseText += `${emoji} ${rarity}: ${count} (${((count / amount) * 100).toFixed(1)}%)\n`;
  }

  // Баланс и компенсация
  if (compensation > 0) {
    responseText += `\n💰 Компенсация: +${compensation} SC`;
  }
  responseText += `\n💵 Баланс: ${message.user.oval} SC`;

  return bot(responseText);
});

// Обработчики покупки ферм  
cmd.hear(/^(?:оф|ОФ)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {  
    // Получаем аргументы с дефолтными значениями
    const item = parseInt(message.args[1] || 1);
    const amountInput = message.args[2];
    const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

    if (isNaN(item) || item !== 1) {
      return bot("❌ Доступен только вариант 1");
    }

    if (isNaN(amount) || amount < 1) {
      return bot("❌ Количество должно быть числом от 1 до 1.000.000");
    }

    const price = 20;  
    const totalPrice = price * amount;  

    if (message.user.oval < totalPrice) return bot("❌ Недостаточно sealcoins для покупки");  

    message.user.oval -= totalPrice;  
    message.user.misc = message.user.misc || {};
    message.user.misc.farm_count = (message.user.misc.farm_count || 0) + amount;  

    return bot(`🚜 Вы купили ${amount} ферм за ${totalPrice} sealcoins`);  
});

// Обработчики покупки рублей
cmd.hear(/^(?:ору|ОРУ)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  // Получаем аргументы с дефолтными значениями
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  const prices = {
    1: {
      price: 10,        // Стоимость в sealcoins
      rubles: 1,        // Количество рублей за 1 покупку
      name: "донат рублей"
    },
    2: {
      price: 15,        // Стоимость в sealcoins
      rubles: 10,       // Количество рублей за 1 покупку
      name: `${val2}`    // Название валюты
    }
  };

  if (!prices[item]) {
    return bot("❌ Доступные варианты:\n" +
      "1. 1 донат рубль - 10 sealcoins\n" +
      `2. 10 ${val2} - 15 sealcoins`);
  }

  if (isNaN(amount) || amount < 1) {
    return bot("❌ Количество должно быть числом от 1 до 1.000.000");
  }

  const option = prices[item];
  const totalPrice = option.price * amount;
  const totalRubles = option.rubles * amount;

  if (message.user.oval < totalPrice) {
    return bot(`❌ Недостаточно sealcoins. Нужно: ${totalPrice}, у вас: ${message.user.oval}`);
  }

  // Списание sealcoins и начисление рублей
  message.user.oval -= totalPrice;
  
  if (item == 1) {
    message.user.rubli = (message.user.rubli || 0) + totalRubles;
  } else {
    message.user.rub = (message.user.rub || 0) + totalRubles;
  }

  return bot(`✅ Вы успешно купили ${totalRubles} ${option.name} за ${totalPrice} sealcoins\n` +
             `💰 Новый баланс: ${item == 1 ? message.user.rubli : message.user.rub} ${option.name}`);
});

// Обработчики покупки билетов
cmd.hear(/^(?:об|ОБ)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  const prices = {
    1: 5,  // 1 билет
    2: 23, // 5 билетов
    3: 45  // 10 билетов
  };

  const ticketAmounts = {
    1: 1,
    2: 5,
    3: 10
  };

  if (!prices[item]) return bot("❌ Такого варианта не существует");

  if (isNaN(amount) || amount < 1) {
    return bot("❌ Количество должно быть числом от 1 до 1.000.000");
  }

  const totalPrice = prices[item] * amount;
  if (message.user.oval < totalPrice) return bot("❌ Недостаточно sealcoins для покупки");

  // Вычитаем стоимость и начисляем билеты
  message.user.oval -= totalPrice;
  message.user.bilet = (message.user.bilet || 0) + ticketAmounts[item] * amount;

  return bot(`🎫 Вы купили ${ticketAmounts[item] * amount} билетов за ${totalPrice} sealcoins`);
});

// Обработчики покупки Star Drop
cmd.hear(/^(?:ос|ОС)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  const prices = {
    1: 15, // Редкий
    2: 20, // Сверхредкий
    3: 35, // Эпический
    4: 50, // Мифический
    5: 90  // Легендарный
  };

  const rarityNames = {
    1: "Редкий",
    2: "Сверхредкий",
    3: "Эпический",
    4: "Мифический",
    5: "Легендарный"
  };

  if (!prices[item]) return bot("❌ Такого варианта не существует");

  if (isNaN(amount) || amount < 1) {
    return bot("❌ Количество должно быть числом от 1 до 1.000.000");
  }

  const totalPrice = prices[item] * amount;
  if (message.user.oval < totalPrice) return bot("❌ Недостаточно sealcoins для покупки");

  // Просто списываем валюту и выдаем Star Drop без проверки ячеек
  message.user.oval -= totalPrice;
  
  // Начисляем Star Drop (пример для 1 типа, адаптируйте под вашу логику)
  message.user[`c${item + 11}`] = (message.user[`c${item + 11}`] || 0) + amount;

  return bot(`⭐ Вы купили ${amount} ${rarityNames[item]} Star Drop за ${totalPrice} sealcoins`);
});

// Обработчики покупки кейсов
cmd.hear(/^(?:ок|ОК)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  // Настройки кейсов
  const caseData = {
    1: { id: 1, name: "Обычный", price: 5, rarity: "Обычный", emoji: "📦", weight: 6000 },
    2: { id: 2, name: "Золотой", price: 5, rarity: "Редкий", emoji: "🏆", weight: 1500 },
    3: { id: 3, name: "Донатный", price: 10, rarity: "Редкий+", emoji: "💳", weight: 1000 },
    4: { id: 4, name: "Star Drop", price: 10, rarity: "Необычный", emoji: "⭐", weight: 500 },
    5: { id: 5, name: "Halloween", price: 20, rarity: "Необычный+", emoji: "🎃", weight: 400 },
    6: { id: 6, name: "Секретный", price: 15, rarity: "Эпический", emoji: "🗝️", weight: 300 },
    7: { id: 7, name: "Автозвук", price: 5, rarity: "Эпический+", emoji: "🚗", weight: 150 },
    8: { id: 8, name: "Новогодний", price: 25, rarity: "Легендарный", emoji: "🎄", weight: 100 },
    9: { id: 9, name: "Премиум", price: 30, rarity: "Мифический", emoji: "🔥", weight: 40 },
    10: { id: 10, name: "Ультра", price: 40, rarity: "Ультралегендарный", emoji: "💎", weight: 10 },
    11: { id: 11, name: "Рандомный", price: 20, rarity: "Рандом", emoji: "🎰" }
  };

  if (!caseData[item]) return bot("❌ Такого варианта кейса не существует");
  if (isNaN(amount) || amount < 1) return bot("❌ Количество должно быть числом от 1 до 1.000.000");

  const totalPrice = caseData[item].price * amount;
  if (message.user.oval < totalPrice) return bot("❌ Недостаточно sealcoins для покупки");

  message.user.oval -= totalPrice;

  // Обработка рандомных кейсов
  if (item === 11) {
    let results = {};
    
    // Функция выбора с учетом весов
    const getRandomCase = () => {
      const totalWeight = Object.values(caseData)
        .filter(c => c.id <= 10)
        .reduce((sum, data) => sum + data.weight, 0);
      
      let random = Math.random() * totalWeight;
      for (let i = 1; i <= 10; i++) {
        if (random < caseData[i].weight) return i;
        random -= caseData[i].weight;
      }
      return 1;
    };

    // Открытие кейсов
    for (let i = 0; i < amount; i++) {
      const randomCase = getRandomCase();
      message.user[`c${randomCase}`] = (message.user[`c${randomCase}`] || 0) + 1;
      results[randomCase] = (results[randomCase] || 0) + 1;
    }

    // Преобразуем в массив и сортируем
    const sortedResults = Object.entries(results)
      .map(([caseId, count]) => ({
        ...caseData[caseId],
        count
      }))
      .sort((a, b) => b.count - a.count || b.id - a.id);

    // Формируем вывод
    let responseText = `🎰 Вы купили ${amount} рандомных кейсов:\n\n`;
    for (const item of sortedResults) {
      responseText += `${item.emoji} [${item.rarity}] ${item.name} — ${item.count} шт.\n`;
    }

    responseText += `\n💸 Итого потрачено: ${totalPrice} sealcoins`;
    return bot(responseText);
  }

  // Обычные кейсы (1-10)
  message.user[`c${item}`] = (message.user[`c${item}`] || 0) + amount;
  return bot(
    `${caseData[item].emoji} Вы купили ${amount} [${caseData[item].rarity}] ` +
    `${caseData[item].name} кейсов за ${totalPrice} sealcoins`
  );
});

// Обработчики покупки валюты
cmd.hear(/^(?:ов|ОВ)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  // Настройки валюты
  const currencyOptions = {
    1: {
      price: 1,           // Стоимость в sealcoins
      amount: 1000000,    // 1.000.000 валюты
      name: val1 || "$"   // Название валюты (использует val1 или "$" по умолчанию)
    },
    2: {
      price: 700,         // Стоимость в sealcoins
      amount: 1000000000, // 1.000.000.000 валюты
      name: val1 || "$"   // Название валюты
    }
  };

  if (!currencyOptions[item]) return bot("❌ Такого варианта не существует");
  if (isNaN(amount) || amount < 1) return bot("❌ Количество должно быть числом от 1 до 1.000.000");

  const option = currencyOptions[item];
  const totalPrice = option.price * amount;
  const totalCurrency = option.amount * amount;

  // Проверка баланса
  if (message.user.oval < totalPrice) {
    return bot("❌ Недостаточно sealcoins для покупки");
  }

  // Списание sealcoins и начисление валюты
  message.user.oval -= totalPrice;
  message.user.balance = (message.user.balance || 0) + totalCurrency;

  return bot(
    `💰 Вы купили ${totalCurrency.toLocaleString()} ${option.name} ` +
    `за ${totalPrice} sealcoins\n` +
    `📊 Новый баланс: ${message.user.balance.toLocaleString()} ${option.name}`
  );
});

cmd.hear(/^(?:ог|ОГ)(?:\s+(\d+))?(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);
  const amountInput = message.args[2];
  const amount = amountInput ? Math.min(parseInt(amountInput), 1000000) : 1;

  // Обновленные настройки валюты GB
  const currencyOptions = {
    1: {
      price: 5,          // 5 sealcoin
      amount: 1000,      // 1.000 GB
      name: "GB"
    },
    2: {
      price: 8,          // 8 sealcoin
      amount: 10000,     // 10.000 GB
      name: "GB"
    },
    3: {
      price: 30,         // 30 sealcoin
      amount: 50000,     // 50.000 GB
      name: "GB"
    },
    4: {
      price: 60,         // 60 sealcoin
      amount: 100000,    // 100.000 GB
      name: "GB"
    },
    5: {
      price: 500,        // 500 sealcoin
      amount: 1000000,   // 1.000.000 GB
      name: "GB"
    }
  };

  if (!currencyOptions[item]) {
    return bot("❌ Доступные варианты:\n" +
      "1. 1.000 GB - 5 sealcoin\n" +
      "2. 10.000 GB - 8 sealcoin\n" +
      "3. 50.000 GB - 30 sealcoin\n" +
      "4. 100.000 GB - 60 sealcoin\n" +
      "5. 1.000.000 GB - 500 sealcoin");
  }

  if (isNaN(amount) || amount < 1) {
    return bot("❌ Количество должно быть числом от 1 до 1.000.000");
  }

  const option = currencyOptions[item];
  const totalPrice = option.price * amount;
  const totalCurrency = option.amount * amount;

  // Проверка баланса
  if (message.user.oval < totalPrice) {
    return bot(`❌ Недостаточно sealcoins. Нужно: ${totalPrice}, у вас: ${message.user.oval}`);
  }

  // Списание sealcoins и начисление GB
  message.user.oval -= totalPrice;
  message.user.balance2 = (message.user.balance2 || 0) + totalCurrency;

  return bot(
    `💰 Вы купили ${totalCurrency.toLocaleString()} ${option.name} ` +
    `за ${totalPrice} sealcoins\n` +
    `📊 Новый баланс: ${message.user.balance2.toLocaleString()} ${option.name}`
  );
});

// Обработчики покупки статусов
cmd.hear(/^(?:остатус|ОСТАТУС)(?:\s+(\d+))?$/i, async (message, bot) => {
  const item = parseInt(message.args[1] || 1);

  // Настройки статусов
  const statusData = {
    1: {
      name: "VIP",
      price: 100,
      field: "vip"
    },
    2: {
      name: "PREMIUM",
      price: 200,
      field: "premium"
    },
    3: {
      name: "TITAN",
      price: 300,
      field: "titan"
    },
    4: {
      name: "JOKER",
      price: 400,
      field: "joker"
    },
    5: {
      name: "IMPERATOR",
      price: 500,
      field: "imperator"
    },
    6: {
      name: "TOPDON",
      price: 600,
      field: "topdon"
    },
    7: {
      name: "ADMIN",
      price: 1000,
      field: "adm"
    }
  };

  if (!statusData[item]) return bot("❌ Такого статуса не существует");

  const status = statusData[item];
  
  // Проверка баланса
  if (message.user.oval < status.price) {
    return bot("❌ Недостаточно sealcoins для покупки");
  }

  // Инициализация settings если нет
  if (!message.user.settings) {
    message.user.settings = {};
  }

  // Проверка на уже имеющийся статус
  if (message.user.settings[status.field]) {
    return bot(`ℹ У вас уже есть статус "${status.name}"`);
  }

  // Списание валюты и выдача статуса
  message.user.oval -= status.price;
  message.user.settings[status.field] = true;

  return bot(`🏆 Поздравляем! Вы получили статус "${status.name}" за ${status.price} sealcoins`);
});











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

module.exports = commands;
