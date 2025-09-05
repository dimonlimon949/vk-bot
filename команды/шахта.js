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

cmd.hear(
  /^(?:копать|шахта|⛏ Копать|@club223500959 ⛏ Копать|⛏ Шахта)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      return bot(
        `Информация о шахте: ❄️
▶️ Чтобы копать определенную руду, используйте команду «копать железо/золото/алмазы/материю/обсидиан/плазму» ⛏️`,
        {
          keyboard: JSON.stringify({
            inline: true,
            buttons: [
              [
                {
                  action: {
                    type: "text",
                    payload: "{}",
                    label: "⛏ Копать железо",
                  },
                  color: "positive",
                },
              ],
            ],
          }),
        },
        {
          keyboard: JSON.stringify({
            inline: true,
            buttons: [
              [
                {
                  action: {
                    type: "text",
                    payload: "{}",
                    label: "⛏ Копать золото",
                  },
                  color: "positive",
                },
              ],
            ],
          }),
        },
        {
          keyboard: JSON.stringify({
            inline: true,
            buttons: [
              [
                {
                  action: {
                    type: "text",
                    payload: "{}",
                    label: "⛏ Копать алмазы",
                  },
                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
);

//Кнопка

cmd.hear(
  /^(?:копать железо|⛏ Копать железо)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (!message.user.settings.titan)
        return bot(
          `Копать железо несколько раз можно только Titan VIP\n❓Покупка: Донат`
        );

      if (!message.user.settings.topdon) {
        if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
          return bot(`Больше 10 копаний за раз сделать нельзя.`);
      }

      if (message.user.energy < Number(message.args[1]))
        return bot(`недостаточно энергии`);

      let user = message.user;

      let randzhelezo = 0;

      let t = Number(message.args[1]);

      for (let i = 0; i < t; i++) {
        let rand = utils.random(12, 50);

        randzhelezo += rand;
      }

      if (user.minertool >= 1) {
        randzhelezo *= 2;

        user.opit += Number(message.args[1]);
      }

      if (message.isChat) {
        if (chats) {
          if (chats.statuemsglvl >= 2) {
            randzhelezo *= 1.5;
          }
        }
      }

      if (typeof message.user.questminer === "number") {
        message.user.questminer += Number(message.args[1]);

        if (message.user.questminer >= 50) {
          message.user.questminer = true;

          await bot(
            `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
          );

          message.user.c3 += 1;
        }
      }

      if (
        typeof message.user.questminer2 === "number" &&
        message.user.questallfucker === true
      ) {
        message.user.questminer2 += Number(message.args[1]);

        if (message.user.questminer2 >= 5000) {
          message.user.questminer2 = true;

          await bot(
            `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейсa.`
          );

          message.user.c3 += 2;
        }
      }

      randzhelezo = Math.floor(Math.round(randzhelezo));

      message.user.energy -= Number(message.args[1]);

      message.user.opit += Number(message.args[1]);

      message.user.ruds.zhelezo += randzhelezo;

      return bot(`+${utils.sp(randzhelezo)} железа ⚙️
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
    }
  }
);

cmd.hear(/^(?:копать железо|⛏ Копать железо)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let user = message.user;

    if (message.user.energy < 1) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]),
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    let randzhelezo = utils.random(12, 50);

    if (user.minertool >= 1) {
      randzhelezo *= 2;

      user.opit += 1;
    }

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randzhelezo *= 1.5;
        }
      }
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    randzhelezo = Math.floor(Math.round(randzhelezo));

    message.user.energy -= 1;

    message.user.opit += 1;

    message.user.ruds.zhelezo += randzhelezo;

    return bot(
      `+${utils.sp(randzhelezo)} железа ⚙️
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "⛏ Копать железо",
                },

                color: "positive",
              },
            ],
          ],
        }),
      }
    );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randzhelezo)} железа ⚙️
У Вас закончилась энергия! 🔋🤒 `,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать железо",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

//кнопка

cmd.hear(/^(?:копать золото|⛏ Копать золото)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.opit < 300)
      return bot(
        `чтобы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`
      );

    if (message.user.energy < 1) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]),
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    let randzoloto = utils.random(4, 30);

    if (message.user.minertool >= 2) {
      randzoloto *= 2;

      message.user.opit += 5;
    }

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randzoloto *= 1.5;
        }
      }
    }

    randzoloto = Math.floor(Math.round(randzoloto));

    message.user.energy -= 1;

    message.user.opit += 5;

    message.user.ruds.zoloto += randzoloto;

    if (message.user.energy > 0)
      return bot(
        `+${utils.sp(randzoloto)} золота 💛
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать золото",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randzoloto)} золота 💛
У Вас закончилась энергия! 🔋🤒`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать золото",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(
  /^(?:копать золото|⛏ Копать золото)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.user.opit < 300)
        return bot(
          `чтобы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`
        );

      if (!message.user.settings.titan)
        return bot(
          `Копать золото несколько раз можно только Titan VIP\n❓Покупка: Донат`
        );

      if (!message.user.settings.topdon) {
        if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
          return bot(`Больше 10 копаний за раз сделать нельзя.`);
      }

      if (message.user.energy < Number(message.args[1])) {
        message.send({
          sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]),
        });

        return bot(
          `у Вас нехватает энергии! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
        );
      }

      let user = message.user;

      let randzoloto = 0;

      let t = Number(message.args[1]);

      for (let i = 0; i < t; i++) {
        let rand = utils.random(1, 30);

        randzoloto += rand;
      }

      if (user.minertool >= 2) {
        randzoloto *= 2;

        user.opit += Number(message.args[1]) * 5;
      }

      if (message.isChat) {
        if (chats) {
          if (chats.statuemsglvl >= 2) {
            randzoloto *= 1.5;
          }
        }
      }

      if (typeof message.user.questminer === "number") {
        message.user.questminer += Number(message.args[1]);

        if (message.user.questminer >= 50) {
          message.user.questminer = true;

          await bot(
            `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
          );

          message.user.c3 += 1;
        }
      }

      if (
        typeof message.user.questminer2 === "number" &&
        message.user.questallfucker === true
      ) {
        message.user.questminer2 += Number(message.args[1]);

        if (message.user.questminer2 >= 5000) {
          message.user.questminer2 = true;

          await bot(
            `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
          );

          message.user.c3 += 2;
        }
      }

      randzoloto = Math.floor(Math.round(randzoloto));

      message.user.energy -= Number(message.args[1]);

      message.user.opit += Number(message.args[1]);

      message.user.ruds.zoloto += randzoloto;

      return bot(`+${utils.sp(randzoloto)} золота 💛
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
    }
  }
);

//кнопка

cmd.hear(/^(?:копать алмазы|⛏ Копать алмазы)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.opit < 1500)
      return bot(
        `чтобы копать алмазы нужно больше 1.500 опыта. Копайте золото/железо и увеличивайте свой опыт! ⚠`
      );

    if (message.user.energy < 1) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]),
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && !message.user.now.kv7){

      message.user.now.kv7 = true;
      message.user.balance += 100000000;
      await bot(`⚠️ Вы успешно выполнили 7 задание!

Награда - 100.000.000 ${val1}

💡 Регулярно копайте алмазы ведь их потом можно продать!`, {
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
      }],
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `курс руды` }),
          "label": `💥 Курс руды`
        },
        "color": "positive"
      }],
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `продать алмазы` }),
          "label": `💎 Продать алмазы`
        },
        "color": "positive"
      }],
    ]
  })
})
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    let randalmaz = utils.random(2, 18);

    if (message.user.minertool >= 3) {
      randalmaz *= 2;

      message.user.opit += 10;
    }

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randalmaz *= 1.5;
        }
      }
    }

    randalmaz = Math.floor(Math.round(randalmaz));

    message.user.energy -= 1;

    message.user.opit += 10;

    message.user.ruds.almaz += randalmaz;

    if (message.user.energy > 0)
      return bot(
        `+${utils.sp(randalmaz)} алмазов 💎
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать алмазы",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randalmaz)} алмазов 💎
У Вас закончилась энергия! 🔋🤒`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать алмазы",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(
  /^(?:копать алмазы|⛏ Копать алмазы)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
    if (message.user.opit < 1500)
      return bot(
        `чтобы копать алмазы нужно больше 1.500 опыта. Копайте золото/железо и увеличивайте свой опыт! ⚠`
      );

    if (!message.user.settings.titan)
      return bot(
        `Копать алмазы несколько раз можно только Titan VIP\n❓Покупка: Донат`
      );

    if (!message.user.settings.topdon) {
      if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
        return bot(`Больше 10 копаний за раз сделать нельзя.`);
    }

    if (message.user.energy < Number(message.args[1])) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]),
      });

      return bot(
        `у Вас недостаточно энергии! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    let user = message.user;

    let randzoloto = 0;

    let t = Number(message.args[1]);

    for (let i = 0; i < t; i++) {
      let rand = utils.random(2, 6);

      randzoloto += rand;
    }

    if (user.minertool >= 3) {
      randzoloto *= 2;

      user.opit += Number(message.args[1]) * 10;
    }

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randzoloto *= 1.5;
        }
      }
    }

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && message.user.now.kv6 && !message.user.now.kv7){

      message.user.now.kv7 = true;
      message.user.balance += 100000000;
      await bot(`⚠️ Вы успешно выполнили 7 задание!

Награда - 100.000.000 ${val1}

💡 Регулярно копайте алмазы ведь их потом можно продать!`, {
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
      }],
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `курс руды` }),
          "label": `💥 Курс руды`
        },
        "color": "positive"
      }],
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `продать алмазы` }),
          "label": `💎 Продать алмазы`
        },
        "color": "positive"
      }],
    ]
  })
})
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer += Number(message.args[1]);

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2 += Number(message.args[1]);

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    randzoloto = Math.floor(Math.round(randzoloto));

    message.user.energy -= Number(message.args[1]);

    message.user.opit += Number(message.args[1]);

    message.user.ruds.almaz += randzoloto;

    return bot(`+${utils.sp(randzoloto)} алмазов 💎
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
  }}
);

//кнопка

cmd.hear(/^(?:копать материю|⛏ Копать материю)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.opit < 50000)
      return bot(`чтобы копать материю нужно больше 50.000 опыта. ⚠`);

    if (message.user.energy < 2) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801])
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    let randmateria = utils.random(2, 6);

    if (message.user.minertool >= 4) randmateria *= 2;

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randmateria *= 1.5;
        }
      }
    }

    randmateria = Math.floor(Math.round(randmateria));

    message.user.energy -= 2;

    message.user.opit += 20;

    message.user.ruds.materia += randmateria;

    if (message.isChat) {
      if (chats.statuemsglvl >= 3) {
        message.user.energy += 1;
      }
    }

    if (message.user.energy > 0)
      return bot(
        `+${utils.sp(randmateria)} материи 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать материю",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randmateria)} материи 🌌
У Вас закончилась энергия! 🔋🤒`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать материю",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(
  /^(?:копать материю|⛏ Копать материю)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.user.opit < 50000)
        return bot(`чтобы копать материю нужно больше 50.000 опыта. ⚠`);

      if (!message.user.settings.titan)
        return bot(
          `Копать материю несколько раз можно только Titan VIP\n❓Покупка: Донат`
        );

      if (!message.user.settings.topdon) {
        if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
          return bot(`Больше 10 копаний за раз сделать нельзя.`);
      }

      let randzoloto = 0;

      let t = Number(message.args[1]);

      for (let i = 0; i < t; i++) {
        let rand = utils.random(1, 18);

        randzoloto += rand;
      }

      if (message.user.minertool >= 4) randzoloto *= 2;

      if (message.isChat) {
        if (chats) {
          if (chats.statuemsglvl >= 2) {
            randzoloto *= 1.5;
          }
        }
      }

      if (message.isChat && chats.statuemsglvl >= 3) {
        if (message.user.energy < Number(message.args[1]))
          return bot(`⚠ Недостаточно энергии`);

        randzoloto = Math.floor(Math.round(randzoloto));

        message.user.energy -= Number(message.args[1]);

        message.user.opit += Number(message.args[1]) * 20;

        message.user.ruds.materia += randzoloto;
      } else {
        randzoloto = Math.floor(Math.round(randzoloto));

        if (message.user.energy < Number(message.args[1]) * 2)
          return bot(`⚠ Недостаточно энергии`);

        message.user.energy -= Number(message.args[1]) * 2;

        message.user.opit += Number(message.args[1]) * 20;

        message.user.ruds.materia += randzoloto;
      }

      if (typeof message.user.questminer === "number") {
        message.user.questminer += Number(message.args[1]);

        if (message.user.questminer >= 50) {
          message.user.questminer = true;

          await bot(
            `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
          );

          message.user.c3 += 1;
        }
      }

      if (
        typeof message.user.questminer2 === "number" &&
        message.user.questallfucker === true
      ) {
        message.user.questminer2 += Number(message.args[1]);

        if (message.user.questminer2 >= 5000) {
          message.user.questminer2 = true;

          await bot(
            `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
          );

          message.user.c3 += 2;
        }
      }

      return bot(`+${utils.sp(randzoloto)} материи 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
    }
  }
);

cmd.hear(/^(?:копать обсидиан|⛏ Копать обсидиан)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.opit < 100000)
      return bot(`чтобы копать обсидиан нужно больше 100.000 опыта. ⚠`);

    if (message.user.energy < 2) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801])
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    if (typeof message.user.questminer === "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    let randobsidian = utils.random(1, 3);

    if (message.user.minertool >= 5) randobsidian *= 2;

    if (message.isChat) {
      if (chats) {
        if (chats.statuemsglvl >= 2) {
          randobsidian *= 1.5;
        }

        if (chats.statuemsglvl >= 3) {
          message.user.energy += 1;
        }
      }
    }

    randobsidian = Math.floor(Math.round(randobsidian));

    message.user.energy -= 2;

    message.user.opit += 50;

    message.user.ruds.obsidian += randobsidian;

    if (message.user.energy > 0)
      return bot(
        `+${utils.sp(randobsidian)} обсидиана 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать обсидиан",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randobsidian)} обсидиана 🌌
У Вас закончилась энергия! 🔋🤒`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать обсидиан",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(
  /^(?:копать обсидиан|⛏ Копать обсидиан)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.user.opit < 100000)
        return bot(`чтобы копать обсидиан нужно больше 100.000 опыта. ⚠`);

      if (!message.user.settings.titan)
        return bot(
          `Копать обсидиан несколько раз можно только Titan VIP\n❓Покупка: Донат`
        );

      if (!message.user.settings.topdon) {
        if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
          return bot(`Больше 10 копаний за раз сделать нельзя.`);
      }

      let randzoloto = 0;

      let t = Number(message.args[1]);

      for (let i = 0; i < t; i++) {
        let rand = utils.random(1, 3);

        randzoloto += rand;
      }

      if (message.user.minertool >= 4) randzoloto *= 2;

      if (message.isChat) {
        if (chats) {
          if (chats.statuemsglvl >= 2) {
            randzoloto *= 1.5;
          }
        }
      }

      if (message.isChat && chats.statuemsglvl >= 3) {
        if (message.user.energy < Number(message.args[1]))
          return bot(`⚠ Недостаточно энергии`);

        randzoloto = Math.floor(Math.round(randzoloto));

        message.user.energy -= Number(message.args[1]);

        message.user.opit += Number(message.args[1]) * 50;

        message.user.ruds.obsidian += randzoloto;
      } else {
        randzoloto = Math.floor(Math.round(randzoloto));

        if (message.user.energy < Number(message.args[1]) * 2)
          return bot(`⚠ Недостаточно энергии`);

        message.user.energy -= Number(message.args[1]) * 2;

        message.user.opit += Number(message.args[1]) * 50;

        message.user.ruds.obsidian += randzoloto;
      }

      if (typeof message.user.questminer === "number") {
        message.user.questminer += Number(message.args[1]);

        if (message.user.questminer >= 50) {
          message.user.questminer = true;

          await bot(
            `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
          );

          message.user.c3 += 1;
        }
      }

      if (
        typeof message.user.questminer2 === "number" &&
        message.user.questallfucker === true
      ) {
        message.user.questminer2 += Number(message.args[1]);

        if (message.user.questminer2 >= 5000) {
          message.user.questminer2 = true;

          await bot(
            `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
          );

          message.user.c3 += 2;
        }
      }

      return bot(`+${utils.sp(randzoloto)} обсидиана 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
    }
  }
);

cmd.hear(/^(?:копать плазму|⛏ Копать плазму)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.isChat) {
      if (chats) {
        if (chats.statuepeoplelvl <= 5) {
          return bot(
            `Статуя в этой беседе недостаточно улучшена для компания плазмы ❌`
          );
        }
      }
    } else {
      return bot(
        `Ресурс можно добыть только в беседе со статуей людей больше 5 уровня ❌`
      );
    }

    if (message.user.opit < 1000000)
      return bot(`чтобы копать плазму нужно больше 1.000.000 опыта. ⚠`);

    if (typeof message.user.questminer == "number") {
      message.user.questminer++;

      if (message.user.questminer >= 50) {
        message.user.questminer = true;

        await bot(
          `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
        );

        message.user.c3 += 1;
      }
    }

    if (
      typeof message.user.questminer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questminer2++;

      if (message.user.questminer2 >= 5000) {
        message.user.questminer2 = true;

        await bot(
          `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
        );

        message.user.c3 += 2;
      }
    }

    let en = 4;

    let randplazma = utils.random(1, 2);

    if (message.user.minertool >= 5) randplazma *= 2;

    if (message.isChat) {
      if (chats) {
        if (chat.statuemsglvl >= 2) {
          randplazma *= 1.5;
        }

        if (chats.statuemsglvl >= 3) {
          en = 3;
        }
      }
    }

    randplazma = Math.floor(Math.round(randplazma));

    if (message.user.energy < en) {
      message.send({
        sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801])
      });

      return bot(
        `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
      );
    }

    message.user.energy -= en;

    message.user.opit += 500;

    message.user.ruds.plazma += randplazma;

    if (message.user.energy > 0)
      return bot(
        `+${utils.sp(randplazma)} плазмы 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать плазму",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );

    if (message.user.energy < 1) {
      return bot(
        `+${utils.sp(randplazma)} плазмы 🌌
У Вас закончилась энергия! 🔋🤒`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⛏ Копать плазму",
                  },

                  color: "positive",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(
  /^(?:копать плазму|⛏ Копать плазму)\s([0-9]+)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.isChat) {
        if (chat) {
          if (chats.statuepeoplelvl <= 5) {
            return bot(
              `В этой беседе статуя недостаточно улучшена для копания плазмы ❌`
            );
          }
        }
      } else {
        return bot(
          `Ресурс можно добыть только в беседе со статуей людей больше 5 уровня ❌`
        );
      }

      if (message.user.opit < 1000000)
        return bot(`чтобы копать плазму нужно больше 1.000.000 опыта. ⚠`);

      if (!message.user.settings.titan)
        return bot(
          `Копать плазму несколько раз можно только Titan VIP\n❓Покупка: Донат`
        );

      if (!message.user.settings.topdon) {
        if (Number(message.args[1]) < 1 || Number(message.args[1]) > 10)
          return bot(`Больше 10 копаний за раз сделать нельзя.`);
      }

      let randzoloto = 0;

      let t = Number(message.args[1]);

      for (let i = 0; i < t; i++) {
        let rand = utils.random(1, 2);

        randzoloto += rand;
      }

      if (message.user.minertool >= 4) randzoloto *= 2;

      if (message.isChat) {
        if (chats) {
          if (chats.statuemsglvl >= 2) {
            randzoloto *= 1.5;
          }
        }
      }

      if (message.isChat && chats.statuemsglvl >= 3) {
        if (message.user.energy < Number(message.args[1]) * 3)
          return bot(`⚠ Недостаточно энергии`);

        randzoloto = Math.floor(Math.round(randzoloto));

        message.user.energy -= Number(message.args[1]) * 3;

        message.user.opit += Number(message.args[1]) * 500;

        message.user.ruds.plazma += randzoloto;
      } else {
        randzoloto = Math.floor(Math.round(randzoloto));

        if (message.user.energy < Number(message.args[1]) * 4)
          return bot(`⚠ Недостаточно энергии`);

        message.user.energy -= Number(message.args[1]) * 4;

        message.user.opit += Number(message.args[1]) * 500;

        message.user.ruds.plazma += randzoloto;
      }

      if (typeof message.user.questminer === "number") {
        message.user.questminer += Number(message.args[1]);

        if (message.user.questminer >= 50) {
          message.user.questminer = true;

          await bot(
            `Поздравляем, Вы 50 раз покопали руду и получаете 📦 1 Донат-кейс.`
          );

          message.user.c3 += 1;
        }
      }

      if (
        typeof message.user.questminer2 === "number" &&
        message.user.questallfucker === true
      ) {
        message.user.questminer2 += Number(message.args[1]);

        if (message.user.questminer2 >= 5000) {
          message.user.questminer2 = true;

          await bot(
            `Поздравляем, Вы 5000 раз покопали руду и получаете 📦 2 Донат-кейса.`
          );

          message.user.c3 += 2;
        }
      }

      return bot(`+${utils.sp(randzoloto)} плазмы 🌌
⚡ Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`);
    }
  }
);











module.exports = commands;
