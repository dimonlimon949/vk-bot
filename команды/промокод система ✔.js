let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')
let config = require('../database/settings.json');
let promo = 0

async function savePromo() {
  require("fs").writeFileSync(
    "./database/settings.json",
    JSON.stringify(config, null, "\t")
  );

  return true;
}


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

// Функция для генерации случайного промокода
function generateRandomPromoCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let promoCode = '';
  for (let i = 0; i < length; i++) {
    promoCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return promoCode;
}

cmd.hear(/^промо\s([^]+)$/i, async (message, bot) => {

  if (message.args[1] === "выкл") {


    config.promotip = "balance";

    config.promovalue = 0;

    config.promolimit = 0;

    await savePromo();

    clearPromo();

    return bot("Промокод обнулён! 🔱");
  }

  if (config.promoname === message.args[1]) {

    if (message.user.promo) return bot(`вы уже активировали промокод. ⛔`);
    
    else {
      if (promo >= config.promolimit)
        return bot(
          `у этого промокода закончились использования!\nВключи уведомления о новых записях в группе, чтобы узнавать о промокодах одним из первых! 📢`
        );

      if (config.promotip === "btc")
        message.user.btc += config.promovalue;

      if (config.promotip === "баланс")
        message.user.balance += config.promovalue;

      if (config.promotip === "донат-кейсы")
        message.user.c3 += config.promovalue;

      if (config.promotip === "гб")
        message.user.balance2 += config.promovalue;

      if (config.promotip === "GB")
        message.user.balance2 += config.promovalue;

      if (config.promotip === "lega")
        message.user.c16 += config.promovalue;

      if (config.promotip === "рейтинг")
        message.user.rating += config.promovalue;

      if (config.promotip === "скоины")
        message.user.sprcoin += config.promovalue;

      if (config.promotip === "vip") {
        const user = message.user;

        if (!user) return bot(`неверный ID игрока`);

        if (user.settings.premium !== false)
          return bot("Вы уже являетесь [Premium]. ⚠");

        if (user.settings.vip !== false)
          return bot("игрок уже являетесь [VIP]. ⚠");

        user.settings.vip = true;

        user.stock.status = "VIP";

        user.limit.nicklimit = 21;

        user.level += 5;

        user.limit.banklimit = 100000000;

        user.limit.farmlimit = 200;

        user.limit.videocardlimit = 50;

        user.limit.playerlimit = 100000000;

        user.limit.sent = 0;

        user.maxenergy = 20;

        if (user.notifications)
          await vk.api.messages.send({
            user_id: user.id,
            message: `[❗УВЕДОМЛЕНИЕ❗]

      ${user.tag} вы получили VIP статус! 💎

      ⚠ Для ознакомления с комаднами введите «VIP help»

      🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
            random_id: 0,
          });
      }

      if (config.promotip === "premium") {
        const user = message.user;

        if (!user) return bot(`неверный ID игрока`);

        if (user.settings.premium !== false)
          return bot("игрок уже является [Premium]. ⚠");

        user.settings.vip = false;

        user.settings.premium = true;

        user.stock.status = "Premium";

        user.limit.nicklimit = 32;

        user.level += 35;

        user.opit += 5000;

        user.limit.banklimit = 200000000;

        user.limit.farmlimit = 300;

        user.limit.videocardlimit = 75;

        user.limit.playerlimit = 200000000;

        user.limit.sent = 0;

        user.maxenergy = 30;

        await bot(`игрок назначен [Premium] 💎`);

        if (user.notifications)
          await vk.api.messages.send({
            user_id: user.id,
            message: `[❗УВЕДОМЛЕНИЕ❗]
${user.tag} вы получили Premium статус! 💎
⚠ Для ознакомления с комаднами введите «Premium help»
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
            random_id: 0,
          });
      }



      if (config.promotip === "hellcase") {
        message.user.c5 += config.promovalue;
      }
    }

    message.user.promo = true;

    promo += 1;

    ostalos = config.promolimit - promo;

    await savePromo();

    return bot(`зачислено +${utils.sp(config.promovalue)} ${config.promotip
      .toString()
      .replace(/btc/gi, " ฿")
      .replace(/balance/gi, ` ${val1}`)
      .replace(/lega/gi, " Легендарный стардроп")
      .replace(/vip/gi, " VIP статус")
      .replace(/premium/gi, " PREMIUM статус")
      .replace(/hellcase/gi, " hellowin кейсов")
      .replace(/dkeys/gi, " донат-кейсов")} ✅

  📢 Осталось ${ostalos} использований.`);
  } else {
    return bot(
      `у данного промокода закончились использования, либо его не существует, проверьте правильность его написания`
    );
  }


});

cmd.hear(/^(?:setpromo|sp)\s([^]+)\s([^]+)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
  promo = 0;
  // Сбрасываем promo у всех пользователей
  double.forEach(user => {
    user.promo = false;
  });

  // Сохраняем изменения в users.json (предполагается, что double - это массив пользователей)
  fs.writeFileSync("./database/users.json", JSON.stringify(double, null, "\t"));

  config.promoname = message.args[1];
  config.promotip = message.args[2];
  config.promovalue = Number(message.args[3]);
  config.promolimit = Number(message.args[4]);

  await savePromo();

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id; // Получаем ID группы из ответа API

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId, // ID группы должен быть отрицательным
      message: `🎉 Новый промокод! 🎉\n\nАктивируйте промокод: ${config.promoname}\n\n💣 Название: ${config.promoname}\n💣 Тип: ${config.promotip}\n💢 Сумма: ${utils.sp(config.promovalue)} ${config.promotip
        .toString()
        .replace(/btc/gi, " ฿")
        .replace(/balance/gi, `${val1}`)
        .replace(/lega/gi, " Легендарный стардроп")
        .replace(/vip/gi, " VIP статус")
        .replace(/premium/gi, " PREMIUM статус")
        .replace(/hellcase/gi, " hellowin кейсов")
        .replace(/dkeys/gi, " донат-кейсов")}\n👥 Кол-во: ${utils.sp(config.promolimit)}`,
      access_token: tokenData.token,
      attachments: [],
    });

    const postId = postResponse.post_id; // Получаем ID поста

    return bot(`настройки обновлены. ⚙

    💣 Название: ${message.args[1]}.	

    💣 Тип: ${message.args[2]}.

    💢 Сумма: ${utils.sp(message.args[3])}.

    👥 Кол-во: ${message.args[4]}.`, {
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              payload: JSON.stringify({ command: `промо ${config.promoname}` }),
              "label": "✅ Активировать промокод"
            },
            "color": "positive"
          }]
        ]
      })
    });

  } catch (error) {
    console.error("Ошибка при создании поста с промокодом:", error);
    return bot(`Произошла ошибка при создании поста с промокодом: ${error.message}`); // Сообщить об ошибке в чате
  }

});

cmd.hear(/^(?:чек промо)$/i, async (message, bot) => {


  return bot(`настройки промо.

💣 Название: ${config.promoname}.
💣 Тип: ${config.promotip}.
💢 Сумма: ${config.promovalue}.
👥 Кол-во: ${config.promolimit}.
👥 Осталось: ${config.promolimit - promo}.`, {
    keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `randomPromocode` }),
            "label": `🎲 Сгенерировать промокод`
          },
          "color": "primary"
        },],
        [
        {
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `промо ${config.promoname}` }), // Добавляем команду для активации
            "label": "✅ Активировать промокод"
          },
          "color": "positive"
        }
        ]
      ]
    })
  });
});

const availablePromoTypes = ["btc", "баланс", "донат-кейсы", "рейтинг", "GB"];

cmd.hear(/^(?:randomPromocode)\s?(btc|баланс|донат-кейсы|рейтинг|GB)?$/i, async (message, bot) => {
  promo = 0;

  // Сбрасываем promo у всех пользователей
  double.forEach(user => {
    user.promo = false;
  });

  // Сохраняем изменения в users.json (предполагается, что double - это массив пользователей)
  fs.writeFileSync("./database/users.json", JSON.stringify(double, null, "\t"));

  const promoLength = utils.random(3, 5);
  const newPromoCode = generateRandomPromoCode(promoLength);

  // Получаем тип промокода из аргумента, если он указан, или выбираем случайный
  let promoType = message.args[1];
  if (!promoType) {
    promoType = availablePromoTypes[Math.floor(Math.random() * availablePromoTypes.length)];
  }
  // Проверяем, что тип промокода допустимый
  if (!availablePromoTypes.includes(promoType)) {
    return bot(`Указан неверный тип промокода. Доступные типы: ${availablePromoTypes.join(", ")}`);
  }

  let promoValue;
  switch (promoType) {
    case " btc":
      promoValue = utils.random(100, 500);
      break;
    case " баланс":
      promoValue = utils.random(5000000, 50000000);
      break;
    case " донат-кейсы":
      promoValue = utils.random(1, 5);
      break;
    case " рейтинг":
      promoValue = utils.random(20, 150);
      break;
    case " GB":
      promoValue = utils.random(1000, 15000);
      break;
    default:
      promoValue = 1; // Значение по умолчанию
  }

  // Обновляем настройки промокода
  config.promoname = newPromoCode;
  config.promotip = promoType;
  config.promovalue = promoValue;

  // Устанавливаем promolimit в случайное значение от 3 до 10
  config.promolimit = utils.random(3, 10);

  await savePromo(); // Сохраняем изменения в файле конфигурации

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
      group_id: config.groupId // Используем config.groupId для запроса
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id; // Получаем ID группы из ответа API

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId, // ID группы должен быть отрицательным
      message: `🎉 Новый промокод! 🎉\n\nАктивируйте промокод: ${newPromoCode}\n\n💣 Название: ${config.promoname}\n💣 Тип: ${config.promotip}\n💢 Сумма: ${utils.sp(config.promovalue)} ${config.promotip
        .toString()
        .replace(/btc/gi, " ฿")
        .replace(/balance/gi, ` ${val1}`)
        .replace(/lega/gi, " Легендарный стардроп")
        .replace(/vip/gi, " VIP статус")
        .replace(/premium/gi, " PREMIUM статус")
        .replace(/hellcase/gi, " hellowin кейсов")
        .replace(/dkeys/gi, " донат-кейсов")}\n👥 Кол-во: ${utils.sp(config.promolimit)}\n👥 Осталось: ${config.promolimit - promo}`,
      access_token: tokenData.token,
      attachments: [],
    });

    const postId = postResponse.post_id; // Получаем ID поста

    await vk.api.messages.send({
      peer_id: message.peerId,
      message: `Сгенерирован случайный промокод: ${newPromoCode}`,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0,
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              payload: JSON.stringify({ command: `промо ${newPromoCode}` }),
              "label": `✅ Активировать промокод`
            },
            "color": "positive"
          }]
        ]
      })
    });
    return console.log(`✅ Пост с промокодом успешно создан на стене группы. ID поста: ${postId}`);
  } catch (error) {
    console.error("Ошибка при создании поста с промокодом:", error);
    return bot(`Произошла ошибка при создании поста с промокодом: ${error.message}`); // Сообщить об ошибке в чате
  }
});


module.exports = commands;