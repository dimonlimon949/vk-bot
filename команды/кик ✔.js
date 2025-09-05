const fs = require('fs');
const { VK } = require('vk-io');
const double = require('../database/users.json')

const commands = [];
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

// --------- Настройки ----------
const tokensFilePath = './настройки/токены.json';
const tokensFilePath4 = './настройки/создатели бота.json';
const tokensFilePath2 = './настройки/ид бесед.json';

function getToken(filePath) {
    try {
        const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error(`Ошибка при чтении файла ${filePath}:`, error);
        return null;
    }
}

const tokenData = getToken(tokensFilePath);
const tokenData4 = getToken(tokensFilePath4);
const tokenData2 = getToken(tokensFilePath2);

const spolerIds = tokenData4 ? Object.values(tokenData4)
    .map(id => Number(id))
    .filter(id => Number.isInteger(id) && id > 0) : [];

const chatlogi = tokenData2?.chatlogi;

const vk = require('../vk-api.js'); 



// --------- Вспомогательные функции ----------

async function resolveTargetId(arg, message) {
    // Если аргумент - ответ на сообщение (формат "reply:123456")
    if (arg.startsWith('reply:')) {
        const repliedMessage = await message.getReply();
        if (repliedMessage) {
            const user = double.find(u => u.id === repliedMessage.user.id);
            return { 
                vkId: repliedMessage.user.id,
                uid: user ? (user.astats?.fakeid || user.uid) : null,
                screenName: repliedMessage.user.screenName
            };
        }
        return null;
    }

    // Если аргумент - число (UID)
    if (!isNaN(Number(arg))) {
        const user = double.find(u => u.uid === Number(arg) || (u.astats && u.astats.fakeid === Number(arg)));
        return user ? { vkId: user.id, uid: user.uid } : null;
    }

    // Если аргумент - ссылка ВК (разные форматы)
    const vkLinkMatch = arg.match(/(?:https?:\/\/)?(?:vk\.com|m\.vk\.com)\/([^\/\s]+)/i);
    if (vkLinkMatch) {
        const screenName = vkLinkMatch[1];
        try {
            const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
            if (resolveResponse && resolveResponse.type === 'user') {
                const user = double.find(u => u.id === resolveResponse.object_id);
                return { 
                    vkId: resolveResponse.object_id,
                    uid: user ? (user.astats?.fakeid || user.uid) : null,
                    screenName: screenName
                };
            }
        } catch (error) {
            console.error("Ошибка при resolveScreenName:", error);
        }
    }

    return null;
}

async function kickUser(message, bot, target, reason = "команду администратора") {
    if (spolerIds.includes(Number(message.user.id))) {
        return message.reply("⛔ Нельзя кикать создателей!");
    }

    const targetData = await resolveTargetId(target, message);
    
    if (!targetData || !targetData.vkId) {
        return message.reply("❌ Не удалось определить пользователя.\nИспользуйте:\n• Ответ на сообщение + 'кик'\n• кик UID\n• кик vk.com/nickname");
    }

    if (targetData.vkId === message.user.id) {
        return message.reply("🤦‍♂️ Вы не можете кикнуть самого себя!");
    }

    try {
        await vk.api.messages.removeChatUser({ 
            chat_id: message.chatId, 
            user_id: targetData.vkId 
        });

        let infoMessage;
        if (targetData.uid) {
            infoMessage = `💤 Игрок UID: ${targetData.uid}`;
        } else if (targetData.screenName) {
            infoMessage = `💤 Пользователь vk.com/${targetData.screenName}`;
        } else {
            infoMessage = `💤 Пользователь ID: ${targetData.vkId}`;
        }

        await message.reply(`${infoMessage} был кикнут за ${reason}.`);

        // Логирование
        vk.api.messages.send({
            chat_id: chatlogi,
            message: `⚡ Админ [id${message.user.id}|${message.user.tag}] кикнул ${infoMessage} за ${reason}.`,
            random_id: 0
        });

    } catch (e) {
        if (e.code === 935) {
            await message.reply("ℹ Пользователь не в беседе.");
        } else if (e.code === 15) {
            await message.reply("⛔ Нет доступа к чату или пользователю.");
        } else if (e.code === 936) {
            await message.reply("⛔ Нельзя кикнуть создателя чата.");
        } else {
            console.error(e);
            await message.reply(`❌ Ошибка при кике: ${e.message}`);
        }
    }
}








cmd.hear(/^(?:кик|kick)(?:\s+(.+))?$/i, async (message, bot) => {

            if (message.user.bankik) {
            actionLog.status = 'rejected';
            actionLog.reason = 'admin_disabled';
            await logAction(actionLog);
            return bot(`отключено администрацией ⚠`);
        }
    // Логирование действия
    const actionLog = {
        admin: {
            id: message.user.id,
            tag: message.user.tag
        },
        chatId: message.chatId,
        timestamp: new Date().toISOString(),
        action: 'kick_attempt',
        status: 'started'
    };

    try {
        // Проверка банлиста админа


        // Проверка прав (5+ уровень для обычных чатов, 6+ для type=4)
        const requiredLevel = message.chat.type === 4 ? 6 : 5;
        if (message.user.settings?.adm < requiredLevel) {
            actionLog.status = 'rejected';
            actionLog.reason = 'insufficient_permissions';
            await logAction(actionLog);
            return message.reply(`🚫 Требуется уровень админа ${requiredLevel}+`);
        }

        // Определение цели и причины
        let targetId;
        let targetInfo = {};
        let kickReason = "причина не указана";
        const [, reason] = message.text.match(/^(?:кик|kick)(?:\s+(.+))?$/i) || [];

        // 1. Если это ответ на сообщение
        if (message.replyMessage) {
            targetId = message.replyMessage.senderId;
            targetInfo = {
                type: targetId < 0 ? 'community' : 'user',
                absoluteId: Math.abs(targetId),
                screenName: message.replyMessage.screenName
            };
            
            // Устанавливаем причину, если она указана после "кик"
            if (reason) kickReason = reason;
        } 
        // 2. Если цель указана в аргументах (UID или ссылка)
        else if (reason) {
            const targetArg = reason.split(' ')[0];
            kickReason = reason.slice(targetArg.length).trim() || kickReason;

            // Проверка на UID (число)
            if (!isNaN(Number(targetArg))) {
                const user = double.find(u => u.uid === Number(targetArg) || (u.astats && u.astats.fakeid === Number(targetArg)));
                if (user) {
                    targetId = user.id;
                    targetInfo = {
                        type: 'user',
                        absoluteId: user.uid,
                        screenName: user.screenName
                    };
                } else {
                    // Если пользователь не найден в базе, но указан числовой ID
                    targetId = Number(targetArg);
                    targetInfo = {
                        type: 'user',
                        absoluteId: Math.abs(targetId),
                        screenName: null,
                        unregistered: true
                    };
                }
            }
            // Проверка на ссылку VK
            else {
                const vkLinkMatch = targetArg.match(/(?:https?:\/\/)?(?:vk\.com|m\.vk\.com)\/([^\/\s]+)/i);
                if (vkLinkMatch) {
                    const screenName = vkLinkMatch[1];
                    try {
                        const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
                        if (resolveResponse && resolveResponse.type === 'user') {
                            targetId = resolveResponse.object_id;
                            targetInfo = {
                                type: 'user',
                                absoluteId: Math.abs(targetId),
                                screenName: screenName,
                                unregistered: !double.some(u => u.id === resolveResponse.object_id)
                            };
                        }
                    } catch (error) {
                        console.error("Ошибка при resolveScreenName:", error);
                    }
                }
            }
        }

        // Если цель не определена
        if (!targetId) {
            actionLog.status = 'rejected';
            actionLog.reason = 'no_target';
            await logAction(actionLog);
            return message.reply(`❌ Укажите цель:\n▸ Ответьте на сообщение + "кик [причина]"\n▸ кик UID [причина]\n▸ кик vk.com/nick [причина]`);
        }

        // Обновляем информацию о цели
        actionLog.target = {
            id: targetId,
            ...targetInfo
        };

        // Проверка на создателей
        if (spolerIds.includes(targetInfo.absoluteId)) {
            actionLog.status = 'rejected';
            actionLog.reason = 'target_is_creator';
            await logAction(actionLog);
            return message.reply(`⛔ Нельзя кикать создателей!`);
        }

        // Проверка на самокик
        if (targetId === message.user.id) {
            actionLog.status = 'rejected';
            actionLog.reason = 'self_kick_attempt';
            await logAction(actionLog);
            return message.reply(`🤡 Ты серьезно пытаешься кикнуть себя?`);
        }

        // Кик сообщества
        if (targetInfo.type === 'community') {
            actionLog.action = 'community_kick';
            await logAction(actionLog);

            try {
                const members = await vk.api.messages.getConversationMembers({
                    peer_id: message.peerId
                });

                const communityMember = members.items.find(item => item.member_id === targetId);
                if (!communityMember) {
                    actionLog.status = 'failed';
                    actionLog.reason = 'community_not_in_chat';
                    await logAction(actionLog);
                    return message.reply(`❌ Сообщество *club${targetInfo.absoluteId} не в беседе.`);
                }

                await vk.api.messages.removeChatUser({
                    chat_id: message.chatId,
                    member_id: communityMember.member_id
                });

                actionLog.status = 'success';
                actionLog.reason = kickReason;
                await logAction(actionLog);

                return message.reply(`✅ Сообщество *club${targetInfo.absoluteId} кикнуто за: ${kickReason}`);
            } catch (e) {
                actionLog.status = 'failed';
                actionLog.error = {
                    code: e.code,
                    message: e.message
                };
                await logAction(actionLog);
                
                return handleKickError(e, message);
            }
        } 
        // Кик пользователя
        else {
            actionLog.action = 'user_kick';
            actionLog.reason = kickReason;
            await logAction(actionLog);

            try {
                await vk.api.messages.removeChatUser({
                    chat_id: message.chatId,
                    user_id: targetId
                });

                actionLog.status = 'success';
                await logAction(actionLog);

                // Формируем сообщение о кике
                let userInfo;
                if (targetInfo.unregistered) {
                    userInfo = `[id${targetId}|Незарегистрированный]`;
                } else if (targetInfo.screenName) {
                    userInfo = `[id${targetId}|vk.com/${targetInfo.screenName}]`;
                } else if (targetInfo.absoluteId) {
                    userInfo = `UID: ${targetInfo.absoluteId}`;
                } else {
                    userInfo = `ID: ${targetId}`;
                }

                return message.reply(`💢 ${userInfo} был кикнут за: ${kickReason}`);

            } catch (e) {
                actionLog.status = 'failed';
                actionLog.error = {
                    code: e.code,
                    message: e.message
                };
                await logAction(actionLog);
                
                return handleKickError(e, message);
            }
        }

    } catch (error) {
        actionLog.status = 'critical_error';
        actionLog.error = {
            message: error.message,
            stack: error.stack
        };
        await logAction(actionLog);
        console.error('Критическая ошибка:', error);
        return message.reply(`⚠ Ошибка: ${error.message}`);
    }
});

// Обработчик ошибок кика
function handleKickError(e, message) {
    if (e.code === 935) {
        return message.reply(`❌ Пользователь не в беседе.`);
    } else if (e.code === 936) {
        return message.reply(`⛔ Нельзя кикнуть создателя чата.`);
    } else if (e.code === 15) {
        return message.reply(`🔒 Нет доступа для кика.`);
    } else {
        console.error('Ошибка кика:', e);
        return message.reply(`⚠ Ошибка: ${e.message}`);
    }
}




// Улучшенная функция логирования
async function logAction(data) {
    try {
        // Переводим статусы для вывода
        const statusTranslations = {
            'started': 'начато',
            'success': 'успешно',
            'failed': 'ошибка',
            'rejected': 'отклонено',
            'critical_error': 'критическая_ошибка'
        };
        
        const translatedStatus = statusTranslations[data.status] || data.status;

        const logMessage = `🔹 ${data.action.toUpperCase()}:
👤 Админ: [id${data.admin.id}|${data.admin.tag}]
🎯 Цель: ${data.target?.type === 'community' ? '@club'+data.target.absoluteId : '@id'+data.target?.absoluteId}
📌 Чат: ${data.chatId}
🔄 Статус: ${translatedStatus}
${data.error ? `❗ Ошибка: ${data.error.message} (код ${data.error.code})` : ''}`;

        await vk.api.messages.send({
            chat_id: chatlogi,
            message: logMessage,
            random_id: 0
        });

        // Для ошибок добавляем детали
        if (data.status === 'failed' || data.status === 'critical_error') {
            await vk.api.messages.send({
                chat_id: chatlogi,
                message: `📛 Детали ошибки:\n${JSON.stringify(data.error).substring(0, 4000)}`,
                random_id: 0
            });
        }
    } catch (e) {
        console.error('Ошибка при логировании:', e);
    }
}

cmd.hear(/^(?:\/q)$/i, async (message, bot) => {
    let targetUserId = message.user.id;

    if (!targetUserId) {
        return message.reply("⚠ Не удалось определить ваш ID.");
    }

    if (spolerIds.includes(Number(targetUserId))) {
        return message.reply(`Создатели не могут покидать чат по команде /q!`);
    }
    try {
        await vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: targetUserId });
        vk.api.messages.send({
            chat_id: chatlogi,
            message: `⚡ Пользователь *id${message.user.id} самоликвидировался из беседы!`,
            random_id: 0
        });
    } catch (e) {
        if (e.code === 935) {
            await message.reply(`Вас нет в чате.`);
        } else {
            console.error(e);
            await message.reply("Произошла ошибка при выполнении команды '/q'. Обратитесь к разработчику.");
        }
    }
});

module.exports = commands;