  let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')
let chats = require('../database/chats.json')
let log = require('../database/log.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const forbiddenTitles = [
  "Бизнесмен", 
  "🔥Support🔥",
  "Администратор", 
  "Удалённый титул"









];


const tokenData = getToken();


const tokensFilePath4 = './настройки/создатели бота.json';

const tokensFilePath2 = './настройки/ид бесед.json';

const tokensFilePath3 = './настройки/валюты.json';

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2(); 
const tokenData3 = getToken3(); 
const tokenData4 = getToken4(); 

const tokensFilePath5 = './настройки/ссылки чатов.json';

function getToken5() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath5, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData5 = getToken5(); 


let adminka = tokenData5.admin

const coaf = tokenData2.coaf
let val1 = tokenData3.val1 
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4


const chatlogi = tokenData2.chatlogi;
const spoler = tokenData4;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

// Функция для обнуления данных игрока (загружает из файла)
function resetUserData(user) {
    try {
        const defaultData = JSON.parse(fs.readFileSync('./database/обнул.json', 'utf8'));

        for (const key in defaultData) {
            if (defaultData.hasOwnProperty(key)) {
                if (typeof defaultData[key] === 'object' && defaultData[key] !== null && !Array.isArray(defaultData[key])) {
                    // Если значение - объект, рекурсивно обходим его
                    if (typeof user[key] !== 'object' || user[key] === null || Array.isArray(user[key])) {
                        user[key] = {}; //  Инициализируем, если у пользователя нет такого свойства-объекта
                    }
                    Object.assign(user[key], defaultData[key]);
                } else {
                    user[key] = defaultData[key];
                }
            }
        }

    } catch (error) {
        console.error('Ошибка при загрузке обнул.json:', error);

    }
}


cmd.hear(/^поиск\s(.*)$/i, async (message, bot) => {

  if (message.user.settings.adm < 3) return bot(`нужен 3 уровень администратора`);

  const searchTerm = message.args[1]; // Получаем поисковый запрос из аргументов команды

  let text = ``;
  let t = 0;

  // Ищем игроков, чьи ники *содержат* поисковый запрос
  double.filter(x => x.tag.toLowerCase().includes(searchTerm.toLowerCase())).map(x => { // Убираем чувствительность к регистру

    t = t + 1;

    text += `@id${x.id}(${x.tag}) - ${x.uid} uid\n`;

  });

  let smileng = utils.pick([`🌷`,`🌸`,`🌹`,`🌺`,`🌼`,`💐`,`❤️`,`💓`,`💕`]);

  if (t === 0) {
    return bot(`Не найдено игроков с ником, похожим на "${searchTerm}"`);
  }

  bot(`нашел столько игроков с ником, похожим на "${searchTerm}": ${t} ${smileng}\n\n${text}`);

});


cmd.hear(/^(?:-гб)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  
  if (message.user.settings.adm < 2) return bot(`нужен уровень администратора`)

    message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
    message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
    message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
  
    if(!Number(message.args[2])) return;
    message.args[2] = Math.floor(Number(message.args[2]));
  
    if(message.args[2] <= 0) return bot(`укажите сумму, которую хотите забрать.`)
  
    
    else if(message.args[2])
    {
      let user = double.find(x=> x.uid === Number(message.args[1]));
      if(!user) return bot(`укажите ID игрока из его профиля. `);
  

      user.balance2 -= message.args[2];
      await bot(`вы забрали у [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} ${val4}`);
        }
          try{
     vk.api.messages.send({chat_id: chatlogi, message: `🔱 Super - [id${message.user.id}|${message.user.tag}]
🆔 Забрал у игрока - ${ Number(message.args[1])} 
👑 Сумма ${val4} - ${utils.sp(message.args[2])} `, random_id: 0})
          }catch(e) {
  console.log('Забрали ${val4}.')
};
});

cmd.hear(/^(?:гб)(?:\s+([0-9]+)\s*(.*))?$/i, async (message, bot) => {
  try {
    if (message.user.settings.adm < 2) return bot(`нужен уровень администратора`);

    // Получение UID получателя (если указан)
    const targetUid = message.args[1];

    // Если сумма не указана
    if (!message.args[2]) {
      return bot(`использование: Гб <uid> <сумма>.`);
    }

    // Обработка суммы
    let sumString = message.args[2];
    sumString = sumString.replace(/(\.|\,)/ig, ''); // Удаление точек или запятых
    sumString = sumString.replace(/(к|k)/ig, '000'); // Замена 'к' на '000'
    sumString = sumString.replace(/(м|m)/ig, '000000'); // Замена 'м' на '000000'

    let sum = Math.floor(Number(sumString)); // Преобразование в число
    if (isNaN(sum) || sum <= 0) {
      return bot(`Для выдачи валюты напишите - Гб <uid> 100.`);
    }

    // Поиск пользователя по UID
    let user = double.find(x => x.uid === Number(targetUid));
    if (!user) {
      return bot(`❌ Пользователь с UID ${targetUid} не найден.`);
    }

    // Инициализация limgbi, если оно undefined
    if (message.user.limgbi === undefined) {
      message.user.limgbi = 0;
    }

    // Обработка null для limgb (безлимит)
    const limgb = message.user.limgb === null ? Infinity : message.user.limgb;

    let availableLimit = limgb - message.user.limgbi;

    if (sum > availableLimit) {
        return bot(`❌ Превышен лимит выдачи ${val4}. Вы можете еще выдать ${availableLimit} GB.`);
    }

    // Выдача суммы пользователю
    user.balance2 += sum; 
    message.user.limgbi += sum; // Увеличиваем счетчик использованного лимита у админа
    
    await message.send("✅");

    // Проверка ID перед отправкой сообщения
    if (user.id > 0) {
      // Отправка уведомления пользователю
      await vk.api.messages.send({
        random_id: 0,
        user_id: user.id,
        message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : message.user.tag}, ${utils.sp(sum, true)} ${val4} добавлено на баланс! 🚀`
      });
    } else {
      console.warn(`Не удалось отправить сообщение пользователю с UID ${targetUid}, ID пользователя недействителен.`);
    }
    
    await vk.api.messages.send({
        chat_id: chatlogi,
        message: `👤Админ: [id${message.user.id}|${message.user.tag}]\n💰 Выдал ${val4} [id${user.id}|${user.tag}] в количестве ${sum}`,
        random_id: 0
    });

  } catch (e) {
    console.error("Ошибка при выдаче GB:", e);
    bot(`Произошла ошибка при выдаче GB: ${e.message}`);
  }
});

cmd.hear(/^(?:спред)$/i, async (message, bot) => {
  if (message.user.settings.adm < 5) return bot(`нужен 5 уровень администратора`)

  let senderId;

  // Если ответ на сообщение

  if (message.hasReplyMessage) {
    senderId = message.replyMessage.senderId;

    let user = double.find((x) => x.id === senderId);

    if (!user) return bot(`Неверный URL игрока!`);

    user.astats.warn -= 1;

    if (user.astats.warn < 0) {
      user.astats.warn = 0;
    }

    return bot(`Предупреждение успешно снято! ✅
⚠️ У администратора теперь ${user.astats.warn}/5 предупреждений!`);
  } else if (message.hasForwards) {
    senderId = message.forwards[0].senderId;

    let user = double.find((x) => x.id === senderId);

    if (!user) return bot(`Неверный URL игрока!`);

    user.astats.warn -= 1;

    if (user.astats.warn < 0) {
      user.astats.warn = 0;
    }

    return bot(`Предупреждение успешно снято! ✅
⚠️ У администратора теперь ${user.astats.warn}/5 предупреждений!`);
  }
});


cmd.hear(/^(?:впред)$/i, async (message, bot) => {
  // Проверка уровня админа у отправителя
  if (message.user.settings.adm < 5) return bot("❌ Нужен 5 уровень администратора!");

  let target;
  if (message.hasReplyMessage) {
    target = double.find(x => x.id === message.replyMessage.senderId);
  } else if (message.hasForwards) {
    target = double.find(x => x.id === message.forwards[0].senderId);
  } else {
    return bot("❌ Ответьте на сообщение или перешлите его!");
  }

  if (!target) return bot("❌ Игрок не найден!");

  // Проверка на бан
  if (target.bans?.ban === true) {
    const remainingTime = target.bans.bantimer 
      ? Math.max(0, target.bans.bantimer - Date.now()) 
      : null;
    
    let banInfo = [
      "🚫 Игрок уже заблокирован!",
      remainingTime !== null 
        ? `⏳ Осталось: ${Math.floor(remainingTime / 3600000)}ч ${Math.floor((remainingTime % 3600000) / 60000)}м`
        : "⏳ Срок: бессрочно",
      `📌 Причина: ${target.bans.reason || "не указана"}`
    ].join("\n");
    
    return bot(banInfo);
  }

  // Инициализация счетчиков
  target.astats.warn = (target.astats.warn || 0) + 1;
  target.astats.warnCount = target.astats.warnCount || 0;

  // При достижении 3 предупреждений
  if (target.astats.warn >= 3) {
    target.astats.warn = 0;
    target.astats.warnCount += 1;
    
    const isAdmin = target.settings.adm >= 1;
    if (isAdmin) target.settings.adm = 0;

    // Определение срока бана
    let banDuration, banMessage;
    switch(target.astats.warnCount) {
      case 1: banDuration = 3600000; banMessage = "1 час"; break;
      case 2: banDuration = 86400000; banMessage = "1 день"; break;
      case 3: banDuration = 604800000; banMessage = "1 неделю"; break;
      case 4: banDuration = 2629744000; banMessage = "1 месяц"; break;
      default: banDuration = null; banMessage = "бессрочно";
    }

    // Установка бана
    target.bans = {
      ban: true,
      reason: `Автоматический бан (3/3 пред., ${target.astats.warnCount} нарушение)`,
      bantimer: banDuration ? Date.now() + banDuration : null
    };

    // Форматирование даты разбана
    const unbanDate = banDuration 
      ? new Date(target.bans.bantimer).toLocaleString("ru-RU", {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "никогда";

    // Отправка уведомлений
    await bot([
      `⚠️ ${isAdmin ? 'Администратор' : 'Игрок'} получил 3/3 предупреждений!`,
      isAdmin ? "🚫 Права админа сняты!" : "",
      `⏰ Выдан бан: ${banMessage}`,
      `🔢 Количество нарушений: ${target.astats.warnCount}`,
      `📅 Разблокировка: ${unbanDate}`
    ].filter(Boolean).join("\n"));

    await vk.api.messages.send({
      user_id: target.id,
      message: [
        "🚫 Ваш аккаунт заблокирован!",
        `Причина: 3 предупреждения (${target.astats.warnCount} нарушение)`,
        `Срок: ${banMessage}`,
        `Разблокировка: ${unbanDate}`,
        isAdmin ? "\n⚠️ Ваши права администратора сняты" : ""
      ].filter(Boolean).join("\n"),
      random_id: 0
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: [
        `📛 ADM-LOG: Выдан бан за предупреждения`,
        `👤 Администратор: @id${message.user.id} (${message.user.tag})`,
        `💢 Нарушитель: @id${target.id} (${target.tag})`,
        `📊 Статус: ${isAdmin ? 'Администратор' : 'Игрок'}`,
        `🔞 Нарушений: ${target.astats.warnCount}`,
        `⏱️ Срок: ${banMessage}`,
        isAdmin ? "❗ Сняты права" : ""
      ].filter(Boolean).join("\n"),
      random_id: 0
    });

    return;
  }

  // Текущий статус предупреждений
  return bot([
    `⚠️ Предупреждение выдано!`,
    `📊 Текущее количество: ${target.astats.warn}/3`,
    target.astats.warn >= 2 ? "🔴 Еще 1 предупреждение - бан!" : ""
  ].filter(Boolean).join("\n"));
});

cmd.hear(/^(?:ответ вкл)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 3) return bot(`нужен 3 уровень администратора`)


  let user = users.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot(`неверный ID игрока`);

  user.answeraccess = true;

  await message.send(
    `▶️ Администратор/агент @id${user.id} (${user.tag}) получил доступ к ответам! Теперь он может отвечать на репорты 😸`
  );
});

cmd.hear(/^(?:ответ выкл)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 3) return bot(`нужен 3 уровень администратора`)

  let user = users.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot(`неверный ID игрока`);

  user.answeraccess = false;

  await message.send(
    `▶️ Администратору/агенту @id${user.id} (${user.tag}) был закрыт доступ к ответам! Теперь он не может отвечать на репорты ❌😢`
  );
});

cmd.hear(/^(?:обнулить|обнул)\s([0-9]+)$/i, async (message, bot) => {


    const targetUID = Number(message.args[1]);

    if (isNaN(targetUID)) {
        return bot("Укажите корректный UID игрока (число).");
    }

   if (message.user.settings.adm < 3) return bot(`нужен 3 уровень администратора`)

    let user = double.find((x) => x.uid === targetUID);

    if (!user) return bot(`неверный ID игрока`);

    // Обнуляем данные пользователя, используя функцию
    resetUserData(user);

     // Сохранение изменений в файл
     try {
        fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2)); // null, 2 для красивого форматирования
        console.log('База данных успешно обнулена и сохранена.');
    } catch (err) {
        console.error('Ошибка при сохранении базы данных:', err);
        return bot("Ошибка при сохранении базы данных! Возможно, данные не были сохранены.");
    }

    await vk.api.messages.send({
        chat_id: chatlogi,
        random_id: 0,
        message: `⛔ Администратор @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}] обнулил игрока @id${user.id} (${user.tag})[ID: ${user.uid}] ❄️`,
    });

    return bot(
        `Вы обнулили [id${user.id}|игрока] успешно. Ваши действия были зафиксированы и отправлены старшей администрации (в целях безопасности игроков).`
    );

});






module.exports = commands;
