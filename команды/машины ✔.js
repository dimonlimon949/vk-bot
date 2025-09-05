let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')
let chats = require('../database/chats.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};
const cars = require('../spisok/машины.js')

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

cmd.hear(/^(?:машины|🚗 Машины|🛣 Машины)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        try {
            // Проверка массива машин
            if (!Array.isArray(cars) || cars.length === 0) {
                console.error("Ошибка: массив cars не задан или пуст");
                return bot("❌ Каталог машин временно недоступен. Попробуйте позже.");
            }

            const smileng = utils.pick(['🚗', '🎁', '💰', '💎', '👑']) || '✅';

            // Безопасное форматирование числа
            const safeFormat = (num) => {
                try {
                    num = Number(num) || 0;
                    return num > 0 ? utils.sp(num) : "0";
                } catch (e) {
                    console.error("Ошибка форматирования числа:", e);
                    return "0";
                }
            };

            // Показать список машин
            if (!message.args[1]) {
                let carList = `🚗 Доступные машины:\n\n`;
                
                cars.forEach(car => {
                    try {
                        // Защищенное получение данных
                        const id = Number(car?.id) || 0;
                        const name = String(car?.name || "Неизвестная модель").trim();
                        const cost = Number(car?.cost) || 0;
                        const sell = Math.min(100, Math.max(0, Number(car?.sell) || 0));
                        
                        // Расчет цены
                        const currentPrice = sell > 0 ? Math.max(0, Math.floor(cost * (100 - sell) / 100)) : cost;
                        const isFree = currentPrice <= 0 && sell >= 100;
                        
                        // Формирование строки
                        carList += `${message.user.transport?.car === id ? "✅" : "✖️"} ${id}. ${name}\n`;
                        
                        if (isFree) {
                            carList += `Цена: 🎁 БЕСПЛАТНО`;
                        } else {
                            carList += `Цена: ${safeFormat(currentPrice)} ₽`;
                        }
                        
                        if (sell > 0) {
                            carList += ` (скидка ${sell}%)`;
                        }
                        
                        carList += `\n\n`;
                    } catch (e) {
                        console.error(`Ошибка обработки машины ID:${car?.id}`, e);
                    }
                });
                
                carList += `🛒 Для покупки введите: Машины [номер]`;
                return bot(carList, { parse_mode: "HTML" });
            }
            
            // Обработка покупки
            const carId = parseInt(message.args[1]) || 0;
            const carToBuy = cars.find(c => Number(c?.id) === carId);
            
            if (!carToBuy || carId < 1 || carId > cars.length) {
                return bot("❌ Неверный номер машины. Используйте номер из списка.");
            }

            // Расчет цены
            const cost = Number(carToBuy.cost) || 0;
            const discount = Math.min(100, Math.max(0, Number(carToBuy.sell) || 0));
            const priceToPay = discount > 0 ? Math.max(0, Math.floor(cost * (100 - discount) / 100)) : cost;
            const isFree = priceToPay <= 0 && discount >= 100;

// Проверка наличия машины у пользователя
if (message.user.transport?.car) {
    const currentCar = cars.find(c => Number(c?.id) === Number(message.user.transport.car));
    return bot(
        `❌ У вас уже есть машина: «${currentCar?.name || 'Неизвестная модель'}»\n` +
        `Для продажи нажмите кнопку ниже или введите "Продать машину"`,
        {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: "продать машину"}),
                            "label": "💸 Продать машину"
                        },
                        "color": "negative"
                    }]
                ]
            })
        }
    );
}

            // Проверка баланса (если не бесплатно)
            if (!isFree && (Number(message.user.balance) || 0) < priceToPay) {
                return bot(
                    `❌ Недостаточно средств!\n\n` +
                    `💰 Ваш баланс: ${safeFormat(message.user.balance)} ₽\n` +
                    `💳 Требуется: ${safeFormat(priceToPay)} ₽`
                );
            }

            // Совершение покупки
            message.user.transport = message.user.transport || {};
            message.user.transport.car = carToBuy.id;
            
            if (!isFree) {
                message.user.balance = (Number(message.user.balance) || 0) - priceToPay;
            }

            let purchaseMessage = `🎉 ${isFree ? 'Вы получили' : 'Вы купили'} «${carToBuy.name || 'машину'}» `;
            
            if (isFree) {
                purchaseMessage += `БЕСПЛАТНО! 🎁`;
            } else {
                purchaseMessage += `за ${safeFormat(priceToPay)} ₽`;
                if (discount > 0) {
                    purchaseMessage += ` (экономия ${safeFormat(cost - priceToPay)} ₽)`;
                }
            }
            
            return bot(purchaseMessage);

        } catch (err) {
            console.error("Критическая ошибка в команде 'Машины':", err);
            return bot("⚠️ Произошла непредвиденная ошибка. Администратор уже уведомлен.");
        }
    }
});


cmd.hear(/^(?:🎫 машина госномер|машина госномер)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car) return bot(`у вас нет машины`);

    let n_1 = utils.pick([
      "А",
      "В",
      "Е",
      "К",
      "М",
      "Н",
      "О",
      "Р",
      "С",
      "Т",
      "У",
      "Х",
    ]);

    let n_2 = utils.random(0, 9);

    let n_3 = utils.random(0, 9);

    let n_4 = utils.random(0, 9);

    let n_5 = utils.pick([
      "А",
      "В",
      "Е",
      "К",
      "М",
      "Н",
      "О",
      "Р",
      "С",
      "Т",
      "У",
      "Х",
    ]);

    let n_6 = utils.pick([
      "А",
      "В",
      "Е",
      "К",
      "М",
      "Н",
      "О",
      "Р",
      "С",
      "Т",
      "У",
      "Х",
    ]);

    let n_7 = utils.pick(["777"]);

    if (message.user.balance < 30000000)
      return bot(`вам нужно 30.000.000 ${val1} для смены госномера.`);

    message.user.balance -= 30000000;

    message.user.scar.gosnomer = `${n_1}${n_2}${n_3}${n_4}${n_5}${n_6} ${n_7}`;

    let res = `${n_1}${n_2}${n_3}${n_4}${n_5}${n_6} ${n_7}`;

    return bot(
      `Вы поставили новый гос. номер на машину! ☃️
🚥 Номер: «${res}» 🎫
▶️ Стоимость обошлась в ${utils.sp(30000000)} ${val1} 💵
🚗 Теперь эта машина будет ездить с такими номерами! 🚥`,

      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "🎫 Машина госномер",
                },

                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
});

cmd.hear(
  /^(?:сетномер)\s([0-9]+)\s([а-я])([0-9])([0-9])([0-9])([а-я])([а-я])$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {

      let res = `${message.args[2]}${message.args[3]}${message.args[4]}${message.args[5]}${message.args[6]}${message.args[7]} 777`;

      let text = res.toLowerCase();

      const b =
        /(й|ц|г|ш|щ|з|ъ|ф|ы|п|л|д|ж|э|я|ч|и|ь|б|ю|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m:)/;

      if (b.test(text) === true)
        return bot(`некорректный номер!

✅Напишите номер по шаблону, например: «A123BC», используя только русские буквы.
➕ Примеры: А777АА, А123МР, Р777РР и др.

🔤 Список разрешенных букв: А, В, Е, К, М, Н, О, Р, С, Т, У, Х`);

      let user = double.find((x) => x.uid === Number(message.args[1]));

      if (!user) return bot(`неверный ID игрока! ❌`);

      for (i in users) {
        if (users[i].scar.gosnomer.toLowerCase() === res.toLowerCase())
          return bot(`номер «${res}» уже занят игроком @id${users[i].id} (${users[i].tag}) ❌



▶️ Укажите другой номер.`);
      }

      user.scar.gosnomer = res;

      return bot(`Вы поставили новый гос. номер на машину! ☃️
🚥 Номер: «${res}» 🎫
🚗 Теперь эта машина будет ездить с такими номерами! 🚥`);
    }
  }
);

cmd.hear(/^(?:машина)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  let smileng = `❄️`;

  if (!message.user.transport.car) return bot(`у вас нет машины`);

  // Улучшения »

  let g1 = message.user.scar.prok_1;

  let g2 = message.user.scar.prok_2;

  let g3 = message.user.scar.prok_3;

  let g4 = message.user.scar.prok_4;

  let g5 = message.user.scar.prok_5;

  let g6 = message.user.scar.prok_6;

  // Информация о машине »

  let carsk = cars[message.user.transport.car - 1].carsk;

  let maxsk = cars[message.user.transport.car - 1].maxsk;

  let m_sk = eval(
    `(${g1} + ${g2} + ${g3} + ${g4} + ${g5} + ${g6}) * 3 + ${carsk}`
  );

  let max_sk = eval(
    `(${g1} + ${g2} + ${g3} + ${g4} + ${g5} + ${g6}) * 5 + ${maxsk}`
  );

  // Разгон до 100км/ч » [!] Не смог .__.

  let razgon = cars[message.user.transport.car - 1].razgon;

    {
      if (message.chatId) {
        await vk.api.messages.send({
          chat_id: message.chatId,
          attachment: `${cars[message.user.transport.car - 1].photo}`,
          message:
            `

@id${message.user.id}(${message.user.tag}), информация о Вашей машине! 🚘
🚗 Название: «${message.user.astats.car === false
              ? `${cars[message.user.transport.car - 1].name}`
              : `${message.user.astats.car}`
            }» ${smileng}
🛣️ Максимальная скорость: ${max_sk}
🚗 Мощность: ${m_sk} л/с.
⏱ Разгон до 100км/час: ${razgon} секунд.
➖➖➖➖➖➖
🏆 Ваш рейтинг гонщика: ${message.user.gon}
🎫 Госномер: ` +
            (message.user.scar.gosnomer === "undefined"
              ? `Отсуствует`
              : `${message.user.scar.gosnomer}`) +
            ``,

          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",
                    payload: "{}",
                    label: "🏎️ Топ гонщиков",
                  },

                  color: "primary",
                },
              ],

              [
                {
                  action: { type: "text", payload: "{}", label: "🏁 Гонка" },

                  color: "positive",
                },
              ],

              [
                {
                  action: {
                    type: "text",

                    payload: '{"button": "1"}',

                    label: "⏫ Улучшения",
                  },
                  color: "secondary",
                },
              ],
            ],
          }),
          random_id: 0,
        });
      }

      if (!message.isChat) {
        await vk.api.messages.send({
          user_id: message.user.id,
          attachment: `${cars[message.user.transport.car - 1].photo}`,
          message:
            `

@id${message.user.id}(${message.user.tag
            }), информация о Вашей машине! 🚘${smileng}

🚗 Название: «${message.user.astats.car === false
              ? `${cars[message.user.transport.car - 1].name}`
              : `${message.user.astats.car}`
            }» ${smileng}
🛣️ Максимальная скорость: ${max_sk}
🚗 Мощность: ${m_sk} л/с.
⏱ Разгон до 100км/час: ${razgon} секунд.
➖➖➖➖➖➖
🏆 Ваш рейтинг гонщика: ${message.user.gon}
🎫 Госномер: ` +
            (message.user.scar.gosnomer === "undefined"
              ? `Отсуствует`
              : `${message.user.scar.gosnomer}`) +
            ``,

          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",
                    payload: "{}",
                    label: "🏎️ Топ гонщиков",
                  },

                  color: "primary",
                },
              ],

              [
                {
                  action: { type: "text", payload: "{}", label: "🏁 Гонка" },

                  color: "positive",
                },
              ],

              [
                {
                  action: {
                    type: "text",

                    payload: '{"button": "1"}',

                    label: "⏫ Улучшения",
                  },
                  color: "secondary",
                },
              ],
            ],
          }),
          random_id: 0,
        });
      }
    }
  }
});

cmd.hear(/^(?:машина улучшить|⏫ Улучшения)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car) return bot(`у вас нет машины`);

    let g1 = message.user.scar.prok_1;

    let g2 = message.user.scar.prok_2;

    let g3 = message.user.scar.prok_3;

    let g4 = message.user.scar.prok_4;

    let g5 = message.user.scar.prok_5;

    let g6 = message.user.scar.prok_6;

    return bot(
      `улучшения авто:



🌑 Шины [${g1}/3]
⬆️ Улучшить: «машина улучшить шины»

🔧 Диски [${g2}/5]
⬆️ Улучшить: «машина улучшить диски»

⚙ Двигатель [${g3}/5]
⬆️ Улучшить: «машина улучшить двигатель»

🧨 Тормоза [${g4}/3]
⬆️ Улучшить: «машина улучшить тормоза»

🕹 Управление [${g5}/5]
⬆️ Улучшить: «машина улучшить управление»

🔑 Чип тюнинг [${g6}/1]
⬆️ Улучшить: «машина улучшить чип»


🎫 Госномер [` +
      (message.user.scar.gosnomer === "undefined"
        ? `Отсуствует`
        : `${message.user.scar.gosnomer}`) +
      `]

1⃣ Установить: "машина госномер" (30.000.000 ${val1})

💰 ➖ Стоимость улучшения: ${utils.sp(
        cars[message.user.transport.car - 1].upgrade
      )} ${val1}`
    );
  }
});

cmd.hear(/^(?:машина улучшить шины)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_1 > 2) return bot(`шины максимально улучшены. ⚒`);

    if (cars[message.user.transport.car - 1].upgrade > message.user.balance)
      return bot(
        `для улучшения Вам нужно ${cars[message.user.transport.car - 1].upgrade
        } ${val1} 💰`
      );

    message.user.balance -= cars[message.user.transport.car - 1].upgrade;

    message.user.scar.prok_1 += 1;

    return bot(`шины были улучшены [${message.user.scar.prok_1}/3] ⚒`);
  }
});

cmd.hear(/^(?:машина улучшить диски)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_2 > 4) return bot(`диски максимально улучшены. ⚒`);

    if (cars[message.user.transport.car - 1].upgrade > message.user.balance)
      return bot(
        `для улучшения Вам нужно ${cars[message.user.transport.car - 1].upgrade
        } ${val1} 💰`
      );

    message.user.balance -= cars[message.user.transport.car - 1].upgrade;

    message.user.scar.prok_2 += 1;

    return bot(`диски были улучшены [${message.user.scar.prok_2}/5] ⚒`);
  }
});

cmd.hear(/^(?:машина улучшить двигатель)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_3 > 4)
      return bot(`двигатель максимально улучшен. ⚒`);

    if (cars[message.user.transport.car - 1].upgrade > message.user.balance)
      return bot(
        `для улучшения Вам нужно ${cars[message.user.transport.car - 1].upgrade
        } ${val1} 💰`
      );

    message.user.balance -= cars[message.user.transport.car - 1].upgrade;

    message.user.scar.prok_3 += 1;

    return bot(`двигатель был улучшен [${message.user.scar.prok_3}/5] ⚒`);
  }
});

cmd.hear(/^(?:машина улучшить тормоза)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_4 > 2)
      return bot(`тормоза максимально улучшены. ⚒`);

    if (cars[message.user.transport.car - 1].upgrade > message.user.balance)
      return bot(
        `для улучшения Вам нужно ${cars[message.user.transport.car - 1].upgrade
        } ${val1} 💰`
      );

    message.user.balance -= cars[message.user.transport.car - 1].upgrade;

    message.user.scar.prok_4 += 1;

    return bot(`тормоща были улучшены [${message.user.scar.prok_4}/3] ⚒`);
  }
});

cmd.hear(/^(?:машина улучшить управление)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_5 > 4)
      return bot(`управление максимально улучшено. ⚒`);

    if (cars[message.user.transport.car - 1].upgrade > message.user.balance)
      return bot(
        `для улучшения Вам нужно ${cars[message.user.transport.car - 1].upgrade
        } ${val1} 💰`
      );

    message.user.balance -= cars[message.user.transport.car - 1].upgrade;

    message.user.scar.prok_5 += 1;

    return bot(`управление было улучшено [${message.user.scar.prok_5}/5] ⚒`);
  }
});

cmd.hear(/^(?:машина улучшить чип)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.transport.car)
      return bot(
        `у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`
      );

    if (message.user.scar.prok_6 > 0) return bot(`чип максимально улучшен. ⚒`);

    return bot(`${text}`);
  }
});

function addZero(i) {
  return i < 10 ? "0" + i : i;
}

function unixStampLefta(stampa) {
  stampa = stampa / 1000;
  let s = stampa % 60;
  stampa = (stampa - s) / 60;
  let m = stampa % 60;
  let text = ``;
  if (m > 0) text += addZero(Math.floor(m)) + " мин. ";
  if (s > 0) text += addZero(Math.floor(s)) + " сек.";
  return text;
}
 
cmd.hear(/^(?:гонка|🏁 Гонка)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

if (!message.user.transport.car) return bot(`у Вас нет транспортного средства! 🚗❌\n\n▶️ Просмотреть список продаваемых автомобилей: «Машины» 🛒`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          "payload": JSON.stringify({ command: "Машины" }),
          "label": "🛒 Машины"
        },
        "color": "positive"
      }]
    ]
  })
})

    if (message.user.scar.gontime >= Date.now()) return bot(`Ваша машина в ремонте! 🔩 🚙 
		
🏁 Поехать на гонки Вы сможете через ${unixStampLefta(message.user.scar.gontime - Date.now())} ❄️`)



    if (typeof message.user.questracer === "number") {

      message.user.questracer++;

      if (message.user.questracer >= 15) {

        message.user.questracer = true;

        await bot(`Поздравляем, Вы 15 раз поучаствовали в гонке и получаете 📦 1 Донат-кейс.`);

        message.user.c3 += 1;

      }

    }

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && message.user.now.kv7 && !message.user.now.kv8){

      message.user.now.kv8 = true;
      message.user.c4 += 5;
      await bot(`⚠️ Вы успешно выполнили 8 задание!

Награда - 5 Starr Drop

💡 Регулярно участвуйте в гонках ведь в них вы получаете один из редких кейсов Starr Drop!`, {
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



    if (typeof message.user.questracer2 === "number" && message.user.questallfucker == true) {

      message.user.questracer2++;

      if (message.user.questracer2 >= 1000) {

        message.user.questracer2 = true;

        await bot(`Поздравляем, Вы 1.000 раз поучаствовали в гонке и получаете 📦 2 Донат-кейсa.`);

        message.user.c3 += 2;

      }

    }



    let g1 = message.user.scar.prok_1;

    let g2 = message.user.scar.prok_2;

    let g3 = message.user.scar.prok_3;

    let g4 = message.user.scar.prok_4;

    let g5 = message.user.scar.prok_5;

    let g6 = message.user.scar.prok_6;

    // Информация о машине »

    let carsk = cars[message.user.transport.car - 1].carsk;

    let mymaxsk = cars[message.user.transport.car - 1].maxsk;

    let m_sk = eval(`(${g1} + ${g2} + ${g3} + ${g4} + ${g5} + ${g6}) * 3 + ${carsk}`)

    let mymax_sk = eval(`(${g1} + ${g2} + ${g3} + ${g4} + ${g5} + ${g6}) * 5 + ${mymaxsk}`)



    let s = utils.random(1, 16);

    let skorost = utils.random(5, 63); // Не знаю зачем это.

    let max_sk = eval(`${cars[s - 1].maxsk} + ${skorost}`);

    let p_sk = eval(`${cars[s - 1].carsk} + ${skorost}`);

    let razgon = cars[s - 1].razgon;



    // Подбор Номера »

    let n_one = utils.pick(['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']);

    let n_two = utils.random(0, 9);

    let n_three = utils.random(0, 9);

    let n_four = utils.random(0, 9);

    let n_five = utils.pick(['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']);

    let n_six = utils.pick(['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']);

    let n_seven = utils.pick(['777']);

    rgn = `${n_one}${n_two}${n_three}${n_four}${n_five}${n_six} ${n_seven}`;

    let w_km = mymax_sk - max_sk;

    let p_km = max_sk - mymax_sk;

    // Подбор Номера «

    var cases = utils.pick([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);



    bot(`Начался заезд против «${cars[s - 1].name}»

🏎 Ожидаем прибытие машин к финишу..`, { attachment: `${cars[message.user.transport.car - 1].photo},${cars[s - 1].photo}` })

    let w_reit = utils.random(5, 9)

    message.user.scar.gontime = Date.now() + 900000;

    let p_reit = utils.random(2, 4)

    if (message.user.settings.imperator) {

      w_reit += 3;

      p_reit -= 1;

    }



    message.user.scar.gontime = true



if (!message.isChat && !message.user.settings.topdon) {
    message.user.scar.gontime = Date.now() + 900000;

    setTimeout(() => {
        if (message.isChat && !message.user.settings.topdon) {
            vk.api.messages.send({
                chat_id: message.chatId,
                random_id: 0,
                message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
            });
            message.send({ sticker_id: 110673 });
            return;
        }

        if (message.user.settings.topdon) {
            message.user.scar.gontime = Date.now() + 300000;

            setTimeout(() => {
                if (message.isChat) {
                    vk.api.messages.send({
                        chat_id: message.chatId,
                        random_id: 0,
                        message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                    });
                    message.send({ sticker_id: 108212 });
                    return;
                }

                if (!message.isChat) {
                    vk.api.messages.send({
                        user_id: message.user.id,
                        random_id: 0,
                        message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                    });
                    message.send({ sticker_id: 108212 });
                    return;
                }
            }, 300000);
        }

        if (!message.isChat && !message.user.settings.topdon) {
            vk.api.messages.send({
                user_id: message.user.id,
                random_id: 0,
                message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
            });
            message.send({ sticker_id: 52959 });
            return;
        }
    }, 900000);
} else {
    if (message.user.uid >= 0 && !message.user.settings.topdon) {
        message.user.scar.gontime = Date.now() + 600000;

        setTimeout(() => {
            if (message.isChat) {
                vk.api.messages.send({
                    chat_id: message.chatId,
                    random_id: 0,
                    message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                });
                message.send({ sticker_id: 62837 });
                return;
            }

            if (!message.isChat && !message.user.settings.topdon) {
                vk.api.messages.send({
                    user_id: message.user.id,
                    random_id: 0,
                    message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                });
                message.send({ sticker_id: 62837 });
                return;
            }
        }, 600000);
    } else {
        message.user.scar.gontime = Date.now() + 900000;

        setTimeout(() => {
            if (message.isChat && !message.user.settings.topdon) {
                vk.api.messages.send({
                    chat_id: message.chatId,
                    random_id: 0,
                    message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                });
                message.send({ sticker_id: 108206 });
                return;
            }

            if (!message.isChat) {
                vk.api.messages.send({
                    user_id: message.user.id,
                    random_id: 0,
                    message: `🏎️ @id${message.user.id} (${message.user.tag}), погоняешь на своей тачке? 😎\n\n▶️ Скорее пиши «Гонка» и начинай всех разносить на гонке! 🤯`
                });
                message.send({ sticker_id: 108206 });
                return;
            }
        }, 900000);
    }
}



    let smileng = utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]) //utils.pick([`☃️`,`🎄`,`❄️`,`🎅`]);

    if (m_sk == p_sk) setTimeout(() => {
      return message.send(`Ничья! 😟

		

▶️ Улучшайте свой автомобиль, чтобы стать быстрее! 🏁`, { attachment: utils.pick([`${cars[message.user.transport.car - 1].photo}, ${cars[s - 1].photo}`]) }).catch((error) => {

        console.log(` Ошибка.`);

      })
    }, 5000);

    if (m_sk > p_sk && cases == 1) {

      message.user.c4 += 1;

      message.user.gon += w_reit

      message.user.balance += 7500000

      message.user.oval += 5

      setTimeout(() => {
        return message.send(`😈 Выигрыш! Ваша машина оказалсь быстрее противника! 🚗



⚙️ Характеристики машин:



🚗 Ваш автомобиль: «${cars[message.user.transport.car - 1].name}» ${smileng}

🚘 Скорость: ${mymax_sk}км/ч



🚙 Автомобиль противника: «${cars[s - 1].name}»

🚘 Скорость: ${max_sk}км/ч

🎫 Госномер: ${rgn}

➖➖➖➖➖➖➖

🏁 Получено рейтинга: +${w_reit}

🏆 Ваш рейтинг: ${utils.sp(message.user.gon)} 🏆

💵 Выигрыш: +7.500.000 ${val1} 🤑

💵 Выигрыш: +5 sealcoins 🤑

📦 Кейсы: +1 Starr Drops`, { attachment: utils.pick([`${cars[message.user.transport.car - 1].photo}`]) }).catch((error) => {

          console.log(` Ошибка.`);

        })
      }, 5000);

    }

    if (m_sk > p_sk && cases == 0) {

      message.user.gon += w_reit

      message.user.balance += 7500000

      message.user.oval += 2

      setTimeout(() => {
        return message.send(`😈 Выигрыш! Ваша машина оказалсь быстрее противника! 🚗

⚙️ Характеристики машин:
🚗 Ваш автомобиль: «${cars[message.user.transport.car - 1].name}» ${smileng}
🚘 Скорость: ${mymax_sk}км/ч

🚙 Автомобиль противника: «${cars[s - 1].name}»
🚘 Скорость: ${max_sk}км/ч
🎫 Госномер: ${rgn}
➖➖➖➖➖➖➖
🏁 Получено рейтинга: +${w_reit}
🏆 Ваш рейтинг: ${utils.sp(message.user.gon)} 🏆
💵 Выигрыш: +2 sealcoins 🤑
💵 Выигрыш: +7.500.000 ${val1} 🤑`, { attachment: utils.pick([`${cars[message.user.transport.car - 1].photo}`]) }).catch((error) => {

          console.log(` Ошибка.`);

        })
      }, 5000);

    }

    if (m_sk < p_sk) {

      message.user.gon -= p_reit

      message.user.oval += 1

      setTimeout(() => {
        return message.send(`👿 Проигрыш! Ваша машина оказалсь медленее противника! 🚗

⚙️ Характеристики машин:
🚗 Ваш автомобиль: «${cars[message.user.transport.car - 1].name}» ${smileng}
🚘 Скорость: ${mymax_sk}км/ч

🚙 Автомобиль противника: «${cars[s - 1].name}»
🚘 Скорость: ${max_sk}км/ч
🎫 Госномер: ${rgn}
➖➖➖➖➖➖➖
🏁 Рейтинг гонщика: -${p_reit} 🏆
💵 Бонус: +1 sealcoins 🤑
🏆 Ваш рейтинг: ${message.user.gon} 🏆

⚙ Улучшайте свой автомобиль, чтобы стать быстрее!`, { attachment: utils.pick([`${cars[s - 1].photo}`]) }).catch((error) => {

          console.log(` Ошибка.`);

        })
      }, 5000);

    }


  }
});

cmd.hear(/^(?:топ гонщиков|🏎️ Топ гонщиков)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let top = [];

    double
      .filter((x) => x.bantop === false)
      .map((x) => {
        top.push({ gon: x.gon, tag: x.tag, id: x.id, mention: x.mention });
      });

    top.sort((a, b) => {
      return b.gon - a.gon;
    });

    let text = ``;

    const find = () => {
      let pos = 1000;

      for (let i = 0; i < top.length; i++) {
        if (top[i].id === message.senderId) return (pos = i);
      }

      return pos;
    };

    const maxTopEntries = Math.min(10, double.filter((x) => x.bantop === false).length);

    for (let i = 0; i < maxTopEntries; i++) {
      if (!top[i]) {
        break; // Прерываем если больше нет игроков
      }

      const user = top[i];

      text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 🏆${utils.sp(user.gon)}`;
    }

    return bot(
      `топ гонщиков:${text}
➖➖➖➖➖➖➖➖
${utils.gi(find() + 1)} ${message.user.tag} — 🏆${utils.sp(message.user.gon)}`,
      {
        keyboard: JSON.stringify({
          inline: true,
          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "🔅 Топ реферал",
                },
                color: "default",
              },
            ],
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "😈 Босс топ",
                },
                color: "default",
              },
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "🏆 Топ рейтинг",
                },
                color: "default",
              },
            ],
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "👥 Топ игроков",
                },
                color: "default",
              },
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "🌐 Топ биткоины",
                },
                color: "default",
              },
            ],
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "〽️ Топ опыт",
                },
                color: "default",
              },
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "🏎️ Топ гонщиков",
                },
                color: "default",
              },
            ],
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "💰 Топ баланс",
                },
                color: "default",
              },
            ],
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "💌 Топ сообщения",
                },
                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
});

module.exports = commands;
