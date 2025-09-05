const fs = require('fs');
const { VK } = require('vk-io');
let double = require('../database/users.json');
const commands = [];
let utils = require('../utils.js'); // добавлено


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

const tokenData = getToken();
const vk = require('../vk-api.js'); 

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const MAX_RETRIES = 3; // Максимальное количество попыток отправки
const DELAY_MS = 50; // Задержка между отправками (миллисекунды)
const BATCH_SIZE = 25; // Размер пакета для пакетной отправки

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendMessageWithRetries(rs, userId, messageText, attachment, retryCount = 0) {
  try {
    await rs.api.messages.send({
      user_id: userId,
      message: messageText,
      attachment: attachment,
      random_id: 0
    });
    return true; // Успешно отправлено
  } catch (error) {
    console.error(`Ошибка при отправке сообщения пользователю ${userId} (попытка ${retryCount + 1}):`, error);
    if (retryCount < MAX_RETRIES) {
      console.log(`Повторная попытка отправки сообщения пользователю ${userId} через 2 секунды...`);
      await delay(2000); // Задержка перед повторной попыткой
      return sendMessageWithRetries(rs, userId, messageText, attachment, retryCount + 1); // Рекурсивный вызов
    } else {
      console.error(`Не удалось отправить сообщение пользователю ${userId} после ${MAX_RETRIES} попыток.`);
      return false; // Не удалось отправить после всех попыток
    }
  }
}

async function sendMessagesInBatches(rs, userIds, messageText, attachment) {
  for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
    const batch = userIds.slice(i, i + BATCH_SIZE); // Группа пользователей для пакета

    // Формируем пакет запросов для execute
    const batchRequests = batch.map(userId => `API.messages.send({"user_id":${userId},"message":"${messageText}","attachment":"${attachment}","random_id":${Math.floor(Math.random() * 1e9)}})`);

    try {
      const code = `return [${batchRequests.join(',')}];`; // Собираем код для execute
      const results = await rs.api.execute({ code }); // Выполняем пакет запросов

      // Обработка результатов (нужно адаптировать под структуру ответа VK API)
      if (Array.isArray(results)) { // Проверяем, что results - массив
        results.forEach((result, index) => {
          if (result > 0) { // Проверяем, что message_id вернулся (сообщение отправлено)
            console.log(`Сообщение пользователю ${batch[index]} успешно отправлено (message_id: ${result})`);
          } else {
            console.error(`Ошибка отправки сообщения пользователю ${batch[index]}: ${JSON.stringify(result)}`);
          }
        });
      } else {
        console.error("Некорректный ответ от API Execute:", results);
      }


      if (DELAY_MS > 0) {
        await delay(DELAY_MS); // Небольшая задержка между пакетами
      }
    } catch (error) {
      console.error("Ошибка при пакетной отправке:", error);
      // Дополнительная обработка ошибки (например, повторная отправка пакета)
    }
  }
}



cmd.hear(/^(?:rass)\s([0-9]+)\s([^]+)/i, async (message, bot) => {
  try {
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
      return;
    }

    const count = Math.min(Number(message.args[1]) || 0, double.length); //ограничение кол-ва рассылки
    const messageText = message.args[2];
    const attachment = `wall-${groupId}_${message.args[1]}`;
    const rs = new VK({ token: tokenData.token });

    // Проверка на корректность данных в double
    if (!Array.isArray(double) || double.length === 0 || !double.every(user => user.id)) {
      console.error("Некорректные данные в файле users.json. Проверьте формат.");
      return message.send("Ошибка: Некорректные данные пользователей.");
    }

    const filteredUsers = double.filter(user => user.notifications === true && !user.bans.ban);
    const userIdsToSend = filteredUsers.slice(0, count).map(user => user.id); // Получаем массив ID пользователей

    await sendMessagesInBatches(rs, userIdsToSend, messageText, attachment);


    return message.send(` 👤 Рассылка запущена для ${userIdsToSend.length} людей `);

  } catch (error) {
    console.error("Ошибка при рассылке:", error);
    return message.send("Произошла ошибка при рассылке.");
  }
});






















const sendMessagesInBatches2 = async (vkInstance, userIds, messageText, attachment) => {
  const batchSize = 100;
  for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      try {
          await Promise.all(batch.map(userId => {
              if (userId < 2000000000) { // Фильтруем ID бесед
                  return vkInstance.api.messages.send({
                      user_id: userId,
                      random_id: 0,
                      message: messageText,
                      attachment: attachment
                  });
              }
              return Promise.resolve(); // Если это беседа, пропускаем
          }));
      } catch (batchError) {
          console.error("Ошибка при отправке пакета:", batchError);
          // Можно добавить логику для обработки ошибок отправки сообщений
      }
  }
};


cmd.hear(/^(?:rass2)\s([0-9]+)\s([^]+)/i, async (message, bot) => {
  try {
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
          return message.send('У вас нет прав для выполнения этой команды.');
      }

      const count = Math.min(Number(message.args[1]) || 0);
      const messageText = message.args[2];
      const attachment = `wall-${groupId}_${message.args[1]}`;
      const rs = new VK({ token: tokenData.token });

      // Получаем список диалогов
      let allConversations = [];
      let offset = 0;
      const conversationsCount = 200;

      do {
          const conversations = await vk.api.messages.getConversations({
              offset: offset,
              count: conversationsCount,
              access_token: tokenData.token,
              v: '5.131',
              peer_id: 2000000000 + groupId // peer_id для групповых чатов
          });

          if (!conversations || !conversations.items || conversations.items.length === 0) {
              break;
          }

          allConversations = allConversations.concat(conversations.items);
          offset += conversationsCount;
      } while (offset < 10000 && allConversations.length < (count === 0 ? 10000 : count)); // Прекращаем, когда дошли до count

      // Получаем ID пользователей из диалогов
      const userIdsToSend = allConversations.map(conversation => {
          const peerId = conversation.conversation.peer.id;
          return peerId;
      });
    //  console.log("user to send: ", userIdsToSend); //Добавьте отладочный вывод
      await sendMessagesInBatches2(rs, userIdsToSend, messageText, attachment);

      return message.send(`👤 Рассылка запущена для ${userIdsToSend.length} людей.`);
  } catch (error) {
      console.error("Ошибка при рассылке:", error);
      return message.send("Произошла ошибка при рассылке.");
  }
});



module.exports = commands;