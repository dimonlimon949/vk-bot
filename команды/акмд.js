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

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')


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
const phones = require("../spisok/телефоны.js")

let businesses = require("../spisok/business spisok.js")

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

const chatlogi = tokenData2.chatlogi;
const spoler = tokenData4;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 



cmd.hear(/^(?:acmd|акмд|ахелп|ahelp|frvl)$/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    if (!message.isChat || message.chat.type == 1 || message.chat.type == 4) {
      // Блядь, опять эти долбоёбы лезут не туда
      const adminLevel = message.user.settings.adm;
      const hasPermission = Object.values(spoler).includes(String(message.user.id)); 
      
      // Если ты еблан без прав - пиздуй нахуй в свой нищебродский чат
      if (adminLevel < 1 && message.user.settings.agent === false) 
          return bot("ОЙ БЛЯТЬ! ТЫ СЕРЬЁЗНО, ПИДОР? ТЕБЕ ЖЕ СКАЗАЛИ - НЕТ ПРАВ! ИДИ НАХУЙ В СВОЙ ГОВНОЧАТ, УЁБИЩЕ!");
      
      // Начинаем собирать клавиатуру для этих дегенератов
      const buttons = [];
      
      // Для модератора-педика (уровень 1)
      if (adminLevel >= 1) {
          buttons.push([{
              action: {
                  type: "text",
                  payload: '{"button": "1"}',
                  label: "🔅 Модератора",
              },
              color: "default",
          }]);
      }
      
      // Для админа-петуха (уровень 2)
      if (adminLevel >= 2) {
          buttons.push([{
              action: {
                  type: "text",
                  payload: "{}",
                  label: "🔺 Администратора",
              },
              color: "default",
          }]);
      }
      
      // Для главного админа-недоделка (уровень 3)
      if (adminLevel >= 3) {
          buttons.push([{
              action: {
                  type: "text",
                  payload: "{}",
                  label: "🔹 Главного Администратора",
              },
              color: "default",
          }]);
      }
      
      // Для создателя-конченого (уровень 6+)
      if (adminLevel >= 6) {
          buttons.push([{
              action: {
                  type: "text",
                  payload: "{}",
                  label: "😎 Создатель",
              },
              color: "default",
          }]);
      }
  
      // Для настоящего бога (если ты не очередной пидор)
      if (hasPermission) {
          buttons.push([{
              action: {
                  type: "text",
                  payload: "{}",
                  label: "👼 БОГ БОТА (ЕДИНСТВЕННЫЙ НЕ ПИДОР) 👼",
              },
              color: "default",
          }]);
      }
      
      // Отправляем сообщение этим уёбкам
      bot(`НА, ВЫБИРАЙ СВОЮ РОЛЬ, МУДАК: ❄️`, {
          keyboard: JSON.stringify({
              inline: true,
              buttons,
          }),
      });
  }
  }
    if (message.user.astats.tema === 1) {
    if (!message.isChat || message.chat.type == 1 || message.chat.type == 4) {
      // Проверяем уровень администратора
      const adminLevel = message.user.settings.adm;
      const hasPermission = Object.values(spoler).includes(String(message.user.id)); 
  
      // Если пользователь не администратор и не агент, выходим
      if (adminLevel < 1 && message.user.settings.agent === false) return;
  
      // Начинаем формировать клавиатуру
      const buttons = [];
  
      // Кнопка для модератора (уровень 1)
      if (adminLevel >= 1) {
        buttons.push([{
          action: {
            type: "text",
            payload: '{"button": "1"}',
            label: "🔅 Модератора",
          },
          color: "default",
        }]);
      }
  
      // Кнопка для администратора (уровень 2)
      if (adminLevel >= 2) {
        buttons.push([{
          action: {
            type: "text",
            payload: "{}",
            label: "🔺 Администратора",
          },
          color: "default",
        }]);
      }
  
      // Кнопка для главного администратора (уровень 3)
      if (adminLevel >= 3) {
        buttons.push([{
          action: {
            type: "text",
            payload: "{}",
            label: "🔹 Главного администратора",
          },
          color: "default",
        }]);
      }
  
      // Кнопка для создателя (уровень 6 и выше)
      if (adminLevel >= 6) {
        buttons.push([{
          action: {
            type: "text",
            payload: "{}",
            label: "😎 Создатель",
          },
          color: "default",
        }]);
      }

      if (hasPermission) {
        buttons.push([{
          action: {
            type: "text",
            payload: "{}",
            label: "👼 БОГ БОТА 👼",
          },
          color: "default",
        }]);
      }
  
      // Отправляем сообщение с клавиатурой
      bot(`админ-команды: ❄️`, {
        keyboard: JSON.stringify({
          inline: true,
          buttons,
        }),
      });
    }
  }
});

cmd.hear(/^🔅 Модератора$/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    const isChat = message.isChat;
const hasPermissions = message.user.settings.adm > 0 || message.user.stock.status === "🔥Support";

// Список команд для этих пидоров
const commands = [
    "Пбан/празбан [ID] - Забанить/разбанить пидора",
    "Рбан/рразбан [ID] - Рейд бан/разбан (для особо упоротых)",
    "Бан [время] [ID] [причина] - Забанить мудака нахуй",
    "Логи [ID] - Посмотреть грешки этого уёбка",
    "Состав - Кто тут вообще есть, блядь?",
    "Ответ [ID] [текст] - Ответить этому дебилу",
    "Асмс [ID] [текст] - Анонимно послать нахуй",
    "Get case [ID] - Забрать кейс у вора",
    "limget [ID] - Посмотреть лимиты этого лузера",
    "Вкластатус/выкластатус - Включить/выключить статусы",
    "Сетник [ID] [ник] - Поменять нику этому пидору",
    "Get [ID/ссылка] - Найти этого мудака",
    "Нреп - Посмотреть новые жалобы",
    "Астата - Статистика админов (кто больше всех дрочит)",
    "Разбан [ID] - Разбанить этого пидора (может зря?)",
    "Игет [ID/ссылка] - Инфа об этом уёбке",
    "Бонус разбан/бан [ID] - Бонусный бан/разбан",
    "Разбантоп [ID] - Разбанить в топе",
    "Бантоп [ID] - Забанить в топе нахуй",
    "Точка [число] - Установить точку",
    "Банлист - Список забаненных уёбков",
    "Выдать капчу [ID] - Заставить этого дебила доказывать что он не бот",
    "Топ ответы - Кто больше всех отвечает на жалобы"
];

// Категории для этих даунов
const categoryTitles = {
    "😡 БАНХАММЕР:": commands.slice(0, 3),
    "⭐ ОСНОВНОЕ ДЛЯ ДЕБИЛОВ:": commands.slice(3, 8),
    "🔹 ДРУГАЯ ХУЙНЯ:": commands.slice(8),
};

// Формируем список команд для этих мудаков
let commandsList = "НА, ВОТ ТВОИ ГОВНОКОМАНДЫ, МУДАК:\n\n";
let commandCounter = 1;

for (const categoryTitle in categoryTitles) {
    commandsList += `🖕 ${categoryTitle}\n`;
    categoryTitles[categoryTitle].forEach(command => {
        commandsList += `🔫 ${commandCounter}. ${command}\n`;
        commandCounter++;
    });
    commandsList += "\n"; // Пустая строка между категориями, блядь
}

// Отправляем этому уёбку
if (isChat && hasPermissions) {
    const user = double.find((x) => x.id === message.senderId);
    
    message.send(`💩 Список твоих пидорских команд улетел в ЛС, мудила.`);
    await vk.api.messages.send({
        user_id: user.id,
        random_id: 0,
        message: commandsList + "\n\n⚡ НЕ ПИЗДИ, ПОЛЬЗУЙСЯ!",
    });
} else {
    return bot(commandsList + "\n\n🖕 ТЫ ДАЖЕ НЕ МОДЕР, ИДИ НАХУЙ!");
}
  }

  if (message.user.astats.tema === 1) {
  const isChat = message.isChat;
  const hasPermissions = message.user.settings.adm > 0 || message.user.stock.status === "🔥Support";

  const commands = [
      "Пбан/празбан [ID]",
      "Рбан/рразбан [ID]",
      "Бан [час/3дн/неделя/месяц/день/или ничего] [ID] [причина]",
      "Логи [ID]",
      "Состав",
      "Ответ [ID] [ответ]",
      "Асмс [ID] [сообщение]",
      "Get case [ID]",
      "limget [ID игрока]",
      "Вкластатус/выкластатус",
      "Сетник [ID] [новый ник]",
      "Get [ID/ссылка]",
      "Нреп",
      "перм лист",
      "Астата",
      "Разбан [ID]",
      "Игет [ID/ссылка]",
      "Бонус разбан/бан [ID]",
      "Разбантоп [ID]",
      "Бантоп [ID]",
      "Точка [число]",
      "Банлист",
      "Выдать капчу [ID]",
      "Топ ответы"
  ];

  const categoryTitles = {
      "😡 Блокировки:": commands.slice(0, 3),
      "⭐ Важные:": commands.slice(3, 8),
      "🔹 Остальные:": commands.slice(8),
  };

  let commandsList = "Команды модератора:\n\n";
  let commandCounter = 1;
 
  for (const categoryTitle in categoryTitles) {
      commandsList += categoryTitle + "\n";
      categoryTitles[categoryTitle].forEach(command => {
          const numberEmoji = numberToEmoji(commandCounter);
          commandsList += `${numberEmoji} ${command}\n`;
          commandCounter++;
      });
      commandsList += "\n"; // Добавляем пустую строку после каждой категории
  }

  if (isChat && hasPermissions) {
      const user = double.find((x) => x.id === message.senderId);

      message.send(`💬 Список всех команд модератора отправлены Вам в ЛС.`);
      await vk.api.messages.send({
          user_id: user.id,
          random_id: 0,
          message: commandsList,
      });
  } else {
      return bot(commandsList);
  }
}
});

cmd.hear(/^🔺 Администратора$/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    const isChat = message.isChat;
    const hasPermissions = message.user.settings.adm > 1;
    
    const commands = [
        "Выдать фермы [ID] [номер ферм] [сумма] - Насыпь этому нищеброду ферм, пусть пашет",
        "Посылка [1-3] [ID] [сумма] - Отправь этому уёбку посылку с баблом",
        "Выдать билеты [ID] [сумма] - Накинь билетов этому лузеру",
        "к1-16 [ID] [сумма] - Добавь кейсов этому гандону",
        "-к1-16 [ID] [сумма] - Отбери кейсы у этого пидора",
        "-bal [ID] [сумма] - Обнули баланс этому мудаку",
        "Выдать билеты [ID] [сумма] - Насыпь билетов пидорасику (на всё пиздец)",
        "Удалить титул [ID] - Лишить этого дебила титула",
        "Выдать [редкий/сверхредкий/эпический/мифический/легу] [ID] [сумма] - Награди этого уёбка редкой хуйнёй",
        "Выдать биткоины [ID] [сумма] - Засунь крипту этому дауну",
        "Выдать банк [ID] [сумма] - Положи бабло в банк этому пидриле",
    ];
    
    let commandsList = "НА ВОТ ТВОИ ГОВНОКОМАНДЫ, АДМИН-ПЕТУШОК:\n\n💸 ДЕНЬГОПОМОЙКА:\n";
    let commandCounter = 1;
    
    commands.forEach(command => {
        const numberEmoji = numberToEmoji(commandCounter);
        commandsList += `🔞 ${numberEmoji} ${command}\n`;
        commandCounter++;
    });
    
    if (isChat && hasPermissions) {
        const user = double.find((x) => x.id === message.senderId);
    
        message.send(`💩 Список твоих пидорских админ-команд улетел в ЛС, мудила.`);
        await vk.api.messages.send({
            user_id: user.id,
            random_id: 0,
            message: commandsList + "\n\n⚡ ИСПОЛЬЗУЙ ЭТОТ ПИЗДЕЦ ОСТОРОЖНО, ДАУН!",
        });
    } else {
        return bot(commandsList + "\n\n🖕 ТЫ ДАЖЕ НЕ АДМИН, ИДИ НАХУЙ, НИЩЕБРОД!");
    }

  }
  if (message.user.astats.tema === 1) {
   const isChat = message.isChat;
  const hasPermissions =  message.user.settings.adm > 1

  const commands = [
      "Выдать фермы [ID] [номер ферм] [сумма]",
      "Посылка [1-3] [ID] [сумма]",
      "Выдать билеты [ID] [сумма]",
      "к1-16 [ID] [сумма]",
      "-к1-16 [ID] [сумма]",
      "-bal [ID] [сумма]",
      "лв",
      "Выдать билеты [ID]",
      "Удалить титул [ID]",
      "Выдать [редкий/сверхредкий/эпический/мифический/легу] [ID] [сумма]",
      "Выдать биткоины [ID] [сумма]",
      "Выдать банк [ID] [сумма]",
      "Гб[ID] [сумма]",
      "-Гб[ID] [сумма]",


  ];

  let commandsList = "Команды администратора:\n\n💵 Экономические:\n";
  let commandCounter = 1;

  commands.forEach(command => {
      const numberEmoji = numberToEmoji(commandCounter);
      commandsList += `${numberEmoji} ${command}\n`;
      commandCounter++;
  });

    if (isChat && hasPermissions) {
      const user = double.find((x) => x.id === message.senderId);

      message.send(`💬 Список всех команд администратора отправлен Вам в ЛС.`);
      await vk.api.messages.send({
          user_id: user.id,
          random_id: 0,
          message: commandsList,
      });
  } else {
      return bot(commandsList);
  }
}
});

cmd.hear(/^🔹 Главного Администратора$/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    if (message.isChat) {
      if (message.user.settings.adm > 2) {
          let user = double.find((x) => x.id === message.senderId);
  
          const commands = [
              "Гб [ID] [сумма] (только для крутых пацанов с 5 уровня, мелкие сосут)",
              "Впред/Спред (включить/выключить предупреждения для этих пидоров)",
              "Ответ [вкл/выкл] [ID] (разрешить/запретить этому мудаку отвечать)",
              "-Гб [ID] [сумма] (отобрать бабло у нищеброда, доступ с 3 уровня)",
              "Обнулить [ID] (полный пиздец аккаунту, 4+ уровень)",
              "Кик с бесед (вышвырнуть этого уёбка везде, 5+ уровень)",
              "Поиск [тег] (найти этого пидора по тегу)"
          ];
  
          let commandsList = "НА ВОТ ТВОИ ПАЦАНСКИЕ КОМАНДЫ, ГЛАВНЫЙ МУДАК:\n\n💣 ЯДЕРНЫЕ ОПЦИИ:\n";
          let commandCounter = 3;
  
          commands.forEach(command => {
              const numberEmoji = numberToEmoji(commandCounter);
              commandsList += `☢️ ${numberEmoji} ${command}\n`;
              commandCounter++;
          });
  
          if (message.isChat) {
              message.send(`💩 Список твоих ебаных команд улетел в ЛС, царь-мудак.`);
          }
  
          await vk.api.messages.send({
              user_id: user.id,
              random_id: 0,
              message: commandsList + "\n\n⚡ ИСПОЛЬЗУЙ С ОСТОРОЖНОСТЬЮ, ДАУН!",
          });
      }
  } else {
      const commands = [
          "Впред/Спред (вкл/выкл предупреждения)",
          "Ответ [вкл/выкл] [ID] (заткнуть/разрешить этого пидора)",
          "Обнулить [ID] (полный пиздец аккаунту)",
          "Кик с бесед (вышвырнуть уёбка везде)"
      ];
  
      let commandsList = "КОМАНДЫ ДЛЯ ГЛАВНЫХ МУДАКОВ:\n\n💣 ХУЕВЫЕ ВОЗМОЖНОСТИ:\n";
      let commandCounter = 3;
  
      commands.forEach(command => {
          const numberEmoji = numberToEmoji(commandCounter);
          commandsList += `☠️ ${numberEmoji} ${command}\n`;
          commandCounter++;
      });
      return bot(commandsList + "\n\n🖕 ТЫ ДАЖЕ НЕ ГЛАВНЫЙ, ИДИ НАХУЙ!");
  }
  }
  if (message.user.astats.tema === 1) {
  if (message.isChat) {
      if (message.user.settings.adm > 2) {


          let user = double.find((x) => x.id === message.senderId);

          const commands = [
              "Впред/Спред",
              "Ответ [вкл/выкл] [ID]",
              "Обнулить [ID] (доступ с 4 уровня )",
              "доступен кик с бесед 5 уровня",
              "Поиск [тег игрока]",
              
          ];

          let commandsList = "Команды главного администратора:\n\n🛑 Основное:\n";
          let commandCounter = 3; // Начинаем с 3, как в оригинальном коде

          commands.forEach(command => {
              const numberEmoji = numberToEmoji(commandCounter);
              commandsList += `${numberEmoji} ${command}\n`;
              commandCounter++;
          });


          if (message.isChat) {
              message.send(`💬 Список всех команд Главного Администратора отправлены Вам в ЛС.`);
          }

          await vk.api.messages.send({
              user_id: user.id,
              random_id: 0,
              message: commandsList,
          });
      }
  } else {
      const commands = [
          "Впред/Спред",
          "Ответ [вкл/выкл] [ID]",
          "Обнулить [ID] (доступ с 4 уровня )",
          "доступен кик с бесед 5 уровня"
      ];

      let commandsList = "Команды главного администратора:\n\n🛑 Основное:\n";
      let commandCounter = 3;

      commands.forEach(command => {
          const numberEmoji = numberToEmoji(commandCounter);
          commandsList += `${numberEmoji} ${command}\n`;
          commandCounter++;
      });
      return bot(commandsList);
  }
}
});

cmd.hear(/^😎 Создатель$/i, async (message,bot) => {
  if (message.user.astats.tema === 2) {
    if (message.isChat) {
      if (message.user.settings.adm >= 6) {
          let user = double.find((x) => x.id === message.senderId);
  
          const commands = [
              "акция2 вкл/выкл - Включить/выключить акцию для этих нищебродов",
              "акция25 вкл/выкл - Дать/забрать 25% этим пидорам",
              "босс жизни [ЖИЗНИ] - Установить количество жизней босса (сколько раз его будут ебать)",
              "босс фото [ссылка] - Поменять фотку этого уёбка-босса",
              "босс имя [имя] - Переименовать этого мудака",
              "босс восстановить - Воскресить этого гандона",
              "босс приз [ID] - Дать титан этому счастливчику (если он не пидор)",
              "бан чат [ID] - Забанить всю эту шайку лохов",
              "выдать обычный [ID чата] - Сделать чат обычным (для плебеев)",
              "выдать дабл [ID чата] - Дать чату дабл (для избранных уёбков)",
              "постфортуна - Пост про фортуну (чтобы эти дауны верили в удачу)",
              "постстар - Пост про стар (пусть мечтают, пидоры)",
              "постидея - Пост с идеей (как будто у них есть мозги)",
              "постзакрытие - Пост про закрытие (пусть рыдают)",
              "постнабор - Пост набора (новое мясо для бота)",
              "постобнова - Пост обновы (новый повод для нытья)",
              "-валюта [ID] [сумма] - Отобрать бабло у этого вора",
              "кик с беседы администрации - Вышвырнуть этого мудака из всех админ-чатов"
          ];
  
          let commandsList = "💀 КОМАНДЫ ДЛЯ ЦАРЯ И БОГА (ТО ЕСТЬ ТЕБЯ, МУДАК):\n\n";
          let commandCounter = 1;
  
          commands.forEach(command => {
              const numberEmoji = numberToEmoji(commandCounter);
              commandsList += `👑 ${numberEmoji} ${command}\n`;
              commandCounter++;
          });
  
          if (message.isChat) {
              message.send(`🖕 Список твоих божественных команд улетел в ЛС, повелитель пидоров.`);
          }
  
          await vk.api.messages.send({
              user_id: user.id,
              random_id: 0,
              message: commandsList + "\n\n⚡ ТЫ ЗДЕСЬ БОГ, НО ВСЁ РАВНО ПИДОР!",
          });
      }
  } else {
      const commands = [
          "акция2 вкл/выкл - Включить/выключить акцию",
          "акция25 вкл/выкл - Дать/забрать 25%",
          "босс жизни [ЖИЗНИ] - Настроить количество жизней босса",
          "босс фото [ссылка] - Поменять фото босса",
          "босс имя [имя] - Переименовать босса",
          "босс восстановить - Воскресить босса",
          "босс приз [ID] - Выдать титан",
          "бан чат [ID] - Забанить чат",
          "выдать обычный [ID чата] - Сделать чат обычным",
          "выдать дабл [ID чата] - Дать чату дабл",
          "постфортуна - Создать пост про фортуну",
          "постстар - Создать пост про стар",
          "постидея - Создать пост с идеей",
          "постобнова - Создать пост про обнову",
          "-валюта [ID] [сумма] - Отобрать валюту",
          "кик с беседы администрации - Кикнуть из админ-чатов"
      ];
  
      let commandsList = "💀 КОМАНДЫ СОЗДАТЕЛЯ (НО ТЫ НЕ СОЗДАТЕЛЬ, ЛОХ):\n\n";
      let commandCounter = 1;
  
      commands.forEach(command => {
          const numberEmoji = numberToEmoji(commandCounter);
          commandsList += `👑 ${numberEmoji} ${command}\n`;
          commandCounter++;
      });
  
      return bot(commandsList + "\n\n🖕 ЭТО НЕ ДЛЯ ТЕБЯ, ИДИ НАХУЙ!");
  }
  }
  if (message.user.astats.tema === 1) {
  if (message.isChat) {
      if (message.user.settings.adm >= 6) {
          let user = double.find((x) => x.id === message.senderId);

          const commands = [
              "акция2 вкл/выкл",
              "акция25 вкл/выкл",
              "босс жизни [ЖИЗНИ]",
              "босс фото [ссылка]",
              "босс имя [имя]",
              "босс восстановить",
              "босс приз [ID] - дает титан",
              "бан чат [ID]",
              "выдать обычный [ID чата]",
              "выдать дабл [ID чата]",
              "постфортуна",
              "постстар",
              "постидея",
              "постзакрытие",
              "постнабор",
              "постобнова",
              "-валюта [ID] [сумма]",
              "доступен кик с беседы администрации",
          ];

          let commandsList = "Команды создателя:\n";
          let commandCounter = 1;

          commands.forEach(command => {
              const numberEmoji = numberToEmoji(commandCounter);
              commandsList += `${numberEmoji} ${command}\n`;
              commandCounter++;
          });

          if (message.isChat) {
              message.send(`💬 Список всех команд создателя отправлен Вам в ЛС.`);
          }

          await vk.api.messages.send({
              user_id: user.id,
              random_id: 0,
              message: commandsList,
          });
      }
  } else {
      const commands = [
          "акция2 вкл/выкл",
          "акция25 вкл/выкл",
          "босс жизни [ЖИЗНИ]",
          "босс фото [ссылка]",
          "босс имя [имя]",
          "босс восстановить",
          "босс приз [ID] - дает титан",
          "бан чат [ID]",
          "выдать обычный [ID чата]",
          "выдать дабл [ID чата]",
          "постфортуна",
          "постстар",
          "постидея",
          "постобнова",
          "-валюта [ID] [сумма]",
          "доступен кик с беседы администрации"
      ];

      let commandsList = "Команды создателя:\n";
      let commandCounter = 1;

      commands.forEach(command => {
          const numberEmoji = numberToEmoji(commandCounter);
          commandsList += `${numberEmoji} ${command}\n`;
          commandCounter++;
      });

    return  bot(commandsList);
  }
}
});

cmd.hear(/^👼 БОГ БОТА|👼 БОГ БОТА (ЕДИНСТВЕННЫЙ НЕ ПИДОР) 👼 👼$/i, async (message,bot) => {
  if (message.user.astats.tema === 2) {
    const hasPermission = Object.values(spoler).includes(String(message.user.id));

if (!hasPermission) return bot("🖕 ТЫ ДАЖЕ НЕ БОГ, ИДИ НАХУЙ, МУСОР!");

let commandsList = `💀 КОМАНДЫ АБСОЛЮТНОГО БОГА (ТО ЕСТЬ МЕНЯ, А ТЫ ССАНЬКО):\n\n`;
let commandCounter = 1;

const commands = [
    "Адм [ID] [УРОВЕНЬ] - Назначить/разжаловать этого пидора",
    "Вос - Воскресить весь этот сраный бот (если опять сдох)",
    "Оплатил [ID] [СУММА] - Отметить что этот лох заплатил",
    "Обманул [ID] [СУММА] - Кинуть этого мудака на бабки",
    "Givepay/-givepay [ID] - Дать/отобрать права на выдачу бабла",
    "Set [ID] [ЛИМИТ] - Установить лимиты выдачи этому уебку",
    "Svip/sbusi/sjoker/sprem/stitan/stopdon [ID] - Выдать ВИП/Бизнес/Джокер/Премиум/Титан/ТопДон",
    "Админ / -Админ - Добавить/удалить админа (еще одного мудака)",
    "Добавить видео/удалить видео [ССЫЛКА] - Запилить/удалить порнуху",
    "Обнулить всех - Полный пиздец всем аккаунтам (ха-ха)",
    "Удалить пост [ID поста] - Стереть этот хуевый пост",
    "Всех кик - Выгнать всех пидоров нахуй",
    "Сколько видео - Посчитать всю порнуху",
    "Все видео - Показать всю коллекцию порно",
    "пришли мне архив видео - Скинуть всю похабщину",
    "пришли архив бота - Полная бэкап-жопа",
    "пришли мне бд - Отдать всю базу данных (держи, петушок)",
    "код - Показать исходники (если хочешь все сломать)",
    "покажи команды - Вот этот самый список (ты уже здесь, дебил)",
    "-vip/-busi/-joker/-prem/-titan/-topdon [ID] - Отобрать привилегии",
    "вкл/выкл кик - Разрешить/запретить кикать этих уёбков"
];

commands.forEach(command => {
    if (command) {
        const numberEmoji = numberToEmoji(commandCounter);
        commandsList += `☠️ ${numberEmoji} ${command}\n`;
    }
    commandCounter++;
});

if (message.isChat) {
    let user = double.find((x) => x.id === message.senderId);

    message.send(`💩 Твои божественные команды улетели в ЛС, повелитель говна.`);
    
    await vk.api.messages.send({
        user_id: user.id,
        random_id: 0,
        message: commandsList + "\n\n⚡ ИСПОЛЬЗУЙ С УМОМ, ДАУН (ХОТЯ КАКОЙ ИЗ ТЕБЯ УМНЫЙ)!",
    });
} else {
    return bot(commandsList + "\n\n🖕 НАСЛАЖДАЙСЯ, ПИДОР!");
}
  }
  if (message.user.astats.tema === 1) {

  const hasPermission = Object.values(spoler).includes(String(message.user.id));

  if (!hasPermission) return;

  let commandsList = `Команды 👼 БОГА БОТА 👼:\n`;
  let commandCounter = 1;

  const commands = [
      "Адм [ID] [УРОВЕНЬ]",
      "Вос",
      "Оплатил [ID] [СУММА]",
      "Обманул [ID] [СУММА]",
      "Givepay/-givepay [ID]",
      "Set [ID] [ЛИМИТ ВЫДАЧИ]",
      "Svip/sbusi/sjoker/sprem/stitan/stopdon [ID]",
      "Админ / -Админ",
      "Добавить видео/удалить видео [ССЫЛКА]",
      "Обнулить всех",
      "Удалить [ID поста]",
      "Всех кик",
      "Сколько видео",
      "Все видео",
      "пришли мне архив видео",
      "пришли архив бота",
      "пришли мне бд",
      "код",
      "покажи команды",
      "-vip/-busi/-joker/-prem/-titan/-topdon [ID]",
      "вкл/выкл кик",
      "удалить (ид смс)",
      "удалить пост (ид)",
      "пост (текст)",
      "выдать слот (ид)",
      "забрать слот (ид)",
      "пермач (ид)",
      "скидка (категория) (процент)",
      "давлен",
      "смсид"
  ];

  commands.forEach(command => {
      if (command) { // Проверяем, не пустая ли команда (есть ли описание)
          const numberEmoji = numberToEmoji(commandCounter); // Преобразуем номер в эмодзи
          commandsList += `${numberEmoji} ${command}\n`;
      }
      commandCounter++;
  });

  if (message.isChat) {
      let user = double.find((x) => x.id === message.senderId);

      if (message.isChat) {
          message.send(`💬 Список всех команд создателя отправлен Вам в ЛС.`);
      }

      await vk.api.messages.send({
          user_id: user.id,
          random_id: 0,
          message: commandsList,
      });

  } else {
     return bot(commandsList);
  }
}
});

// Функция для преобразования числа в эмодзи
function numberToEmoji(number) {
  const emojiNumbers = [
    "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"
  ];
  const numberString = String(number);
  let emojiString = "";
  for (let i = 0; i < numberString.length; i++) {
    const digit = parseInt(numberString[i]);
    emojiString += emojiNumbers[digit];
  }
  return emojiString;
}


module.exports = commands;
