let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

let chats = require('../database/chats.json')

const request = require('prequest');



let phones = require('../spisok/телефоны.js')

let botinfo = require('../database/botinfo.json')

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


function addZero(i) {
  return i < 10 ? "0" + i : i.toString();
}

function unixStampLefta(stampa) {
  stampa = stampa / 1000;
  let s = stampa % 60;
  stampa = (stampa - s) / 60;
  let m = stampa % 60;
  let text = ``;
  if (m > 0) text += addZero(Math.floor(m)) + " мин. ";
  if (s > 0) text += addZero(Math.floor(s)) + " сек.";
  return text;
}

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


let adminka = tokenData5.admin


utils.isSafeSearchTerm = (searchTerm, bannedWords) => {
	const searchTermLower = searchTerm.toLowerCase();
	return !bannedWords.some(word => searchTermLower.includes(word));
  };
  
  cmd.hear(/^(?:гиф)\s*(.*)?/i, async (message, bot) => {
	  message.user.foolder += 1;
  
	  try {
		  let searchTerm = message.args[1];
  
		  const bannedWords = ['порно', 'sex', 'эротика', 'hentai', 'porn', 'хентай', 'секс', 'ебля', 'hentai'];
		  // Расширенный список "безопасных" тем для случайного выбора
		  const safeSearchTerms = [
			'ржака', 'игры', 'каваи', 'лайфхаки', 'тян', 'крафт', 'любовь', 'аниме',
			'животные', '5 minute crafts', 'смешно', 'мем', 'классно',
			'ня', 'пикча', 'авария', 'котики', 'собаки', 'приколы', 'угар',
			'fail', 'win', 'тренды', 'новости', 'спорт', 'кино', 'сериалы',
			'музыка', 'танцы', 'комедия', 'юмор', 'art', 'дизайн', 'путешествия',
			'еда', 'рецепты', 'diy', 'хобби', 'магия', 'иллюзия', 'космос',
			'наука', 'технологии', 'образование', 'мотивация', 'психология',
			'отношения', 'семья', 'дети', 'природа', 'города', 'автомобили',
			'мода', 'стиль', 'красота', 'макияж', 'лайфстайл', 'бьюти', 'влог',
			'обзор', 'топ', 'подборка', 'челлендж', 'эксперимент', 'истории',
			'факты', 'гик', 'гейминг', 'it', 'программирование', 'роботы',
			'blockchain', 'crypto', 'nft', 'метавселенная', 'искусственный интеллект',
			'нейросети', 'deep learning', 'machine learning', 'big data',
			'интернет', 'соцсети', 'мессенджеры', 'медиа', 'вирусное видео',
			'реакция', 'развлечения', 'шутки', 'приколы с животными', 'смешные дети',
			'кулинария', 'готовка', 'выпечка', 'сладости', 'торты', 'пироги',
			'салаты', 'закуски', 'напитки', 'коктейли', 'чай', 'кофе',
			'здоровье', 'фитнес', 'спорт', 'тренировки', 'медицина', 'полезные советы',
			'саморазвитие', 'успех', 'бизнес', 'деньги', 'инвестиции',
			'путешествия', 'туризм', 'приключения', 'отдых', 'море', 'горы',
			'культура', 'искусство', 'музеи', 'выставки', 'театр', 'опера',
			'балет', 'кинофестивали', 'музыкальные фестивали', 'концерты',
			'фестивали', 'мероприятия', 'события', 'анонсы', 'реклама',
			'новости мира', 'политика', 'экономика', 'общество', 'происшествия',
			'катастрофы', 'война', 'мир', 'благотворительность', 'волонтерство',
			'окружающая среда', 'экология', 'климат', 'животный мир', 'растения',
			'ландшафт', 'фотография', 'живопись', 'графика', 'скульптура',
			'архитектура', 'дизайн интерьера', 'мебель', 'декор', 'освещение',
			'текстиль', 'посуда', 'украшения', 'аксессуары', 'авто', 'мото',
			'велосипеды', 'самокаты', 'транспорт', 'техника', 'гаджеты',
			'электроника', 'смартфоны', 'компьютеры', 'игры', 'приложения',
			'программы', 'софт', 'онлайн-сервисы', 'веб-сайты', 'порталы',
			'форумы', 'соцсети', 'блоги', 'видеохостинги', 'стриминговые сервисы',
			'облачные хранилища', 'онлайн-образование', 'курсы', 'вебинары',
			'тренинги', 'лекции', 'мастер-классы', 'уроки', 'самоучители',
			'книги', 'журналы', 'газеты', 'статьи', 'обзоры', 'рецензии',
			'аналитика', 'прогнозы', 'исследования', 'отчеты', 'статистика',
			'инфографика', 'презентации', 'конференции', 'саммиты', 'форумы'
		];
  
		  if (!searchTerm) {
			  searchTerm = utils.pick(safeSearchTerms);
		  }
  
		  if (!utils.isSafeSearchTerm(searchTerm, bannedWords)) {
			  return message.send('Извините, поиск по таким темам запрещен.');
		  }
  
		  // Улучшенный поисковый запрос: пробуем добавить разные варианты
		  const searchTerms = [
			  searchTerm + '.gif',
			  searchTerm + ' смешные.gif',
			  searchTerm + ' приколы.gif',
			  searchTerm + ' moments.gif',
		  ];
  
		  let gifItems = [];
		  for (const term of searchTerms) {
			  const response = await vk.api.call('docs.search', {
				  q: term,
				  count: 5,
			  });
			  const items = response.items.filter(x => x.ext === 'gif');
			  gifItems = gifItems.concat(items);
			  if (gifItems.length >= 5) break; // Увеличиваем до 20 для большего выбора
		  }
  
		  gifItems = gifItems.filter((item, index) => gifItems.indexOf(item) === index); // Убираем дубликаты
  
		  // Фильтруем результаты, чтобы убедиться, что они безопасны
		  gifItems = gifItems.filter(item => {
			  if (!item.title) return true; // Если нет названия, считаем безопасным
			  return utils.isSafeSearchTerm(item.title, bannedWords);
		  });
  
		  if (gifItems.length === 0) {
			  return message.send(`К сожалению, не удалось найти GIF-изображения по теме "${searchTerm}".`);
		  }
  
		  const gifsToSend = [];
		  let attempts = 0;
		  while (gifsToSend.length < Math.min(1, gifItems.length) && attempts < gifItems.length * 2) { // Добавим ограничение на количество попыток
			  attempts++;
			  let item = utils.pick(gifItems);
			  let index = gifItems.indexOf(item);
  
			  if (index === -1) continue; // Если уже удалили, пропустим
  
			  gifItems.splice(index, 1); // Удаляем, чтобы не выбрать снова
  
			  gifsToSend.push(`doc${item.owner_id}_${item.id}`);
		  }
  
		  if (gifsToSend.length === 0) {
			  return message.send(`К сожалению, все найденные GIF-изображения по теме "${searchTerm}" содержат нежелательный контент.`);
		  }
  
		  await message.send({ attachment: gifsToSend.join(',') });
  
	  } catch (error) {
		  console.error('Ошибка при поиске GIF:', error);
		  message.reply('Произошла ошибка при поиске GIF-изображений.');
	  }
  }); 

  cmd.hear(/^(?:погода|weather)\s(.*)$/i, async (message, bot) => {
    request(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(message.args[1]) +
        "&lang=ru&units=metric&appid=5d8820e4be0b3f1818880ef51406c9ee"
    )
      .then((res) => {
        const timeofday = (dt) => {
          let now = new Date(dt * 1000).getHours();
          if (now > 18) return "🌆";
          else if (now > 22 || now >= 0 && now <= 5) return "🌃";
          else if (now > 6) return "🌅";
          else if (now > 12) return "🏞";
          return "☀️"; // Default, на всякий случай
        };
  
        let sunrise = new Date(res.sys.sunrise * 1000);
        let sunset = new Date(res.sys.sunset * 1000);
  
        const fix = (e) => {
          if (e < 10) return "0" + e;
          return e;
        };
  
        var date = new Date(res.dt * 1000);
  
        return message.send(
          `${timeofday(res.dt)} ${res.name}
  ${res["weather"][0]["description"] == "ясно" ? "☀" : ""} ${
            res["weather"][0]["description"].indexOf("облачно") != -1 ? "🌫" : ""
          } Погода: ${res["weather"][0]["description"]}
  ✳ Долгота: ${res.coord.lon}°
  ✴ Широта: ${res.coord.lat}°
  🌡 Температура: ${res.main.temp} °С
  🌇 Рассвет: ${sunrise.getHours()}:${fix(sunrise.getMinutes())} (Местное время)
  🌃 Закат: ${sunset.getHours()}:${fix(sunset.getMinutes())} (Местное время)
  💨 Скорость ветра: ${res.wind.speed} м/с
  ➡ Направление ветра: ${res.wind.deg} (метереологическое)
  💧 Влажность: ${res.main.humidity}%
  ☁ Облачность: ${res.clouds.all}%
  📊 Давление: ${Math.floor(res.main.pressure / 1.33333)} ммРт.Ст
  `
        );
      })
      .catch((error) => {
        bot(`Город не найден ❌.\nПопробуйте ввести его английскими буквами.`);
      });
  });

cmd.hear(/^(?:билеты)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`у вас всего ${utils.sp(message.user.bilet)} билетов 🎟`);
  }
});


cmd.hear(/^(?:листики)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`у вас всего ${utils.sp(message.user.leaf)} листиков 🎟`);
  }
});


cmd.hear(/^(?:опыт)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`у вас всего ${utils.sp(message.user.opit)} опыта 🎟`);
  }
});


cmd.hear(/^(?:энергия)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`ваша энергия: ${utils.sp(message.user.energy)} ⚡`);
  }
});

cmd.hear(/^(?:биткоин|биткоины|битки)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    return bot(`ваши биткоины: ${utils.sp(message.user.btc)} ⚡`);
  }
});

setInterval(() => {
  chats
    .filter((x) => x.statuemoneylvl == 3)
    .map((x) => {
      x.statuemoneylvl = 3;
    });
}, 1);



cmd.hear(/^(?:моя роль)$/i, async (message) => {
    try {
        // Получаем ID чата (2000000000 + chatId)
        const peerId = 2000000000 + message.chatId;
        
        // 1. Получаем информацию о группе (боте)
        const groupInfo = await vk.api.call('groups.getById', {
            group_id: Math.abs(vk.groupId),
            v: '5.131'
        });
        
        if (!groupInfo || groupInfo.length === 0) {
            throw new Error('Не удалось получить информацию о группе');
        }
        
        const botId = -groupInfo[0].id;
        const groupName = groupInfo[0].name || `Группа ID${Math.abs(botId)}`;

        // 2. Получаем информацию о беседе
        const chatInfo = await vk.api.call('messages.getConversationMembers', {
            peer_id: peerId,
            fields: 'first_name,last_name',
            v: '5.131'
        });

        // 3. Ищем бота среди участников
        const botMember = chatInfo.items.find(item => 
            item.member_id === botId || 
            (item.member_id && Math.abs(item.member_id) === Math.abs(botId))
        );

        if (!botMember) {
            return message.reply('❌ Я не нахожусь в этой беседе. Добавьте меня в чат!');
        }

            // 2. Проверяем, что бот может отвечать
        try {
            // Простая проверка - попытка отправить сообщение
            await vk.api.call('messages.send', {
                peer_id: peerId,
                message: '.',
                random_id: Math.floor(Math.random() * 1000000)
            });
        } catch (error) {
            if (error.code === 917) {
                return message.reply('❌ У меня нет прав для работы в этом чате');
            }
            throw error;
        }

        // 3. Отправляем ответ
        await message.reply('✅ Я в этом чате и могу отвечать!');

        // 4. Определяем роль бота
        let roleText;
        if (botMember.is_owner) {
            roleText = '👑 Создатель';
        } else if (botMember.is_admin) {
            roleText = '🚀 Админ';
        } else {
            roleText = '👤 Обычный участник';
        }
        
        let response = `📌 Моя роль в беседе: ${roleText} (${groupName})`;

        // 5. Если есть права - показываем список админов
        if (botMember.is_admin || botMember.is_owner) {
            const admins = chatInfo.items.filter(m => m.is_admin || m.is_owner);
            response += `\n\n👨‍💻 Администраторы (${admins.length}):\n`;
            
            admins.forEach(admin => {
                let name;
                if (admin.member_id < 0) {
                    // Это группа
                    name = admin.member_id === botId 
                        ? groupName 
                        : `Группа ID${Math.abs(admin.member_id)}`;
                } else {
                    // Это пользователь
                    const profile = chatInfo.profiles.find(p => p.id === admin.member_id);
                    name = profile 
                        ? `${profile.first_name} ${profile.last_name}`
                        : `Пользователь ID${admin.member_id}`;
                }
                
                const role = admin.is_owner ? ' (Создатель)' : ' (Админ)';
                response += `• ${name}${role}\n`;
            });
        }

        await message.reply(response);
        
    } catch (error) {
        console.error('Ошибка при проверке роли:', error);
        let errorMsg = '⚠ Ошибка при проверке моей роли';
        
        if (error.code === 917) {
            errorMsg = 'У меня нет прав администратора в этой беседе!';
        } else if (error.code === 15) {
            errorMsg = 'Доступ к беседе запрещен!';
        } else if (error.message.includes('Не удалось получить информацию о группе')) {
            errorMsg = 'Не удалось определить мой ID группы!';
        }
        
        await message.reply(errorMsg);
    }
});




cmd.hear(
  /^(?:Правила|⚠️ Правила \(1 ч.\) ◀️|⏪ Правила №1)$/i,
  async (message, bot) => {
    return bot(
      `Общие:

* 1.1 Незнание правил не освобождает от ответственности.
* 1.2 Начав использовать бота Вы подтверждаете свое согласие с данными правилами.
* 1.3 Администрация не несет ответственности за временную или постоянную невозможность игры в бота конкретным лицом или группой лиц.
* 1.4 Ответственность несет владелец аккаунта, независимо от того, кто совершал действия под данным аккаунтом.
* 1.5 Написав боту, вы автоматически соглашаетесь на получение рассылок от бота.
* — означает то, что Вы при регистрации аккаунта уже соглашены с этими правилами.

Действия с аккаунтом:
2.1 Запрещена любая автоматизация действий в боте
⛔ Наказание: блокировка на 7 дней + частичное/полное обнуление

2.2 Запрещено предоставлять игрокам услуги, такие как продажа игровой валюты, обмен валюты между ботами, «буст» аккаунта и т.п.
⛔ Наказание: вечная блокировка,полное обнуление.

2.3 Запрещена покупка (или попытка покупки) валюты/статусов/внутриигровых предметов/«буста» аккаунта у игроков.
⛔ Наказание: вечная блокировка,полное обнуление.

2.4 Запрещен обман игроков и/или администрации.
⛔ Наказание: блокировка аккаунта на 7 дней.

2.5 Запрещено выдавать себя за администрацию проекта.
⛔ Наказание: блокировка аккаунта на 3 дня.

2.6 Запрещена продажа/покупка/передача аккаунтов (исключение: на аккаунт зашел близкий родственник).
⛔ Наказание: вечная блокировка, полное обнуление.

2.7 Запрещены махинации (попытки) оплатами.
⛔ Наказание: блокировка навсегда, полное обнуление.

2.8 Запрещено ставить титул на подобии "Администратор", "Основатель", а также в оскорбительной и рекламной форме.
⛔ Наказание: удаление титула (Повторное нарушение = блокировка на 7 дней).

2.9 Запрещено ставить оскорбительные ники, используя ненормативную лексику, или вызвать агрессию с помощью ника.
⛔ Наказание: блокировка на 7 дней.

Комментарии и беседы бота:
3.1 Запрещено оскорбление других участников и/или родителей.
⛔ Наказание: бан на 7 дней.

3.2 Запрещено рекламировать, оставлять ссылки (в том числе и гиперссылки) не относящихся к боту.
⛔ Наказание: занесение в чёрный список группы / черный список бота.

Общение:
4.1 Запрещено оскорбление/затрагивание родных.
⛔ Наказание: блокировка на 7 дней.

4.2 Запрещено оскорбление администрации.
⛔ Наказание: блокировка на 7 дней.

4.3 Запрещен флуд/спам в репорт.
⛔ Наказание: блокировка репорта на 3 дня.

4.4 Ввод в заблуждение игроков.
⛔ Наказание: блокировка (кол-во дней - по усмотрению администрации).

4.5 Склонения к самоубийству (Призывы к суициду или нанесению себе увечий)
⛔ Наказание: вечная блокировка аккаунта, занесение в ЧС группы.

4.6 Враждебные высказывания (Выражение нетерпимости к людям из-за расы, национальности, вероисповедания, гендера, сексуальной ориентации и других признаков)
⛔ Наказание: блокировка на 30 дней (Повторное нарушение = блокировка навсегда).

4.7 Призывы к травле (Призывы применять физическую силу и унижать конкретного человека)
⛔ Наказание: вечная блокировка аккаунта, занесение в ЧС группы.

4.8 Любое упоминание/пропагандирование наркотических вещ-в, сильного табака.
⛔ Наказание: блокировка на 7 дней (Повторное нарушение = блокировка на 30 дней).

Пожертвования
5.1 Оплачивая что-либо в разделе "товары", Вы помогаете проекту в развитии и обязательно получаете вознаграждение в виде ИГРОВОЙ валюты.
5.2 Администрация не возвращает пожертвования и не переносит полученное вознаграждение на другой аккаунт.
5.3 Игровая валюта не имеет никакой привязки к реальным деньгам, не имеет никакой реальной фактической стоимости и используется исключительно для использования в рамках игрового процесса.
5.4 Покупка доната только через команду "Пополнить"

⚠️ 2 часть правил по кнопке ниже! 🔜`,
      {
        keyboard: JSON.stringify({
          inline: true,
          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "⚠️ Правила (2 ч.)",
                },
                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
);

cmd.hear(
  /^(?:правила 2|правила (2ч.)|⚠️ Правила \(2 ч.\))$/i,
  async (message, bot) => {
    return bot(
      `Прочее

6.1 Запрещено преднамеренно использовать баги и недочеты бота.
⛔ Наказание: блокировка аккаунта, полное/частичное обнуление.

6.2 Запрещены попытки навредить боту или заблокировать его.
⛔ Наказание: вечная блокировка аккаунта, занесение в черный список группы.

6.3 Разжигание межнациональной розни (действия, направленные на возбуждение межнациональной или межрасовой вражды)
⛔ Наказание: вечная блокировка аккаунта, занесение в черный список группы.

6.4 Запрещено выпрашивать/требовать игровую валюту, внутриигровые предметы или иные бонусы у администрации проекта. Любые попытки оказать давление на администрацию с целью получения преимуществ будут пресекаться.
⛔ Наказание: Блокировка чата на 3 дня.

6.5 Администрация проекта оставляет за собой право заблокировать аккаунт пользователя в случае нарушения правил, представляющего угрозу для стабильной работы бота, безопасности других пользователей или репутации проекта. В большинстве случаев администрация стремится предоставить пользователю информацию о причине блокировки, однако, в целях защиты служебной информации, расследования нарушений или по другим обоснованным причинам, администрация не обязана раскрывать все детали, приведшие к блокировке.
⛔ Наказание: Блокировка на срок, определяемый администрацией в соответствии с тяжестью нарушения и данными правилами.

6.6 В исключительных случаях, при наличии серьезных доказательств грубого нарушения правил или действий, наносящих значительный ущерб проекту, администрация имеет право применить санкции, не предусмотренные данными правилами. Обоснование для применения таких санкций должно быть задокументировано. 
⛔ Наказание: Решение принимается администрацией индивидуально, с учетом тяжести нарушения и последствий.

6.7 Решения о снятии блокировок и смягчении наказаний принимаются администрацией на основе анализа ситуации и имеющихся доказательств. Попытки обмана администрации, манипуляции информацией или создание ложных обвинений приведут к усилению наказания.
⛔ Наказание: Отказ в снятии блокировки/смягчении наказания, увеличение срока блокировки, вплоть до вечной блокировки.

6.8 Любые попытки обойти систему наказаний (например, создание новых аккаунтов для уклонения от блокировки) строго запрещены.
⛔ Наказание: Вечная блокировка всех связанных аккаунтов.
`,
      {
        keyboard: JSON.stringify({
          inline: true,
          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: "{}",
                  label: "⚠️ Правила (1 ч.) ◀️",
                },
                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
);



cmd.hear(/^(?:квесты|квест|🎉 Квесты)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (message.user.questcasino == true && message.user.questcup == true && message.user.questrussion == true && message.user.questracer == true && message.user.questdonat == true && message.user.questminer == true && message.user.questhack == true && message.user.questclan == true && message.user.questautosound == true && message.user.questfollow == true && message.user.questdamagedealer == true && message.user.questbosspower == true && message.user.questallfucker == false) {
      await bot(`Вы выполнили все квесты и получаете секретный кейс`);
      message.user.c6 += 1;
      message.user.questallfucker = true;
    }

    let text = ``;

    if (!message.user.questallfucker) {
      text += message.user.questcasino === true ? `✅` : `❌`;
      text += ` 5 раз выиграть в казино\n🎁 Приз: 1 донат кейс\n\n`;

      text += message.user.questcup === true ? `✅` : `❌`;
      text += ` 20 раз открыть Starr Drops\n🎁 Приз: 1 секретный кейс\n\n`;

      text += message.user.questrussion === true ? `✅` : `❌️`;
      text += ` 50 раз передать игрокам валюту\n🎁 Приз: 5 Starr Drops\n\n`;

      text += message.user.questracer === true ? `✅` : `❌`;
      text += ` 15 раз участвовать в гонке\n🎁 Приз: 1 донат-кейс\n\n`;

      text += message.user.questdonat === true ? `✅` : `❌`;
      text += ` Открыть 5 донат-кейсов\n🎁 Приз: 1 донат-кейс\n\n`;

      text += message.user.questminer === true ? `✅` : `❌️`;
      text += ` 50 раз копать руду\n🎁 Приз: 1 донат-кейс\n\n`;

      text += message.user.questbrak === true ? `✅` : `❌`;
      text += ` Купить бизнес на ${val4}\n🎁 Приз: 200 рейтинга \n\n`;

      text += message.user.questfollow === true ? `✅` : `❌️`;
      text += ` Подписаться на группу\n🎁 Приз: 25.000.000 ${val1}\n\n`;

      text += message.user.questdamagedealer === true ? `✅` : `❌️`;
      text += ` Нанести 100тыс. урона боссу\n🎁 Приз: 150.000.000 ${val1}\n\n`;

      text += message.user.questbosspower === true ? `✅` : `❌`;
      text += ` Прокачать силу удара (босса) до 200\n🎁 Приз: 2.000.000.000 ${val1}\n\n`;

      text += message.user.questallfucker === true ? `✅` : `❌`;
      text += ` Пройти все квесты\n🎁 Приз: 1 секретный кейс\n `;

      return bot(`одноразовые квесты:\n${text}`);
    } else {
      return bot(`скоро будет сделана 2 линия квестов`);
    }
  }
});

let donat1 = 1500
let donat2 = 500
let donat3 = 300
let donat4 = 100
let donat5 = 20
let donat6 = 30
let donat7 = 60
let donat8 = 50
let donat9 = 100
let donat10 = 150
let donat11 = 150
let donat12 = 200
let donat13 = 1000
let donat14 = 1000
let donat15 = 2000
let donat16 = 500
let donat17 = 15
let donat18 = 40
let donat19 = 70
let donat20 = 160
let donat21 = 320
let donat22 = 640
let donat23 = 1000
let donat24 = 1400
let donat25 = 2800



cmd.hear(/^(?:донат|☄️ Донат)$/i, async (message, bot) => {
  return bot(`скоро`)
  if (message.user.rubli === undefined) {
    message.user.rubli = 0;
  }
  let text = ``;
  if (botinfo.donx3) text += `\n✅ СЕЙЧАС ДЕЙСТВУЕТ Х2 ПОПОЛНЕНИЕ! 🤑`;
  if (botinfo.sell25) text += `\n😱 СЕЙЧАС ДЕЙСТВУЮТ СКИДКИ 25%`;
  if (!botinfo.sell25) {
    return bot(`донат-магазин:

👤 ➖ Привилегии:
1&#8419; Premium | ${utils.sp(donat1)} RUB
2&#8419; VIP | ${utils.sp(donat2)} RUB
3&#8419; Premium | ${utils.sp(donat3)} RUB
4&#8419; VIP | ${utils.sp(donat4)} RUB

📦 ➖ Посылки:
5&#8419; Посылка1 | ${utils.sp(donat5)} RUB
6&#8419; Посылка2 | ${utils.sp(donat6)} RUB
7&#8419; Посылка3 | ${utils.sp(donat7)} RUB

📦 ➖ Кейсы:
8&#8419; Донат-кейс | ${utils.sp(donat8)} RUB
9&#8419; Секретный-кейс | ${utils.sp(donat9)} RUB

💬 ➖ Разное:
1&#8419;0&#8419; Киностудия - 3.000.000 $/час | ${utils.sp(donat10)} RUB
1&#8419;2&#8419; Лимит ферм | ${utils.sp(donat12)} RUB
1&#8419;3&#8419; Донатный гигант | ${utils.sp(donat13)} RUB

🔥 ➖ Новые привилегии:
1&#8419;4&#8419; Император | ${utils.sp(donat14)} RUB
1&#8419;5&#8419; Джокер | ${utils.sp(donat15)} RUB
1&#8419;6&#8419; Бизнесмен | ${utils.sp(donat16)} RUB

🆕🔥 ➖ GB :
1&#8419;7&#8419; 15.000 GB | ${utils.sp(donat17)} RUB
1&#8419;8&#8419; 50.000 GB | ${utils.sp(donat18)} RUB
1&#8419;9&#8419; 100.000 GB | ${utils.sp(donat19)} RUB
2&#8419;0&#8419; 250.000 GB | ${utils.sp(donat20)} RUB
2&#8419;1&#8419; 500.000 GB | ${utils.sp(donat21)} RUB
2&#8419;2&#8419; 1.000.000 GB | ${utils.sp(donat22)} RUB
2&#8419;3&#8419; 1.500.000 GB | ${utils.sp(donat23)} RUB
2&#8419;4&#8419; 2.500.000 GB | ${utils.sp(donat24)} RUB
2&#8419;5&#8419; 5.000.000 GB | ${utils.sp(donat25)} RUB

Покупка через репорт.

💰 Ваш баланс: ${utils.sp(message.user.rubli)} руб. 💵
✅ Пополнить баланс ➤ Пополнить [число].${text}`);
  } else {
    return bot(`донат-магазин:

👤 ➖ Привилегии:
1&#8419; Администратор | 🆘 1125 RUB ВМЕСТО ${utils.sp(donat1)} RUB
2&#8419; Titan | 🆘 525 RUB ВМЕСТО ${utils.sp(donat2)} RUB
3&#8419; Premium | 🆘 375 RUB ВМЕСТО ${utils.sp(donat3)} RUB
4&#8419; VIP | 🆘 150 RUB ВМЕСТО ${utils.sp(donat4)} RUB

📦 ➖ Посылки:
5&#8419; Посылка1 | 🆘 11 RUB ВМЕСТО ${utils.sp(donat5)} RUB
6&#8419; Посылка2 | 🆘 22 RUB ВМЕСТО ${utils.sp(donat6)} RUB
7&#8419; Посылка3 | 🆘 75 RUB ВМЕСТО ${utils.sp(donat7)} RUB

📦 ➖ Кейсы:
8&#8419; Донат-кейс | 🆘 22 RUB ВМЕСТО ${utils.sp(donat8)} RUB
9&#8419; Секретный-кейс | 🆘 38 RUB ВМЕСТО ${utils.sp(donat9)} RUB

💬 ➖ Разное:
1&#8419;0&#8419; Киностудия - 3.000.000 $/час | 🆘 150 RUB ВМЕСТО ${utils.sp(donat10)} RUB
1&#8419;2&#8419; Лимит ферм | 🆘 150 RUB ВМЕСТО ${utils.sp(donat12)} RUB
1&#8419;3&#8419; Донатный гигант | 🆘 750 RUB ВМЕСТО ${utils.sp(donat13)} RUB

🔥 ➖ Новые привилегии:
1&#8419;4&#8419; Император | 🆘 675 RUB ВМЕСТО ${utils.sp(donat14)} RUB
1&#8419;5&#8419; Джокер | 🆘 750 RUB ВМЕСТО ${utils.sp(donat15)} RUB
1&#8419;6&#8419; Бизнесмен | 🆘 450 RUB ВМЕСТО ${utils.sp(donat16)} RUB

🆕🔥 ➖ GB:
1&#8419;7&#8419; 15.000 GB | 🆘 11 RUB ВМЕСТО ${utils.sp(donat17)} RUB
1&#8419;8&#8419; 50.000 GB | 🆘 34 RUB ВМЕСТО ${utils.sp(donat18)} RUB
1&#8419;9&#8419; 100.000 GB | 🆘 68 RUB ВМЕСТО ${utils.sp(donat19)} RUB
2&#8419;0&#8419; 250.000 GB | 🆘 180 RUB ВМЕСТО ${utils.sp(donat20)} RU
2&#8419;1&#8419; 500.000 GB | 🆘 353 RUB ВМЕСТО ${utils.sp(donat21)} RUB
2&#8419;2&#8419; 1.000.000 GB | 🆘 735 RUB ВМЕСТО ${utils.sp(donat22)} RUB
2&#8419;3&#8419; 1.500.000 GB | 🆘 975 RUB ВМЕСТО ${utils.sp(donat23)} RUB
2&#8419;4&#8419; 2.500.000 GB | 🆘 1800 RUB ВМЕСТО ${utils.sp(donat24)} RUB
2&#8419;5&#8419; 5.000.000 GB | 🆘 3675 RUB ВМЕСТО ${utils.sp(donat25)} RUB

Покупка через репорт.

💰 Ваш баланс: ${utils.sp(message.user.rubli)} руб. 💵
✅ Пополнить баланс ➤ Пополнить [число].${text}`);
  }
});

/*
cmd.hear(/^(?:купить)\s([\d]*)\s?([\d]*)$/i, async (message, bot) => {
  if (message.user.rubli === undefined) {
    message.user.rubli = 0;
  }

  if (Number(message.args[1]) === 1) {
    if (botinfo.sell25) {
      if (donat1 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {

      if (donat1 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    if (message.user.settings.adm > 0)
      return bot(`у вас уже есть статус администратор`);

    if (botinfo.sell25) {
      message.user.rubli -= donat1 * 0.75;
    } else {
      message.user.rubli -= donat1;
    }

    message.user.settings.adm = 1;

    message.user.bantop = true;

    message.user.stock.status = "Администратор";

    await vk.api.messages.send({
      user_id: message.senderId,

      message: `[УВЕДОМЛЕНИЕ]\n🛍 Админка выдана на аккаунт!\n🔥Ссылка на админ беседу: ${adminka} `,

      random_id: 0,
    });

    return bot(`вы приобрели [Администратор] за ${utils.sp(donat1)} рублей. 💥`);
  }

  if (Number(message.args[1]) === 2) {
    if (botinfo.sell25) {
      if (donat2 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (donat2 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    if (message.user.settings.adm >= 1)
      return bot(`Администраторам запрещено! ⛔`);

    if (botinfo.sell25) {
      message.user.rubli -= donat2 * 0.75;
    } else {
      message.user.rubli -= donat2;
    }

    message.user.settings.titan = true;

    message.user.limit.nicklimit = 48;

    message.user.level += 50;

    message.user.opit += 50000;

    message.user.limit.banklimit = 500000000;

    message.user.limit.farmlimit = 1000;

    message.user.limit.videocardlimit = 100;

    message.user.limit.playerlimit = 300000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 100;

    return bot(
      `вы приобрели [TITAN] за ${utils.sp(donat2)} рублей. 💥\n🔱 Помощь по командам - "TITAN help" `
    );
  }

  if (Number(message.args[1]) === 3) {
    if (donat3 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (donat3 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (donat3 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.settings.premium)
      return bot(`у вас уже имеется статус [Premium]. ✅`);

    if (message.user.settings.titan) {
      message.user.settings.premium = true;

      return bot(
        `вы приобрели [Premium] за ${donat3} рублей. 💥\n🔱 Помощь по командам - "Premium help". `
      );
    }
    if (botinfo.sell25) {
      message.user.rubli -= donat3 * 0.75;
    } else {
      message.user.rubli -= donat3;
    }

    message.user.settings.premium = true;

    message.user.stock.status = "Premium";

    message.user.limit.nicklimit = 32;

    message.user.opit += 5000;

    message.user.level += 35;

    message.user.bilet += 5;

    message.user.limit.banklimit = 200000000;

    message.user.limit.farmlimit = 500;

    message.user.limit.videocardlimit = 75;

    message.user.limit.playerlimit = 200000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 30;

    return bot(
      `вы приобрели [Premium] за ${donat3} рублей. 💥\n🔱 Помощь по командам - "Premium help". `
    );
  }

  if (Number(message.args[1]) === 4) {
    if (donat4 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (donat4 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (donat4 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.settings.vip > false)
      return bot(`у вас уже имеется статус [VIP]. ✅`);

    if (message.user.settings.premium || message.user.settings.titan) {
      message.user.settings.vip = true;

      return bot(
        `вы приобрели [VIP] за ${donat4} рублей. 💥\n🔱 Помощь по командам - "VIP help". `
      );
    }

    if (botinfo.sell25) {
      message.user.rubli -= donat4 * 0.75;
    } else {
      message.user.rubli -= donat4;
    }

    message.user.settings.vip = true;

    message.user.stock.status = "VIP";

    message.user.limit.nicklimit = 21;

    message.user.level += 5;

    message.user.bilet += 2;

    message.user.limit.banklimit = 100000000;

    message.user.limit.farmlimit = 200;

    message.user.limit.videocardlimit = 50;

    message.user.limit.playerlimit = 100000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 20;

    return bot(
      `вы приобрели [VIP] за ${donat4} рублей. 💥\n🔱 Помощь по командам - "VIP help". `
    );
  }

  if (Number(message.args[1]) === 5) {
    if (message.args[2]) cont = Number(message.args[2]);

    if (!message.args[2]) cont = 1;

    let sum = Math.floor(cont * 15);
    if (botinfo.sell25) {
      if (sum * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (sum > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);

    message.user.possilka1 += cont;
    if (botinfo.sell25) {
      message.user.rubli -= sum * 0.75;
    } else {
      message.user.rubli -= sum;
    }

    // sum = sum * 0.75;
    // message.user.rubli -= sum;

    return bot(
      `вы приобрели [ДЕНЕЖНУЮ ПОСЫЛКУ] за ${sum} рублей, в количестве ${cont} шт. 💥\n🔱 Открыть: Посылка открыть 1. `
    );
  }

  if (Number(message.args[1]) === 6) {
    if (message.args[2]) cont = Number(message.args[2]);

    if (!message.args[2]) cont = 1;

    let sum = Math.floor(cont * 30);

    if (sum > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (sum * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    message.user.possilka2 += cont;

    if (botinfo.sell25) {
      message.user.rubli -= sum * 0.75;
    } else {
      message.user.rubli -= sum;
    }

    // message.user.rubli -= sum;
    // sum = sum * 0.75;

    return bot(
      `вы приобрели [ЭЛИТНУЮ ПОСЫЛКУ] за ${sum} рублей, в количестве ${cont} шт. 💥\n🔱 Открыть: Посылка открыть 2. `
    );
  }

  if (Number(message.args[1]) === 7) {
    if (message.args[2]) cont = Number(message.args[2]);

    if (!message.args[2]) cont = 1;

    let sum = Math.floor(cont * 100);

    if (sum > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (sum * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    message.user.possilka3 += cont;

    if (botinfo.sell25) {
      message.user.rubli -= sum * 0.75;
    } else {
      message.user.rubli -= sum;
    }

    // sum = sum * 0.75;

    return bot(
      `вы приобрели [ПРЕМИУМ ПОСЫЛКУ] за ${sum} рублей, в количестве ${cont} шт. 💥\n🔱 Открыть: Посылка открыть 3. `
    );
  }

  if (Number(message.args[1]) === 8) {
    if (message.args[2]) cont = Number(message.args[2]);

    if (!message.args[2]) cont = 1;

    let sum = Math.floor(cont * 30);
    if (botinfo.sell25) {
      sum = sum * 0.75;
    } else {
      sum = sum;
    }
    if (botinfo.sell25) {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (sum > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);

    message.user.c3 += cont;

    if (botinfo.sell25) {
      message.user.rubli -= sum;
    } else {
      message.user.rubli -= sum;
    }

    // message.user.rubli -= sum;

    return bot(
      `вы приобрели «Донат Кейс» за ${sum} рублей, в количестве ${cont} шт. 💥\n🔱 Открыть: Кейс открыть 3. `
    );
  }

  if (Number(message.args[1]) === 9) {
    if (message.args[2]) cont = Number(message.args[2]);

    if (!message.args[2]) cont = 1;

    let sum = Math.floor(cont * 50);
    if (botinfo.sell25) {
      sum = sum * 0.75;
    } else {
      sum = sum;
    }
    if (botinfo.sell25) {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (sum > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (sum > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);

    message.user.c6 += cont;

    if (botinfo.sell25) {
      message.user.rubli -= sum;
    } else {
      message.user.rubli -= sum;
    }
    // message.user.rubli -= sum;

    return bot(
      `вы приобрели «Секретный Кейс» за ${sum} рублей, в количестве ${cont} шт. 💥\n🔱 Открыть: Кейс открыть 6. `
    );
  }

  if (Number(message.args[1]) === 10) {
    if (200 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (200 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (200 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.business.length >= 4)
      return bot(`у вас уже есть 4 бизнеса`);

    if (botinfo.sell25) {
      message.user.rubli -= 200 * 0.75;
    } else {
      message.user.rubli -= 200;
    }

    // message.user.rubli -= 200;

    message.user.business2.push({
      id: 16,

      upgrade: 1,

      workers: 7500,

      moneys: 0,
    });

    return bot(
      `вы приобрели Бизнес -- <<Киностудии по всему миру>>.\n🔱 Прибыль: 3.000.000.000.000$/час.`
    );
  }

  if (Number(message.args[1]) === 11) {
    if (250 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (250 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (250 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.business.length >= 4)
      return bot(`у вас уже есть 4 бизнеса`);

    if (botinfo.sell25) {
      message.user.rubli -= 250 * 0.75;
    } else {
      message.user.rubli -= 250;
    }
    // message.user.rubli -= 169;

    message.user.business2.push({
      id: 34,

      upgrade: 1,

      workers: 40000,

      moneys: 0,
    });

    return bot(
      `вы приобрели Бизнес -- <<Аэропорт>>.\n🔱 Прибыль: 5.000.000.000.000$/час.`
    );
  }

  if (Number(message.args[1]) === 12) {
    if (200 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (200 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (200 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 200 * 0.75;
      sum = 200 * 0.75;
    } else {
      message.user.rubli -= 200;
      sum = 200;
    }

    message.user.limit.farmlimit += 10000;

    return bot(
      `вы приобрели [ЛИМИТ ФЕРМ] за ${sum} рублей. 💥\n ✅ Ваш лимит: ${utils.sp(
        message.user.limit.farmlimit
      )}`
    );
  }

  if (Number(message.args[1]) === 13) {
    if (1000 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (1000 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (1000 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.stars5) return bot(`Вы уже купили данную звезду`);

    message.user.stars5 = true;

    // message.user.rubli -= 300;

    let sum = 0;
    if (botinfo.sell25) {
      message.user.rubli -= 1000 * 0.75;
      sum = 1000 * 0.75;
    } else {
      message.user.rubli -= 1000;
      sum = 1000;
    }

    return bot(`вы приобрели [ДОНАТНЫЙ ГИГАНТ] за ${sum} рублей. 💥`);
  }

  if (Number(message.args[1]) === 14) {
    if (900 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (900 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (900 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.settings.imperator) return bot(`Вы уже купили императора`);

    message.user.settings.imperator = true;
    message.user.limit.farmlimit = 1000000;
    message.user.limit.banklimit = 999999999999999999999999999999999999;
    // message.user.rubli -= 900;
    let sum = 0;
    if (botinfo.sell25) {
      message.user.rubli -= 900 * 0.75;
      sum = 900 * 0.75;
    } else {
      message.user.rubli -= 900;
      sum = 900;
    }

    return bot(`вы приобрели [ИМПЕРАТОР] за ${sum} рублей. 💥`);
  }

  if (Number(message.args[1]) === 15) {
    if (1000 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (1000 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (1000 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.settings.joker) return bot(`Вы уже купили джокера`);

    message.user.settings.joker = true;
    // message.user.rubli -= 1000;
    let sum = 0;
    if (botinfo.sell25) {
      message.user.rubli -= 1000 * 0.75;
      sum = 1000 * 0.75;
    } else {
      message.user.rubli -= 1000;
      sum = 1000;
    }
    return bot(`вы приобрели [ДЖОКЕР] за ${sum} рублей. 💥`);
  }

  if (Number(message.args[1]) === 16) {
    if (600 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (600 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (600 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }
    if (message.user.settings.busi) return bot(`Вы уже купили бизнесмена`);

    message.user.settings.busi = true;
    message.user.limit.banklimit = 999999999999999999999999999999999999;
    message.user.limit.farmlimit = 150000;
    // message.user.rubli -= 449;
    let sum = 0;
    if (botinfo.sell25) {
      message.user.rubli -= 600 * 0.75;
      sum = 600 * 0.75;
    } else {
      message.user.rubli -= 600;
      sum = 600;
    }

    return bot(`вы приобрели [БИЗНЕСМЕН] за ${sum} рублей. 💥`);
  }
  if (Number(message.args[1]) === 17) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (15 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (15 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 15 * 0.75;
      sum = 15 * 0.75;
    } else {
      message.user.rubli -= 15;
      sum = 15;
    }

    message.user.balance2 += 15000;

    return bot(
      `вы приобрели 15.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }
  if (Number(message.args[1]) === 18) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (45 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (45 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 45 * 0.75;
      sum = 45 * 0.75;
    } else {
      message.user.rubli -= 45;
      sum = 45;
    }

    message.user.balance2 += 50000;

    return bot(
      `вы приобрели 50.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }
  if (Number(message.args[1]) === 19) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (90 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (90 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 90 * 0.75;
      sum = 90 * 0.75;
    } else {
      message.user.rubli -= 90;
      sum = 90;
    }

    message.user.balance2 += 100000;

    return bot(
      `вы приобрели 100.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }
  if (Number(message.args[1]) === 20) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (240 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (240 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 240 * 0.75;
      sum = 240 * 0.75;
    } else {
      message.user.rubli -= 240;
      sum = 240;
    }

    message.user.balance2 += 250000;

    return bot(
      `вы приобрели 250.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }
  if (Number(message.args[1]) === 21) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (470 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (470 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 470 * 0.75;
      sum = 470 * 0.75;
    } else {
      message.user.rubli -= 470;
      sum = 470;
    }

    message.user.balance2 += 15000;

    return bot(
      `вы приобрели 500.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }

  if (Number(message.args[1]) === 22) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (980 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (980 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 980 * 0.75;
      sum = 980 * 0.75;
    } else {
      message.user.rubli -= 980;
      sum = 980;
    }

    message.user.balance2 += 1000000;

    return bot(
      `вы приобрели 1.000.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }

  if (Number(message.args[1]) === 17) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (1300 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (1300 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 1300 * 0.75;
      sum = 1300 * 0.75;
    } else {
      message.user.rubli -= 1300;
      sum = 1300;
    }

    message.user.balance2 += 1500000;

    return bot(
      `вы приобрели 1.500.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }

  if (Number(message.args[1]) === 24) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (2400 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (2400 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 2400 * 0.75;
      sum = 2400 * 0.75;
    } else {
      message.user.rubli -= 2400;
      sum = 2400;
    }

    message.user.balance2 += 2500000;

    return bot(
      `вы приобрели 2.500.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }
  if (Number(message.args[1]) === 25) {
    // if (15 > message.user.rubli) return bot(`недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`);
    if (botinfo.sell25) {
      if (4900 * 0.75 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    } else {
      if (4900 > message.user.rubli)
        return bot(
          `недостаточно рублей. \n 💡 У вас ${utils.sp(message.user.rubli)} руб`
        );
    }

    let sum = 0;
    // message.user.rubli -= 129;
    if (botinfo.sell25) {
      message.user.rubli -= 4900 * 0.75;
      sum = 4900 * 0.75;
    } else {
      message.user.rubli -= 4900;
      sum = 4900;
    }

    message.user.balance2 += 5000000;

    return bot(
      `вы приобрели 5.000.000 GB за ${sum} рублей. 💥\n ✅ Ваш баланс: ${utils.sp(
        message.user.balance2
      )}`
    );
  }


});
*/


module.exports = commands;
