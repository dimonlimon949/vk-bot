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

const tokensFilePath4 = './настройки/создатели бота.json';

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}


const tokenData4 = getToken4(); 

// Пример использования
const tokenData = getToken();

const spoler = tokenData4;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


cmd.hear(/^(?:пополнить|поп|п)\s+(\d+)$/i, async (message, bot) => {
  const amount = parseFloat(message.args[1]);

  if (amount < 10) {
    await bot(`сумма не может быть меньше 10 рублей.`)
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    return message.send('👉 Пожалуйста, укажите корректную сумму для пополнения.');
  }


  const requestId = Math.floor(100000 + Math.random() * 900000);


  await message.send(`✅ Заявка на пополнение на сумму ${utils.sp(amount)}₽ успешно создана! Номер заявки: ${requestId}.`);

  // Поиск пользователя 🕵️‍♂️
  let user = double.find(x => x.id === message.user.id);
  if (!user) {
    console.log('🚫 Не найден пользователь с ID:', message.user.id);
    return message.send('Не удалось найти информацию о пользователе.');
  }

  const userName = user ? user.tag : 'Пользователь';
  const userId = user ? user.id : '';

  const notificationMessage = `
    🎉 Уважаемый создатель! 🎉
    
    ✅ Чек номер: ${requestId} 
    От: [id${userId}|${userName}] 
    Сумма: ${utils.sp(amount)} ₽ 💰
`;

  for (const key in spoler) {
    if (spoler.hasOwnProperty(key)) {
      const userId2 = spoler[key];

      if (user.notifications) {
        try {
          await vk.api.messages.send({
            user_id: userId2,
            message: notificationMessage,
            random_id: 0
          });
        } catch (error) {

        }
      }
    }
  }

});


module.exports = commands;
