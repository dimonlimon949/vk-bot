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

cmd.hear(/^(?:пбан|pban)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше 👮‍♂️`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

  if (message.chat.type === 4){


  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.pban !== false)
    return bot(`у игрока уже итак отключена передача 🚫`);

  user.bans.pban = true;

  user.stock.stpban = "Да";

  message.user.astats.pbans += 1;

  const adminTag = `@id${message.user.id} (${message.user.tag})`; // Получаем тег админа

    try {
      await vk.api.messages.send({
        user_id: user.id,
        message: `${adminTag} вам заблокировал возможность передачи средств.`,
        random_id: 0,
      });
    } catch (error) {
      console.error('Ошибка при отправке уведомления пользователю:', error);
      return bot(`Вы заблокировали передачу игроку - @id${user.id} (${user.tag}) ❌ \n Не удалось отправить уведомление!`);
    }

  return bot(`Вы заблокировали передачу игроку - @id${user.id} (${user.tag}) ❌ \n Уведомление отправлено.`);
}
});

cmd.hear(/^(?:празбан|punban)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше 👮‍♂️`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

  if (message.chat.type === 4){


  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.pban !== true)
    return bot(`у игрока уже итак включен доступ к передаче ✅`);

  user.bans.pban = false;

  user.stock.stpban = "Нет";

  const adminTag = `@id${message.user.id} (${message.user.tag})`; // Получаем тег админа

   try {
      await vk.api.messages.send({
        user_id: user.id,
        message: `${adminTag} вам разблокировал возможность передачи средств.`,
        random_id: 0,
      });
    } catch (error) {
      console.error('Ошибка при отправке уведомления пользователю:', error);
      return bot(`Вы разблокировали передачу игроку - @id${user.id} (${user.tag}) ✅ \n Не удалось отправить уведомление!`);
    }

  return bot(`Вы разблокировали передачу игроку - @id${user.id} (${user.tag}) ✅ \n Уведомление отправлено.`);
  }
});

cmd.hear(/^(?:рбан|rban)\s([0-9]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

  if (message.chat.type === 4){


  let user = double.find(x => x.uid === Number(message.args[1]));

  if (!user) return bot(`Такого игрока не существует! ❌`);

  if (user.bans.rban != false) return bot(`у игрока уже закрыт репорт ❌`);

  user.bans.rbantimer = Date.now() + 604800000;

  user.bans.rban = true;

  user.stock.strban = "Да";

  message.user.astats.rbans += 1;

  const adminName = `@id${message.user.id}(${message.user.tag})`;

  // Форматируем дату снятия блокировки
  const unlockDate = new Date(user.bans.rbantimer);
  const formattedUnlockDate = unlockDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Moscow' // Укажите ваш часовой пояс
  });

  try {
      await vk.api.messages.send({
        user_id: user.id,
        message: `${adminName} вам заблокировал возможность отправлять репорты на неделю. Блокировка будет снята ${formattedUnlockDate}.`,
        random_id: 0,
      });
    } catch (error) {
      console.error('Ошибка при отправке уведомления пользователю:', error);
      return bot(`Вы выдали бан репорта игроку - @id${user.id} (${user.tag}) ❌ \n Не удалось отправить уведомление!`);
    }


  return bot(`Вы выдали бан репорта игроку - @id${user.id} (${user.tag}) ❌ \nУведомление отправлено.`);

}

});

cmd.hear(/^(?:рразбан|runban)\s([0-9]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше 👮‍♂️`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ 💬.`)
 }

  if (message.chat.type === 4){


  let user = double.find(x => x.uid === Number(message.args[1]));

  if (!user) return bot(`Такого игрока не существует! ❌`);

  if (user.bans.rban != true) return bot(`у игрока репорт уже включён 🙃`);

  user.bans.rbantimer = 0; // или delete user.bans.rbantimer, если хотите удалить поле

  user.bans.rban = false;

  user.stock.strban = "Нет";

  try {
      await vk.api.messages.send({
        user_id: user.id,
        message: `Администратор ${message.user.tag} разблокировал вам возможность отправлять репорты. 🎉`,
        random_id: 0,
      });
    } catch (error) {
      console.error('Ошибка при отправке уведомления пользователю:', error);
      return bot(`Вы разбанили репорт игроку - @id${user.id} (${user.tag}) ✅ \n Не удалось отправить уведомление!`);
    }

  return bot(`Вы разбанили репорт игроку - @id${user.id} (${user.tag}) ✅`);
  }
});

cmd.hear(/^(?:асмс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat){
     return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
  }

  if (message.chat.type === 4){
  try {


    const userId = Number(message.args[1]);
    if (isNaN(userId)) return; // Проверка номера игрока.

    const user = await double.find(x => x.uid === userId);
    if (!user || !user.id) return; // Проверка существования.

    await vk.api.messages.send({
      user_id: user.id,
      message: `▶️ Администратор / агент написал Вам сообщение: ❄️\n✏️ Текст: «${message.args[2]}» ✅`,
      random_id: 0
    });
  } catch (error) {
    console.error("Произошла ошибка:", error); 
  }

  return bot(`Вы успешно написали игроку сообщение ❄️\n📩 Текст: «${message.args[2]}»`);
}else{
  return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
}
});

cmd.hear(/^(?:нреп|✨ Нреп)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){



  let i = 0;
  let test = ``;
  let user = double.filter(x => x.rep === true).map(x => {
    i += 1;
    test += `№${i}. @id${x.id} (${x.tag}) (ID › ${x.uid}). Вопрос › ${x.vopros}\n\n`;
  });

  return bot(`неотвеченные репорты/вопросы:

${test}`);

  }

});

cmd.hear(/^(?:админ-статистика|астата|астатистика|astat|астат|🅰 Астата)$/i,async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

    if (message.chat.type === 4){

      const nonAdminUsers = double.filter(user => user.settings.adm < 1);

      let totalBalance = nonAdminUsers.reduce((acc, user) => acc + (user.balance || 0), 0);
      let totalbtc = nonAdminUsers.reduce((acc, user) => acc + (user.btc || 0), 0);
      let totalrubli = nonAdminUsers.reduce((acc, user) => acc + (user.rubli || 0), 0);
      let totalrating = nonAdminUsers.reduce((acc, user) => acc + (user.rating || 0), 0);
      let totalgb = nonAdminUsers.reduce((acc, user) => acc + (user.balance2 || 0), 0);

      let totalDogecoin = nonAdminUsers.reduce((acc, user) => acc + (user.dcoins || 0), 0);
      let totalChakorubs = nonAdminUsers.reduce((acc, user) => acc + (user.rub || 0), 0);
      let totalTickets = nonAdminUsers.reduce((acc, user) => acc + (user.bilet || 0), 0);
      let totalIron = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.zhelezo || 0), 0);
      let totalGold = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.zoloto || 0), 0);
      let totalDiamonds = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.almaz || 0), 0);
      let totalMatter = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.materia || 0), 0);
      let totalObsidian = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.obsidian || 0), 0);
      let totalPlasma = nonAdminUsers.reduce((acc, user) => acc + (user.ruds.plazma || 0), 0);
      let totalEnergy = nonAdminUsers.reduce((acc, user) => acc + (user.energy || 0), 0);

      let totalCommonCases = nonAdminUsers.reduce((acc, user) => acc + (user.c1 || 0), 0);
      let totalGoldenCases = nonAdminUsers.reduce((acc, user) => acc + (user.c2 || 0), 0);
      let totalDonationCases = nonAdminUsers.reduce((acc, user) => acc + (user.c3 || 0), 0);
      let totalRacingCases = nonAdminUsers.reduce((acc, user) => acc + (user.c4 || 0), 0);
      let totalHalloweenCases = nonAdminUsers.reduce((acc, user) => acc + (user.c5 || 0), 0);
      let totalSecretCases = nonAdminUsers.reduce((acc, user) => acc + (user.c6 || 0), 0);
      let totalSoundCases = nonAdminUsers.reduce((acc, user) => acc + (user.c7 || 0), 0);
      let totalNewYearCases = nonAdminUsers.reduce((acc, user) => acc + (user.c8 || 0), 0);
      let totalPremiumCases = nonAdminUsers.reduce((acc, user) => acc + (user.c9 || 0), 0);
      let totalUltraCases = nonAdminUsers.reduce((acc, user) => acc + (user.c10 || 0), 0);
      let totalAdminCases = nonAdminUsers.reduce((acc, user) => acc + (user.c11 || 0), 0);

      let totalAdminCases2 = nonAdminUsers.reduce((acc, user) => acc + (user.c12 || 0), 0);
      let totalAdminCases3 = nonAdminUsers.reduce((acc, user) => acc + (user.c13 || 0), 0);
      let totalAdminCases4 = nonAdminUsers.reduce((acc, user) => acc + (user.c14 || 0), 0);
      let totalAdminCases5 = nonAdminUsers.reduce((acc, user) => acc + (user.c15 || 0), 0);
      let totalAdminCases6 = nonAdminUsers.reduce((acc, user) => acc + (user.c16 || 0), 0);


      return bot(`🤖 Игровая информация о боте:

💰 Общий баланс игроков: ${utils.sp(totalBalance)} $
💰 Общий баланс ${val4}: ${utils.sp(totalgb)} ${val4}
🪙 Общий BTC: ${utils.sp(totalbtc)} BTC
💵 Общий баланс в рублях: ${utils.sp(totalrubli)} ₽

⚠️ Общий рейтинг: ${utils.sp(totalrating)} 👑

📊 Ресурсы:
- 🪙 Всего Dogecoin: ${utils.sp(totalDogecoin)}
- 💎 Всего чакорубов: ${utils.sp(totalChakorubs)}
- 🎟️ Всего билетов: ${utils.sp(totalTickets)}
- ⚒️ Всего железа: ${utils.sp(totalIron)}
- 🪙 Всего золота: ${utils.sp(totalGold)}
- 💎 Всего алмазов: ${utils.sp(totalDiamonds)}
- 🌌 Всего материи: ${utils.sp(totalMatter)}
- 🖤 Всего обсидиана: ${utils.sp(totalObsidian)}
- ⚡ Всего плазмы: ${utils.sp(totalPlasma)}
- 🔋 Всего энергии: ${utils.sp(totalEnergy)}

🎁 Кейсы:
- 🎲 Всего обычных кейсов: ${utils.sp(totalCommonCases)}
- 🏆 Всего золотых кейсов: ${utils.sp(totalGoldenCases)}
- 💖 Всего донат-кейсов: ${utils.sp(totalDonationCases)}
- 🏎️ Всего Starr Drops: ${utils.sp(totalRacingCases)}
- 🎃 Всего Halloween кейсов: ${utils.sp(totalHalloweenCases)}
- 🔒 Всего секретных кейсов: ${utils.sp(totalSecretCases)}
- 🎶 Всего автозвук кейсов: ${utils.sp(totalSoundCases)}
- 🎄 Всего новогодних кейсов: ${utils.sp(totalNewYearCases)}
- 🌟 Всего премиум кейсов: ${utils.sp(totalPremiumCases)}
- 🚀 Всего ультра кейсов: ${utils.sp(totalUltraCases)}
- 👑 Всего админ кейсов: ${utils.sp(totalAdminCases)}

- 💎 Всего сверхредких кейсов: ${utils.sp(totalAdminCases2)}
- ✨ Всего эпических кейсов: ${utils.sp(totalAdminCases3)}
- 🔮 Всего мифических кейсов: ${utils.sp(totalAdminCases4)}
- 🌟 Всего легендарных кейсов: ${utils.sp(totalAdminCases5)}

`);
    }else{
      return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
    }
  }
);

cmd.hear(/^(?:разбан|unban)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== true) return bot(`игрок не в бане! 💚`);

  user.bans.bantimer = 0;

  user.bans.ban = false;

  message.user.bantop = false;

  await bot(`вы разбанили игрока @id${user.id}(${user.tag}) 🔥\n`);

  await vk.api.messages.send({
    user_id: user.id,

    message: `🚫 Ваш аккаунт был разблокирован! 💚\n\n▶️ Разблокировал: @id${message.user.id} (${message.user.tag}) 🤗`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:



🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) снял блокировку аккаунта игрока ID: ${message.args[1]} 😡`,
  })
}
});

cmd.hear(/^(?:бан|ban)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type == 4){
  


  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);
  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);


  if (message.args[2]) {
    user.bans.reason = message.args[2];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  const datka = new Date(user.bans.bantimer);

  message.user.astats.bans += 1;

  message.user.bantop = true;

  user.bans.ban = true;

  await bot(
    `Вы успешно заблокировали игрока @id${user.id}(${user.tag}) 🔥\n💬Причина блокировки: ${message.args[2]}\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${user.bans.reason
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌ `,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:

🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[1]
      } 😡\n⏰ Срок бана: бессрочно 🚫\n♻️ Причина: ${message.args[2]}`,
  });
}
});

cmd.hear(/^(?:бан|ban)\s(3дн)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){

  message.user.timers.ban = Date.now() + 900000;

  let user = double.find((x) => x.uid === Number(message.args[2]));



  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
  user.bans.ban = true;
  if (message.args[3]) {
    user.bans.reason = message.args[3];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  user.bans.bantimer = Date.now() + 86400000 * 3;
  const datka = new Date(user.bans.bantimer);
  message.user.astats.bans += 1;

  message.user.bantop = true;

  await bot(
    `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬Причина блокировки: ${message.args[3]}\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:



🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[2]
      } 😡\n⏰ Срок бана: 3 дня 🚫\n♻️ Причина: ${message.args[3]}`,
  });
}
});

cmd.hear(/^(?:бан|ban)\s(месяц)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){
  let user = double.find((x) => x.uid == message.args[2]);

  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
  user.bans.ban = true;
  if (message.args[3]) {
    user.bans.reason = message.args[3];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  user.bans.bantimer = Date.now() + 2629744000;
  const datka = new Date(user.bans.bantimer);
  message.user.astats.bans += 1;
  message.user.bantop = true;

  await bot(
    `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬 Причина блокировки: ${message.args[3]}\n\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:

🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[2]
      } 😡\n⏰ Срок бана: 1 месяц 🚫\n♻️ Причина: ${message.args[3]}`,
  });
}
});

cmd.hear(/^(?:бан|ban)\s(неделя)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){
  let user = double.find((x) => x.uid == message.args[2]);


  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
  user.bans.ban = true;
  if (message.args[3]) {
    user.bans.reason = message.args[3];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  user.bans.bantimer = Date.now() + 604800000;
  const datka = new Date(user.bans.bantimer);
  message.user.astats.bans += 1;
  message.user.bantop = true;

  await bot(
    `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬 Причина блокировки: ${message.args[3]}\n\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:

🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[2]
      } 😡\n⏰ Срок бана: 7 дней 🚫\n♻️ Причина: ${message.args[3]}`,
  });
}
});

cmd.hear(/^(?:бан|ban)\s(час)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){

  let user = double.find((x) => x.uid == message.args[2]);



  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
  user.bans.ban = true;
  if (message.args[3]) {
    user.bans.reason = message.args[3];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  user.bans.bantimer = Date.now() + 3600000;
  const datka = new Date(user.bans.bantimer);
  message.user.astats.bans += 1;
  message.user.bantop = true;

  await bot(
    `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬 Причина блокировки: ${message.args[3]}\n\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:

🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[2]
      } 😡\n⏰ Срок бана: 1 час 🚫\n♻️ Причина: ${message.args[3]}`,
  });
}
});

cmd.hear(/^(?:бан|ban)\s(день)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`)

  if (!message.isChat || message.chat.type !== 4){
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`)
 }

 if (message.chat.type === 4){

  let user = double.find((x) => x.uid == message.args[2]);


  if (user.settings.adm >= message.user.settings.adm) return bot(`Нельзя блокировать игроков с уровнем доступа равным или выше вашего. Это нарушение.`);

  if (!user)
    return bot(
      `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
    );

  if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
  user.bans.ban = true;
  if (message.args[3]) {
    user.bans.reason = message.args[3];
  } else {
    user.bans.reason = 'Нарушение правил';
  }
  user.bans.bantimer = Date.now() + 86400000;
  const datka = new Date(user.bans.bantimer);
  message.user.astats.bans += 1;
  message.user.bantop = true;

  await bot(
    `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬 Причина блокировки: ${message.args[3]}\n\n`
  );

  await vk.api.messages.send({
    user_id: user.id,

    message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
      }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК) ❌`,

    random_id: 0,
  });

  await vk.api.messages.send({
    chat_id: chatlogi,
    random_id: 0,
    message: `⚠️ ADM-LOG:

🎅 ${message.user.settings.adm > 5 ? '👼 БОГ 👼' : message.user.settings.adm
        .toString()
        .replace(/1/gi, "Модератор")
        .replace(/2/gi, "Администратор")
        .replace(/3/gi, "Главный администратор")
        .replace(/4/gi, "Заместитель владельца")
        .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
      }) заблокировал игрока ID: ${message.args[2]
      } 😡\n⏰ Срок бана: 1 день 🚫\n♻️ Причина: ${message.args[3]}`,
  });
}
});

cmd.hear(/^(?:перм лист)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {
    const bannedUsers = double.filter(
      x => x.bans.ban === true && x.bans.bantimer == 0
    );

    const totalBanned = bannedUsers.length;

    if (totalBanned === 0) {
      return bot(`В данный момент нет заблокированных пользователей. ✅`);
    }

    let outputText = bannedUsers
      .map((x, index) => `${index + 1}. @id${x.id}(${x.tag}) (${x.uid}) - Причина: ${x.bans.reason || "-"}`)
      .join('\n');

    bot(`Всего заблокировано пользователей: ${totalBanned} 🚫\n\n${outputText}`);
  }
});



cmd.hear(/^(?:〽️ Администраторы)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

  let admins = double.filter((x) => x.settings.adm === 2);

  let text = "▶️ ➖ Состав администрации 2ур:\n\n";

  if (admins.length > 0) {
    text += "⬇️ Администраторы:\n";
    text += admins.map((x) => `» @id${x.id}(${x.tag}) [ID: ${x.uid}]`).join('\n');
    text += `\nВсего Администраторов: ${admins.length}\n\n`;
  } else {
    text = "▶️ ➖ В данный момент состав администрации пуст.";
  }

  return bot(text);
}
});

cmd.hear(/^(?:♻️ Модераторы)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {


  const moderators = double.filter((x) => x.settings.adm === 1);


  const totalModerators = moderators.length;


  let text = "▶️ ➖ Состав модераторов 1 ур:\n\n"; 

  if (totalModerators > 0) {

    text += "⬇️ Модераторы:\n"; 
    const moderatorList = moderators.map((x) => `» @id${x.id}(${x.tag}) [ID: ${x.uid}]`).join('\n');
    text += moderatorList; 

    text += `\n\nВсего модераторов: ${totalModerators} 👮\n`; 
  } else {
    text += "В данный момент модераторы отсутствуют. 😔\n";
  }


  return bot(text);
}
});

cmd.hear(/^(?:📛 Главные администраторы)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

  const filterAdmins = (level) => double.filter((x) => x.settings.adm === level).map((x) => `» @id${x.id}(${x.tag}) [ID: ${x.uid}]`).join('\n');

  const bogList = filterAdmins(6);
  const osnList = filterAdmins(5);
  const zamList = filterAdmins(4);
  const gaList = filterAdmins(3);

  let text = "▶️ ➖ Состав старшей администрации:\n\n";

  if (bogList) text += "👼 БОГИ БОТА 👼:\n" + bogList + "\n\n";
  if (osnList) text += "🤗 Основатель:\n" + osnList + "\n\n";
  if (zamList) text += "😎 Заместитель основателя:\n" + zamList + "\n\n";
  if (gaList) text += "🔱 Главный администратор:\n" + gaList + "\n\n";

  return bot(text);
  }
});

cmd.hear(/^(?:состав)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

  bot(
    `Выберите раздел:`,

    {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",

                payload: "{}",

                label: "📛 Главные администраторы",
              },

              color: "positive",
            },
          ],

          [
            {
              action: {
                type: "text",

                payload: "{}",

                label: "〽️ Администраторы",
              },

              color: "positive",
            },
          ],

          [
            {
              action: {
                type: "text",

                payload: "{}",

                label: "♻️ Модераторы",
              },

              color: "positive",
            },
          ],

        ],
      }),
    }
  );
}
});

cmd.hear(/^(?:lget|лимиты гет|лгет|limget)\s([0-9]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);


  let user = double.find(x => x.uid === Number(message.args[1]));
  if (!user) return bot(`Не нашёл такого игрока 🌧️`);

  return bot(`Лимиты игрока @id${user.id} (${user.tag}) ☃️

✍️ Лимит ник-нейма: ${user.limit.nicklimit} сим-ов
💳 Лимит банка: ${utils.sp(user.limit.banklimit)}$
💵 Лимит передачи: ${utils.sp(user.limit.playerlimit)}$
🔋 Лимит ферм: ${utils.sp(user.limit.farmlimit)} шт.
📼 Лимит видеокарт: ${utils.sp(user.limit.videocardlimit)} шт.

❓ Чтобы узнать подробную статистику игрока введите «Гет [ID игрока]» 😁`);
});

cmd.hear(/^(?:логи)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);


  const userId = message.args[1];

  if (!log[userId] || log[userId].length < 10) {
    return bot(`Пользователь должен отправить минимум 10 сообщений. 📉`);
  }

  if (!message.isChat) return bot(`Команда работает только в беседе бота! ❌`);

  let logs = log[userId];
  let logMessages = logs.slice(-10).map(logEntry => {
    return `${logEntry.time} ⏰ — ${logEntry.msg}`; // Просто используем строку времени
  }).join('\n'); // Берем последние 10 логов

  return bot(`Логи игрока «№${userId}» ✉️💬\n\n${logMessages}`);
});

cmd.hear(/^(?:список|списки|чаты)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);


  // Фильтруем чаты с валидными ID
  const filteredChats = chats.filter(chat => chat.id !== undefined);

  // Формируем список с иконками статусов
  const chatList = filteredChats.map(chat => {
    let statusIcon = '❓'; // По умолчанию
    let statusText = 'неизвестный';
    
    switch(chat.type) {
      case 1:
        statusIcon = '💬';
        statusText = 'ИГРОВОЙ';
        break;
      case 2:
        statusIcon = '💰';
        statusText = 'DOUBLE';
        break;
      case 4:
          statusIcon = '🅰';
          statusText = 'АДМИНИСТРАЦИЯ';
          break;
      case 5:
        statusIcon = '🚫';
        statusText = 'БАН';
        break;
      default:
        statusIcon = '❓';
        statusText = 'неизвестный';
    }
    
    return `${statusIcon} #${chat.id} - ${statusText}`;
  }).join("\n");

  // Формируем заголовок с количеством чатов
  const header = `📋 Список чатов (всего: ${filteredChats.length}):`;
  
  return bot(`${header}\n${chatList || "Нет доступных чатов"}`);
});

cmd.hear(/^(?:Get case|get case|gs)\s([0-9]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);



  let user = double.find(x => x.uid === Number(message.args[1]));
  if (!user) return bot(`Не нашёл такого игрока 🌧️`);

  return bot(`Кейсы игрока @id${user.id} (${user.tag}) ☃️

✍️ обычный кейс: ${user.c1 || 0} шт
🏆 золотой кейс: ${user.c2 || 0} шт
💖 донат-кейс: ${user.c3 || 0} шт
🏎️ Starr Drop: ${user.c4 || 0} шт
🎃 Halloween кейс: ${user.c5 || 0} шт
🔒 секретный кейс: ${user.c6 || 0} шт
🎶 автозвук кейс: ${user.c7 || 0} шт
🎄 новогодний кейс: ${user.c8 || 0} шт
🌟 премиум кейс: ${user.c9 || 0} шт
🚀 ультра кейс: ${user.c10 || 0} шт
👑 админ кейс: ${user.c11 || 0} шт

💎 Редкий Starr Drop: ${user.c12 || 0} шт
✨ Сверхредкий Starr Drop: ${user.c13 || 0} шт
🔮 Эпический Starr Drop: ${user.c14 || 0} шт
🌟 Мифический Starr Drop: ${user.c15 || 0} шт
💫 Легендарный Starr Drop: ${user.c16 || 0} шт
`);
});

cmd.hear(/^(?:вкластатус)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

    const keyboard = JSON.stringify({
      inline: true,
      buttons: [
        [{
          action: {
            type: "text",
            payload: { command: `выкластатус` },
            label: `передумал`
          },
          color: "negative"
        }]
      ]
    });

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
    ]);

    if (message.user.settings.adm < 1)
      return bot(`🚫 У вас отсутствует привилегия 🛠️ «Модератор или выше»! 🔹✨`);

    message.user.settings.astat = true;

    return bot(`🎉 Поздравляем! Вы включили админский статус! ${smileng} 🚀`, { keyboard });
  
});

cmd.hear(/^(?:выкластатус)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);



    const keyboard = JSON.stringify({
      inline: true,
      buttons: [
        [{
          action: {
            type: "text",
            payload: { command: `вкластатус` },
            label: `хочу статус включить`
          },
          color: "positive"
        }]
      ]
    });

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
    ]);

    if (message.user.settings.adm < 1)
      return bot(`🚫 У вас отсутствует привилегия 🛠️ «Модератор или выше»! 🔹✨`);

    message.user.settings.astat = false;

    return bot(`выключил админский статус! ${smileng}`, { keyboard });

});

cmd.hear(/^(?:сетник)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }

  const groupId = groupInfo[0].id;


  let user = double.find(x => x.uid === Number(message.args[1]));
  if (!user) return bot(`пользователь не найден.`);


  let newNickname = message.args[2].trim();

  if (!newNickname) {
    newNickname = "Нарушение Ника"; // Никнейм по умолчанию
    user.tag = newNickname;
    return bot(`никнейм не указан, установлен никнейм по умолчанию: "${newNickname}".`);
  }

  user.tag = newNickname;

  await bot(`вы изменили никнейм пользователя на "${newNickname}".`);
}
});

cmd.hear(/^(?:апроф|админ профиль)$/i,async (message, bot) => {
      if (message.user.settings.adm < 1)
        return bot(`доступна для модератора и выше`);

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
      ]);
      let role = message.user.settings.adm
        .toString()
        .replace(/1/gi, "🔧 Модератор")
        .replace(/2/gi, "🛠️ Администратор")
        .replace(/3/gi, "👑 Главный администратор")
        .replace(/4/gi, "📈 Заместитель владельца") 
        .replace(/5/gi, "🏆 Владелец");
      if (message.user.settings.adm > 5) {
        role = "❄ Всевышний админ";
      }
      return bot(`ваша админ-статистика: ${smileng}

🎄 Статус: ${role}
⚠️ Выговоров: [${message.user.astats.warn}/5]
📝 Отвечено репортов: ${utils.sp(message.user.astats.reports)}
😡 Выдано блокировок аккаунта: ${utils.sp(message.user.astats.bans)}
〰️ Выдано блокировок репорта: ${utils.sp(message.user.astats.rbans)}
💵 Выдано блокировок передачи: ${utils.sp(message.user.astats.pbans)}
${message.user.astats.astat
          .toString()
          .replace(/false/gi, "❌ Админ-статус: отключен")
          .replace(/true/gi, "✅ Админ-статус: включен")}
✳️ Репутация: ${utils.sp(message.user.astats.norm)}👍 | ${utils.sp(
            message.user.astats.bad
          )}👎
➖➖➖➖➖➖➖➖
💰 Выдано на баланс: ${utils.sp(message.user.astats.balance)} $
🏧 Выдано на банк: ${utils.sp(message.user.astats.bank)} $
🕒 В этом часу можно выдать: ${utils.sp(message.user.limitadd.paylimitadd)} $

🤑 Ваш админ-баланс: ${utils.sp(message.user.arubli)} ₽`);
    }
);

cmd.hear(/^(?:iget|игет)\s?(.*)?$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  let idp; // ID игрока (может быть VK ID или внутренний UID)
  let user; 

  // Определение ID игрока из аргументов, пересылки или ответа
  if (message.args[1]) {
    const arg = message.args[1];

    if (!isNaN(Number(arg))) {
      // Аргумент - число (может быть UID или VK ID)
      idp = Number(arg);

      // Сначала ищем по UID
      user = double.find((x) => x.uid === Number(idp));

      // Если по UID не нашли, ищем по VK ID
      if (!user) {
        user = double.find((x) => x.id === Number(idp));
      }
    } else {
      // Аргумент - ссылка
      if (!arg.match(/\|/i)) {
        const screenName = arg.replace(/^(https?:\/\/)?(m\.)?vk\.com\/?/i, "");

        try {
          const resolveResponse = await vk.api.utils.resolveScreenName({
            screen_name: screenName,
          });
          if (resolveResponse && resolveResponse.type === "user") {
            idp = resolveResponse.object_id;
          } else {
            return bot("Не удалось определить ID пользователя по ссылке.");
          }
        } catch (error) {
          console.error("Ошибка при resolveScreenName:", error);
          return bot("Ошибка при обработке ссылки. Проверьте, что ссылка верная.");
        }
      } else {
        const extractedId = arg.replace(/((\|[^]*)|(\[id))/gi, "");
        idp = Number(extractedId);
      }

      // Ищем пользователя по VK ID
      user = double.find((x) => x.id === Number(idp));
    }
  } else if (message.forwards[0] || message.replyMessage) {
    // Обработка пересылки или ответа
    idp = message.forwards[0] ? message.forwards[0].senderId : message.replyMessage.senderId;
    // Ищем пользователя по VK ID
    user = double.find((x) => x.id === Number(idp));
  } else {
    return bot(`Укажите ID игрока в боте/ссылку/пуш/перешлите сообщение`);
  }

  let txt = user.bans.ban
    ? `📛 Заблокирован до: ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${
        datka.getMonth() + 1
      }.${datka.getFullYear()}`
    : `📛 Блокировка: отсутствует`;

  // Проверка, найден ли пользователь
  if (!user) return bot(`Неверный URL игрока или ID!`);

  if (user.settings.adm >= 1) {
    // Если пользователь - администратор, выводим полную информацию
    const datka = new Date(user.bans.bantimer);

    return bot(
      `профиль администратора:

🆔 ➖ ID: ${utils.sp(user.uid)}
🔗 ➖ VK ссылка: vk.com/id${user.id}
👀 ➖ Ник: «${user.tag}»
\n♨️ ➖ Администратор ${user.settings.adm} уровня
👤 ➖ Статус: «${user.stock.status}»

⚠ Админ-инфа:
♻️ ➖ Отправлено ответов: ${user.astats.reports}
🛑 ➖ Выдано банов: ${user.astats.bans}
⚠️ ➖ Предупреждений: [${user.astats.warn}/5]
🆘 ➖ Банов репорта: ${user.astats.rbans}
🚫 ➖ Банов передачи: ${user.astats.pbans}
✳️ ➖ Репутация: ${user.astats.norm}👍 | ${user.astats.bad}👎

✅ ➖ Выдано денег: ${utils.sp(user.astats.balance)} $
💳 ➖ Выдано на банк: ${utils.sp(user.astats.bank)} $

${txt}

⏳ ➖ Дата регистрации: ${user.regDate}
      `
    );
  } else {
    // Если пользователь - не администратор, выводим базовую информацию
    return bot(`
      не администратор
🆔 ➖ ID: ${utils.sp(user.uid)}
🔗 ➖ VK ссылка: vk.com/id${user.id}
👀 ➖ Ник: «${user.tag}»
${txt}
\n 
`);
  }
});

cmd.hear(/^(?:get|гет)\s?(.*)?$/i, async (message, bot) => {
  if (
    message.user.settings.premium !== true &&
    message.user.settings.titan !== true &&
    message.user.settings.adm < 1
  )
    return bot(`Доступно только PREMIUM, TITAN, Модератор или выше`);

  let userId;
  let user;

  if (message.args[1]) {
    const arg = message.args[1];
    if (!isNaN(Number(arg))) {
      userId = Number(arg);
      user = double.find((x) => x.uid === userId) || double.find((x) => x.id === userId);
    } else {
      let screenName = arg.replace(/^(https?:\/\/)?(m\.)?vk\.com\/?/i, "");
      try {
        const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
        if (resolveResponse?.type === 'user') userId = resolveResponse.object_id;
      } catch (error) {
        console.error("Ошибка resolveScreenName:", error);
        return bot("Ошибка при обработке ссылки.");
      }
      user = double.find((x) => x.id === userId);
    }
  } else if (message.forwards[0] || message.replyMessage) {
    const senderId = message.forwards[0]?.senderId || message.replyMessage?.senderId;
    user = double.find((x) => x.id === senderId);
  } else {
    return bot(`Укажите ID/ссылку/пересылку`);
  }

  if (!user) return bot(`Игрок не найден`);
  if (user.antiget) return bot(`У игрока антигет.`);

  let text = ``;

  // Основная информация
  text += `🆔 ID: ${user.uid}\n`;
  text += `🔘 ВК ID: ${user.id} | Ссылка: vk.com/id${user.id}\n`;
  text += `🔥 Ник: «${user.tag}»\n`;

  // Клан
  if (user.clanid) text += `⚔️ Клан: ${clans[user.clanid].name}\n`;

  // Статусы
  if (user.settings.imperator) text += `👑 IMPERATOR 👑\n`;
  if (user.settings.topdon) text += `🎉 D🌟O💖N 🎊\n`;
  if (user.settings.vip) text += `👑 VIP статус\n`;
  if (user.settings.premium) text += `👑 Premium статус\n`;
  if (user.settings.titan) text += `👑 Titan статус\n`;
  if (user.settings.joker) text += `🃏 Джокер\n`;
  if (user.settings.busi) text += `🤵 Бизнесмен\n`;
  if (user.settings.king) text += `🌈 КОРОЛЬ 🌈\n`;

  // Уровень и валюты
  text += `\n🔅 Уровень: «${user.levl}»\n`;
  text += `\n💳 Валюты:\n`;
  text += `💰 Наличными: ${utils.sp(user.balance)} ${val1}\n`;
  if (user.bank > 0) text += `💳 В банке: ${utils.sp(user.bank)} ${val1}\n`;
  if (user.btc > 0) text += `🌐 Биткоины: ${utils.sp(user.btc)} BTC\n`;
  if (user.balance2 > 0) text += `💸 ${utils.sp(user.balance2)} ${val4}\n`;

  // Статистика
  if (user.rating > 0) text += `\n👑 Рейтинг: ${utils.sp(user.rating)}\n`;
  text += `⚡ Энергия: ${user.energy}\n`;
  if (user.opit > 0) text += `〽️ Опыт: ${utils.sp(user.opit)}\n`;

  // Имущество
  let propertyText = '';
  if (user.transport.car) 
    propertyText += `⠀🚗 ${cars[user.transport.car - 1]?.name || 'Неизвестно'}\n`;
  if (user.transport.yacht) 
    propertyText += `⠀🛥 ${yachts[user.transport.yacht - 1]?.name || 'Неизвестно'}\n`;
  if (user.transport.airplane) 
    propertyText += `⠀🛩 ${airplanes[user.transport.airplane - 1]?.name || 'Неизвестно'}\n`;
  if (user.transport.helicopter) 
    propertyText += `⠀🚁 ${helicopters[user.transport.helicopter - 1]?.name || 'Неизвестно'}\n`;
  if (user.realty.home) 
    propertyText += `⠀🏠 ${homes[user.realty.home - 1]?.name || 'Неизвестно'}\n`;
  if (user.realty.apartment) 
    propertyText += `⠀🌇 ${apartments[user.realty.apartment - 1]?.name || 'Неизвестно'}\n`;
  if (user.misc.phone) 
    propertyText += `⠀📱 ${phones[user.misc.phone - 1]?.name || 'Неизвестно'}\n`;
  if (user.misc.computer) 
    propertyText += `⠀🖥 ${computers[user.misc.computer - 1]?.name || 'Неизвестно'}\n`;
  if (user.misc.farm) 
    propertyText += `⠀🔋 Ферма: ${utils.sp(user.misc.farm_count)} шт.\n`;

  if (propertyText) text += `\n🔑 Имущество:\n${propertyText}`;

  // Бизнесы
  if (user.business && user.business.length > 0) {
    text += `\n🏢 Бизнесы:\n`;
    user.business.forEach(biz => {
      const bizInfo = businesses[biz.id - 1]?.[biz.upgrade - 1];
      if (bizInfo) text += `⠀${bizInfo.name}\n`;
    });
  }

  // Звезды
  let starsText = '';
  if (user.stars1) starsText += `⠀☀ Солнце\n`;
  if (user.stars2) starsText += `⠀🌠 Сириус\n`;
  if (user.stars3) starsText += `⠀🛑 Красный гигант\n`;
  if (user.stars4) starsText += `⠀🧬 Плазмовый гигант\n`;
  if (user.stars5) starsText += `⠀💰 Донатный гигант\n`;
  if (starsText) text += `\n🌠 Звезды:\n${starsText}`;

  // Прочая информация
  text += `\n📆 Дата регистрации: ${user.regDate}`;
  text += `\n🔌 Последняя активность: ${user.aktiv}`;

  // Бан информация
  if (user.bans.ban) {
    const banDate = new Date(user.bans.bantimer);
    text += `\n📛 Заблокирован до: ${banDate.toLocaleString()}`;
  } else {
    text += `\n📛 Блокировка: отсутствует`;
  }

  return bot(`Профиль игрока [id${user.id}|${user.tag}]:\n${text}`, {
    attachment: user.photo,
    keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": JSON.stringify({command: "топик"}),
            "label": "👀 Аниме"
          },
          "color": "positive"
        }]
      ]
    })
  });
});

cmd.hear(/^(?:бонус разбан)\s?([0-9]+)?/i, async (message, bot) => {

    if (message.user.settings.adm < 1)
      return bot(`доступна для модератора и выше`);

    if (!message.isChat || message.chat.type !== 4) {
      return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
    }
  
    if (message.chat.type === 4) {

    let userId = Number(message.args[1]);
   
    
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`пользователь с ID ${userId} не найден.`);
    }

    // Запретить бонус
    user.bans.bonus = false;
    
    return bot(`бонус для пользователя ${user.tag} был включен. ✅`);
  }
  });

cmd.hear(/^(?:бонус бан)\s?([0-9]+)?/i, async (message, bot) => {
   
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

        if (message.user.settings.adm < 5) return;

        let userId = Number(message.args[1]);

        let user = double.find(x => x.uid === userId);

        if (!user) {
            return bot(`пользователь с ID ${userId} не найден.`);
        }

        user.bans.bonus = true;

        return bot(`бонус для пользователя ${user.tag} был отключен. 🚫`);
    }
});

cmd.hear(/^(?:unblocktop|разбантоп)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

    let userId = parseInt(message.args[1], 10);
    let user = double.find((x) => x.uid == userId);

    if (!user) return bot(`Неверный [ID] игрока`);

    if (user.bantop !== true) return message.send(`У этого игрока нет бан топа.`);

    user.bantop = false; // Снимаем бан
    user.stock.bantop = "Нет"; // Обновляем статус

    await bot(`Вы сняли бан топ у игрока ${user.tag}`);

    await vk.api.messages.send({
      user_id: user.id,
      message: `Вам сняли блокировку топа. ✅`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]
🆔 Выдал разбантоп: ${message.args[1]}`,
      random_id: 0
    });
  }
});

cmd.hear(/^(?:blocktop|бантоп)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

  if (message.chat.type === 4) {

      let user = double.find((x) => x.uid == message.args[1]);

      if (!user) return bot(`неверный [ID] игрока`);

      if (user.bantop !== false)
        return message.send(`у этого игрока уже имеется бан топа`);

      user.bantop = true;

      user.stock.bantop = "Да";

      await bot(`вы запретили игроку ${user.tag} появляться в топе.`);

      await vk.api.messages.send({
        user_id: user.id,
        message: `Вам выдали блокировку топа. ✅`,
        random_id: 0,
      });

      vk.api.messages.send({
        chat_id: chatlogi,
        message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]
🆔 Выдал бантоп: ${message.args[1]}`,
        random_id: 0
      });
    }

});

cmd.hear(/^(?:точка|раздели)\s+(.+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);
  const text = message.args[1]; 

  if (!text) {
    return message.reply("Пожалуйста, введите число после команды 'точка'.");
  }

  if (isNaN(Number(text))) {
     return message.reply("Пожалуйста введите именно число")
  }

  if (utils && utils.sp) {
    const dots = utils.sp(text);
    message.reply(`${dots}`);
  }
});

cmd.hear(/^(?:банлист)$/i, async (message, bot) => {

  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  let bannedUsers = double.filter(x => x.bans.ban);

  if (bannedUsers.length === 0) {
    return bot('✨ Список забаненных пользователей пуст! ✨');
  }

  let bannedListMessage = '🚫🛡️ Список забаненных пользователей:\n\n';

  for (const user of bannedUsers) {
    bannedListMessage += `👤 [id${user.id}|${user.tag}]\n   🔑 ID: \`${user.uid}\`\n   📜 Причина: ${user.bans.reason}\n\n`; 
  }

  bannedListMessage += '👮‍♂️ Приняты меры.';

  try {
    await bot(bannedListMessage, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error("Ошибка при отправке банлиста:", error);
    await bot("⚠️ Ошибка при формировании списка забаненных пользователей.");
  }
});

// Генерация капчи
function generateCaptcha() {
  const examples = [
    { expression: '2 + 2', answer: 2 + 2 },
    { expression: '8 + 2', answer: 8 + 2 },
    { expression: '10 - 5', answer: 10 - 5 },
    { expression: '4 * 2', answer: 4 * 2 },
    { expression: '3 * 2 + 5', answer: 3 * 2 + 5 },
    { expression: '20 / 5', answer: 20 / 5 },
    { expression: '15 + 10', answer: 15 + 10 },
    { expression: '50 - 25', answer: 50 - 25 },
    { expression: '6 * 7', answer: 6 * 7 },
    { expression: '9 / 3', answer: 9 / 3 },
    { expression: '5 + 3 * 2', answer: 5 + 3 * 2 },
    { expression: '(8 + 4) / 2', answer: (8 + 4) / 2 },
    { expression: '12 - (3 + 1)', answer: 12 - (3 + 1) },
    { expression: '2 * (3 + 4)', answer: 2 * (3 + 4) },
    { expression: '18 / (2 + 4)', answer: 18 / (2 + 4) },
    { expression: '7 * 3 - 4', answer: 7 * 3 - 4 },

  ];

  const randomExample = examples[Math.floor(Math.random() * examples.length)];
  return randomExample; 
}

cmd.hear(/^(?:вк|выдать капчу|капча выдать|выдача капчи)\s(.+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`🚫 Команда доступна только для модератора и выше`);

  let idp; // ID игрока

  // Получаем ID игрока из сообщения
  if (!message.forwards[0] && !message.replyMessage && !message.args[1]) {
    return bot(`🔍 Укажите ID игрока в боте/ссылку/пуш/перешлите сообщение`);
  }

  if (message.args[1]) {
    const arg = message.args[1];
    if (!Number(arg)) { // Если аргумент не число (ссылка или имя)
      if (!arg.match(/\|/i)) { // Если нет формата [id...]
        try {
          const res = await vk.api.utils.resolveScreenName({ screen_name: arg });
          idp = res.object_id;
        } catch (error) {
          return bot(`❌ Не удалось определить ID пользователя по ссылке/имени: ${error.message}`);
        }
      } else { // Если формат [id...]
        idp = Number(arg.replace(/(\|[^]*)|(\[id)/ig, "")); // Извлекаем ID
      }
    } else { // Если аргумент - число
      idp = Number(arg);
    }
  } else { // Если пересланное сообщение или ответ
    if (message.forwards[0]) idp = message.forwards[0].senderId;
    if (message.replyMessage) idp = message.replyMessage.senderId;
  }

  // Поиск пользователя по ID (с приведением к Number)
  const user = double.find(x => x.uid === Number(idp) || x.id === Number(idp));
  if (!user) return bot(`❌ Неверный URL игрока или ID!`);

  // Проверка наличия активной капчи
  if (user.captcha.vid !== false) return bot(`⚠️ У игрока уже есть активная капча!`);

  // Генерируем капчу в том же формате, что и в основном обработчике
  const captcha = generateCaptcha();
  user.captcha.vid = 1;
  user.captcha.otvet = captcha.answer;
  user.captcha.primer2 = captcha.expression;

  await bot(`✅ Капча игроку №${utils.sp(user.uid)} успешно выдана!\n\n🔎 Пример: ${captcha.expression}\n🎲 Ответ: ${captcha.answer}\n❓ За бессмысленную выдачу капчи игроку вы можете получить выговор. Будьте аккуратнее!`);

  return vk.api.messages.send({
    user_id: user.id,
    random_id: 0,
    message: `Подозрительная активность! ❌\nРешите пример «${captcha.expression}», и введите "капча [ответ]"` +
    ` или нажмите кнопку ниже, если вы не робот.`,
    keyboard: JSON.stringify({
      inline: true,
      buttons: [
        [
          {
            action: {
              type: "text",
              payload: JSON.stringify({ command: `капча ${captcha.answer}` }),
              label: "✅ Я не робот",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
});

let transferHistory = {}

cmd.hear(/^(?:банц|ban)\s(час)\s([0-9]+)\s([^]+)\s([0-9]+)\s(GB|\$)\s([0-9]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

    let user = double.find((x) => x.uid == message.args[2]);



    if (message.user.settings.adm <= user.settings.adm) return;

    if (!user)
        return bot(
            `проверьте тот ID, который Вы ввели, возможно, он некорректный 😡`
        );

    if (user.bans.ban !== false) return bot(`Игрок уже имеет блокировку 🚫`);
    user.bans.ban = true;
    if (message.args[3]) {
        user.bans.reason = message.args[3];
    } else {
        user.bans.reason = 'Нарушение правил';
    }
    user.bans.bantimer = Date.now() + 3600000;
    const datka = new Date(user.bans.bantimer);
    message.user.astats.bans += 1;
    message.user.bantop = true;

    const refundAmount = parseInt(message.args[4], 10) || 0;
    const refundCurrency = message.args[5];
    const senderId = parseInt(message.args[6], 10); // Получаем ID отправителя

    // Находим пользователя, которому нужно вернуть деньги
    let sender = double.find(x => x.id === senderId);

    if (!sender) {
        return bot(`Не удалось найти пользователя с ID ${senderId} для возврата средств.`);
    }

    if (refundCurrency === 'GB') {
        sender.balance2 += refundAmount;
    } else if (refundCurrency === '$') {
        //предпологаем, что bank2 - счет для долларов
        sender.bank2 += refundAmount;
    }

        // Устанавливаем resolved в true
        for (const key in transferHistory) {
          if (transferHistory.hasOwnProperty(key)) {
            transferHistory[key].forEach(transfer => {
              if (transfer.senderId === senderId && transfer.recipientId === user.id) {
                transfer.resolved = true;
              }
            });
          }
        }
        saveTransferHistory(transferHistory);

    await bot(
        `вы успешно забанили игрока @id${user.id}(${user.tag}) 🔥\n💬 Причина блокировки: ${message.args[3]}\n\n`
    );
    let refundMessage = '';
    if (refundAmount > 0) {
        refundMessage = `\n💰 Возвращено ${utils.sp(refundAmount)} ${refundCurrency} игроку @id${sender.id} (${sender.tag})`;
        // Отправляем уведомление заявителю
        try {
            await vk.api.messages.send({
                user_id: senderId,
                message: `✅ Ваша заявка на обман одобрена! Вам возвращено ${utils.sp(refundAmount)} ${refundCurrency}.`,
                random_id: 0,
            });
        } catch (error) {
            console.error(`Ошибка при отправке уведомления заявителю (ID ${senderId}):`, error);
        }
    }


    await vk.api.messages.send({
        user_id: user.id,

        message: `▶️ Ваш аккаунт был заблокирован за нарушение внутриигровых правил бота! 🚫\n\n♻️ Подробная причина от администратора: «${message.args[3]
            }»\n⏳ Блокировка действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
            }.${datka.getFullYear()} (МСК) ❌`,

        random_id: 0,
    });

    await vk.api.messages.send({
        chat_id: chatlogi,
        random_id: 0,
        message: `⚠️ ADM-LOG:

      🎅 ${message.user.settings.adm
                .toString()
                .replace(/1/gi, "Модератор")
                .replace(/2/gi, "Администратор")
                .replace(/3/gi, "Главный администратор")
                .replace(/4/gi, "Заместитель владельца")
                .replace(/5/gi, "Владелец")} @id${message.user.id} (${message.user.tag
            }) заблокировал игрока ID: ${message.args[2]
            } 😡\n⏰ Срок бана: 1 час 🚫\n♻️ Причина: ${message.args[3]} ${refundMessage}`,
    });
});
 
cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1)
    return bot(`доступна для модератора и выше`);

  if (!message.isChat || message.chat.type !== 4) {
    return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
  }

    if (message.chat.type === 4) {
        if (message.user.ochenka === undefined) {
            message.user.ochenka = false;
        }
        if (message.user.ochenka === true) {
            message.user.ochenka = false;
        }
        if (message.user.answeraccess === undefined) {
            message.user.answeraccess = true;
        } else {
            // Если доступ к ответу false, выходим
            if (message.user.answeraccess === false) return;
        }

        // Проверка прав пользователя
        if (message.user.settings.adm < 1 && !message.user.settings.agent) return;

        // Поиск пользователя по UID
        const user = double.find(x => x.uid == message.args[1]);
        if (!user) return bot(`Игрок с ID ${message.args[1]} не найден`);

        // Проверка, уже ли отвечали пользователю
        if (user.rep === false) return bot(`Игроку уже ответили! 😁`);
        user.rep = false;
        user.admid = message.user.uid; // Сохраняем UID администратора

        message.user.astats.reports += 1; // Увеличиваем количество репортов пользователя
        message.user.rubli += 1; // Увеличиваем донат-рубли

        // Подготовка сообщения для отправки пользователю
        const reportText = user.vopros ? `\nВаш репорт: «${user.vopros}»` : ""; // Получаем текст репорта
        const responseMessage = `▶️ @id${message.user.id}(ADMINISTRATOR) успешно ответил на Ваш репорт!\n\n💬 Его ответ: ${message.args[2]}${reportText} | Приятной игры 😉\n\n✳️ Для оценки работы администратора нажмите на кнопку ниже.`;

        // Отправка сообщения пользователю
        await vk.api.messages.send({
            user_id: user.id,
            random_id: 0,
            message: responseMessage,
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            "payload": {command: `оценить ${message.user.uid} положительно`},
                            "label": "👍"
                        },
                        "color": "default"
                    },
                        {
                            "action": {
                                "type": "text",
                                "payload": {command: `оценить ${message.user.uid} отрицательно`},
                                "label": "👎"
                            },
                            "color": "default"
                        }]
                ]
            })
        }).catch(error => {
            console.error(`Ошибка при отправке сообщения: ${error}`);
        });

        // Выбор случайного смайла из списка
        let smileng = utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);

        return bot(`Вы успешно ответили игроку @id${user.id} (${user.tag}) на его вопрос! 💬\n+1 донат-рубль 💵`);
    }
});

// Глобальная переменная для хранения даты последнего сброса
let lastResetDate = new Date().getMonth();

function sendMessageToUser(id, message) {
  vk.api.messages.send({
    user_id: id,
    message: message,
    random_id: 0
  }).then((response) => {
    console.log(`Отправлено сообщение пользователю ${id}: ${message}`);
  }).catch((error) => {
    console.error(`Ошибка при отправке сообщения пользователю ${id}:`, error);
  });
}


async function checkAndResetReports() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const isFirstDay = currentDate.getDate() === 1;

    if (isFirstDay && currentMonth !== lastResetDate) {
        // Сбрасываем статистику для всех админов
        double.forEach(user => {
            if (user.settings.adm >= 1) {
                const previousReports = user.astats.reports;
                user.astats.reports = 0;
                
                // Отправляем персонализированное сообщение
                if (previousReports >= 0) {
                    let message;
                                        if (previousReports === 0) {
                        message = `📊 В прошлом месяце вы ответили 0 раз. Спасибо за участие!`;
                    } 
                    if (previousReports === 1) {
                        message = `📊 В прошлом месяце вы ответили 1 раз. Спасибо за участие!`;
                    } 
                    else if (previousReports >= 2 && previousReports <= 4) {
                        message = `📊 В прошлом месяце вы ответили ${previousReports} раза. Хороший результат!`;
                    }
                    else if (previousReports >= 5 && previousReports <= 9) {
                        message = `📊 В прошлом месяце вы ответили ${previousReports} раз! Красава! Продолжайте в том же духе!`;
                    }
                    else if (previousReports >= 10) {
                        message = `📊 В прошлом месяце вы ответили ${previousReports} раз! 🔥 Вы просто крутой! Так держать!`;
                    }
                    

                    setTimeout(() => {
                        sendMessageToUser(user.id, message);
                    }, Math.random() * 5000);
                }
            }
        });
        
        lastResetDate = currentMonth;
        console.log(`Статистика ответов сброшена за новый месяц (${currentMonth + 1})`);
    }
}


 setInterval(checkAndResetReports, 1000)



cmd.hear(/^(?:топ ответы|❤ топ ответы)$/i, async (message, bot) => {


    if (message.user.settings.adm < 1)
        return bot(`доступна для модератора и выше`);

    if (!message.isChat || message.chat.type !== 4) {
        return bot(`доступно в беседе АДМИНИСТРАЦИИ.`);
    }

    let top = [];

    double
        .filter((x) => x.settings.adm >= 1)
        .map((x) => {
            top.push({
                reports: x.astats.reports,
                tag: x.tag,
                id: x.id,
                mention: x.mention,
            });
        });

    top.sort((a, b) => b.reports - a.reports);

    let text = ``;
    const maxTopEntries = Math.min(10, double.filter((x) => x.settings.adm >= 1).length);

    const find = () => {
        for (let i = 0; i < top.length; i++) {
            if (top[i].id === message.senderId) return i;
        }
        return 100;
    };

    for (let i = 0; i < maxTopEntries; i++) { 
        if (!top[i]) break;

        const user = top[i];
        text += `\n${i === maxTopEntries - 1 ? `&#128287;` : `${(i + 1).toString().padStart(2, '0')}&#8419;`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 🏆${utils.sp(user.reports)} ответов`;
    }

    return bot(`топ ответов:${text}
        ➖➖➖➖➖➖➖➖
➡${utils.gi(find() + 1)} ${message.user.tag} — 🏆${utils.sp(
        message.user.astats.reports
    )} ответов`);
});

module.exports = commands;
