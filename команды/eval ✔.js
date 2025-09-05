let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let users = require('../database/users.json') 
let chats = require('../database/chats.json')
let bossinfo = require('../database/bossinfo.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')
let val = require('../настройки/валюты.json')
let sal = require('../настройки/ссылки чатов.json')
let bog = require('../настройки/создатели бота.json')
 let help = "botinfo,val,sal,bog,"
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


const tokenData = getToken();

const chatlogi = tokenData.chatlogi;  
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 




cmd.hear(/^(?:eval|!eval|!)([^]+)$/i, async (message) => {
    // Проверка прав администратора
    const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;
    const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

    if (!admins.items.find(x => x.id === message.senderId)) {
        return message.reply('❌ Команда доступна только администраторам группы.');
    }

    const startTime = Date.now();

    // Улучшенная функция разбивки сообщений
    const splitMessage = (text, maxLength = 4000) => {
        const parts = [];
        let currentPos = 0;

        while (currentPos < text.length) {
            if (currentPos + maxLength >= text.length) {
                parts.push(text.substring(currentPos));
                break;
            }

            let endPos = currentPos + maxLength;
            let lastBreak = text.lastIndexOf('\n', endPos);
            
            if (lastBreak < currentPos) {
                lastBreak = text.lastIndexOf(' ', endPos);
            }

            if (lastBreak < currentPos) {
                lastBreak = endPos;
            }

            parts.push(text.substring(currentPos, lastBreak).trim());
            currentPos = lastBreak;

            while (text[currentPos] === '\n' || text[currentPos] === ' ') {
                currentPos++;
            }
        }

        return parts;
    };

    try {
        const inputCode = message.args.slice(1).join(' ').trim();
        if (!inputCode) throw new Error("Нет кода для выполнения.");

        // Выполняем код
        const result = eval(inputCode);
        const executionTime = Date.now() - startTime;

        // Обрабатываем результат
        let resultStr;
        try {
            // Для объектов используем красивое форматирование
            if (typeof result === 'object' && result !== null) {
                resultStr = JSON.stringify(result, null, 2);
            } else {
                resultStr = String(result);
            }
        } catch (e) {
            resultStr = String(result);
        }

        // Формируем единое сообщение с правильным форматированием
        let responseMessage = `📕 Тип: ${typeof result}\n🆚 Итог:\n${resultStr}\n\n✅ Код выполнен за ${executionTime} мс.`;

        // Проверяем общую длину сообщения
        if (responseMessage.length <= 4096) {
            // Если сообщение короткое - отправляем как есть
            await message.send(responseMessage);
        } else {
            // Если длинное - разбиваем на части
            const messageParts = splitMessage(responseMessage);
            for (let i = 0; i < messageParts.length; i++) {
                const partNumber = messageParts.length > 1 ? `[${i+1}/${messageParts.length}]\n` : '';
                await message.send(partNumber + messageParts[i]);
                
                if (i < messageParts.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }

    } catch (e) {
        const executionTime = Date.now() - startTime;
        console.error('Ошибка в eval:', e);

        // Формируем сообщение об ошибке
        let errorMessage = [
            `❌ Ошибка: ${e.message}`,
            `📌 Тип: ${e.name}`,
            ``,
            `🛠 Возможные проблемы:`,
            e.message.includes("is not defined") ? "- Необъявленная переменная/функция" : "",
            e.message.includes("Unexpected token") ? "- Синтаксическая ошибка" : "",
            e.message.includes("Cannot read property") ? "- Обращение к несуществующему свойству" : "",
            e.message.includes("Code №914") ? "- Сообщение слишком длинное" : "",
            ``,
            `⏱ Время выполнения: ${executionTime} мс.`
        ].filter(Boolean).join('\n');

        // Отправляем сообщение об ошибке
        if (errorMessage.length <= 4096) {
            await message.send(errorMessage);
        } else {
            const errorParts = splitMessage(errorMessage);
            for (let i = 0; i < errorParts.length; i++) {
                await message.send(errorParts[i]);
                if (i < errorParts.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    }
});

cmd.hear(/^(?:zz)\s(\d+)(?:\s(\w+)(?:\s([+\-/]?=)\s*(-?\d+(\.\d+)?|true|false|.+))?)?$/i, async (message, bot) => {
  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }


  const groupId = groupInfo[0].id;

  const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

   if (!admins.items.find(x => x.id === message.senderId)) return;
    const uid = parseInt(message.args[1], 10);
    const variableName = message.args[2];
    const operation = message.args[3];
    const value = message.args[4];
    const startTime = Date.now();

    const protectedVariables = ['uid', 'id']; 
    let foundUsers = users.filter(user => user.uid === uid);

    if (foundUsers.length === 0) {
      await message.send(`Пользователь с UID ${uid} не найден.`);
      return;
    }

    const user = foundUsers[0];

    const inputCode = message.args.slice(1).join(' ').trim();

    if (!variableName) {
      const userVariables = Object.keys(user)
        .map(key => {
          const value = user[key];
          let formattedValue;

          if (typeof value === 'string') {
            formattedValue = value; 
          } else if (typeof value === 'object' && value !== null) {
            formattedValue = JSON.stringify(value);
          } else {
            formattedValue = String(value); 
          }

          return `"${key}": *${formattedValue}*`;
        })
        .join('\n');
      await bot(`${userVariables}`);
      return;
    }



    if (!user.hasOwnProperty(variableName)) {
      await message.send(`Переменная "${variableName}" не найдена у пользователя.`);
      return;
    }

    let currentValue = user[variableName];
    const variableType = typeof currentValue;


    if (!operation) {
      let resultDisplay;
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      resultDisplay = variableType === 'number' ? utils.sp(currentValue.toString()) : currentValue.toString();

      await message.send(`📕 Тип: ${variableType}\n🆚 Результат: ${resultDisplay}\n\n✅ Код выполнен за ${executionTime} мс.`);
      return;
    }


    if (protectedVariables.includes(variableName)) {
      await message.send(`Переменную "${variableName}" нельзя изменять.`);
      return;
    }


    const sendResult = async (type, result, startTime) => {
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      await message.send(`📕 Тип: ${type}\n🆚 Результат: ${result}\n\n✅ Код выполнен за ${executionTime} мс.`);
    };

    if (variableType === 'number') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        await message.send(`Ошибка: Значение "${value}" не является числом, а переменная "${variableName}" должна быть числом.`);
        return;
      }


      let result;

      switch (operation) {
        case '+=':
          user[variableName] = currentValue + parsedValue;
          result = user[variableName];
          break;
        case '-=':
          user[variableName] = currentValue - parsedValue;
          result = user[variableName];
          break;
        case '=':
          user[variableName] = parsedValue;
          result = user[variableName];
          break;
        case '*=':
          user[variableName] = currentValue * parsedValue;
          result = user[variableName];
          break;
        case '/=':
          if (parsedValue !== 0) {
            user[variableName] = currentValue / parsedValue;
            result = user[variableName];
          } else {
            await message.send(`Ошибка: Деление на ноль невозможно.`);
            return;
          }
          break;
        default:
          await message.send(`Неизвестная операция: ${operation}`);
          return;
      }

      await sendResult('number', result, startTime);

    } else if (variableType === 'string') {
      if (operation === '=') {
        user[variableName] = value;
        await sendResult('string', `"${value}"`, startTime);
      } else {
        await message.send(`Операция "${operation}" не поддерживается для строк.`);
      }
    } else if (variableType === 'boolean') {

      if (operation === '=') {
        if (value === 'true') {
          user[variableName] = true;
          await sendResult('boolean', 'true', startTime);
        } else if (value === 'false') {
          user[variableName] = false;
          await sendResult('boolean', 'false', startTime);
        } else {
          await message.send(`Ошибка: Для булевой переменной допустимы только значения "true" или "false".`);
          return;
        }
      } else {
        await message.send(`Операция "${operation}" не поддерживается для булевых переменных.`);
      }
    }

});



module.exports = commands;
