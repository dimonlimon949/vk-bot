let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

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

// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

cmd.hear(/^(?:реф)\s([^]+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    try {
      // Обработка ID или ссылки
      let user;
      const input = message.args[1];
      const referrerInfo = `Указал: @id${message.user.id} (${message.user.tag})`;
      
      // Проверка на числовой ID
      if (/^\d+$/.test(input)) {
        user = double.find(x => x.uid === Number(input));
      } 
      // Проверка на ссылку VK
      else if (/^(?:https?:\/\/)?(?:vk\.com\/)/i.test(input)) {
        const screenName = input.replace(/(?:https?:\/\/)?(?:vk\.com\/)/gi, "");
        const res = await vk.api.utils.resolveScreenName({ screen_name: screenName });
        if (res && res.object_id) {
          user = double.find(x => x.id === res.object_id);
        }
      }

      // Валидации
      if (!user) return bot("Игрок не найден");
      if (user.id == message.user.id) return bot("Вы указали сами себя");
      if (message.user.ref) return bot("Вы уже получили бонус за реферала");

      // Настройка реферальной системы
      message.user.ref = true;
      const multiply = utils.pick([1, 2, 3, 4]);
      user.refcount += 1;
      user.fertilizer += 2;
      user.water += 2;

      // Награды в зависимости от количества рефералов
      let rewardMessage = "";
      
      if (user.refcount < 10) {
        switch (multiply) {
          case 1:
            user.c3 += 1;
            rewardMessage = "начислен 1 донат-кейс";
            break;
          case 2:
            user.balance += 10000000;
            rewardMessage = "начислено 10.000.000 $";
            break;
          case 3:
            user.c2 += 3;
            rewardMessage = "начислено 3 Золотых-кейса";
            break;
          case 4:
            user.rubli += 1;
            rewardMessage = "начислено 1 рубль";
            break;
        }
      } 
      else if (user.refcount >= 10 && user.refcount < 100) {
        switch (multiply) {
          case 1:
            user.c3 += 2;
            rewardMessage = "начислено 2 донат-кейса";
            break;
          case 2:
            user.balance += 20000000;
            rewardMessage = "начислено 20.000.000 $";
            break;
          case 3:
            user.c2 += 5;
            rewardMessage = "начислено 5 Золотых-кейсов";
            break;
          case 4:
            user.rubli += 2;
            rewardMessage = "начислено 2 рубля";
            break;
        }
      } 
      else if (user.refcount >= 100 && user.refcount != 666) {
        switch (multiply) {
          case 1:
            user.c3 += 3;
            rewardMessage = "начислено 3 донат-кейса";
            break;
          case 2:
            user.balance += 50000000;
            rewardMessage = "начислено 50.000.000 $";
            break;
          case 3:
            user.c2 += 10;
            rewardMessage = "начислено 10 Золотых-кейсов";
            break;
          case 4:
            user.rubli += 3;
            rewardMessage = "начислено 3 рубля";
            break;
        }
      }

      // Специальная награда за 666 рефералов
      if (user.refcount == 666) {
        user.stars5 = true;
        rewardMessage = "начислена лучшая звезда";
      }

      // Награда за каждые 20 рефералов
      if (user.refcount % 20 == 0) {
        user.c6 += 1;
        if (user.notifications) {
          await vk.api.messages.send({
            user_id: user.id,
            message: `УВЕДОМЛЕНИЕ ✅\n` +
              `▶ Вам начислен 1 Секретный-кейс за то что игрок указал, что вы его пригласили!\n` +
              `${referrerInfo}\n` +
              `🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`,
            keyboard: JSON.stringify({
              "inline": true,
              "buttons": [[{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({ command: "уведомления выкл" }),
                  "label": "🔕"
                },
                "color": "negative"
              }]]
            }),
            random_id: 0
          });
        }
      }

      // Отправка уведомления пригласившему
      if (user.notifications && rewardMessage) {
        await vk.api.messages.send({
          user_id: user.id,
          message: `УВЕДОМЛЕНИЕ ✅\n` +
            `▶ Вам ${rewardMessage} за то что игрок указал, что вы его пригласили!\n` +
            `${referrerInfo}\n` +
            `🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`,
          keyboard: JSON.stringify({
            "inline": true,
            "buttons": [[{
              "action": {
                "type": "text",
                "payload": JSON.stringify({ command: "уведомления выкл" }),
                "label": "🔕"
              },
              "color": "negative"
            }]]
          }),
          random_id: 0
        });
      }

      // Награда для указавшего реферала
      const bonus = input.match(/^\d+$/) ? 2 : 2; // 2 за ID, 2 за ссылку
      message.user.c3 += bonus;
      
      return bot(`✅ Вы получили ${bonus} донат-кейсов за указание пригласившего вас игрока ✅`);

    } catch (error) {
      console.error("Ошибка в обработке реферала:", error);
      return bot("Произошла ошибка при обработке вашего запроса");
    }
  }
});

cmd.hear(
  /^(?:реф|🏆 реферал|реферал|@club223500959 реф|@club223500959 реферал|реферальная система)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {

      const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
      });

      if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
      }

      const groupId = groupInfo[0].id;


      let smileng = utils.pick([
        `🌷`,
        `🌸`,
        `🌹`,
        `🌺`,
        `🌼`,
        `💐`,
        `❤️`,
        `💓`,
        `💕`,
      ]); //utils.pick([`❄️`,`🎄`,`☃️`,`🎅`]);

      let ref = `https://vk.me/club${groupId}?ref=${message.senderId}&ref_source=${message.senderId}`;

      let refka = await vk.api.utils.getShortLink({ url: ref });

      return bot(`Вы пригласили ${utils.sp(
        message.user.refcount
      )} пользователей ${smileng}

💰 За приглашение Вы получите один из призов:
👥 До 10 приглашённых - может выпасть: 1 донат-кейс, 3 золотых кейса, 1 рубль, 10.000.000 $
👥 До 100 приглашённых- может выпасть: 2 донат-кейса, 20.000.000 $ или 5 золотых кейсов, 2 рубля
👥 До 10000 приглашённых - может выпасть: 3 донат-кейса, 50.000.000 $ , 10 золотых кейсов, 3 рубля
👥 За каждого 20 игрока даётся секретный кейс
👥 За 666 приглашённых вы получите звезду «Донатный гигант», прибыль: 30 ЧакоРуб/час

📌 Ваша реферальная ссылка: ${refka.short_url}

`);
    }
  }
);



let STATIC_REF_LINK = 'https://vk.me/club228340301?ref=богач';

cmd.hear(
  /^(?:система)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 4) {
      let ref = STATIC_REF_LINK
      let refka = await vk.api.utils.getShortLink({ url: ref });

      return bot(`
📌 Ваша ссылка: ${refka.short_url}
`);
    }
  }
);

cmd.hear(
  /^(?:сброс)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 4) {
      double.forEach(user => {
        user.perexod = false;
      });
      return message.send("♻ Переходы сброшены!");
    }
  }
);

cmd.hear(
  /^(?:самобан)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type >= 1) {
      message.user.bans.ban = true
      message.user.bans.reason = 'Самобан.'
      return bot(`
Готово.
`);
    }
  }
);



module.exports = commands;
