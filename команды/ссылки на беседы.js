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

const salka = './настройки/ссылки чатов.json';


cmd.hear(/^🛠️ Дабл|дабл|беседы$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    try {
      if (!fs.existsSync(salka)) {
        console.error(`Файл ${salka} не найден!`);
        return bot(`🛠️ Ошибка: Файл настроек ссылок (${salka}) не найден. Обратитесь к администратору.`);
      }


      fs.readFile(salka, 'utf8', (err, data) => {
        if (err) {
          console.error("Ошибка при чтении файла:", err);
          return bot(`🛠️ Ошибка при чтении файла ${salka}. Обратитесь к администратору.`);
        }

        try {
          const links = JSON.parse(data);
          let responseText = '🛠️ Ссылки c ботом:\n';

          const isValidLink = (str) => str != null && str !== "";

          const {
            double: doubleLink,
            double2: double2Link,
            double3: double3Link,
            double4: double4Link,
            double5: double5Link,
            igra1: igra1Link,
            igra2: igra2Link,
            igra3: igra3Link,
          } = links;

          let hasLinks = false; // Флаг, чтобы отслеживать, есть ли хоть одна валидная ссылка

          if (isValidLink(doubleLink)) {
            responseText += `• Ссылка на DOUBLE: ${doubleLink}\n`;
            hasLinks = true;
          }
          if (isValidLink(double2Link)) {
            responseText += `• Ссылка на DOUBLE2: ${double2Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(double3Link)) {
            responseText += `• Ссылка на DOUBLE3: ${double3Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(double4Link)) {
            responseText += `• Ссылка на DOUBLE4: ${double4Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(double5Link)) {
            responseText += `• Ссылка на DOUBLE5: ${double5Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(igra1Link)) {
            responseText += `• Ссылка на игровую беседу 1: ${igra1Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(igra2Link)) {
            responseText += `• Ссылка на игровую беседу 2: ${igra2Link}\n`;
            hasLinks = true;
          }
          if (isValidLink(igra3Link)) {
            responseText += `• Ссылка на игровую беседу 3: ${igra3Link}\n`;
            hasLinks = true;
          }

          // Если нет ни одной валидной ссылки, отправляем другое сообщение
          if (!hasLinks) {
            responseText = "🛠️ Нет доступных ссылок.";
          }

          return bot(responseText);

        } catch (parseError) {
          console.error("Ошибка при парсинге JSON:", parseError);
          return bot(`🛠️ Ошибка при парсинге JSON в файле ${salka}. Убедитесь, что файл содержит корректный JSON.`);
        }
      });

    } catch (error) {
      console.error("Общая ошибка:", error);
      return bot(`🛠️ Непредвиденная ошибка. Обратитесь к администратору.`);
    }
  }
});


module.exports = commands;
