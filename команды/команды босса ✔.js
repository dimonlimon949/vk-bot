let utils = require('../utils.js');
const commands = [];
const fs = require('fs');
let double = require('../database/users.json');

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
let val1 = tokenData3.val1;
let val2 = tokenData3.val2;
let val3 = tokenData3.val3;
let val4 = tokenData3.val4;

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

let chats = require('../database/chats.json');
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const tokensFilePath = './настройки/токены.json';
let bossinfo = require('../database/bossinfo.json');

function getToken() {
    try {
        const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error('Ошибка при чтении токенов:', error);
        return null;
    }
}

// 🔥 Основные команды босса

cmd.hear(/^(?:😈 Босс|босс)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (message.user.sataka >= 200 && message.user.questbosspower === false) {
            await bot(`Ваша сила больше 200, вы получаете бонус за свою силу в виде 2.ООО.ООО.OOO ${val1}`);
            message.user.balance += 2000000000;
            message.user.questbosspower = true;
        }

        return bot(
            `босс «${bossinfo.boss_name}» ❄️\n` +
            `💚 Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)}\n` +
            `🗡️ Нанесено урона: ${utils.sp(message.user.bossyr)} ед.\n` +
            `💪 Ваша сила: ${utils.sp(message.user.sataka)}\n` +
            `➖➖➖➖➖➖➖\n` +
            `♻️ Увеличить силу удара: «босс сила [кол-во]»\n` +
            `▶️ Стоимость: ${utils.sp(50000000 * message.user.sataka)}$ 💵\n` +
            `👊 Ударить босса: «босс атака [кол-во]»\n\n` +
            `🔝 ТОП игроков по урону: «босс топ»`,
            {
                attachment: `${bossinfo.photo}`,
                keyboard: JSON.stringify({
                    inline: true,
                    buttons: [
                        [
                            { action: { type: "text", payload: "{}", label: "👊 Босс сила" }, color: "default" },
                            { action: { type: "text", payload: "{}", label: "⚔ Атака" }, color: "default" }
                        ],
                        [
                            { action: { type: "text", payload: "{}", label: "😈 Босс топ" }, color: "default" }
                        ]
                    ]
                })
            }
        );
    }
});

cmd.hear(/^(?:босс сила|👊 Босс сила)(?:\s([0-9]+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const upgradeAmount = message.args[1] ? Number(message.args[1]) : 1; // Если число не указано, то +1

        if (Number(message.user.sataka) + upgradeAmount > 1500) {
            return bot(`Превышен лимит прокачки силы (максимум 1.500). Ваша сила: ${message.user.sataka}`);
        }

        const cost = 50000000 * message.user.sataka * upgradeAmount;
        if (message.user.balance < cost) {
            return bot("Недостаточно денег.");
        }

        message.user.sataka += upgradeAmount;
        message.user.balance -= cost;

        if (message.user.sataka >= 200 && message.user.questbosspower === false) {
            await bot(`Ваша сила больше 200, вы получаете бонус: 2.000.000.000 ${val1}`);
            message.user.balance += 2000000000;
            message.user.questbosspower = true;
        }

        return bot(
            `Сила вашей атаки повышена на ${utils.sp(upgradeAmount)} ед. за ${utils.sp(cost)} ${val1}\n` +
            `💰 Баланс: ${utils.sp(message.user.balance)} ${val1}`,
            {
                keyboard: JSON.stringify({
                    inline: true,
                    buttons: [
                        [
                            { action: { type: "text", payload: "{}", label: "👊 Босс сила" }, color: "positive" }
                        ]
                    ]
                })
            }
        );
    }
});

cmd.hear(/^(?:босс атака|⚔ Атака)(?:\s+([0-9]+))?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (bossinfo.boss < 1) return bot(`Босс мертв, следите за новостями. 👊`);
        if (message.user.settings.adm >= 2) return bot(`Администраторам запрещено атаковать босса. 💚`);

        // Если число не указано, атакуем 1 раз
        const attackCount = message.args[1] ? parseInt(message.args[1]) : 1;
        const energyCost = 2 * attackCount;

        if (message.user.energy < energyCost) {
            message.send({ sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]) });
            return bot(`У вас закончилась энергия! 🔋\n💤 Восстановление: каждые 5 мин.`);
        }

        // Квест "Убийца боссов"
        if (message.user.questdamagedealer === false) {
            const damageDealt = Math.floor(message.user.sataka);
            message.user.bossyr += damageDealt;
            if (message.user.bossyr >= 100000) {
                message.user.questdamagedealer = true;
                await bot(`🎉 Вы нанесли 100.000 урона! Награда: 150.000.000 ${val1}`);
                message.user.balance += 150000000;
            }
        }

        const damage = Math.floor(message.user.sataka) * attackCount;
        message.user.bossyr += damage;
        bossinfo.boss -= damage;
        message.user.energy -= energyCost;

        return bot(
            `Вы нанесли боссу ${utils.sp(damage)} урона! 👊🗡️\n` +
            `❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)}\n` +
            `⚡ Ваша энергия: ${message.user.energy} ед.`,
            {
                keyboard: JSON.stringify({
                    inline: true,
                    buttons: [
                        [
                            { action: { type: "text", payload: "{}", label: "⚔ Атака" }, color: message.user.energy >= 2 ? "positive" : "negative" },
                            { action: { type: "text", payload: "{}", label: "😈 Босс топ" }, color: "secondary" }
                        ]
                    ]
                })
            }
        );
    }
});


cmd.hear(/^(?:босс топ|😈 Босс топ)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let top = [];

    double
      .filter((x) => x.settings.adm === 0)
      .map((x) => {
        top.push({ bossyr: x.bossyr, tag: x.tag, id: x.id, mention: x.mention });
      });

    top.sort((a, b) => {
      return b.bossyr - a.bossyr;
    });

    let text = ``;

    const find = () => {
      let pos = 1000;

      for (let i = 0; i < top.length; i++) {
        if (top[i].id === message.senderId) return (pos = i);
      }

      return pos;
    };

    const maxTopEntries = Math.min(10, double.filter((x) => x.settings.adm === 0).length);

    for (let i = 0; i < maxTopEntries; i++) {
      if (!top[i]) {
        break; // Прерываем если больше нет игроков
      }

      const user = top[i];

      text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — нанёс ${utils.sp(user.bossyr)} урона.`;
    }

    return bot(
      `топ по общему урону:${text}
➖➖➖➖➖➖➖➖
${utils.gi(find() + 1)} ${message.user.tag} — нанёс ${utils.sp(
        message.user.bossyr
      )} урона.`,
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

// Команды основателя









module.exports = commands;
