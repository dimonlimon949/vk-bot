let utils = require('../utils.js')

const commands = [];

let botinfo = require("../database/botinfo.json");

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
    chatlogi: chatlogi,
    reports: reports
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

const tokensFilePath2 = './настройки/ид бесед.json';

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2(); 

const reports = tokenData2.reports

cmd.hear(/^(?:репорт)\s(.+)$/i, async (message, bot) => {
  if (message.user.rep == true) return bot(`Дождитесь ответа на ваш предыдущий репорт.`);

  try {
      if (!message.user.timers.timereport) message.user.timers.timereport = 0;

      // Проверка блокировки репорта
      if (message.user.bans.rban) return message.send(`❌ @id${message.user.id} (${message.user.tag}), не удалось написать в репорт, потому-что Вы имеете блокировку РЕПОРТА.`);

      // Установка нового таймера
      message.user.timers.timereport = Date.now() + 120000; // 2 минуты

      // Обновление информации о репорте
      botinfo.reports += 1;
      message.user.rep = true;
      message.user.vopros = message.args[1];

      let smileng = utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);

      // === Обработка вложений ===
      let attachments = [];
      
      if (message.attachments.length > 0) {
          for (const attachment of message.attachments) {
              let attachmentString = '';
              switch (attachment.type) {
                  case 'video':
                      attachmentString = `video${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  case 'photo':
                      attachmentString = `photo${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  case 'audio':
                      attachmentString = `audio${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  case 'doc':
                      attachmentString = `doc${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  case 'wall':
                      attachmentString = `wall${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  case 'audio_message':
                      attachmentString = `audio_message${attachment.ownerId}_${attachment.id}`;
                      if (attachment.accessKey) attachmentString += `_${attachment.accessKey}`;
                      break;
                  default:
                      console.log(`Неизвестный тип вложения: ${attachment.type}`);
                      continue; // Пропускаем неизвестные типы
              }
              attachments.push(attachmentString);
          }
      }
      
      // Если нет вложений, добавляем дефолтное
      if (attachments.length === 0) {
          attachments.push("video-168874636_456244881");
      }

      // === Отправка репорта ===
      const keyboard = {
          inline: true,
          buttons: [
              [
                  {
                      action: {
                          type: "text",
                          "payload": { command: `ответ ${message.user.uid} пишите по теме в репорт иначе получите его блокировку.` },
                          label: "⚠️ Флуд ⚠️",
                      },
                      color: "default",
                  },
                  {
                      action: {
                          type: "text",
                          "payload": { command: `гет ${message.user.uid}` },
                          label: "👁 Профиль игрока 👁",
                      },
                      color: "default",
                  },
              ],
          ],
      };

      const sendParams = {
          chat_id: reports,
          forward_messages: message.id,
          message: `✏️ НОВЫЙ РЕПОРТ! ☃️ 🆕

▶️ Отправил игрок › @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}]
💬 Текст жалобы › «${message.args[1]}»

🔩 Для ответа используйте › «Ответ [ID игрока] [текст]»

@all 🎅`,
          random_id: getRandomId(),
          keyboard: JSON.stringify(keyboard)
      };

      // Добавляем attachments только если они есть
      if (attachments.length > 0) {
          sendParams.attachment = attachments.join(',');
      }

      vk.api.messages.send(sendParams);

      // Ответ пользователю
      return message.send(`✅ @id${message.user.id} (${message.user.tag}), успешно! Сообщение было доставлено до администрации, ожидайте в скором времени ответа от администрации 💬`);
  } catch (error) {
      console.error(error);
      return message.send(`❌ Произошла ошибка при отправке вашего репорта. Попробуйте позже.`);
  }
});

const getRandomId = () => (Math.floor(Math.random() * 10000) * Date.now());



cmd.hear(/^(?:оценить)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  if (!message.isChat) {
    // Поиск пользователя по uid
    let user = double.find(x => x.uid === Number(message.args[1]));
    if (!user) {
      console.log('Ошибка: пользователь не найден.');
      return bot(`👤 Пользователь не найден.`);
    }

    if (user.ochenka) {
      return bot(`❌ Вы уже оценивали этого администратора. Оценивание возможно только один раз.`);
    }

    let ratingMessage;
    let smileng = utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);
    let attachment;

    // Оценка положительная
    if (message.args[2].toLowerCase() === "положительно") {
      user.astats.norm += 1;
      user.ochenka = true;
      message.user.admid = false;

      ratingMessage = `▶️ Игрок @id${message.user.id} (${message.user.tag}) оценил Ваш ответ положительно! 👍${smileng}\n` +
        `〽️ Ваша репутация: ${utils.sp(user.astats.norm)} 👍 | ${utils.sp(user.astats.bad)} 👎`;
      attachment = `photo-203302510_457239155`;
    }
    // Оценка отрицательная
    else if (message.args[2].toLowerCase() === "отрицательно") {
      user.astats.bad += 1;
      user.ochenka = true;
      message.user.admid = false;

      ratingMessage = `▶️ Игрок @id${message.user.id} (${message.user.tag}) оценил Ваш ответ отрицательно 👎${smileng}\n` +
        `〽️ Ваша репутация: ${utils.sp(user.astats.norm)} 👍 | ${utils.sp(user.astats.bad)} 👎`;
      attachment = `photo-203302510_457239156`;
    } else {
      console.log('Ошибка: некорректная оценка.');
      return bot(`❓ Пожалуйста, укажите корректную оценку: «положительно» или «отрицательно».`);
    }

    // Отправляем сообщение пользователю
    try {
      await vk.api.messages.send({
        user_id: user.id,
        random_id: 0,
        message: ratingMessage,
        attachment: attachment
      });
    } catch (error) {
      console.error(`Ошибка при отправке сообщения: ${error}`);
      return bot(`❌ Не удалось уведомить администратора о вашей оценке.`);
    }

    // Определяем attachment для ответа пользователю
    const userAttachment = message.args[2].toLowerCase() === "положительно" 
      ? `photo-203302510_457239155` 
      : `photo-203302510_457239156`;

    return bot(`Вы успешно оценили работу администратора на «${message.args[2]}» (${message.args[2].toLowerCase() === "положительно" ? "👍" : "👎"}).\n` +
      `😮 Благодарим за оценку, это нам помогает анализировать работу администрации! Администратор будет успешно уведомлён о Вашей оценке.`, 
      { attachment: userAttachment });
  }
});




module.exports = commands;