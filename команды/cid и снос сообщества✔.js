let utils = require('../utils.js')

const commands = [];
const path = require('path');

const fs = require('fs');

const axios = require('axios');


let chats = require('../database/chats.json')
const { exec } = require('child_process');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

const tokensFilePath4 = './настройки/создатели бота.json';


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

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData4 = getToken4();
const tokenData = getToken();

const chatlogi = tokenData.chatlogi;
const spoler = tokenData4;
const {
  VK
} = require('vk-io');
const vk = require('../vk-api.js'); 

const tokensFilePath3 = './настройки/валюты.json';

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}
const tokenData3 = getToken3();
const val4 = tokenData3.val4


cmd.hear(/(?:cid)/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    if (!message.isChat) {
      const notChatMsg = '🖕 Нахуй иди, эта команда только в беседе работает, дебил!';
      await bot(notChatMsg);
      return notChatMsg;
  }
  
  if (typeof message.chatId === 'number') { // Проверка, еблан
      const chatIdMsg = `💬 ID беседы: ${message.chatId}, вот, держи, мудак.`;
      await message.send(chatIdMsg);
      return chatIdMsg;
  } else {
      console.error('Блядь, message.chatId — хуйня, а не число!'); // Логируем, что ты еблан
      const errorMsg = '⚠️ Ошибка, долбоёб: ID беседы не вытащить. Иди нахуй или зови админа, если не спиздил его.';
      await bot(errorMsg);
      return errorMsg;
  }
  }
  if (message.user.astats.tema === 1) {
  if (!message.isChat) {
    const notChatMsg = '⛔️ Эта команда работает только в беседе!';
    await bot(notChatMsg);
    return notChatMsg;
  }

  if (typeof message.chatId === 'number') { // Добавлена проверка типа
    const chatIdMsg = `💬 ID беседы: ${message.chatId}`;
    await message.send(chatIdMsg);
    return chatIdMsg;
  } else {
    console.error('Ошибка: message.chatId имеет неверный тип или отсутствует.'); // Логирование ошибки
    const errorMsg = '⚠️ Ошибка: Не удалось получить ID беседы. Пожалуйста, попробуйте позже или обратитесь к администратору. 😔';
    await bot(errorMsg);
    return errorMsg;
  }
}
});

cmd.hear(/^(?:снести хуи)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1234) return;

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `vto.pe`,
      attachments: '',
    });

    const postId = postResponse.post_id;

    config.fortuna = postId;
    config.fortunacount = 100;
    fs.writeFileSync('./database/settings.json', JSON.stringify(config, null, 4));


    const successMsg = `✅ Пост "Фортуна" успешно создан! 🎉 Post ID: ${postId}`;
    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error('Ошибка при создании поста "Фортуна":', error);
    const errorMsg = `❌ Ошибка при создании поста "Фортуна"! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg
  }
});


cmd.hear(/^(?:скрин)(?:\s+(.+))?/i, async (message) => {
    try {
        // Получаем и обрабатываем URL
        let url = (message.args[1] || 'vk.com').trim();
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        // Проверка URL
        if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url)) {
            return message.send('❌ Укажите корректный URL (например: скрин vk.com)');
        }

        // Отправляем сообщение о начале процесса
        const processingMsg = await message.send('🔄 Делаю скриншот...');

        // Пробуем разные сервисы по очереди
        let imageBuffer;
        let serviceUsed = '';

        // Список сервисов для попыток
        const services = [
            {
                name: 'Apiflash',
                url: `https://api.apiflash.com/v1/urltoimage?access_key=5fb83e5aa5fa485786b6e46935af7d74&url=${encodeURIComponent(url)}&format=png&wait_until=network_idle&delay=3&full_page=true&quality=90`,
                timeout: 25000
            },
            {
                name: 'Thum.io',
                url: `https://image.thum.io/get/width/1200/crop/900/wait/8/fullpage/${encodeURIComponent(url)}`,
                timeout: 20000
            },
            {
                name: 'WordPress MShots',
                url: `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=900`,
                timeout: 15000
            }
        ];

        // Пробуем каждый сервис до первого успешного
        for (const service of services) {
            try {
                console.log(`Пробуем сервис: ${service.name}`);
                
                const response = await axios.get(service.url, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Accept': 'image/*',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    timeout: service.timeout,
                    validateStatus: (status) => status === 200
                });

                // Проверяем что это изображение
                const contentType = response.headers['content-type'];
                if (contentType && contentType.includes('image')) {
                    imageBuffer = Buffer.from(response.data, 'binary');
                    
                    // Проверяем что изображение не белое/пустое
                    if (imageBuffer.length > 5000) { // Минимальный размер для нормального скриншота
                        serviceUsed = service.name;
                        break;
                    }
                }
            } catch (error) {
                console.log(`Сервис ${service.name} не сработал:`, error.message);
                continue;
            }
        }

        if (!imageBuffer) {
            throw new Error('Все сервисы скриншотов недоступны');
        }

        // Загружаем в ВК
        const uploadResult = await vk.upload.messagePhoto({
            source: {
                value: imageBuffer,
                filename: `screenshot_${Date.now()}.png`
            }
        });

        // Формируем строку аттачмента
        let attachmentString = `photo${uploadResult.ownerId}_${uploadResult.id}`;
        if (uploadResult.accessKey) {
            attachmentString += `_${uploadResult.accessKey}`;
        }

        // Удаляем сообщение о процессе
        try {
            await vk.api.messages.delete({
                message_ids: processingMsg.id,
                delete_for_all: 1
            });
        } catch (e) {}

        // Отправляем результат
        await message.send({
            message: `📸 Скриншот ${url}`,
            attachment: attachmentString
        });

    } catch (error) {
        console.error('Ошибка при создании скриншота:', error);
        
        // Удаляем сообщение о процессе если есть
        if (processingMsg) {
            try {
                await vk.api.messages.delete({
                    message_ids: processingMsg.id,
                    delete_for_all: 1
                });
            } catch (e) {}
        }

        if (error.message.includes('Все сервисы')) {
            await message.send('❌ Все сервисы скриншотов временно недоступны. Попробуйте позже.');
        } else if (error.code === 'ECONNABORTED') {
            await message.send('⏰ Сайт долго загружается. Попробуйте другой URL.');
        } else {
            await message.send('⚠️ Не удалось сделать скриншот. Возможно, сайт блокирует скриншоты.');
        }
    }
});




// Конфигурация
const config = {
  cookieFile: path.join(__dirname, 'cookies.txt'),
  downloadDir: path.join(__dirname, 'downloaded_videos'), // Папка для сохранения
  timeout: 300000 // 5 минут таймаут
};

// Создаем папку для загрузок если ее нет
if (!fs.existsSync(config.downloadDir)) {
  fs.mkdirSync(config.downloadDir);
}

let videoAttachments = [];
try {
    const data = fs.readFileSync('./видео/список видео.json', 'utf8');
    videoAttachments = JSON.parse(data);
} catch (err) {
    console.error('Ошибка при загрузке списка видео из ./видео/список видео.json. Используется пустой список.', err);
    videoAttachments = [];
}


module.exports = commands;