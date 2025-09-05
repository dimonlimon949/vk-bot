let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

let trees = require('../spisok/деревья.js')

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

cmd.hear(/^(?:деревья|🌳 Деревья)\s?(\d+)?$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
      // Если аргумент не передан, выводим список деревьев
      if (!message.args[1]) {
          return bot(`Деревья:

🌳 1. Одинокое дерево: 1 листик/час (${utils.sp(trees.find((x) => x.id === Number(1)).cost)} ${val1})
🌳 2. Несколько деревьев: 3 листика/час (${utils.sp(trees.find((x) => x.id === Number(2)).cost)} ${val1})
🌳 3. Лес: 5 листиков/час (${utils.sp(trees.find((x) => x.id === Number(3)).cost)} ${val1})

🛒 Для покупки введите «Деревья [номер]»
`, {
              keyboard: JSON.stringify({
                  inline: true,
                  buttons: [
                      [
                          {
                              action: {
                                  type: "text",
                                  payload: JSON.stringify({ command: "Деревья 1" }),
                                  label: "Дерево 1",
                              },
                              color: message.user.tree === 1 ? "secondary" : (message.user.balance >= trees[0].cost ? "positive" : "negative"),
                          },
                          {
                              action: {
                                  type: "text",
                                  payload: JSON.stringify({ command: "Деревья 2" }),
                                  label: "Дерево 2",
                              },
                              color: message.user.tree === 2 ? "secondary" : (message.user.balance >= trees[1].cost ? "positive" : "negative"),
                          },
                      ],
                      [
                          {
                              action: {
                                  type: "text",
                                  payload: JSON.stringify({ command: "Деревья 3" }),
                                  label: "Дерево 3",
                              },
                              color: message.user.tree === 3 ? "secondary" : (message.user.balance >= trees[2].cost ? "positive" : "negative"),
                          },
                      ],
                  ],
              }),
          });
      }

      // Проверяем номер дерева
      const treeId = Number(message.args[1]);
      if (treeId < 1 || treeId > 3) return bot("Неверный номер дерева");

      const selectedTree = trees.find((x) => x.id === treeId);
      if (!selectedTree) return;

      // Проверяем, есть ли у пользователя уже дерево
if (message.user.tree !== 0) {
  return bot(
    `У вас уже есть Дерево (${trees[message.user.tree - 1].name})! 🙌\n🛒 Чтобы его продать, напишите «Продать дерево»`,
    {
      keyboard: JSON.stringify({
        inline: true,
        buttons: [
          [{
            action: {
              type: "text",
              payload: JSON.stringify({ command: "продать дерево" }),
              label: "❎ Продать"
            },
            color: "primary"
          }]
        ]
      })
    }
  );
}

      // Проверяем баланс пользователя
      if (message.user.balance < selectedTree.cost) {
          return bot(`Недостаточно денег!`);
      } else {
          // Выполняем покупку
          message.user.balance -= selectedTree.cost;
          message.user.irrigation = 100; // Устанавливаем уровень орошения
          message.user.tree = selectedTree.id; // Устанавливаем купленное дерево

          return bot(`Вы успешно купили «${selectedTree.name}» за ${utils.sp(selectedTree.cost)}$`);
      }
  }
});

cmd.hear(
  /^(?:дерево|🌲 Дерево )$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {

  if (!message.user.tree)
    return bot(`у Вас нет дерева!

Для выбора дерева отправьте «Деревья»`);

  const biz = trees.find((x) => x.id === message.user.tree);

  const lvlcash = biz.earn; 

  return bot(
    `информация о Вашем дереве «${biz.name}»:

🍂 Падает ${utils.sp(lvlcash)} лист./час
🍃 Упало ${utils.sp(message.user.leafpribil)}
💧 Осталось воды: ${utils.sp(message.user.irrigation)}%
`,
    {
      attachment: biz.photo,

      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",

                payload: "{}",

                label: "🚿 Дерево полить",
              },

              color: "positive",
            },

            {
              action: {
                type: "text",

                payload: "{}",

                label: "▶️ Дерево собрать",
              },

              color: "positive",
            },
          ],

          [
            {
              action: {
                type: "text",

                payload: "{}",

                label: "🌲 Дерево помощь",
              },

              color: "positive",
            },
          ],
        ],
      }),
    }
  );
}
});
cmd.hear(
  /^(?:дерево помощь|деревья помощь|🌲 Дерево помощь)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
    return message.send(`помощь по дереву:

✅ Полить дерево, чтобы оно не засохло: Команда «Дерево полить»
🍃 Собрать листики с дерева: Команда «Дерево собрать»`);
  }
}
);

cmd.hear(/^(?:дерево|▶️ Дерево)\sсобрать$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);

  if (!message.user.tree)
    return bot(
      `У вас нет дерева! Можно просмотреть список всех продаваемых деревьев, написав команду «Деревья» 🌲`
    );

  if (!message.user.leafpribil)
    return bot(`У этого дерева ещё нету опавших листиков! ❌😢`);

  const biz_balance = message.user.leafpribil;

  message.user.leaf += message.user.leafpribil;

  message.user.leafpribil = 0;

  return bot(
    `вы собрали со своего дерева ${utils.sp(biz_balance)} опавших листиков 🍃`
  );
}
});

cmd.hear(/^(?:дерево полить|🚿 Дерево полить)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (message.user.tree < 1)
    return bot(`у вас нет дерева.
❓ Для покупки введите "Деревья"`);

  if (message.user.irrigation >= 100) return bot(`дереву не требуется полив!`);

  if (message.user.balance < 10000000) return bot(`недостаточно денег. ⁉️`);
  else {
    message.user.irrigation = 100;

    message.user.balance -= 10000000;

    bot(
      `дерево успешно было полито!\n\nВы полили дерево «${trees[message.user.tree - 1].name
      }» за 10.000.000$ 💧`
    );
  }
}
});

cmd.hear(/^(?:🍹 Напитки|Напитки)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type == 1) {
    return bot(`Напитки:

🔸 1. Чай (2 листика)
🔸 2. Кофе (12 листиков)
🔸 3. Энергетик (26 листиков)
🔸 4. Отвар трав (56 листиков)
🔸 5. Черная жидкость (120 листиков)
🔸 6. Капля зелья энергии (150 листиков)
🔸 7. Истинное зелье энергии (2000 листиков)

🛒 Для покупки введите «Напитки [номер]»`);
  }
});

cmd.hear(/^(?:Напитки|🍹 напитки)\s?([0-9]+)?$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  const drinks = [
    { id: 1, name: 'Чай', cost: 2, energy: 1 },
    { id: 2, name: 'Кофе', cost: 12, energy: 5 },
    { id: 3, name: 'Энергетик', cost: 26, energy: 10 },
    { id: 4, name: 'Отвар трав', cost: 56, energy: 20 },
    { id: 5, name: 'Чёрная жидкость', cost: 120, energy: 40 },
    { id: 6, name: 'Капля зелья', cost: 150, energy: 50 },
    { id: 7, name: 'Зелье', cost: 2000, energy: 500 },
  ];

  const index = Number(message.args[1]) - 1;

  if (index < 0 || index >= drinks.length) {
    return bot('Неправильный номер напитка. 🍹');
  }

  const drink = drinks[index];

  if (message.user.leaf < drink.cost) {
    return bot(`Недостаточно листиков! 🍃`);
  }

  message.user.leaf -= drink.cost;
  message.user.energy += drink.energy;

  return bot(`Вы успешно купили напиток «${drink.name}» за ${drink.cost} листиков и восстановили ${drink.energy} энергии. ⚡`, {
    keyboard: JSON.stringify({
      "inline": true,
      "buttons": [[{
        "action": {
          "type": "text",
          "payload": "{\"button\": \"5\"}",
          "label": `🍹 Напитки ${drink.id}`
        },
        "color": "positive"
      }]]
    })
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
