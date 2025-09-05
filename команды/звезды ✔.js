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




cmd.hear(/^(?:Солнце|Звезда 1)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (!message.user.stars1) return bot(`Приобретите Солнце. "Звезды 1"`);

  return bot(
    `Информация о Вашей звезде:\n\n▶️ Название: «Солнце»\n🤑 Прибыль: 100 алмазов/час`,
    { attachment: `photo-197579361_457268021` }
  );
}
});

cmd.hear(/^(?:Сириус|Звезда 2)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (!message.user.stars2) return bot(`Приобретите Сириус. "Звезды 2"`);

  return bot(
    `Информация о Вашей звезде:\n\n▶️ Название: «Сириус»\n🤑 Прибыль: 75 материи/час`,
    { attachment: `photo-197579361_457268018` }
  );
}
});

cmd.hear(/^(?:Красный гигант|Звезда 3)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (!message.user.stars3)
    return bot(`Приобретите Красный гигант. "Звезды 3"`);

  return bot(
    `Информация о Вашей звезде:\n\n▶️ Название: «Красный гигант»\n🤑 Прибыль: 50 обсидиана/час`,
    { attachment: `photo-197579361_457268019` }
  );
}
});

cmd.hear(/^(?:Плазмовый гигант|Звезда 4)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (!message.user.stars4)
    return bot(`Приобретите Плазмовый гигант. "Звезды 4"`);

  return bot(
    `Информация о Вашей звезде:\n\n▶️ Название: «Плазмовый гигант»\n🤑 Прибыль: 10 плазмы/час`,
    { attachment: `photo-197579361_457268022` }
  );
}
});

cmd.hear(/^(?:Донатный гигант|Звезда 5)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (!message.user.stars5)
    return bot(`Приобретите Донатный гиган. "Звезды 5"`);

  return bot(
    `Информация о Вашей звезде:\n\n▶️ Название: «Донатный гигант»\n🤑 Прибыль: 30 ЧакоРуб/час`,
    { attachment: `photo-197579361_457268020` }
  );
}
});
 
cmd.hear(/^(?:звезды|☀ звезды|звёзды|💫 Звезды)\s?([0-9]+)?$/i, async (message, bot) => {
  // Отображение доступных звезд
  if (!message.isChat || message.chat.type === 1) {
    if (!message.args[1]) {
      return bot(`Звезды: 
        ${message.user.stars1 ? '✅' : '❌'} 1. Солнце - 15.000 алмазов\nПрибыль: 100 алм/час.
        ${message.user.stars2 ? '✅' : '❌️'} 2. Сириус - 10.000 материи\nПрибыль: 75 мат/час.
        ${message.user.stars3 ? '✅️' : '❌️'} 3. Красный гигант - 5.000 обсидиана\nПрибыль: 50 обс/час. 
        ${message.user.stars4 ? '✅️' : '❌️'} 4. Плазмовый гигант - 3.000 плазмы\nПрибыль: 10 плз/час.
        ${message.user.stars5 ? '✅️' : '❌'} 5. Донатный гигант - 15.000 ${val2}\nПрибыль: 30 ${val2}/час.
        
        Для покупки введите "Звезды [номер]"`);
    }

    // Проверка введенного номера звезды
    const starNumber = Number(message.args[1]);
    if (starNumber < 1 || starNumber > 5) {
      return bot(`Введен неверный номер звезды. Укажите номер от 1 до 5.`);
    }

    // Массив звезд с данными о стоимости и необходимых ресурсах
    const starsData = [
      { id: 1, name: 'Солнце', cost: 15000, resource: 'almaz', profit: 100, emoji: '🔅', resourceName: 'алмазов' },
      { id: 2, name: 'Сириус', cost: 10000, resource: 'materia', profit: 75, emoji: '🌠', resourceName: 'материи' },
      { id: 3, name: 'Красный гигант', cost: 5000, resource: 'obsidian', profit: 50, emoji: '🔴', resourceName: 'обсидиана' },
      { id: 4, name: 'Плазмовый гигант', cost: 3000, resource: 'plazma', profit: 10, emoji: '🌌', resourceName: 'плазмы' },
      { id: 5, name: 'Донатный гигант', cost: 15000, resource: 'rub', profit: 30, emoji: '💵', resourceName: `${val2}` }
    ];

    const star = starsData[starNumber - 1];

    // Проверка, куплена ли звезда
    if (message.user[`stars${star.id}`]) {
      return bot(`Вы уже купили данную звезду 🌟`);
    }

    // Проверка ресурсов и покупка звезды
    if (message.user.ruds[star.resource] >= star.cost) {
      message.user[`stars${star.id}`] = true;
      message.user.ruds[star.resource] -= star.cost;
      return bot(`Вы успешно приобрели звезду ${star.name} ${star.emoji}`);
    } else {
      return bot(`Необходимо ${utils.sp(star.cost)} ${star.resourceName}`);
    }
  }
});


module.exports = commands;
