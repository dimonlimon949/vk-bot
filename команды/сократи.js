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
        return tokens; 
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

cmd.hear(/^(?:сократи|сс|cc|сократить)\s?([^]+)?/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let text = message.args[1];
        if (!text) return message.send(`Введите: "Сократи [Ссылка]"`);

        try {
            const res = await vk.api.call("utils.getShortLink", { url: text });
            if (!res || !res.short_url) {
                return bot(`Ошибка при сокращении ссылки. Проверьте корректность URL.`);
            }
            return bot(`Сокращённая ссылка: ${res.short_url}`);
        } catch (error) {
            console.error("");
        }
    }
});




module.exports = commands;
