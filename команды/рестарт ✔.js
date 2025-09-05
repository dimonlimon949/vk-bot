let utils = require('../utils.js');
const { VK } = require('vk-io');
const commands = [];
const fs = require('fs');

let double = require('../database/users.json');

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
if (!tokenData) {
    console.error('Не удалось получить токены.');
    process.exit(1); // Завершаем программу, если токены не найдены
}

const vk = require('../vk-api.js');

cmd.hear(/^(?:рестарт|res|рес|лежать)$/i, async (message, bot) => {

      if (message.isChat) return bot(`только в лс работаю.`)

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

    // Заменяем bot("") на vk.api.messages.send
    let sendResult;
    try {
        sendResult = await vk.api.messages.send({
            peer_id: message.peerId,
            message: ".", // Или "\u200B"
            random_id: 0,
            return_conversation_message_id: true // Хотя это может и не влиять
        });
    } catch (sendError) {
        console.error("Ошибка при отправке начального сообщения:", sendError);
        return; // Прерываем выполнение, если не удалось отправить сообщение
    }

    console.log("sendResult:", sendResult);
    const messageId = sendResult; // Используем sendResult напрямую как message_id
    console.log("messageId:", messageId);

    const printProgress = (percent) => {
        const progressBarLength = 10;
        const filledLength = Math.floor(progressBarLength * percent / 100);
        const bar = '█ '.repeat(filledLength) + ' '.repeat(progressBarLength - filledLength);
        return `${bar} ${percent}%`;
    };

    for (let i = 0; i <= 100; i += 25) {
        try {
            await vk.api.messages.edit({
                peer_id: message.peerId,
                message: printProgress(i),
                message_id: messageId // Используем messageId
            });
        } catch (error) {
            console.error('Ошибка при редактировании сообщения:', error);
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    process.exit();
});

module.exports = commands;