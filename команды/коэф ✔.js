let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

let chats = require('../database/chats.json')

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

cmd.hear(/коэф\s*(\d+)?\s*(\d+)?/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 2) {
        const groupInfo = await vk.api.call('groups.getById', {
            access_token: tokenData.token,
            v: '5.131', // Версия API
        });

        if (!groupInfo || groupInfo.length === 0) {
            throw new Error('Не удалось получить информацию о группе.');
        }

        const groupId = groupInfo[0].id;
        const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

        if (!admins.items.find(x => x.id === message.senderId)) return;

        const chatId = message.args[1] ? Number(message.args[1]) : message.chatId;
        const chat = chats.find(x => x.id === chatId);

        if (!chat) {
            return vk.api.messages.send({
                message: `❌ Чат с ID ${chatId} не найден.`,
                peer_id: message.user.id,
                random_id: 0
            });
        }

        if (chat.type !== 2) {
            return vk.api.messages.send({
                message: '❌ Этот чат не является даблом. Пожалуйста, укажите корректный чат.',
                peer_id: message.user.id,
                random_id: 0
            });
        }

        // Проверка наличия результатов
        if (!chat.games || chat.games.length === 0 || !chat.games[0].result) {
            return vk.api.messages.send({
                message: '⚠️ В данном чате пока нет результатов игр.',
                peer_id: message.user.id,
                random_id: 0
            });
        }

        // Если коэффициент указан
        const coefficient = message.args[2] ? Number(message.args[2]) : null;
        const validCoefficients = [2, 3, 5, 50];

        if (coefficient) {
            if (!validCoefficients.includes(coefficient)) {
                return vk.api.messages.send({
                    message: `❌ Неверный коэффициент. Доступные коэффициенты: ${validCoefficients.join(', ')}.`,
                    peer_id: message.user.id,
                    random_id: 0
                });
            }

            // Здесь можно установить коэффициент в чате, если это необходимо
            chat.games[0].result = coefficient; // Пример установки коэффициента
            return vk.api.messages.send({
                message: `✅ Коэффициент установлен на ${coefficient}.`,
                peer_id: message.user.id,
                random_id: 0
            });
        }

        // Определяем attachment в зависимости от результата игры
        let attachment;
        switch (chat.games[0].result) {
            case 2: attachment = 'photo-171493284_457790008'; break;
            case 3: attachment = 'photo-171493284_457790009'; break;
            case 5: attachment = 'photo-171493284_457790010'; break;
            case 50: attachment = 'photo-171493284_457790007'; break;
        }

        // Отправка фото
        await vk.api.messages.send({
            attachment: attachment,
            peer_id: message.user.id,
            random_id: 0
        });
    }
});



module.exports = commands;
