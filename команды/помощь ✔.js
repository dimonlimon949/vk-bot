let utils = require('../utils.js')
const { VK } = require('vk-io');
const fs = require('fs'); 

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
const tokenData = getToken();
const vk = require('../vk-api.js'); 

const commands =[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

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

cmd.hear(/^(?:◀️ В игровое меню|помощь|помощ|помошь|помош|📚 Помощь|, 📚 Помощь|♻️ Помощь|команды|меню|хелп|commands|cmds|menu|rjvfyls|yfxfnm|«помощь»|«меню»|start|старт)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131', 
    });
    const groupName = groupInfo[0].name;
    message.send(
      `👋 Привет, @id${message.user.id} (${message.user.tag})! Добро пожаловать в ${groupName}!\n\n` +
      `🎮 Игровой бот с классными командами! 🔥\n` +
      `💬 Вопросы? Пиши администрации: «репорт [ваш вопрос]».\n` +
      `🔘 Управление кнопками: «кнопки [вкл/выкл]».`,
      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "😸 Развлекательные",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🎲 Игры",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🏎️ Гонки",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "💰 Заработок",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "💠 Основное",
                },

                color: "default",
              },

            ],

          ],
        }),
      }
    );

    message.send({ sticker_id: utils.pick([104297, 61425, 70521, 70527, 72801]) });
  }
  }
);

cmd.hear(/^😸 Развлекательные$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`раздел «РАЗВЛЕКАТЕЛЬНЫЕ» 😸

📈 Курс 
💎 Курс руды
💬 Беседы`,
{
  keyboard: JSON.stringify({
    inline: true,

    buttons: [
      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "📈 Курс",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "💎 Курс руды",
          },

          color: "default",
        },
        {
          action: {
            type: "text",

            payload: "{}",

            label: "💬 Беседы",
          },

          color: "default",
        },
      ],
    ],
  }),
});
  }
});

cmd.hear(/^🎲 Игры$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`раздел «ИГРЫ» 🎲

🎰 Казино [сумма]
⏲ Фортуна
📦 Кейсы`,
{
  keyboard: JSON.stringify({
    inline: true,

    buttons: [
      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🎰 Казино 1",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "⏲ Фортуна",
          },

          color: "default",
        },
        {
          action: {
            type: "text",

            payload: "{}",

            label: "📦 Кейсы",
          },

          color: "default",
        },
      ],

    ],
  }),
});
  }
});

cmd.hear(/^🏎️ Гонки$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`раздел «ГОНКИ» 🏎️

🛣 Машины
🏁 Гонка`,
{
  keyboard: JSON.stringify({
    inline: true,

    buttons: [
      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🛣 Машины",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "🏁 Гонка",
          },

          color: "default",
        },
      ],

    ], 
  }),
});
  }
});

cmd.hear(/^💰 Заработок$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`раздел «ЗАРАБОТОК» 💰

⛏ Копать
🎉 Квесты
🔋 Фермы
💫 Звезды
🌳 Деревья
🎉 Аренда
📈 Обмен
🏢 Бизнес
😴 Уровень
`,
{
  keyboard: JSON.stringify({
    inline: true,

    buttons: [
      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "⛏ Копать",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "🔋 Фермы",
          },

          color: "default",
        },
      ],

      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "💫 Звезды",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "🌳 Деревья",
          },

          color: "default",
        },
      ],


      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🎉 Аренда",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "📈 Обмен",
          },

          color: "default",
        },],
        [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🏢 Бизнес",
          },

          color: "default",
        },
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🎉 Квесты",
          },

          color: "default",
        },
                {
          action: {
            type: "text",

            payload: "{}",

            label: "😴 Уровень",
          },

          color: "default",
        },
      ],
    ],
  }),
});
  }
});




cmd.hear(/^💠 Основное$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`раздел «ОСНОВНОЕ» 💠

🔅 Профиль
💰 Баланс
💳 Банк [сумма/снять] [сумма]
👑 Рейтинг
🎮 Ник [ник/вкл/выкл]
💸 Продать [предмет]
😈 Босс - Информация о боссе.
🤝 Передать [ID игрока] [сумма]
🏆 ТОП
🎁 Бонус
📩 Подарок
🍹 Напитки

♻️ Донат
🛑 Обмен ${val2}`,
{
  keyboard: JSON.stringify({
    inline: true,

    buttons: [
      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🔅 Профиль",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "💰 Баланс",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "💳 Банк",
          },

          color: "default",
        },
      ],

      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🎁 Бонус",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "🏆 ТОП",
          },

          color: "default",
        },
      ],


      [
        {
          action: {
            type: "text",

            payload: "{}",

            label: "🍹 Напитки",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: "😈 Босс",
          },

          color: "default",
        },

        {
          action: {
            type: "text",

            payload: "{}",

            label: `🛑 Обмен ${val2}`,
          },

          color: "default",
        },
      ],
    ],
  }),
});
  }
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