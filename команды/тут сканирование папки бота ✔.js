  let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')
let chats = require('../database/chats.json')
let log = require('../database/log.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const forbiddenTitles = [
  "Бизнесмен", 
  "🔥Support🔥",
  "Администратор", 
  "Удалённый титул"









];

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let presidents = require("../database/presidents.json");


let yachts = require('../spisok/яхты.js')
let airplanes = require('../spisok/самолеты.js')
let helicopters = require('../spisok/вертолеты.js')
let apartments = require('../spisok/апартаменты.js')
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
let farms = require('../spisok/фермы.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')

let businesses2 = require("../spisok/бизнесы.js")
const phones = require("../spisok/телефоны.js")

let businesses = require("../spisok/business spisok.js")

const tokenData = getToken();

const tokensFilePath4 = './настройки/создатели бота.json';

const tokensFilePath2 = './настройки/ид бесед.json';

const tokensFilePath3 = './настройки/валюты.json';

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2(); 
const tokenData3 = getToken3(); 
const tokenData4 = getToken4(); 

const tokensFilePath5 = './настройки/ссылки чатов.json';

function getToken5() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath5, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData5 = getToken5(); 


let adminka = tokenData5.admin

const coaf = tokenData2.coaf
let val1 = tokenData3.val1 
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4


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

const chatlogi = tokenData2.chatlogi;
const spoler = tokenData4;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 
const path = require('path');





cmd.hear(/^(?:код)$/i, async (message, bot) => {

  const hasPermission = Object.values(spoler).includes(String(message.user.id));
  if (!hasPermission) return;

  const directoryPath = '../farewer';
  let totalLines = 0;
  let commands = [];

  const countLinesInFiles = (dir) => {
      let currentTotalLines = 0;

      const scanDirectory = (currentDir) => {
          fs.readdirSync(currentDir).forEach(file => {
              const filePath = path.join(currentDir, file);
              const stat = fs.statSync(filePath);

              if (stat.isDirectory()) {
                  scanDirectory(filePath);
              } else if (file.endsWith('.js') || file.endsWith('.json')) {
                  const data = fs.readFileSync(filePath, 'utf-8');
                  const lines = data.split('\n').length;
                  currentTotalLines += lines;

                  const regex = /cmd\.hear\(([^)]+)\)/g;
                  let match;
                  while ((match = regex.exec(data)) !== null) {
                      commands.push({
                          command: match[0],
                          file: filePath
                      });
                  }
              }
          });
      };

      scanDirectory(dir);
      return currentTotalLines;
  };

  try {
      totalLines = countLinesInFiles(directoryPath);

      // Формируем окончательный вывод (отправляем новым сообщением)
      const commandCount = commands.length;
      const response = `Общее количество строк в коде: ${utils.sp(totalLines)}\nКоличество команд: ${utils.sp(commandCount)}`;
      await bot(response);
  } catch (error) {
      console.error('Ошибка при сканировании директории:', error);
      await bot('Произошла ошибка при выполнении команды.');
  }
});

cmd.hear(/^(?:покажи команды)$/i, async (message, bot) => {

  const hasPermission = Object.values(spoler).includes(String(message.user.id));
  if (!hasPermission) return bot(`f`)

  const directoryPath = './команды';
  let commands = [];

  const scanDirectory = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        scanDirectory(filePath); // Рекурсивно сканируем поддиректории
      } else if (file.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const regex = /cmd\.hear\(([^)]+)\)/g; // Регулярное выражение для поиска cmd.hear
        let match;
        while ((match = regex.exec(content)) !== null) {
          commands.push({
            command: match[0],
            file: filePath
          });
        }

        // Дополнительный поиск команд с ссылками на другие файлы
        const linkRegex = /(?:копать плазму|⛏ Копать плазму) \(файл: ([^)]+)\)/g;
        while ((match = linkRegex.exec(content)) !== null) {
          commands.push({
            command: match[0],
            file: filePath
          });
        }
      }
    });
  };

  try {
    scanDirectory(directoryPath);

    if (commands.length === 0) {
      await bot('Команды не найдены.');
    } else {
      const chunkSize = 20; // Определите размер порции (сколько команд отправлять за раз)
      for (let i = 0; i < commands.length; i += chunkSize) {
        const chunk = commands.slice(i, i + chunkSize); // Получаем часть команд
        const response = chunk.map((cmd, index) => `${i + index + 1}. ${cmd.command}`).join('\n');
        await bot(response); // Отправляем порцию команд
      }
    }
  } catch (error) {
    console.error('Ошибка при сканировании директории:', error);
     try {
         await bot('Произошла ошибка при выполнении команды.'); // Отправляем сообщение об ошибке, если она возникла
      } catch (sendError) {
         console.error("Ошибка при отправке сообщения об ошибке:", sendError);
      }

  }
});
module.exports = commands;
