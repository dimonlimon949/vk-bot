const commands = [];
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js');

// Конфигурация Cloudflare AI
const AI_CONFIG = {
    ACCOUNT_ID: '8d4f01716f0126f43447b62df1ed5104',
    API_TOKEN: 'yfGoOqaszPvsn518likFh7H7FEzzXr_asvUy1mGP',
    MODEL: '@cf/openai/gpt-oss-120b',
    IMAGE_MODEL: '@cf/black-forest-labs/flux-1-schnell'
};

// Хранилище истории диалогов
const chatHistory = new Map();

// Очистка форматирования
function cleanResponse(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/<!--.*?-->/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .trim();
}

// Генерация ссылок для вложений
function generateAttachmentLinks(attachments) {
    return attachments.map(attach => {
        if (attach.type === 'photo') {
            // Выбираем максимальное доступное качество
            const photo = attach.sizes.find(size => size.type === 'z') || 
                         attach.sizes.find(size => size.type === 'y') ||
                         attach.sizes[attach.sizes.length - 1];
            return photo.url;
        }
        return `https://vk.com/${attach.type}${attach.ownerId}_${attach.id}`;
    }).filter(url => url); // Фильтруем пустые URL
}

// Построение промпта с историей и вложениями
function buildPrompt(userId, question, attachments = []) {
    const history = chatHistory.get(userId) || [];
    let prompt = "Ты — русскоязычный AI-ассистент. Правила:\n" +
                "1. Отвечай кратко (1-3 предложения)\n" +
                "2. Сохраняй дружелюбный тон\n" +
                "3. Учитывай ссылки на изображения в формате [IMG:URL]\n" +
                "4. Если вопрос непонятен — уточни\n\n";
    
    // Добавляем историю
    if (history.length > 0) {
        prompt += "Контекст диалога:\n";
        history.slice(-4).forEach(msg => {
            prompt += `${msg.role === 'user' ? '👤' : '🤖'}: ${msg.content}\n`;
        });
    }
    
    prompt += `\n👤: ${question}`;
    
    // Добавляем ссылки на вложения
    const attachmentLinks = generateAttachmentLinks(attachments);
    if (attachmentLinks.length > 0) {
        prompt += `\n[Прикреплённые файлы:\n${attachmentLinks.map(url => `[IMG:${url}]`).join('\n')}]`;
    }
    
    prompt += `\n🤖:`;
    return prompt;
}

async function queryCloudflareAI(userId, question, attachments = []) {
    try {
        const input = buildPrompt(userId, question, attachments);
        
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${AI_CONFIG.ACCOUNT_ID}/ai/run/${AI_CONFIG.MODEL}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AI_CONFIG.API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: input,
                    max_tokens: 1024
                })
            }
        );

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.errors?.map(e => e.message).join(', ') || "API Error");
        }

        const rawResponse = data.result?.output?.find(item => 
            item.type === 'message' && 
            item.role === 'assistant'
        )?.content?.[0]?.text;

        let cleanAnswer = cleanResponse(rawResponse || "Не получилось сформировать ответ");

        // Обновляем историю
        const history = chatHistory.get(userId) || [];
        history.push({ 
            role: 'user', 
            content: question,
            attachments: attachments 
        });
        history.push({ 
            role: 'assistant', 
            content: cleanAnswer 
        });
        chatHistory.set(userId, history.slice(-5));

        return cleanAnswer;

    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}

// Команда "нейро" с поддержкой вложений
cmd.hear(/^нейро\s+(.+)/i, async (message, bot) => {
    try {
        const userId = message.senderId;
        const question = message.args[1]?.trim();
        
        if (!question || question.length > 500) {
            return bot("❌ Вопрос должен быть от 1 до 500 символов");
        }

        if (/(18\+|насил|нарко|криминал)/i.test(question)) {
            return bot("🚫 Я не могу обсуждать эту тему");
        }

        // Получаем и фильтруем вложения (только фото)
        const attachments = (message.attachments || [])
            .filter(attach => attach.type === 'photo');
        
        const aiResponse = await queryCloudflareAI(userId, question, attachments);
        
        // Добавляем ссылки на изображения в ответ
        let finalResponse = aiResponse;
        if (attachments.length > 0) {
            const photoLinks = generateAttachmentLinks(attachments);
            finalResponse += `\n\n🔗 Ссылки на изображения:\n${photoLinks.join('\n')}`;
        }
        
        bot(finalResponse);

    } catch (error) {
        console.error('Command Error:', error);
        bot("💥 Техническая ошибка. Попробуйте позже");
    }
});

// Очистка истории
cmd.hear(/^очистить историю$/i, (message, bot) => {
    chatHistory.delete(message.senderId);
    bot("🗑️ История диалога очищена");
});

const axios = require('axios');

const fs = require('fs');








cmd.hear(/^нарисуй\s+(.+)/i, async (message, bot) => {
    const userId = message.senderId;
    const prompt = message.args[1].trim();
    console.log(`[Нейрорисунок] Запрос от ${userId}: ${prompt}`);

    try {
        // 1. Запрос к Cloudflare AI
        const cfResponse = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${AI_CONFIG.ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
            {
                prompt: prompt,
                steps: 6,
                seed: Math.floor(Math.random() * 1000)
            },
            {
                headers: {
                    'Authorization': `Bearer ${AI_CONFIG.API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 2. Получение изображения
        const imageBuffer = Buffer.from(cfResponse.data.result.image, 'base64');

        // 3. Загрузка в VK
        let uploadResult;
        try {
            uploadResult = await vk.upload.messagePhoto({
                source: {
                    value: imageBuffer,
                    filename: 'image.jpg'
                }
            });
        } catch (error) {
            console.error('Ошибка загрузки фото, пробуем как документ:', error);
            uploadResult = await vk.upload.messageDocument({
                peer_id: message.peerId,
                source: {
                    value: imageBuffer,
                    filename: 'image.jpg'
                }
            });
        }

        // 4. Формирование attachment
        const attachment = uploadResult.type === 'photo' 
            ? `photo${uploadResult.ownerId}_${uploadResult.id}` 
            : `doc${uploadResult.ownerId}_${uploadResult.id}`;

        // 5. Отправка сообщения (как в вашем примере)
        await message.send({
            attachment: attachment,
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({
                                command: `нарисуй ${prompt}`
                            }),
                            "label": `🔄 Сгенерировать снова`
                        },
                        "color": "positive"
                    }]
                ]
            })
        });

    } catch (error) {
        console.error('[Нейрорисунок] Ошибка:', error);
        await message.send({
            message: '💥 Ошибка генерации. Попробуйте другой запрос'
        });
    }
});






module.exports = commands;