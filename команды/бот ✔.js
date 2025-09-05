let utils = require('../utils.js')
const { VK } = require('vk-io');
let double = require('../database/users.json')
const fs = require('fs');
const path = require('path');
const tokensFilePath = './настройки/токены.json';


const vk = require('../vk-api.js');
const commands = []

function getToken() {
    try {
      const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
      return tokens; // Возвращаем все данные из файла
    } catch (error) {
      console.error('Ошибка при чтении токенов:', error);
      return null; // Возвращаем null в случае ошибки
    }
  }

const tokenData = getToken();


const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

cmd.hear(/^(?:консоль|console|термукс|termux|cmd|command)\s+(.+)$/i, async (message, bot) => {
    const command = message.text.split(' ').slice(1).join(' ').trim();
    
    if (!command) {
        return message.send('ℹ️ Использование: консоль [команда]\nНапример: консоль dir');
    }

    // Расширенный список опасных команд для разных ОС
    const dangerousCommands = [
        // Unix/Linux/Termux опасные команды
        'rm -rf', 'sudo', 'chmod', 'dd', 'mkfs', 'fdisk', 
        ':(){:|:&};:', 'mkfs', 'mv /', '> /dev/sda', 
        'chmod -R 777 /', 'wget', 'curl | sh',
        
        // Windows опасные команды
        'format', 'del /f /s /q', 'rd /s /q', 
        'shutdown', 'taskkill /f /im', 'reg delete',
        
        // Общие опасности
        'passwd', 'adduser', 'useradd', 'net user',
        '> /etc/', '| bash', '| sh'
    ];

    if (dangerousCommands.some(cmd => command.toLowerCase().includes(cmd.toLowerCase()))) {
        return message.send('❌ Выполнение опасной команды запрещено!');
    }

    // Проверка на слишком длинные команды
    if (command.length > 500) {
        return message.send('❌ Слишком длинная команда! Максимум 500 символов.');
    }

    try {
        const { exec } = require('child_process');
        
        // Определяем оболочку в зависимости от ОС
        const shell = process.platform === 'win32' ? 'cmd.exe' : '/bin/bash';
        const shellOption = process.platform === 'win32' ? '/c' : '-c';
        
        exec(command, { 
            timeout: 15000,
            shell: shell,
            maxBuffer: 1024 * 1024 * 5 // 5MB буфер
        }, async (error, stdout, stderr) => {
            // Основное сообщение с информацией о команде
            let mainResponse = `🔧 Команда: ${command}\n`;
            mainResponse += `💻 ОС: ${process.platform}\n\n`;
            
            if (error) {
                mainResponse += `❌ Код ошибки: ${error.code || 'N/A'}\n`;
                if (error.signal) {
                    mainResponse += `📶 Сигнал: ${error.signal}\n`;
                }
            }
            
            // Отправляем основное сообщение
            await message.send(mainResponse);

            // Функция для отправки длинного текста частями
            const sendLongText = async (text, prefix = '', type = 'output') => {
                if (!text || text.trim().length === 0) return;
                
                const maxLength = 4096 - prefix.length - 50;
                const chunks = [];
                
                // Разбиваем текст на части
                for (let i = 0; i < text.length; i += maxLength) {
                    let chunk = text.substring(i, i + maxLength);
                    
                    // Обрезаем слишком длинные строки для лучшего форматирования
                    if (type === 'output') {
                        chunk = chunk.split('\n').map(line => {
                            if (line.length > 200) {
                                return line.substring(0, 197) + '...';
                            }
                            return line;
                        }).join('\n');
                    }
                    
                    chunks.push(chunk);
                }
                
                // Отправляем каждую часть
                for (let i = 0; i < chunks.length; i++) {
                    let chunkMessage = prefix;
                    if (chunks.length > 1) {
                        chunkMessage += `[${i + 1}/${chunks.length}]\n`;
                    }
                    chunkMessage += '```\n' + chunks[i] + '\n```';
                    
                    try {
                        await message.send(chunkMessage);
                        // Задержка между сообщениями
                        await new Promise(resolve => setTimeout(resolve, 500));
                    } catch (sendError) {
                        console.error('Ошибка отправки сообщения:', sendError);
                    }
                }
            };

            // Обрабатываем вывод
            const output = stdout || '';
            const errors = stderr || '';
            
            // Если есть обычный вывод
            if (output.trim()) {
                await sendLongText(output, '📤 Вывод:\n', 'output');
            }

            // Если есть ошибки
            if (errors.trim()) {
                await sendLongText(errors, '📥 Ошибки:\n', 'error');
            }

            // Если команда выполнилась без вывода
            if (!output.trim() && !errors.trim()) {
                if (error) {
                    await message.send('❌ Команда завершилась с ошибкой, но без дополнительного вывода.');
                } else {
                    await message.send('✅ Команда выполнена успешно, но не вернула вывод.');
                }
            }

            // Добавляем информацию о времени выполнения
            if (error) {
                await message.send(`⏰ Команда была прервана или завершилась с ошибкой.`);
            } else {
                await message.send(`⏱️ Команда выполнена успешно.`);
            }

        });

    } catch (error) {
        await message.send(`❌ Критическая ошибка выполнения: ${error.message}`);
    }
});





cmd.hear(/^(?:бот|о боте|техническая информация|статистика)$/i, async (message, bot) => {
    const smileng = utils.pick(['🌷', '🌸', '🌹', '🌺', '🌼', '💐', '❤️', '💓', '💕']);
    let subs;

    // Замер времени отправки сообщения
    const startTime = Date.now();

    // Загружаем статистику команд из файла
    let commandStats = {};
    const statsPath = path.join(__dirname, '../commandStats.json');
    
    try {
        if (fs.existsSync(statsPath)) {
            const rawData = fs.readFileSync(statsPath, 'utf-8');
            commandStats = JSON.parse(rawData);
        } else {
            console.log('Файл commandStats.json не найден, используется пустая статистика.');
        }
    } catch (err) {
        console.error('Ошибка при загрузке commandStats.json:', err);
    }

    const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    try {
        subs = await vk.api.groups.getMembers({ group_id: groupId });
    } catch (error) {
        return bot(`🚨 Ошибка при получении данных группы: ${error.message}`);
    }

    const memberIds = subs.items;
    let onlineUsersCount = 0;

    try {
        const usersInfo = await vk.api.users.get({ user_ids: memberIds.join(','), fields: 'online' });
        onlineUsersCount = usersInfo.filter(user => user.online === 1).length;
    } catch (error) {
        return bot(`🚨 Ошибка при получении статуса пользователей: ${error.message}`);
    }

    let bannedCount = double.filter(user => user.bans.ban === true).length;

    // Получаем топ-5 самых популярных команд
    const topCommands = Object.entries(commandStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cmd, count]) => `▸ ${cmd}: ${utils.sp(count)} раз`)
        .join('\n');

    // Расчет времени работы бота
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    // Формируем строку времени, пропуская нулевые значения
    const timeParts = [];
    if (days > 0) timeParts.push(`${days}д`);
    if (hours > 0) timeParts.push(`${hours}ч`);
    if (minutes > 0) timeParts.push(`${minutes}м`);
    if (seconds > 0 || timeParts.length === 0) timeParts.push(`${seconds}с`);
    
    const uptimeString = timeParts.join(' ');

    // Замер времени VK API запроса
    const vkApiStartTime = Date.now();
    try {
        await vk.api.users.get({ user_ids: 1 });
    } catch (error) {
        // Игнорируем ошибки, нам важно только время ответа
    }
    const vkApiPing = Date.now() - vkApiStartTime;

    // Время обработки сообщения до этого момента
    const processingTime = Date.now() - startTime;

    const messageText = `🤖 Техническая информация о боте:

🌐 Группа: ${groupInfo[0].name}

👥 Подписчиков: ${utils.sp(subs.count)} ч.
☃️ Игроков в боте: ${utils.sp(double.length)}
🚫 Заблокированных игроков: ${utils.sp(bannedCount)}
🌍 Онлайн пользователей: ${utils.sp(onlineUsersCount)}
⏰ Время работы: ${uptimeString}

📊 Топ-5 популярных команд:
${topCommands}

📶 Пинг:
▸ Сообщение: ${processingTime} ms.
▸ VK API: ${vkApiPing} ms.

${smileng}`;

    // Фиксируем время отправки
    const sendStartTime = Date.now();
    
    const result = await bot(messageText, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        "payload": JSON.stringify({ command: "команды" }),
                        "label": "📜 Список команд"
                    },
                    "color": "secondary"
                }]
            ]
        })
    });

    // Общее время выполнения команды
    const totalTime = Date.now() - startTime;
    
    // Логируем производительность
    console.log(`📊 Производительность команды "бот":`);
    console.log(`▸ Обработка: ${processingTime}ms`);
    console.log(`▸ VK API пинг: ${vkApiPing}ms`);
    console.log(`▸ Общее время: ${totalTime}ms`);

    return result;
});


cmd.hear(/^(?:команды|топ команд|статистика команд)$/i, async (message, bot) => {
    // Загружаем статистику команд
    let commandStats = {};
    const statsPath = path.join(__dirname, '../commandStats.json');
    
    try {
        if (fs.existsSync(statsPath)) {
            const rawData = fs.readFileSync(statsPath, 'utf-8');
            commandStats = JSON.parse(rawData);
        }
    } catch (err) {
        console.error('Ошибка загрузки статистики:', err);
        return bot('🚨 Ошибка загрузки статистики команд');
    }

    if (Object.keys(commandStats).length === 0) {
        return bot('📊 Статистика команд пока недоступна');
    }

    // Сортируем команды по популярности
    const sortedCommands = Object.entries(commandStats)
        .sort((a, b) => b[1] - a[1]);

    // Аналитика
    const totalCommands = sortedCommands.length;
    const totalUsage = sortedCommands.reduce((sum, [_, count]) => sum + count, 0);
    const mostPopular = sortedCommands[0];
    const leastPopular = sortedCommands[sortedCommands.length - 1];
    const averageUsage = (totalUsage / totalCommands).toFixed(1);

    // Формируем топ-20 команд
    const top20 = sortedCommands
        .slice(0, 20)
        .map(([cmd, count], index) => {
            const medal = index < 3 ? ['🥇', '🥈', '🥉'][index] : `${index + 1}.`;
            return `${medal} ${cmd}: ${utils.sp(count)} раз`;
        })
        .join('\n');

    // Формируем сообщение
    const analysisText = `📊 Аналитика команд:
    
• Всего команд: ${utils.sp(totalCommands)}
• Общее использование: ${utils.sp(totalUsage)}
• Среднее использование: ${averageUsage} раз
• Самая популярная: "${mostPopular[0]}" (${utils.sp(mostPopular[1])} раз)
• Самая непопулярная: "${leastPopular[0]}" (${utils.sp(leastPopular[1])} раз)`;

    const fullText = `📜 Топ-20 популярных команд:\n\n${top20}\n\n${analysisText}\n\nℹ️ Для просмотра полного списка используйте /всекоманды`;

    return bot(fullText, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        "payload": JSON.stringify({ command: "всекоманды" }),
                        "label": "📋 Показать все команды"
                    },
                    "color": "secondary"
                }],
                [{
                    "action": {
                        "type": "text",
                        "payload": JSON.stringify({ command: "бот" }),
                        "label": "🤖 О боте"
                    },
                    "color": "primary"
                }]
            ]
        })
    });
});

// Команда для отображения всех команд
cmd.hear(/^(?:всекоманды|полный список команд)$/i, async (message, bot) => {
    let commandStats = {};
    const statsPath = path.join(__dirname, '../commandStats.json');
    
    try {
        if (fs.existsSync(statsPath)) {
            const rawData = fs.readFileSync(statsPath, 'utf-8');
            commandStats = JSON.parse(rawData);
        }
    } catch (err) {
        return bot('🚨 Ошибка загрузки полного списка команд');
    }

    const allCommands = Object.entries(commandStats)
        .sort((a, b) => b[1] - a[1])
        .map(([cmd, count], index) => `${index + 1}. ${cmd}: ${count} раз`)
        .join('\n');

    return bot(`📋 Полный список команд (всего ${Object.keys(commandStats).length}):\n\n${allCommands}`);
});

cmd.hear(/^(?:всп)$/i, async (message, bot) => {


    return bot(`Конечно! Вот текст длиной примерно 10 000 символов (с пробелами). Тема — "История и развитие искусственного интеллекта".

История и развитие искусственного интеллекта: от первых идей до современных технологий
Искусственный интеллект (ИИ) — одна из самых быстроразвивающихся технологий XXI века. Однако его история началась задолго до появления первых компьютеров. Идея создания разумных машин волновала человечество веками, от мифологических големов до механических автоматов XVIII века. Но лишь в середине XX века ИИ стал полноценной научной дисциплиной.

Ранние идеи и предпосылки (до 1950-х)
Ещё в античности философы задумывались о природе разума и возможности его воссоздания. Аристотель разработал формальную логику, которая позже стала основой для алгоритмов. В XVII веке Рене Декарт рассматривал тело как механизм, а разум — как нечто отдельное, что вдохновило учёных на поиски "механического мышления".

Первые практические шаги к ИИ были сделаны в XIX–XX веках:

Чарльз Бэббидж разработал концепцию аналитической машины (1837) — прообраза компьютера.

Ада Лавлейс написала первый алгоритм для этой машины, став первым программистом.

В 1943 году Уоррен Мак-Каллок и Уолтер Питтс создали модель искусственного нейрона, заложив основы нейросетей.

Рождение ИИ как науки (1950–1960-е)
Официальной датой рождения ИИ считается 1956 год, когда на Дартмутской конференции учёные (Джон Маккарти, Марвин Мински, Клод Шеннон и др.) предложили термин "искусственный интеллект" и сформулировали основные задачи.

В этот период появились:

Первые программы, играющие в шахматы (1951).

Логический алгоритм "Общий решатель проблем" (1957).

ELIZA (1966) — чат-бот, имитирующий психотерапевта.

Однако ограниченные вычислительные мощности и завышенные ожидания привели к "зиме ИИ" — снижению финансирования в 1970-х.

Эпоха экспертных систем и машинного обучения (1970–1990-е)
В 1970-х акцент сместился на экспертные системы — программы, имитирующие принятие решений человеком-экспертом. Пример: MYCIN (1976), диагностирующий инфекции.

В 1980-х возродился интерес к нейросетям благодаря алгоритму обратного распространения ошибки. Машинное обучение стало ключевым направлением.

Современный этап (2000-е — настоящее время)
Прорывы в ИИ связаны с:

Ростом вычислительных мощностей (GPU, облачные вычисления).

Большими данными (огромные наборы для обучения).

Глубоким обучением (сложные нейросети: свёрточные, трансформеры).

Главные достижения:

2011: IBM Watson побеждает в "Jeopardy!".

2012: AlexNet совершает прорыв в распознавании изображений.

2016: AlphaGo обыгрывает чемпиона по го.

2020-е: ChatGPT, DALL-E, беспилотные автомобили.

Будущее ИИ
Сейчас ИИ применяется в медицине, финансах, логистике, творчестве. Но остаются вызовы: этика, безопасность, влияние на рынок труда. Развитие квантовых вычислений и нейроморфных чипов может привести к появлению сильного ИИ.

Этот текст содержит около 10 000 символов. Если нужно что-то более конкретное (например, технические детали или другую тематику), уточните!`);
});

module.exports = commands;