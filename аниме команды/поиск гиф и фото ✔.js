let utils = require('../utils.js');
const axios = require('axios');
const commands = [];
const fs = require('fs');
let double = require('../database/users.json');
const cmd = {
    hear: (pattern, action) => {
         commands.push([pattern, action]);

    }
};


const tokensFilePath = './настройки/токены.json';

/**
 * Читает токен из файла.
 * @returns {object|null} Объект с токенами или null в случае ошибки.
 */
function getToken() {
    try {
        const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error('[getToken] Ошибка при чтении токенов:', error);
        return null;
    }
}

/**
 * Сохраняет токен и настройки в файл.
 * @param {string} token Токен VK API.
 * @param {boolean} spoler Флаг включения спойлеров.
 * @param {boolean} chatlogi Флаг включения логирования в чате.
 */
function saveTokens(token, spoler, chatlogi) {
    const tokens = {
        token: token,
        spoler: spoler,
        chatlogi: chatlogi
    };

    try {
        fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
        console.log('[saveTokens] Токены успешно сохранены в файл.');
    } catch (error) {
        console.error('[saveTokens] Ошибка при сохранении токенов:', error);
    }
}

const tokenData = getToken();
const chatlogi = tokenData ? tokenData.chatlogi : false;
const spoler = tokenData ? tokenData.spoler : false;

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js');

// Объекты с категориями для Waifu.pics (SFW)
const waifuPicsCategoryTranslations = {
    'shinobu': 'shinobu',
    'megumin': 'megumin',
    'bully': 'bully',
    'cuddle': 'cuddle',
    'cry': 'cry',
    'hug': 'hug',
    'awoo': 'awoo',
    'kiss': 'kiss',
    'lick': 'lick',
    'pat': 'pat',
    'smug': 'smug',
    'bonk': 'bonk',
    'yeet': 'yeet',
    'blush': 'blush',
    'smile': 'smile',
    'wave': 'wave',
    'highfive': 'highfive',
    'handhold': 'handhold',
    'nom': 'nom',
    'bite': 'bite',
    'glomp': 'glomp',
    'slap': 'slap',
    'kill': 'kill',
    'kick': 'kick',
    'happy': 'happy',
    'wink': 'wink',
    'poke': 'poke',
    'dance': 'dance',
    'cringe': 'cringe'
};


// Объекты с категориями для Waifu.pics (NSFW)
const waifuPicsNSFWCategoryTranslations = {
    'waifu': 'waifu',
    'neko': 'neko',
    'blowjob': 'blowjob'
};

axios.get('https://api.nekosia.cat/api/v1/tags')
    .then(res => console.log(res.data))
    .catch(err => console.error(err));


let nekosiaCategoryTranslations = {};
let nekosiaCategoriesLoaded = false;

async function fetchNekosiaCategories() {
    console.log('[fetchNekosiaCategories] Начало загрузки категорий Nekosia...');
    try {
        const response = await axios.get('https://api.nekosia.cat/api/v1/tags', {
            timeout: 5000,
            headers: {
                'User-Agent': 'YourBot/1.0',
                'Accept': 'application/json'
            }
        });
        console.log('[fetchNekosiaCategories] Ответ получен. Статус:', response.status);

        if (response.status === 200 && response.data && Array.isArray(response.data.tags)) {
            nekosiaCategoryTranslations = {};
            response.data.tags.forEach(tag => {
                nekosiaCategoryTranslations[tag] = tag;
            });
            nekosiaCategoriesLoaded = true;
            console.log(`[fetchNekosiaCategories] Загружено ${response.data.tags.length} категорий`);
        } else {
            throw new Error('Неверный формат ответа');
        }
    } catch (error) {
        console.error('[fetchNekosiaCategories] Ошибка:', error.message);
        // Моковые категории при ошибке
        const mockTags = ['catgirl', 'dog', 'bunny', 'fox'];
        nekosiaCategoryTranslations = {};
        mockTags.forEach(tag => (nekosiaCategoryTranslations[tag] = tag));
        nekosiaCategoriesLoaded = true;
        console.log('[fetchNekosiaCategories] Используются мок-данные:', mockTags);
    }
}

// запуск сразу
fetchNekosiaCategories().then(() => {
    console.log('Категории nekosia загружены:', Object.keys(nekosiaCategoryTranslations));
});


// Функция для получения списка доступных категорий из nekos.best
async function getNekosBestCategories() {
    try {
        const response = await axios.get('https://nekos.best/api/v2/endpoints');

        if (response.status === 200 && response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            return Object.keys(response.data); // Получаем массив названий категорий (ключей)
        } else {
            console.error('[getNekosBestCategories] Некорректный ответ API:', response.data);
            return null;
        }
    } catch (error) {
        console.error('[getNekosBestCategories] Ошибка при получении списка категорий:', error);
        return null;
    }
}
// Функция для получения случайной категории из Waifu.pics
function getRandomWaifuPicsCategory(isNSFW = false) {
    const categoryTranslations = isNSFW ? waifuPicsNSFWCategoryTranslations : waifuPicsCategoryTranslations;
    const availableCategories = Object.keys(categoryTranslations);
    return availableCategories[Math.floor(Math.random() * availableCategories.length)];
}

// Функция для получения случайной категории из Nekosai
function getRandomNekosaiCategory() {
    const availableCategories = Object.keys(nekosiaCategoryTranslations);
    return availableCategories[Math.floor(Math.random() * availableCategories.length)];
}

// Функция для обработки запросов к Nekosai
async function handleNekosaiImageRequest(message, bot, selectedCategory) {
    const userId = message.senderId;
    console.log(`[handleNekosaiImageRequest] Получен запрос на изображение из Nekosai от пользователя ${userId}. Категория: ${selectedCategory}`);

    try {
        const API_ENDPOINT = `https://api.nekosia.cat/api/v1/images/${nekosiaCategoryTranslations[selectedCategory]}`;

        console.log(`[handleNekosaiImageRequest] Отправляем запрос к API: ${API_ENDPOINT}`);
        const responseStartTime = performance.now();
        const response = await axios.get(API_ENDPOINT, {
            responseType: 'json',
            params: {
                count: 1,
            }
        });
        const responseEndTime = performance.now();
        console.log(`[handleNekosaiImageRequest] Ответ от API: Status ${response.status}, Время: ${((responseEndTime - responseStartTime) / 1000).toFixed(2)} сек.`);

        if (response.status !== 200 || !response.data.success || !response.data.image || !response.data.image.original) {
            throw new Error(`Ошибка при получении изображения. Status: ${response.status}, Success: ${response.data.success}`);
        }

        const imageUrl = response.data.image.original.url;
        const imageExtension = imageUrl.split('.').pop();

        console.log(`[handleNekosaiImageRequest] Загружаем изображение по URL: ${imageUrl}`);
        const imageDownloadStartTime = performance.now();
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: { //Важно: Добавляем Accept для получения Content-Type
                'Accept': 'image/*'
            }
        });
        const imageDownloadEndTime = performance.now();
        console.log(`[handleNekosaiImageRequest] Изображение загружено. Время: ${((imageDownloadEndTime - imageDownloadStartTime) / 1000).toFixed(2)} сек.`);

        if (imageResponse.status !== 200) {
            throw new Error(`Ошибка при загрузке изображения: ${imageResponse.status}`);
        }

        const contentType = imageResponse.headers['content-type'];
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        console.log(`URL изображения: ${imageUrl}`);

        console.log(`[handleNekosaiImageRequest] Загружаем изображение в VK.`);
        const uploadStartTime = performance.now();

        let uploadResult;
        if (contentType && contentType.startsWith('image/gif')) {
            uploadResult = await vk.upload.messageDocument({
                peer_id: message.peerId,
                source: {
                    value: imageBuffer,
                    filename: `девушка.gif`,
                }
            });
        } else {
            uploadResult = await vk.upload.messagePhoto({
                source: {
                    value: imageBuffer,
                    filename: `девушка.${imageExtension}`,
                }
            });
        }
        const uploadEndTime = performance.now();
        console.log(`[handleNekosaiImageRequest] Изображение загружено в VK. Время: ${((uploadEndTime - uploadStartTime) / 1000).toFixed(2)} сек, Результат:`, uploadResult);

        let attachmentString;
        if (contentType && contentType.startsWith('image/gif')) {
            attachmentString = `doc${uploadResult.ownerId}_${uploadResult.id}`;
            if (uploadResult.accessKey) {
                attachmentString += `_${uploadResult.accessKey}`;
            }
        } else {
            attachmentString = `photo${uploadResult.ownerId}_${uploadResult.id}`;
            if (uploadResult.accessKey) {
                attachmentString += `_${uploadResult.accessKey}`;
            }
        }

        console.log(`[handleNekosaiImageRequest] Отправляем изображение пользователю ${userId}.`);
        await message.send({
            attachment: attachmentString,
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({
                                command: `321`
                            }),
                            "label": `👀 Ещё аниме `
                        },
                        "color": "positive"
                    }],
                ]
            })

        });
    } catch (error) {
        console.error('[handleNekosaiImageRequest] Ошибка при получении изображения тян:', error);
        await bot({
            text: 'Произошла ошибка при получении изображения. Попробуйте позже.'
        });

    }
}


// Функция для обработки запросов к Waifu.pics
async function handleWaifuPicsImageRequest(message, bot, isNSFW = false) {
    const userId = message.senderId;
    // const category = message.args[1]; // больше не нужно
    let category = message.args[1]; // получить категорию, если она была передана.
    console.log(`[handleWaifuPicsImageRequest] Запрос от пользователя ${userId}. NSFW: ${isNSFW}, Категория: ${category}`);

    let categoryTranslations = isNSFW ? waifuPicsNSFWCategoryTranslations : waifuPicsCategoryTranslations;
    let api_part = isNSFW ? 'nsfw' : 'sfw';

    // Если категория не указана, выбираем случайную
    if (!category) {
        const availableCategories = Object.keys(categoryTranslations);
        category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        console.log(`[handleWaifuPicsImageRequest] Категория не указана, выбрана случайная категория: ${category}`);
    }

    try {
        if (!categoryTranslations[category]) {
            await bot({
                text: `Категория "${category}" не найдена.  Доступные категории: ${Object.keys(categoryTranslations).join(', ')}`
            });
            return;
        }

        const API_ENDPOINT = `https://api.waifu.pics/${api_part}/${categoryTranslations[category]}`;
        console.log(`[handleWaifuPicsImageRequest] Запрос к API: ${API_ENDPOINT}`);

        const response = await axios.get(API_ENDPOINT);
        console.log(`[handleWaifuPicsImageRequest] Ответ API: Status ${response.status}`);

        if (response.status === 200) {
            let imageUrl = response.data.files ? response.data.files[0] : response.data.url;
            console.log(`URL изображения: ${imageUrl}`); // Выводим URL в консоль

            const imageResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer',
                headers: { //Важно: Добавляем Accept для получения Content-Type
                    'Accept': 'image/*'
                }
            });
            const contentType = imageResponse.headers['content-type'];
            const imageBuffer = Buffer.from(imageResponse.data, 'binary');

            let uploadResult;

            if (contentType && contentType.startsWith('image/gif')) {
                uploadResult = await vk.upload.messageDocument({
                    peer_id: message.peerId,
                    source: {
                        value: imageBuffer,
                        filename: `waifu.gif`,
                    }
                });
            } else {
                const imageExtension = imageUrl.split('.').pop().toLowerCase();
                uploadResult = await vk.upload.messagePhoto({
                    source: {
                        value: imageBuffer,
                        filename: `waifu.${imageExtension}`,
                    }
                });
            }

            let attachmentString;
            if (contentType && contentType.startsWith('image/gif')) {
                attachmentString = `doc${uploadResult.ownerId}_${uploadResult.id}`;
                if (uploadResult.accessKey) {
                    attachmentString += `_${uploadResult.accessKey}`;
                }
            } else {
                attachmentString = `photo${uploadResult.ownerId}_${uploadResult.id}`;
                if (uploadResult.accessKey) {
                    attachmentString += `_${uploadResult.accessKey}`;
                }
            }


            console.log(`[handleWaifuPicsImageRequest] Отправляем изображение пользователю ${userId}`);
            await message.send({
                attachment: attachmentString,
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({
                                    command: isNSFW ? `123` : `321`
                                }),
                                "label": `👀 Ещё аниме`
                            },
                            "color": "positive"
                        }],

                    ]
                })
            });

        } else {
            await bot({
                text: `Ошибка API: ${response.status}`
            });
        }

    } catch (error) {
        console.error('[handleWaifuPicsImageRequest] Ошибка:', error);
        await bot({
            text: 'Произошла ошибка при получении изображения. Попробуйте позже.'
        });
    }
}

// Функция для обработки запросов к nekos.best
async function handleNekosBestImageRequest(message, bot, selectedCategory) {
    const userId = message.senderId;
    console.log(`[handleNekosBestImageRequest] Получен запрос на изображение из nekos.best от пользователя ${userId}. Категория: ${selectedCategory}`);

    try {

        const API_ENDPOINT = `https://nekos.best/api/v2/${selectedCategory}`;
        console.log(`[handleNekosBestImageRequest] Отправляем запрос к API: ${API_ENDPOINT}`);
        const response = await axios.get(API_ENDPOINT);

        if (response.status === 200 && response.data && response.data.results && response.data.results.length > 0) {
            const imageUrl = response.data.results[0].url;
            console.log(`URL изображения: ${imageUrl}`); // Выводим URL в консоль

            console.log(`[handleNekosBestImageRequest] Получен URL изображения: ${imageUrl}`);

            // Загружаем изображение
            const imageResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer',
                headers: { //Важно: Добавляем Accept для получения Content-Type
                    'Accept': 'image/*'
                }
            });

            if (imageResponse.status !== 200) {
                throw new Error(`Ошибка при загрузке изображения: ${imageResponse.status}`);
            }

            const imageBuffer = Buffer.from(imageResponse.data, 'binary');
            const contentType = imageResponse.headers['content-type'];

            let uploadResult;

            if (contentType && contentType.startsWith('image/gif')) {
                uploadResult = await vk.upload.messageDocument({
                    peer_id: message.peerId,
                    source: {
                        value: imageBuffer,
                        filename: `девушка.gif`,
                    }
                });
            } else {
                const imageExtension = imageUrl.split('.').pop().toLowerCase();
                uploadResult = await vk.upload.messagePhoto({
                    source: {
                        value: imageBuffer,
                        filename: `waifu.${imageExtension}`,
                    }
                });
            }

            let attachmentString;
            if (contentType && contentType.startsWith('image/gif')) {
                attachmentString = `doc${uploadResult.ownerId}_${uploadResult.id}`;
                if (uploadResult.accessKey) {
                    attachmentString += `_${uploadResult.accessKey}`;
                }
            } else {
                attachmentString = `photo${uploadResult.ownerId}_${uploadResult.id}`;
                if (uploadResult.accessKey) {
                    attachmentString += `_${uploadResult.accessKey}`;
                }
            }

            console.log(`[handleNekosBestImageRequest] Отправляем изображение пользователю ${userId}.`);
            await message.send({
                attachment: attachmentString,
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({
                                    command: `321`
                                }),
                                "label": `👀 Хочу еще Аниме `
                            },
                            "color": "positive"
                        }],
                    ]
                })
            });
        } else {
            console.error('[handleNekosBestImageRequest] Некорректный ответ API:', response.data);
            await bot({
                text: 'Не удалось получить изображение с nekos.best.'
            });
        }
    } catch (error) {
        console.error('[handleNekosBestImageRequest] Ошибка при получении изображения:', error);
        await bot({
            text: 'Произошла ошибка при получении изображения. Попробуйте позже.'
        });
    }
}

cmd.hear(/^(?:123)\s?/i, async (message, bot) => {
    if (!message.user.settings.topdon) return bot(`еще слишком мало ты.`)

    handleWaifuPicsImageRequest(message, bot, true);
});


cmd.hear(/^(?:321)\s?/i, async (message, bot) => {
    let args = message.args[1]?.split(' ') || [];
    let selectedService = args[0];
    let category = args.slice(1).join(' ');


    let selectedServiceFinal;
    let chosenCategoryFinal;

    const services = ['waifu', 'nekosai', 'nekosbest'];

    if (!services.includes(selectedService)) {
        // Если сервис не указан или указан неверно, выбираем случайный
        const service = Math.random();
        if (service < 0.33) {
            selectedServiceFinal = 'waifu';
            chosenCategoryFinal = getRandomWaifuPicsCategory();
        } else if (service < 0.66) {
            selectedServiceFinal = 'nekosai';
            chosenCategoryFinal = getRandomNekosaiCategory();
        } else {
            selectedServiceFinal = 'nekosbest';
            const nekosBestCategories = await getNekosBestCategories();
            if (nekosBestCategories && nekosBestCategories.length > 0) {
                chosenCategoryFinal = nekosBestCategories[Math.floor(Math.random() * nekosBestCategories.length)];
            } else {
               console.error('Не удалось получить категории Nekos.best.');
                return await bot({
                    text: 'Не удалось получить категории Nekos.best.'
                });

            }
        }

    } else {
        selectedServiceFinal = selectedService;
        chosenCategoryFinal = category;
    }


    if (selectedServiceFinal === 'waifu') {
        if (!chosenCategoryFinal) {
            chosenCategoryFinal = getRandomWaifuPicsCategory();
        }
        if (!waifuPicsCategoryTranslations[chosenCategoryFinal]) {
              await bot({
                text: `Категория "${category}" не найдена.  Доступные категории: ${Object.keys(waifuPicsCategoryTranslations).join(', ')}`
            });
            return;

        }
        message.args = ['waifu', chosenCategoryFinal];
        await handleWaifuPicsImageRequest(message, bot);
    } else if (selectedServiceFinal === 'nekosai') {
        if (!chosenCategoryFinal) {
            chosenCategoryFinal = getRandomNekosaiCategory();
        }
        if (!nekosiaCategoryTranslations[chosenCategoryFinal]) {
           return await bot({
                text: `Категория "${category}" не найдена.  Доступные категории: ${Object.keys(nekosiaCategoryTranslations).join(', ')}`
            });

        }
        message.args = ['nekosai', chosenCategoryFinal];
        await handleNekosaiImageRequest(message, bot, chosenCategoryFinal);
    } else if (selectedServiceFinal === 'nekosbest') {
        const nekosBestCategories = await getNekosBestCategories();
        if (!chosenCategoryFinal) {
            if (nekosBestCategories && nekosBestCategories.length > 0) {
                chosenCategoryFinal = nekosBestCategories[Math.floor(Math.random() * nekosBestCategories.length)];
            } else {
                console.error('Не удалось получить категории Nekos.best.');
                 return await bot({
                    text: 'Не удалось получить категории Nekos.best.'
                });

            }
        } else {
            if (nekosBestCategories && !nekosBestCategories.includes(chosenCategoryFinal)) {
               return await bot({
                text: `Категория "${category}" не найдена.  Доступные категории: ${nekosBestCategories.join(', ')}`
            });

            }
        }

        message.args = ['nekosbest', chosenCategoryFinal];
        await handleNekosBestImageRequest(message, bot, chosenCategoryFinal);
    }


});



module.exports = commands;