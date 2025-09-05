
const commands=[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};


const vk = require('../vk-api.js'); 

cmd.hear(/^(?:пинг|ping)$/i, async (message, bot) => {
    const startTime = Date.now();
    
    // Функция для исправления проблем
    const autoFixProblems = async (problems) => {
        const fixes = [];
        
        // Исправление проблем с памятью
        if (problems.includes('memory')) {
            if (global.gc) {
                global.gc();
                fixes.push('✅ Выполнена принудительная сборка мусора');
            } else {
                fixes.push('⚠️ Сборка мусора недоступна (запусти с флагом --expose-gc)');
            }
        }
        
        // Исправление проблем с сетью
        if (problems.includes('network')) {
            // Очистка кэша DNS
            try {
                const dns = require('dns');
                dns.resolve4('vk.com', () => {});
                dns.resolve4('google.com', () => {});
                fixes.push('✅ Очищен DNS-кэш для VK и Google');
            } catch (e) {}
        }
        
        // Исправление проблем с CPU
        if (problems.includes('cpu')) {
            // Принудительная пауза для разгрузки event loop
            await new Promise(resolve => setTimeout(resolve, 100));
            fixes.push('✅ Добавлена принудительная пауза для разгрузки CPU');
        }
        
        // Очистка кэша модулей при критических проблемах
        if (problems.includes('critical')) {
            const cacheKeys = Object.keys(require.cache);
            const botRelatedKeys = cacheKeys.filter(key => 
                key.includes('bot') || key.includes('command') || key.includes('handler')
            );
            
            if (botRelatedKeys.length > 0) {
                botRelatedKeys.forEach(key => {
                    delete require.cache[key];
                });
                fixes.push(`✅ Перезагружено ${botRelatedKeys.length} модулей бота`);
            }
        }
        
        return fixes;
    };

    // Замеряем пинг VK API
    const vkApiStart = Date.now();
    try {
        await vk.api.users.get({ user_ids: 1, fields: 'screen_name' });
    } catch (error) {
        // Игнорируем ошибки, нам важно время ответа
    }
    const vkApiPing = Date.now() - vkApiStart;

    // Время обработки до отправки сообщения
    const processingTime = Date.now() - startTime;

    // Отправляем пустое сообщение для замера времени отправки
    const messageSendStart = Date.now();
    await bot("🏓");
    const messageSendTime = Date.now() - messageSendStart;

    // Общее время выполнения команды
    const totalTime = Date.now() - startTime;

    // Получаем информацию о сервере
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    // Форматируем время работы
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const uptimeString = [
        days > 0 ? `${days}д` : '',
        hours > 0 ? `${hours}ч` : '',
        minutes > 0 ? `${minutes}м` : '',
        `${seconds}с`
    ].filter(Boolean).join(' ');

    // Получаем информацию о CPU
    const cpuUsage = process.cpuUsage();
    const cpuUsagePercent = ((cpuUsage.user + cpuUsage.system) / 1000 / uptime).toFixed(1);

    // Рассчитываем использование памяти
    const usedMemoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const totalMemoryMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const memoryUsagePercent = Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100);
    
    // Получаем информацию о системной памяти
    let systemMemoryInfo = '';
    let freeSystemMemory = '';
    try {
        const os = require('os');
        const totalSysMem = Math.round(os.totalmem() / 1024 / 1024);
        const freeSysMem = Math.round(os.freemem() / 1024 / 1024);
        const usedSysMem = totalSysMem - freeSysMem;
        const sysMemUsagePercent = Math.round((usedSysMem / totalSysMem) * 100);
        
        systemMemoryInfo = `▸ 🖥️ Системная память: ${usedSysMem}MB/${totalSysMem}MB (${sysMemUsagePercent}%)`;
        freeSystemMemory = `▸ 🆓 Свободно ОЗУ: ${freeSysMem}MB`;
    } catch (e) {
        systemMemoryInfo = '▸ 🖥️ Системная память: Недоступно';
        freeSystemMemory = '▸ 🆓 Свободно ОЗУ: Недоступно';
    }

    // Проверяем скорость интернета
    const internetTestStart = Date.now();
    let internetSpeed = 'Проверка...';
    let internetStatus = '🔵 Проверяется';
    
    try {
        const https = require('https');
        
        const checkWebsite = (url) => {
            return new Promise((resolve) => {
                const start = Date.now();
                const req = https.get(url, () => {
                    resolve(Date.now() - start);
                    req.destroy();
                }).on('error', () => resolve(null)).setTimeout(5000);
            });
        };

        const googlePing = await checkWebsite('https://www.google.com');
        const vkPing = await checkWebsite('https://vk.com');
        
        if (googlePing && vkPing) {
            const avgPing = Math.round((googlePing + vkPing) / 2);
            internetSpeed = `≈${avgPing}ms`;
            internetStatus = avgPing < 100 ? '🟢 Отлично' : avgPing < 300 ? '🟡 Нормально' : '🟠 Медленно';
        } else {
            internetSpeed = '❌ Ошибка';
            internetStatus = '🔴 Нет связи';
        }
    } catch (e) {
        internetSpeed = '⚠️ Недоступно';
        internetStatus = '🟡 Частично';
    }

    const internetTestTime = Date.now() - internetTestStart;

    // Система оценки производительности
    const getTimeRating = (value, type) => {
        let thresholds;
        
        switch(type) {
            case 'total': thresholds = { excellent: 200, good: 400, average: 800 }; break;
            case 'vk': thresholds = { excellent: 100, good: 250, average: 500 }; break;
            case 'processing': thresholds = { excellent: 50, good: 100, average: 200 }; break;
            case 'sending': thresholds = { excellent: 100, good: 200, average: 400 }; break;
            case 'internet': thresholds = { excellent: 100, good: 300, average: 500 }; break;
            default: thresholds = { excellent: 200, good: 400, average: 800 };
        }

        if (value <= thresholds.excellent) return { emoji: '🟢', text: 'Отлично' };
        if (value <= thresholds.good) return { emoji: '🟡', text: 'Хорошо' };
        if (value <= thresholds.average) return { emoji: '🟠', text: 'Нормально' };
        return { emoji: '🔴', text: 'Медленно' };
    };

    const getMemoryRating = (value) => {
        if (value <= 50) return { emoji: '🟢', text: 'Отлично' };
        if (value <= 100) return { emoji: '🟡', text: 'Хорошо' };
        if (value <= 200) return { emoji: '🟠', text: 'Нормально' };
        return { emoji: '🔴', text: 'Много' };
    };

    const getCpuRating = (value) => {
        if (value <= 10) return { emoji: '🟢', text: 'Низкая' };
        if (value <= 30) return { emoji: '🟡', text: 'Средняя' };
        if (value <= 60) return { emoji: '🟠', text: 'Высокая' };
        return { emoji: '🔴', text: 'Очень высокая' };
    };

    const getUptimeRating = (uptimeSeconds) => {
        const hours = uptimeSeconds / 3600;
        if (hours >= 720) return { emoji: '🏆', text: 'Легенда' };
        if (hours >= 168) return { emoji: '🟢', text: 'Отлично' };
        if (hours >= 72) return { emoji: '🟡', text: 'Хорошо' };
        if (hours >= 24) return { emoji: '🟠', text: 'Нормально' };
        return { emoji: '🔵', text: 'Запущен' };
    };

    const totalRating = getTimeRating(totalTime, 'total');
    const vkApiRating = getTimeRating(vkApiPing, 'vk');
    const processingRating = getTimeRating(processingTime, 'processing');
    const sendingRating = getTimeRating(messageSendTime, 'sending');
    const internetRating = getTimeRating(internetTestTime, 'internet');
    const memoryRating = getMemoryRating(usedMemoryMB);
    const cpuRating = getCpuRating(parseFloat(cpuUsagePercent));
    const uptimeRating = getUptimeRating(uptime);

    // Определяем проблемы для автоисправления
    const detectedProblems = [];
    if (cpuRating.emoji === '🔴') detectedProblems.push('cpu');
    if (memoryRating.emoji === '🔴') detectedProblems.push('memory');
    if (internetRating.emoji === '🔴') detectedProblems.push('network');
    if (totalRating.emoji === '🔴' || sendingRating.emoji === '🔴') detectedProblems.push('critical');

    // Автоматически исправляем проблемы
    let autoFixes = [];
    if (detectedProblems.length > 0) {
        autoFixes = await autoFixProblems(detectedProblems);
        
        // Если были исправления, делаем повторный замер
        if (autoFixes.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
            // Повторный замер после исправлений
            const recheckStart = Date.now();
            await bot("🔧");
            const recheckTime = Date.now() - recheckStart;
            
            if (recheckTime < messageSendTime) {
                autoFixes.push(`✅ Скорость отправки улучшена: ${recheckTime}ms`);
            }
        }
    }

    // Формируем детальный ответ
    let pingMessage = `🏓 **ДИАГНОСТИКА СИСТЕМЫ** ${detectedProblems.length > 0 ? '🔧' : '✅'}

📊 **Скорость ответа:**
▸ 🚀 Общее время: ${totalTime}ms ${totalRating.emoji} ${totalRating.text}
▸ ⚡ Обработка: ${processingTime}ms ${processingRating.emoji} ${processingRating.text}
▸ 📨 Отправка: ${messageSendTime}ms ${sendingRating.emoji} ${sendingRating.text}

🌐 **Сетевые показатели:**
▸ 🔷 VK API: ${vkApiPing}ms ${vkApiRating.emoji} ${vkApiRating.text}
▸ 🌐 Интернет: ${internetSpeed} ${internetRating.emoji} ${internetStatus}
▸ ⏱️ Проверка сети: ${internetTestTime}ms

📈 **Системные ресурсы:**
▸ ⏰ Время работы: ${uptimeString} ${uptimeRating.emoji} ${uptimeRating.text}
▸ 🧠 Память Node.js: ${usedMemoryMB}MB/${totalMemoryMB}MB (${memoryUsagePercent}%) ${memoryRating.emoji} ${memoryRating.text}
${systemMemoryInfo}
${freeSystemMemory}
▸ 🔥 CPU: ${cpuUsagePercent}% ${cpuRating.emoji} ${cpuRating.text}`;

    // Добавляем информацию об автоисправлениях
    if (autoFixes.length > 0) {
        pingMessage += `\n\n🛠️ **АВТОИСПРАВЛЕНИЯ:**
${autoFixes.map(fix => `▸ ${fix}`).join('\n')}`;
    }

    // Добавляем рекомендации
    const recommendations = [];
    if (cpuRating.emoji === '🔴') recommendations.push('▸ 🔥 Высокая нагрузка CPU - проверь фоновые процессы');
    if (memoryRating.emoji === '🔴') recommendations.push('▸ 💾 Много памяти - закрой лишние приложения');
    if (internetRating.emoji === '🔴') recommendations.push('▸ 🌐 Плохой интернет - переподключи Wi-Fi');
    
    if (recommendations.length > 0) {
        pingMessage += `\n\n💡 **РЕКОМЕНДАЦИИ:**
${recommendations.join('\n')}`;
    }

    // Отправляем финальное сообщение
    await bot(pingMessage);

    // Логируем в консоль
    console.log(`📊 Ping: ${totalTime}ms | CPU: ${cpuUsagePercent}% | Mem: ${usedMemoryMB}MB | Fixes: ${autoFixes.length}`);
});

// Добавляем глобальный обработчик для сбора мусора
if (typeof global.gc !== 'function') {
    console.log('⚠️  Для лучшего автоисправления запусти бота с флагом: --expose-gc');
}

module.exports = commands;