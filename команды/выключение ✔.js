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
let shutdownTimer;
const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 



cmd.hear(/^(?:выключить|выкл|off)\s(\d+)$/i, async (message) => {
    
    const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;
    const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

    if (!admins.items.some(admin => admin.id === message.senderId)) {
        return
    }

    const totalSeconds = parseInt(message.args[1], 10);

    if (totalSeconds > 2147483647 / 1000) {
        return message.send('Ошибка: Значение таймаута слишком велико.');
    }

    if (shutdownTimer) clearTimeout(shutdownTimer);
    shutdownTimestamp = Date.now() + totalSeconds * 1000;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeStr = [
        hours > 0 ? `${hours} ч.${hours === 1 ? '' : ''}` : '',
        minutes > 0 ? `${minutes} м.${minutes === 1 ? '' : ''}` : '',
        seconds > 0 ? `${seconds} с.${seconds === 1 ? '' : ''}` : ''
    ].filter(Boolean).join(' ');

    await message.send(`Я выключусь через ${timeStr}.`);

    shutdownTimer = setTimeout(() => {
        message.send('Бот успешно выключен.').then(() => {
            process.exit(0);
        });
    }, totalSeconds * 1000);
});


cmd.hear(/^(?:скок)$/i, async (message) => {
    if (!shutdownTimestamp) return message.send('Таймер выключения не установлен.');

    const remainingTime = shutdownTimestamp - Date.now();
    if (remainingTime <= 60000) {
        return message.send('Осталось меньше минуты, бот скоро выключится.');
    }

    const years = Math.floor(remainingTime / (365.25 * 24 * 3600 * 1000)); 
    const days = Math.floor((remainingTime % (365.25 * 24 * 3600 * 1000)) / (24 * 3600 * 1000));
    const hours = Math.floor((remainingTime % (24 * 3600 * 1000)) / (3600 * 1000));
    const minutes = Math.floor((remainingTime % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const timeStr = [
        years > 0 ? `${years} г${years === 1 ? '' : ''}` : '',
        days > 0 ? `${days} д${days === 1 ? '' : ''}` : '',
        hours > 0 ? `${hours} ч${hours === 1 ? '' : ''}` : '',
        minutes > 0 ? `${minutes} м${minutes === 1 ? '' : ''}` : '',
        seconds > 0 ? `${seconds} с${seconds === 1 ? '' : ''}` : ''
    ].filter(Boolean).join('. ');

    return message.send(`До выключения осталось: ${timeStr}.`);
});


cmd.hear(/^(?:отменить выключение|отмена выкл|отмена)$/i, async (message) => {
    const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;
    const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

    if (!admins.items.some(admin => admin.id === message.senderId)) {
        return
    }

    if (shutdownTimer) {
        clearTimeout(shutdownTimer);
        shutdownTimer = null;
        shutdownTimestamp = null;
        await message.send('Выключение бота отменено.');
    } else {
        await message.send('.');
    }
});

module.exports = commands;
