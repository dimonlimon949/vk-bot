let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const ostats = [
  {
    id: 1,
    smile: "🐷✨",
    buff: "+100% у урону босса",
    cost: 49,
  },
];

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let phones = require('../spisok/телефоны.js')
let presidents = require("../database/presidents.json");



let yachts = require('../spisok/яхты.js')
let airplanes = require('../spisok/самолеты.js')
let helicopters = require('../spisok/вертолеты.js')
let apartments = require('../spisok/апартаменты.js')
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
let farms = require('../spisok/фермы.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')

let businesses2 = require("../spisok/бизнесы.js")
let businesses = require("../spisok/business spisok.js")


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


// Пример использования
const tokenData = getToken();

const tokensFilePath4 = './настройки/создатели бота.json';

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
let spoler = tokenData4 ? Object.values(tokenData4)
  .map(id => Number(id)) // Преобразуем в число
  .filter(id => Number.isInteger(id) && id > 0) // Отфильтровываем не числа и <= 0
  : [];

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


// Функции для генерации случайного текста
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharCase(char) {
  if (Math.random() < 0.9) { // 50% вероятность
    return char.toUpperCase();
  } else {
    return char.toLowerCase();
  }
}

//Функция для случайного выбора смайлика из массива
function getRandomEmoji(emojis) {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function mixText(originalText, emojis) {
  let mixedText = "";
  const randomEmoji = getRandomEmoji(emojis); // Получаем случайный смайлик

  for (let i = 0; i < originalText.length; i++) {
    let char = originalText[i];

    if (/[а-яА-Яa-zA-Z]/.test(char)) { // Проверяем, является ли символ буквой

      // Изменяем регистр случайным образом
      char = getRandomCharCase(char);

      // Случайная замена символов (можно расширить этот список)
      const random = Math.random();
      if (random < 0.1) { // 10% вероятность замены
        switch (char.toLowerCase()) {
          case 'о': char = '0'; break;
          case 'а': char = '@'; break;
          case 'е': char = '3'; break;
          case 'l': char = '1'; break;
          case 's': char = '$'; break;
          case 't': char = '+'; break;

        }
      }
      if (random > 0.8) { // 10% вероятность замены Русских на Английские
        switch (char.toLowerCase()) {
          case 'а': char = 'a'; break;
          case 'о': char = 'o'; break;
          case 'е': char = 'e'; break;
          case 'р': char = 'p'; break;
          case 'с': char = 'c'; break;
          case 'у': char = 'y'; break;
          case 'х': char = 'x'; break;
          case 'в': char = 'b'; break;
          case 'к': char = 'k'; break;
          case 'м': char = 'm'; break;
          case 'н': char = 'h'; break;
          case 'п': char = 'n'; break;
          case 'т': char = 'm'; break;
          case 'ё': char = 'e'; break;
          // Добавьте другие замены по желанию
        }
      }
      if (random < 0.2) { // 10% вероятность замены Английских на Русские
        switch (char.toLowerCase()) {
          case 'a': char = 'а'; break;
          case 'o': char = 'о'; break;
          case 'e': char = 'е'; break;
          case 'p': char = 'р'; break;
          case 'c': char = 'с'; break;
          case 'y': char = 'у'; break;
          case 'x': char = 'х'; break;
          case 'b': char = 'в'; break;
          case 'k': char = 'к'; break;
          case 'm': char = 'м'; break;
          case 'h': char = 'н'; break;
          case 'n': char = 'п'; break;
          // Добавьте другие замены по желанию
        }
      }
    }
    mixedText += char;
  }
  return `${randomEmoji} ${mixedText} ${randomEmoji}\n`;
}
// Подключаем массив стилей из отдельного файла
const programmerUnicodeStyles = require('../шрифты/шрифты.js');

//Дополнительные символы для украшения
const decoratorSymbols = ["꙳", "꙰", "҉", "҈", "⃟", "⃢", "⃑", "⁖", "⁘"];

//Функция для добавления случайных символов
function addRandomDecorators(text) {
    let decoratedText = "";
    for (let i = 0; i < text.length; i++) {
        decoratedText += text[i];
        if (Math.random() < 0.9) { //10% шанс добавить символ после каждой буквы
            decoratedText += decoratorSymbols[Math.floor(Math.random() * decoratorSymbols.length)];
        }
    }
    return decoratedText;
}

function getRandomUnicodeStyle() {
  const randomIndex = Math.floor(Math.random() * programmerUnicodeStyles.length);
  return programmerUnicodeStyles[randomIndex];
}




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

let val1 = tokenData3.val1
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4
let val5 = tokenData3.val5

let tokensCache = null;
      
setInterval(() => {
    tokensCache = getToken3();
    if (tokensCache) {
        val1 = tokensCache.val1;
        val2 = tokensCache.val2;
        val3 = tokensCache.val3;
        val4 = tokensCache.val4;
    }

}, 1000);

cmd.hear(/^(?:профиль|проф|🔅 Профиль|я)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1 || message.chat.type === 2) {
    // Проверка подписки на группу
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;
    const follow = await vk.api.call("groups.isMember", {
      user_id: message.senderId,
      group_id: groupId,
    });

    if (follow && message.user.questfollow === false) {
      message.user.questfollow = true;
      message.user.balance += 25000000;
      await bot(`Вы подписались на группу и получаете 25.000.000 ${val1}`);
    }

    // Инициализация настроек
    if (message.user.settings.agent === undefined) {
      message.user.settings.agent = false;
    }

    // Формирование текста профиля
    let text = ``;

    // ID пользователя
    text += `🆔 Ваш ID: ${message.user.uid === message.user.astats.fakeid ? message.user.uid : message.user.astats.fakeid}\n`;

    // Специальные роли и статусы
    if (spoler.includes(message.user.id)) {
      text += "🔥💯 Создатель\n";
      const programmerEmojis = ["💻", "👨‍💻", "👩‍💻", "⚙️", "🛠️", "🖥️", "💾", "💿"];
      const randomEmoji = programmerEmojis[Math.floor(Math.random() * programmerEmojis.length)];
      text += `${randomEmoji} Программист ${randomEmoji}\n`;
    }

    // Статусы пользователя
    const statuses = [
      { condition: message.user.prazdnikbussines, text: "🎄Last Christmas🎄" },
      { condition: message.user.settings.imperator, text: "👑 IMPERATOR 👑" },
      { condition: message.user.settings.topdon, text: "🎉 D🌟O💖N 🎊" },
      { condition: message.user.settings.vip, text: "👑 VIP статус" },
      { condition: message.user.settings.premium, text: "👑 Premium статус" },
      { condition: message.user.settings.titan, text: "👑 Titan статус" },
      { condition: message.user.settings.joker, text: "🃏 Джокер" },
      { condition: message.user.settings.busi, text: "🤵 Бизнесмен" },
      { condition: message.user.settings.king, text: "🌈КОРОЛЬ🌈" }
    ];

    statuses.forEach(status => {
      if (status.condition) text += `${status.text}\n`;
    });

    // Особый статус
    if (message.user.ostat > 0 && 
        !["Администратор", "VIP", "Titan", "Premium", "Игрок"].includes(message.user.stock.status)) {
      text += `\n🆕 Статус: [${ostats[message.user.ostat - 1].smile}]\nБафф: ${ostats[message.user.ostat - 1].buff}\n\n`;
    }

    // Админские роли
    if (message.user.settings.astat) {
      const roles = {
        1: "👤 Модератор",
        2: "🔑 Администратор",
        3: "🤗 Гл.Администратор",
        4: "♻️ Зам создателя",
        5: "❄️ Основатель",
        6: "👑 Всевышний админ"
      };

      const userRole = message.user.settings.adm;
      if (roles[userRole]) text += roles[userRole] + "\n";
      
      for (let i = 1; i < userRole; i++) {
        if (roles[i]) text += roles[i] + "\n";
      }

      if (userRole > 6) text += "❄️ Управляющий \n";
    }

    // Основная информация
    text += `🔅 Уровень: «${message.user.levl}»\n`;

    // Валюта и ресурсы
    text += `\n💳 Валюты:\n`;
    text += `💰 Наличными: ${message.user.inf ? '∞' : utils.sp(message.user.balance)} ${val1}\n`;
    if (message.user.bank > 0) text += `💳 В банке: ${utils.sp(message.user.bank)} ${val1}\n`;
    if (message.user.btc > 0) text += `🌐 Биткоины: ${utils.sp(message.user.btc)} BTC\n`;
    if (message.user.rating > 0) text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
    text += `⚡ Энергия: ${message.user.energy}\n`;
    if (message.user.opit > 0) text += `〽️ Опыт: ${utils.sp(message.user.opit)}\n`;
    if (message.user.balance2 > 0) text += `💸 ${utils.sp(message.user.balance2)} ${val4}\n`;

    // Имущество
    const hasProperty = 
      message.user.transport.car || message.user.transport.yacht || 
      message.user.transport.airplane || message.user.transport.helicopter || 
      message.user.realty.home || message.user.business || 
      message.user.misc.phone;

    if (hasProperty && message.user.marriage.partner === 0) {
      text += `\n♻️ Имущество:\n`;

      // Транспорт
      const transports = [
        { type: 'car', emoji: '🚗', items: cars },
        { type: 'yacht', emoji: '🛥', items: yachts },
        { type: 'airplane', emoji: '🛩', items: airplanes },
        { type: 'helicopter', emoji: '🚁', items: helicopters }
      ];

      transports.forEach(transport => {
        if (message.user.transport[transport.type]) {
          const customName = message.user.astats[transport.type];
          const defaultName = transport.items[message.user.transport[transport.type] - 1].name;
          text += `⠀${transport.emoji} «${customName === false ? defaultName : customName}»`;
          if (transport.type === 'car' && message.user.scar.gosnomer !== "undefined") {
            text += ` [${message.user.scar.gosnomer}]`;
          }
          text += `\n`;
        }
      });

      // Недвижимость
      if (message.user.realty.home) {
        const customName = message.user.astats.homes;
        const defaultName = homes[message.user.realty.home - 1].name;
        text += `⠀🏠 «${customName === false ? defaultName : customName}»\n`;
      }

      if (message.user.realty.apartment) {
        const customName = message.user.astats.apartment;
        const defaultName = apartments[message.user.realty.apartment - 1].name;
        text += `⠀🌇 «${customName === false ? defaultName : customName}»\n`;
      }

      // Техника и оборудование
      const items = [
        { type: 'videocard', emoji: '📼', items: videocards, count: message.user.misc.videocard_count },
        { type: 'minertool', emoji: '🔧', items: minertool },
        { type: 'tree', emoji: '🌳', items: trees },
        { type: 'phone', emoji: '📱', items: phones },
        { type: 'computer', emoji: '🖥', items: computers },
        { type: 'farm', emoji: '🔋', items: farms, count: message.user.misc.farm_count }
      ];

      items.forEach(item => {
        if (message.user.misc[item.type]) {
          text += `⠀${item.emoji} «${item.items[message.user.misc[item.type] - 1].name}»`;
          if (item.count) text += `(${utils.sp(item.count)} шт.)`;
          text += `\n`;
        }
      });

      // Бизнесы
      if (message.user.business?.length > 0) {
        text += `🏢 Бизнесы на ${val4}:\n`;
        message.user.business.forEach(business => {
          const businessInfo = businesses[business.id - 1][business.upgrade - 1];
          text += `${businessInfo.name}\n`;
        });
      }

      if (message.user.business2?.length > 0) {
        text += '🏢 Бизнесы на валюту:\n';
        message.user.business2.forEach(business2 => {
          const businessInfo = businesses2[business2.id - 1][business2.upgrade - 1];
          text += `${businessInfo.icon} ${businessInfo.name}\n`;
        });
      }

      // Звезды
      const stars = [
        { condition: message.user.stars1, text: '☀ Солнце' },
        { condition: message.user.stars2, text: '🌠 Сириус' },
        { condition: message.user.stars3, text: '🛑 Красный гигант' },
        { condition: message.user.stars4, text: '🧬 Плазмовый гигант' },
        { condition: message.user.stars5, text: '💰 Донатный гигант' }
      ];

      const hasStars = stars.some(star => star.condition);
      if (hasStars) {
        text += `\n💫 Звезды:\n`;
        stars.forEach(star => {
          if (star.condition) text += `⠀${star.text}\n`;
        });
      }
    }

    // Дата регистрации
    text += `\n\n⏳ ${message.user.regDate}`;

    // Клавиатура
    const keyboard = {
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `топик` }),
            "label": `👀 Аниме`
          },
          "color": "positive"
        }],
        ...(!message.user.now?.kv10 ? [[{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `путь новичка` }),
            "label": `👀 Путь новичка`
          },
          "color": "positive"
        }]] : []),
        [{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `уровень` }), // Исправлено с уроень на уровень
            "label": `⭐ Уровень`
          },
          "color": "positive"
        }]
      ].filter(Boolean)
    };

    return bot(`ваш игровой профиль:\n${text}`, {
      attachment: message.user.photo,
      keyboard: JSON.stringify(keyboard)
    });
  }
});

cmd.hear(/^(?:профиль фото|проф фото|пфото|фпроф)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1 || message.chat.type === 2) {
        let photoUrl = message.args[1];
        let isValid = false;

        if (photoUrl.startsWith("https://vk.com/")) {
            photoUrl = photoUrl.slice(15);
            isValid = true;
        } else if (
            photoUrl.startsWith("photo-") ||
            photoUrl.startsWith("video-") ||
            photoUrl.startsWith("audio") ||
            photoUrl.startsWith("doc") ||
            photoUrl.startsWith("photo") // Добавлено это условие
        ) {
            isValid = true;
        }

        if (isValid) {
            message.user.photo = photoUrl;
            try {
                await bot(`Ваш профиль изменен 🤗`, {
                    attachment: photoUrl,
                });
            } catch (error) {
                console.error("Ошибка при отправке сообщения:", error);
                return bot(`Ошибка: Не удалось установить фотографию.`);
            }

        } else {
            return bot(
                `Ошибка: Неверный формат ссылки.`
            );
        }
    }
});

module.exports = commands;