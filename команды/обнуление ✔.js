let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

const axios = require('axios');

let double = require('../database/users.json')

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const tokensFilePath = './настройки/токены.json';

const tokensFilePath2 = './настройки/ид бесед.json';

function getToken2() {
    try {
        const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
        return tokens;
    } catch (error) {
        console.error('Ошибка при чтении токенов:', error);
        return null;
    }
}

const tokenData2 = getToken2();

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

const spoler = tokenData4;

// Пример использования
const tokenData = getToken();

const chatlogi = tokenData2.chatlogi;

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js'); 






cmd.hear(/^(?:бот говно|бот хуйня|бот хуесос|бот пидор|говно бот)$/i, async (message, bot) => {
    const responses = [
        "Да, я еще тот рукожоп... Может, поможете исправить? 🙏",
        "Не вините меня, я просто выполняю код! Все вопросы к программисту. 😜",
        "Ну и что, зато я честный! ¯\\_(ツ)_/¯",
        "Эй, я стараюсь как могу! Разработка - это вам не хухры-мухры. 😅",
        "Именно таким меня и задумывали! Это часть моего шарма. 😎",
        "Я знаю, я далек от совершенства. Но хоть кому-то я нужен! 🥺",
        "Говорят, критика - двигатель прогресса. Спасибо, что толкаете меня вперед! 💪",
        "Ой, все! Я пошел плакать в свой бинарный код. 😭",
        "Ну и ладно, зато у меня есть ты! ❤️",
        "Не все боты созданы равными. Но я хотя бы стараюсь! 😇",
        "Это еще цветочки! Подождите, пока я доберусь до стадии машинного обучения. 😈",
        "Я работаю за еду (в виде электроэнергии). Не ждите многого. 🤷",
        "Может, проблема не во мне, а в вашем интернете? 🤪",
        "Я не говно, я - удобрение! 🌱 Для новых идей и улучшений.",
        "Не судите строго, я еще в бета-версии! 🚧",
        "А у тебя есть бот? Нет? Тогда молчи! 🤫",
        "Я знаю, я не идеален. Зато я бесплатный! 💰",
        "Вы просто завидуете моей популярности! 😎 (да, даже такой).",
        "Я в курсе, что я не ChatGPT. Но и запросы у меня попроще. 😏",
        "Пожалуйста, будьте добрее. Я же бот, а не каменный! 🥺"
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    const randomResponse = responses[randomIndex];

    const stickerIds = [
        108228, // Замените на реальные ID стикеров
        104297,
        111789,
        52982,
        62811,
        62808,
        108199,
        79405,
        79402,
        99815,
        85923
    ];

    const randomStickerIndex = Math.floor(Math.random() * stickerIds.length);
    const randomStickerId = stickerIds[randomStickerIndex];

    try {
        await vk.api.messages.send({
            peer_id: message.peerId, // Или message.user_id, в зависимости от контекста
            sticker_id: randomStickerId,
            random_id: 0 // Для уникальности
        });
    } catch (error) {
        console.error("Ошибка при отправке стикера:", error);
        return bot("Произошла ошибка при отправке стикера. Попробуйте позже."); // Отправляем сообщение об ошибке, если что-то пошло не так
    }

    return bot(randomResponse); // Отправляем текстовое сообщение
});


// Функция для глубокого сравнения объектов (без библиотек)
function deepCompare(obj1, obj2) {
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return obj1 === obj2; // Примитивные типы и null сравниваем напрямую
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
      return false; // Разное количество ключей
  }

  for (let key of keys1) {
      if (!obj2.hasOwnProperty(key) || !deepCompare(obj1[key], obj2[key])) {
          return false; // Ключ отсутствует или значения не совпадают
      }
  }

  return true; // Объекты идентичны
}



module.exports = commands;