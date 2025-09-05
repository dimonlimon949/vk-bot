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



cmd.hear(/^ид(\s+([^]+)?)?$/i, async (message, bot) => {
    let user;
    let vkId; // Для хранения VK ID, полученного из ссылки
    const args = message.text.split(/\s+/).slice(1);

    // 1. Обработка аргумента (ссылка или число)
    if (args[0]) {
        const arg = args[0];

        if (!isNaN(Number(arg))) {
            // 1.1. Если аргумент - число, считаем его VK ID
            vkId = Number(arg);
        } else {
            // 1.2. Если аргумент - ссылка, извлекаем VK ID
            if (!arg.match(/\|/i)) { // Проверка на наличие символа "|" (используется для других целей)
                const screenName = arg.replace(
                    /((http|https):\/\/(vk.com|m.vk.com)\/|(vk.com)\/)/gi,
                    ""
                );

                try {
                    const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
                    if (resolveResponse && resolveResponse.type === 'user') {
                        vkId = resolveResponse.object_id;
                    } else {
                        return bot("Не удалось определить ID пользователя по ссылке.");
                    }
                } catch (error) {
                    console.error("Ошибка при resolveScreenName:", error);
                    return bot("Ошибка при обработке ссылки. Проверьте, что ссылка верная.");
                }
            } else {
                // 1.3. Если аргумент содержит "|", извлекаем VK ID (предполагается определенный формат строки)
                const extractedId = arg.replace(/((\|[^]*)|(\[id))/gi, "");
                vkId = Number(extractedId);
            }
        }

        // 2. После получения VK ID, ищем пользователя в double по соответствию VK ID и user.id
        user = double.find(x => x.id === vkId);

        // 3. Если пользователь найден, возвращаем его uid
        if (user) {
             if (user.astats && user.astats.fakeid) {
                 return message.reply(`💤ID: ${user.astats.fakeid}`);
              } else {
                  return message.reply(`💤ID: ${user.uid}`);
              }
        } else {
            return bot(`💤ID: ${message.user.uid}`);
        }
    }
    // 4. Если нет аргументов (пересылка/ответ)
    else if (message.hasForwards || message.replyMessage) {
        const senderId = message.hasForwards ? message.forwards[0].senderId : message.replyMessage.senderId;
        // 4.1. Ищем по senderId, считая его VK ID (user.id)
        user = double.find(x => x.id === senderId);

        if (user) {
            if (user.astats && user.astats.fakeid) {
                return message.reply(`💤ID: ${user.astats.fakeid}`);
              } else {
                  return message.reply(`💤ID: ${user.uid}`);
              }
        } else {
            return bot("Не удалось найти игрока по ID отправителя сообщения.");
        }
    }
    // 5. Если нет аргументов и нет пересылки/ответа
    else {
        return bot(`💤ID: ${message.user.uid}`);
    }
});




module.exports = commands;
