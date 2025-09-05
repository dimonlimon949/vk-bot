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


cmd.hear(/^(?:Купить подвал)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.sprcoin < 100)
      return bot(`Подвал можно купить за 100 SpringCoins`);

    if (message.user.realty.home === 0) return bot(`🔸У вас нет дома`);

    if (message.user.realty.basement) return bot(`у Вас уже есть подвал! ☃️`);

    message.user.sprcoin -= 100;

    message.user.realty.basement = true;

    bot(`вы купили подвал! ✅`);

    message.send({ sticker_id: 108222 });
  }
});

cmd.hear(/^(?:фид)\s(.*)$$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    // Проверяем наличие привилегий у пользователя
    if (!message.user.settings.imperator)
      return bot(`У вас отсутствует привилегия << Император >> ! 🔹`);

    // Получаем ID из аргументов
    const fakeId = message.args[1];

    // Проверяем, пуст ли ID или если его длина превышает 8 символов
    if (fakeId.length < 1 || fakeId.length > 20)
      return bot(`ID должен содержать от 1 до 20 символов и может включать буквы!`);
    // Устанавливаем фейковый ID
    message.user.astats.fakeid = fakeId;

    // Возвращаем сообщение об успешной установке
    return bot(`Фейковый ID установлен! 😈\n🆔 » ID: ${fakeId}`);
  }
});



module.exports = commands;
