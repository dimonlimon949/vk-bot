  let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')
let chats = require('../database/chats.json')
let log = require('../database/log.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')
let bossinfo = require('../database/bossinfo.json')

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

let config = require('../database/settings.json');


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

const tokenu = tokenData.user

const user = new VK({
  token: tokenu
});


async function createStarPost(bot) {
  try {
    console.log('Используемый токен:', tokenData.token);

    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    console.log('Ответ от API groups.getById:', groupInfo);

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    if (config.starPostId) {
      try {
        console.log("Удаление поста:", config.starPostId, "из группы:", -groupId); // Отладочная информация
        const deleteResponse = await user.api.wall.delete({
          owner_id: -groupId,
          post_id: config.starPostId,
        });
        console.log('Ответ от API wall.delete:', deleteResponse);
      } catch (deleteError) {
        console.error('Ошибка при удалении старого поста "Постстар":', deleteError);
        console.error("Детали ошибки:", deleteError.message);
      }
    }

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `⭐ Поставь лайк этому посту и получи награду! ⭐\n\nЛайкни этот пост и получи Starr Drop!`,
      attachments: 'photo-219408161_457239472',
      access_token: tokenu
    });

    console.log('Ответ от API wall.post:', postResponse);

    const newPostId = postResponse.post_id;
    config.starPostId = newPostId;
    fs.writeFileSync('./database/settings.json', JSON.stringify(config, null, 4));

    vk.api.wall.closeComments({

      owner_id: -groupId,

      post_id: newPostId

    });

    const successMsg = `✅ Пост "Starr Drop" успешно создан! 🎉 Post ID: ${newPostId}.`;

    if (bot) {
      await bot(successMsg);
    }

    return successMsg;

  } catch (error) {
    console.error('Ошибка при создании поста "Постстар":', error);
    const errorMsg = `❌ Ошибка при создании поста "Постстар" автоматически! 😥 ${error.message}`;

    if (bot) {
      await bot(errorMsg);
    }
    return errorMsg
  }
}
// Запускаем setInterval при запуске бота
setInterval(async () => { // Добавил async
  await createStarPost(null); // Передаем null, так как нет объекта 'message' и 'bot'
}, 24 * 60 * 60 * 1000); // 24 часа * 60 минут * 60 секунд * 1000 миллисекунд



cmd.hear(/^(?:акция2)\s(вкл|выкл)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)
  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }

  const groupId = groupInfo[0].id;

  if (message.args[1] === "вкл") {
    botinfo.timerx3 = Date.now() + 86400000 * 3;
    const datka = new Date(botinfo.timerx3);
    botinfo.donx3 = true;
    vk.api.wall
      .post({
        owner_id: -groupId,

        message: `Ура, Акция x2 донат🥰

То есть если вы захотите пополнить свой баланс на 100р., вы получите 200р. ☑

📌 Это отличный способ прокачать свой аккаунт, ведь скидки в нашем боте проходят очень редко..

↗ Акция действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
          }.${datka.getFullYear()} (МСК), пополнить баланс командой: Пополнить [сумма]`,
      })
      .then((x) => {
        actionx3 = x.post_id;
      });
    return bot(
      `Акция х3 донат запущена до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК)`
    );
  }
  if (message.args[1] === "выкл") {
    botinfo.timerx3 = 0;
    botinfo.donx3 = false;
    return bot(`Акция х2 донат больше не действует.`);
  }
});

cmd.hear(/^(?:акция25)\s(вкл|выкл)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)
  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }

  const groupId = groupInfo[0].id;
  if (message.args[1] === "вкл") {
    botinfo.timer25 = Date.now() + 86400000 * 10;
    const datka = new Date(botinfo.timerx3);
    botinfo.sell25 = true;
    await vk.api.wall.post({
      owner_id: -groupId,

      message: `Ура, скидки🥰

То есть если вы захотите купить товар <<Император>> за 900р., то покупка обойдётся вам в 675р.

📌 Это отличный способ прокачать свой аккаунт, ведь скидки в нашем боте проходят очень редко..

↗ Акция действует до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
        }.${datka.getFullYear()} (МСК), пополнить баланс командой: Пополнить [сумма]`,
    });
    return bot(
      `Акция скидка 25% запущена до ${datka.getHours()}:${datka.getMinutes()}:${datka.getSeconds()} ${datka.getDate()}.${datka.getMonth() + 1
      }.${datka.getFullYear()} (МСК)`
    );
  }
  if (message.args[1] === "выкл") {
    botinfo.timer25 = 0;
    botinfo.sell25 = false;
    return bot(`Акция скидки 25% больше не действуют.`);
  }
});

cmd.hear(/^(?:босс жизни|босс хп)\s(.*)$/i, async (message) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  message.args[1] = message.args[1].replace(/([.,])/gi, "");

  message.args[1] = message.args[1].replace(/([кk])/gi, "000");

  message.args[1] = message.args[1].replace(/([мm])/gi, "000000");

  
;

  if (!Number(message.args[1])) return;

  message.args[1] = Math.floor(Number(message.args[1]));

  bossinfo.boss_max = message.args[1];
  console.log(bossinfo.boss_max)

  return message.send("✅ Жизни босса установлены!");
});

cmd.hear(/^(?:босс фото)\s(.*)$/i, async (message) => {

  if (message.user.settings.adm < 6) return bot(`для создателя`)


  bossinfo.photo = message.args[1];

  return message.send("✅ Фото босса изменено!");
});

cmd.hear(/^босс имя\s(.*)$/i, async (message) => {

  if (message.user.settings.adm < 6) return bot(`для создателя`)

  bossinfo.boss_name = message.args[1];

  return message.send("✅ Имя босса изменено!");
});

cmd.hear(/^босс приз\s([0-9]+)$/i, async (message, bot) => {

  if (message.user.settings.adm < 6) return bot(`для создателя`)

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot(`неверный ID игрока`);

  if (user.settings.imperator === false) {
    user.settings.imperator = true;
  } else {
    user.rubli += 500;
  }

  await bot(`призы выданы игроку ${user.tag}.`);

  if (user.notifications)
    await vk.api.messages.send({
      user_id: user.id,
      message: `@id${user.id}(${user.tag}), спасибо за участие в битве с боссом! 😈
✅ Вы попали в топ 10 урона по боссу, поэтому мы дарим Вам подарок — Император! Если у Вас был император, то выдано 500 рублей на донат-счёт.`,
      random_id: 0,
    });
});

cmd.hear(/^(?:босс восстановить)$/i, async (message) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)
    bossinfo.boss = bossinfo.boss_max;

    bossinfo.boss_name = bossinfo.boss_name;

    double.map((player) => {
      //player.sataka = 1;

      player.bossyr = 0;
    });

    return message.send("✅ Босс восстановлен!");
  
});

cmd.hear(/^(?:снести чат|бан чат|чат бан|чат выкл)\s*(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const chatId = parseInt(message.args[1]);
    const chat = chats.find(c => c.id === chatId);

    if (!chat) return bot(`❌ Чат #${chatId} не найден`);
    if (chat.type === 5) return bot("ℹ️ Чат уже отключен");

    chat.type = 5; // Отключаем чат

    bot(`✅ Чат #${chatId} отключён`);

  } catch (e) {
    console.error('Ошибка:', e);
    bot(`⚠️ Ошибка: ${e.message}`);
  }
});

cmd.hear(/^(?:включить чат 1|выдать обычный)\s*(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)
  
  const chatId = parseInt(message.args[1]);
  const chat = chats.find(c => c.id === chatId);
  
  if (!chat) return bot(`❌ Чат #${chatId} не найден`);
  if (chat.type === 1) return bot("ℹ️ Чат уже активен (обычный режим)");
  
  chat.type = 1;
  const activeChats = chats.filter(c => c.type !== 5).map(c => `#${c.id}`);
  
  bot(`✅ Чат #${chatId} включен в обычном режиме\n📋 Активные чаты: ${
    activeChats.join(', ')
  }`);
});

cmd.hear(/^(?:включить чат 2|выдать дабл)\s*(\d+)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)
  
  const chatId = parseInt(message.args[1]);
  const chat = chats.find(c => c.id === chatId);
  
  if (!chat) return bot(`❌ Чат #${chatId} не найден`);
  if (chat.type === 2) return bot("ℹ️ Чат уже активен (премиум режим)");
  
  chat.type = 2;
  const activeChats = chats.filter(c => c.type !== 5).map(c => `#${c.id}`);
  
  bot(`✅ Чат #${chatId} включен в премиум режиме\n📋 Активные чаты: ${
    activeChats.join(', ')
  }`);
});

cmd.hear(/^(?:постфортуна|gjcnajhneyf)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `🎂 Акция — «ФОРТУНА»! 🎉
✅ В общем будет 100 призов в акции! 🎁
🛍️ Призы:
      • 1. Секретные кейсы 🤫
      • 2. Донат-кейсы 💰
      • 3. Игровая валюта 💎
      • 4. Билеты 🎟️
      • 5. ${val4} 💾
⭐ Чтобы испытать свою удачу, напишите в комментариях «Фортуна»
❌ Если бот не отвечает - призы все равно придут. 😉`,
      attachments: 'photo-171493284_458395871',
    });

    const postId = postResponse.post_id;

    config.fortuna = postId;
    config.fortunacount = 100;
    fs.writeFileSync('./database/settings.json', JSON.stringify(config, null, 4));


    const successMsg = `✅ Пост "Фортуна" успешно создан! 🎉 Post ID: ${postId}`;
    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error('Ошибка при создании поста "Фортуна":', error);
    const errorMsg = `❌ Ошибка при создании поста "Фортуна"! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg
  }
});

cmd.hear(/^(?:постстар|gjcncnfhlf)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  return await createStarPost(bot);

});

cmd.hear(/^(?:постидея)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
      group_id: config.groupId // Добавил group_id в запрос
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `💡 Предлагайте ваши идеи! 📝

Нам важно ваше мнение! Поделитесь своими предложениями по улучшению работы бота, новым функциям, акциям и конкурсам. Ваши идеи помогут сделать бота еще лучше! 👇`,
      attachments: '',
    });

    const postId = postResponse.post_id;

    const successMsg = `✅ Пост "Предлагайте ваши идеи!" успешно создан! 🎉 Post ID: ${postId}`;

    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error("Ошибка при создании поста 'Предлагайте ваши идеи':", error);
    const errorMsg = `❌ Ошибка при создании поста 'Предлагайте ваши идеи'! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg;
  }
});

cmd.hear(/^(?:постзакрытие)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
      group_id: config.groupId // Добавил group_id в запрос
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `С сожалением 😔 сообщаем, что бот прекращает свою работу. 
      😢 Спасибо всем пользователям за поддержку 🙏 и активное использование!
      🕹️ Мы надеемся, что бот был полезен 👍 и принес вам много радости 😄.`,
      attachments: '',
    });

    const postId = postResponse.post_id;

    const successMsg = `✅ Пост "Закрытие" успешно создан! 🎉 Post ID: ${postId}`;

    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error("Ошибка при создании поста 'Предлагайте ваши идеи':", error);
    const errorMsg = `❌ Ошибка при создании поста 'Предлагайте ваши идеи'! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg;
  }
});

cmd.hear(/^(?:постнабор)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
      group_id: config.groupId 
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `🚀 Стань модератором нашего игрового бота! 🤖 Это твой шанс:

✨ Влиять на атмосферу в сообществе. 💬
🤝 Помогать другим игрокам. 💖
👑 Получить признание и уважение. 🙌
📈 Развиваться в сфере комьюнити-менеджмента. 🧠
Мы ищем ответственных и дружелюбных модераторов 🙋‍♀️🙋‍♂️, готовых помогать поддерживать порядок 🛡️ и создавать позитивную атмосферу 😊.

Почему именно вы? ✍️ Пишите в комментариях! 👇`,
      attachments: '',
    });

    const postId = postResponse.post_id;

    const successMsg = `✅ Пост "Набор" успешно создан! 🎉 Post ID: ${postId}`;

    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error("Ошибка при создании поста 'Предлагайте ваши идеи':", error);
    const errorMsg = `❌ Ошибка при создании поста 'Предлагайте ваши идеи'! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg;
  }
});

cmd.hear(/^(?:постобнова)$/i, async (message, bot) => {
  if (message.user.settings.adm < 6) return bot(`для создателя`)

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
      group_id: config.groupId
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `🛠️ Мы не стоим на месте! Полным ходом идет работа над улучшением игры. 🎮 Скоро расскажем, что нового вас ждет! 😉`,
      attachments: 'photo-229401771_457239082', // Прикрепляем фото
    });

    const postId = postResponse.post_id;

    const successMsg = `✅ Пост с информацией об обновлении успешно создан! 🎉\n\nСсылка на пост: https://vk.com/wall-${groupId}_${postId}\nPost ID: ${postId}`;

    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error("Ошибка при создании поста 'Готовим обновление':", error);
    const errorMsg = `❌ Ошибка при создании поста об обновлении! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg;
  }
});

cmd.hear(/^(?:-валюта)\s([0-9]+)\s(.*)$/i, async (message, bot) => {

    if (message.user.settings.adm < 6) return bot(`для создателя`)

    const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


    if (!hasPermission) return 
  
  
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
    
  
        user.balance -= message.args[2];
        await bot(`вы забрали у [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} ${val1}`);
          }
            try{
       vk.api.messages.send({chat_id: chatlogi, message: `🔱 Super - [id${message.user.id}|${message.user.tag}]
  🆔 Забрал у игрока - ${ Number(message.args[1])} 
  👑 Сумма ${val1} - ${utils.sp(message.args[2])} `, random_id: 0})
            }catch(e) {
    console.log('Забрали ${val4}.')
  };
});



cmd.hear(/^(?:пост|сделай пост|post)(?:\s+)?([\s\S]*)/i, async (message, bot) => {
  try {
    // Проверка прав администратора
    if (message.user.settings.adm < 6) {
      await bot("🚫 Команда доступна только администраторам");
      return;
    }

    const postText = message.args[1]?.trim();

    // Если текст не указан - показываем пример
    if (!postText) {
      const exampleText = `Пример использования:\n\nпост Привет всем!\nЭто пример многострочного поста\n\nМожно использовать эмодзи ✨`;
      
      await bot(exampleText, {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({command: "пост Тестовый пост"}),
                "label": "📝 Тестовый пост"
              },
              "color": "primary"
            }]
          ]
        })
      });
      return;
    }

    // Получаем ID группы
        const groupInfo = await vk.api.call('groups.getById', {
          access_token: tokenData.token,
          v: '5.131',
        });
    if (!groupInfo || groupInfo.length === 0) {
      await bot("❌ Не удалось получить информацию о группе");
      return;
    }

    // Публикуем пост
    const { post_id } = await vk.api.wall.post({
      owner_id: -groupInfo[0].id,
      message: postText,
      access_token: tokenData.token
    });

    // Краткий ответ
    await bot(`✅ Пост опубликован: vk.com/wall-${groupInfo[0].id}_${post_id}`);

  } catch (error) {
    console.error("Ошибка в команде пост:", error);
    await bot(`⚠️ Ошибка: ${error.message}`);
  }
});

module.exports = commands;
