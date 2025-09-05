const fs = require('fs');
const { upload } = require('vk-io');  // Убедитесь, что установлен vk-io
const { API } = require('vk-io');  // Убедитесь, что установлен vk-io

const commands = [];

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

// Получаем данные токенов
const tokenData = getToken();

// Проверяем, что tokenData не null, прежде чем пытаться получить доступ к его свойствам
let chatlogi = null;
let spoler = null;
let token = null;

if (tokenData) {
    chatlogi = tokenData.chatlogi; // чат для логов
    spoler = tokenData.spoler;
    token = tokenData.token; // Получаем токен
} else {
    console.warn('Не удалось получить данные токенов. Некоторые команды могут не работать.');
}

cmd.hear(/^(?:стикер|sticker)$/i, async (message) => {
    if (message.forwards[0]) {
        let a = message.forwards[0].attachments[0];
        message.send(`🆔 ID Стикера: ${a.id}`, { reply_to: message.id });
    }
    if (message.replyMessage) {
        let a = message.replyMessage.attachments[0];
        message.send(`🆔 ID Стикера: ${a.id}`, { reply_to: message.id });
    }
});

const CANVAS_IMAGE_URL = 'https://vk.com/photo690927947_457245627';

cmd.hear(/^(?:канвас)$/i, async (message) => {
    try {
        // Проверяем, что токен доступен
        if (!token) {
            console.error('Токен не найден.  Невозможно выполнить команду канвас.');
            return message.send('Произошла ошибка: Токен не найден.');
        }
		
        // 1. Загружаем изображение на сервер VK
        const uploadResult = await upload.messagePhoto({
            source: {
                value: CANVAS_IMAGE_URL
            },
            peer_id: message.peerId, // ID пользователя или чата, куда отправлять фото (исправлено)
            v: '5.131', // Укажите актуальную версию API VK
            access_token: '' // Используем полученный токен
        });

        // 2. Отправляем фотографию пользователю
        await message.send({  // Исправлено: используем message вместо context
            attachment: uploadResult.attachment,
            message: 'Вот ваш канвас!' // Необязательное сообщение
        });

        console.log('Фотография канваса успешно отправлена.');

    } catch (error) {
        console.error('Ошибка при отправке фотографии:', error);
        await message.send('Произошла ошибка при отправке фотографии. Пожалуйста, попробуйте позже.');
    }
});

module.exports = commands;