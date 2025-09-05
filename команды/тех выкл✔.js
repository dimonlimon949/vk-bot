let utils = require('../utils.js')

const commands = [];


const fs = require('fs');

let double = require('../database/users.json')

let botinfo = require("../database/botinfo.json");

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

cmd.hear(/^(?:тех выкл)$/i, async (message, bot) => {
    const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131', // Версия API
    });

    if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
    }

    // Извлекаем group_id из первого элемента массива groups
    const groupId = groupInfo[0].id;

    const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

    if (!admins.items.find(x => x.id === message.senderId)) return;

    botinfo.wait = false;
    return bot(`Технические работы теперь завершены! ⚙️`);
});

module.exports = commands;
