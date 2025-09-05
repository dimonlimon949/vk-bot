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

const tokensFilePath5 = './настройки/ссылки чатов.json';

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

function getToken5() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath5, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData4 = getToken4(); 

const spoler = tokenData4;

const chatlogi = tokenData.chatlogi; // чат для логов 
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 
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
const tokenData5 = getToken5(); 
let sallka = tokenData5.titan

function getRandomWithRare(min, max) {
  // Проверяем, чтобы min было меньше max
  if (min >= max) {
    throw new Error("min должен быть меньше max");
  }

  const rand = Math.random(); // Получаем случайное число от 0 до 1

  if (rand < 0.02) { // Шанс 5% на число 3
    return 3;
  } else if (rand < 0.03) { // Шанс 2% на число 4 (5% + 2% = 7%)
    return 4;
  } else {
    // Оставшиеся 93% случаев - обычное распределение между min и max
    const remainingRange = max - min + 1 - 2; // Учитываем исключенные 3 и 4
    let randomNumber = Math.floor(Math.random() * remainingRange) + min;

    // Если randomNumber >= 3, пропускаем 3
    if (randomNumber >= 3) {
      randomNumber++;
    }
    // Если randomNumber >= 4, пропускаем 4
    if (randomNumber >= 4) {
      randomNumber++;
    }

    return randomNumber;
  }
}


cmd.hear(/(?:кейсы|📦 Список кейсов|📦 Кейсы 🎰|@chakobot 📦 Кейсы|📦 Кейсы)$/i, async (message, bot) => {
  console.log('Команда "Кейсы" вызвана');

  if (!message.isChat || message.chat.type === 1) {
      //Считываем базу данных каждый раз
      double = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));

      const userId = message.user.id; // Сохраняем id пользователя, вызвавшего команду
      console.log(`ID пользователя, вызвавшего команду: ${userId}`);

      const userUid = message.user.uid; // Получаем uid пользователя, вызвавшего команду
      console.log(`UID пользователя, вызвавшего команду: ${userUid}`);

      const user = double.find((x) => x.uid === userUid); // Ищем пользователя по uid
      console.log(`Найден пользователь: ${user ? 'Да' : 'Нет'}`);

      let text = `📦 Ваши кейсы:`;

      if (message.user.c1 == 0) {

        if (message.user.c2 == 0) {

            if (message.user.c3 == 0) {

                if (message.user.c4 == 0) {

                    if (message.user.c5 == 0) {

                        if (message.user.c6 == 0) {

                            if (message.user.c7 == 0) {

                                if (message.user.c8 == 0) {

                                    if (message.user.c9 == 0) {

                                        if (message.user.c10 == 0) {

                                            if (message.user.c11 == 0) {

                                                if (message.user.c12 == 0) {

                                                    if (message.user.c13 == 0) {

                                                        if (message.user.c14 == 0) {

                                                            if (message.user.c15 == 0) {

                                                                if (message.user.c16 == 0) {

                                                                    text += `У вас нет кейсов.\n`;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
      if (message.user.c1 > 0) {
          text += `\n🔹 1. Обычный Кейс (${utils.sp(message.user.c1)} шт.)`;
      }

      if (message.user.c2 > 0) {
          text += `\n🔹 2. Золотой Кейс (${utils.sp(message.user.c2)} шт.)`;
      }

      if (message.user.c3 > 0) {
          text += `\n🔹 3. Донат-кейс (${utils.sp(message.user.c3)} шт.)`;
      }

      if (message.user.c4 > 0) {
          text += `\n🔹 4. Starr Drops (${utils.sp(message.user.c4)} шт.)`;
      }

      if (message.user.c5 > 0) {
          text += `\n🔹 5. Halloween кейсов (${utils.sp(message.user.c5)} шт.)`;
      }

      if (message.user.c6 > 0) {
          text += `\n🔹 6. Секретных кейсов (${utils.sp(message.user.c6)} шт.)`;
      }

      if (message.user.c7 > 0) {
          text += `\n🔹 7. Автозвук кейсов (${utils.sp(message.user.c7)} шт.)`;
      }

      if (message.user.c8 > 0) {
          text += `\n🔹 8. Новогодних кейсов (${utils.sp(message.user.c8)} шт.)`;
      }

      if (message.user.c9 > 0) {
          text += `\n🔹 9. Премиум кейсов (${utils.sp(message.user.c9)} шт.)`;
      }

      if (message.user.c10 > 0) {
          text += `\n🔹 10. Ультра кейсов (${utils.sp(message.user.c10)} шт.)`;
      }

      if (message.user.c11 > 0) {
          text += `\n🔹 11. Админ кейсов (${utils.sp(message.user.c11)} шт.)`;
      }

      if (message.user.c12 > 0) {
          text += `\n🔹 12. Редкий Starr Drops (${utils.sp(message.user.c12)} шт.)`;
      }

      if (message.user.c13 > 0) {
          text += `\n🔹 13. Сверхредкий Starr Drops (${utils.sp(message.user.c13)} шт.)`;
      }

      if (message.user.c14 > 0) {
          text += `\n🔹 14. Эпический Starr Drops (${utils.sp(message.user.c14)} шт.)`;
      }

      if (message.user.c15 > 0) {
          text += `\n🔹 15. Мифический Starr Drops (${utils.sp(message.user.c15)} шт.)`;
      }

      if (message.user.c16 > 0) {
          text += `\n🔹 16. Легендарный Starr Drops (${utils.sp(message.user.c16)} шт.)`;
      }

      text += `\n❓ Покупка: «Кейс [номер] [кол-во]» ❄️\n🔑 Открыть кейс: «Кейс открыть [номер]» 🔥`;
      console.log("Перед отправкой сообщения боту текст" + text);

      return bot(`кейсы:

📦 1. Обычный Кейс — 20.000.000 ${val1}
📦 2. Золотой Кейс — 50.000.000 ${val1}
📦 3. Донат-кейс — 50 руб.

${text}`);
  }
});

cmd.hear(/^(?:📦 кейс открыть 1|кейс открыть 1)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

  if (message.user.c1 < 1) return bot(`У Вас нет «Обычного кейса» ❌`)

  message.user.c1 -= 1

  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  let rand = utils.random(1, 4)

  if (rand == 1) {

    let bon = utils.random(1, 30)

    bon *= 1000000

    message.user.balance += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val1} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 1" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    let bon = utils.random(10, 100)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта! 🏆`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 1" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {

    let bon = utils.random(1, 60)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 1" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 4) {

    let bon = utils.random(1, 300)

    message.user.btc += bon

    return bot(`Вы выиграли ${utils.sp(bon)} биткоинов! 🌐`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 1" },

          "color": "positive"

        }],]

      })

    })

  }
}
});


cmd.hear(/^(?:кейс открыть 2|📦 кейс открыть 2)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

  if (message.user.c2 < 1) return bot(`У вас нет «Золотого кейса» ❌`)

  message.user.c2 -= 1
  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  let rand = utils.random(1, 3)

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
   await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  if (rand == 1) {

    let bon = utils.random(1, 70)

    bon *= 1000000

    message.user.balance += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val1} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 2" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    let bon = utils.random(500, 4500)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта! 📈`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 2" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {

    let bon = utils.random(1, 65)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 2" },

          "color": "positive"

        }],]

      })

    })

  }



  return bot(`вы ничего не выиграли.`, {

    keyboard: JSON.stringify({

      "inline": true,

      "buttons": [[{

        "action": { "type": "text", "payload": "{}", "label": "📦 Кейс открыть 2" },

        "color": "positive"

      }],]

    })

  })
}
});

cmd.hear(/^(?:кейс открыть 3)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {


  if (message.user.c3 < 1) return bot(`У вас нет "Донат-кейса".`)

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
      message.user.now.kv5 = true;
      message.user.balance2 += 50000;
      await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}
  
  💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
    keyboard: JSON.stringify({
      "inline": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            payload: JSON.stringify({ command: `путь новичка` }),
            "label": `👀 Путь новичка`
          },
          "color": "positive"
        }]
      ]
    })
  })
      
    }


  message.user.c3 -= 1
  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  if (typeof message.user.questdonat === "number") {

    message.user.questdonat++;

    if (message.user.questdonat >= 5) {

      message.user.questdonat = true;

      await bot(`Поздравляем, Вы 5 раз открыли донат-кейс и получаете 📦 1 Донат-кейс.`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

      message.user.c3 += 1;

    }

  } 

  if (typeof message.user.questdonat2 === "number" && message.user.questallfucker == true) {

    message.user.questdonat2++;

    if (message.user.questdonat2 >= 50) {

      message.user.questdonat2 = true;

      await bot(`Поздравляем, Вы 50 раз открыли донат-кейс и получаете 2 Донат-кейсa.`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

      message.user.c3 += 2;

    }

  } 



  let rand = getRandomWithRare(1, 15);

  if (rand == 1) {

    let bon = utils.random(1, 65)

    bon *= 1000000

    message.user.balance += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val1} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    let bon = utils.random(1, 60)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга! 📈`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {



    if (message.user.settings.vip !== false) {

      message.user.c3++;

      return bot('Вы выиграли VIP статус!\n♻️ Вы уже являетесь VIP, выдана компенсация в виде донат-кейса', {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

    }

    if (message.user.settings.premium || message.user.settings.titan) {

      message.user.settings.vip = true;

      return bot('Вы выиграли VIP статус! 🤗\n\n▶️ Узнать список всех команд VIP: «VIP help»', {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

    }

    message.user.settings.vip = true

    message.user.stock.status = "VIP"

    message.user.limit.nicklimit = 21

    message.user.level += 5

    message.user.limit.banklimit = 100000000;

    message.user.limit.farmlimit = 200;

    message.user.limit.videocardlimit = 50;

    message.user.limit.playerlimit = 100000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 20;

    return bot(`Вы выиграли VIP статус! 🤗\n\n▶️ Узнать список всех команд VIP: «VIP help»`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 4) {



    if (message.user.settings.premium !== false) {

      message.user.c3++;

      return bot('Вы выиграли PREMIUM статус!\n♻️ Вы уже являетесь PREMIUM, выдана компенсация в виде донат-кейса', {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

    }

    if (message.user.settings.premium || message.user.settings.titan) {

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

      return bot('Вы выиграли Premium статус! 🤗\n\n▶️ Узнать список всех команд Premium: «Premium help»', {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

            "color": "positive"

          }],]

        })

      });

    }

  }

  if (rand == 5) {

    message.user.balance += 1000000

    return bot(`Вы выиграли 1.000.000 ${val1} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 6) {
let bon = utils.random(10, 20)
    message.user.rub += bon

    return bot(`Вы выиграли ${bon}  ${val2} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 7) {

    message.user.opit += 500

    return bot(`Вы выиграли 500 опыта! 📈`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 8) {

    message.user.c3 += 1

    return bot(`Вы выиграли Донат-кейс! 📦`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 9) {

    let bon = utils.random(1, 55)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 10) {

    message.user.opit += 3500

    return bot(`Вы выиграли 3.500 опыта! 📈`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 11) {

    let bon = utils.random(1, 55)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 12) {

    let bon = utils.random(1000, 5000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 13) {

    let bon = utils.random(3000, 15000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 14) {

    let bon = utils.random(5000, 10000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}! 👑`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 15) {

    let bon = utils.random(1, 60)

    bon *= 1000000

    message.user.balance += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val1} 💵`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 3" },

          "color": "positive"

        }],]

      })

    })

  }
}
});


cmd.hear(/^(?:кейс открыть 7)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.user.c7 < 1) return bot(`У вас нет "Кейса Автозвука".`) // (советую настроить всю команду под себя)

  message.user.c7 -= 1

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  let rand = utils.random(1, 6)

  if (rand == 1) {

    let bon = utils.random(1, 30)

    bon *= 1000000

    message.user.balance += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val1}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    let bon = utils.random(100, 1200)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {

    let bon = utils.random(1, 30)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 4) {

    return bot(`вы ничего не выиграли.`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 5) {

    message.user.balance += 4000000

    return bot(`Вы выиграли 4.000.000 ${val1}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 6) {

    message.user.balance += 0

    return bot(`Вы выиграли 0 ${val1}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 7" },

          "color": "positive"

        }],]

      })

    })

  }
}
});

cmd.hear(/^(?:кейс открыть 5)$/i, async (message, bot) => {


  if (!message.isChat || message.chat.type === 1) {
  if (message.user.c5 < 1) return bot(`У вас нет "Halloween кейса".`)

  message.user.c5 -= 1

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  let rand = utils.random(1, 8)

  if (rand == 1) {

    message.user.balance += 0

    return bot(`Вы выиграли 0 ${val1}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    if (message.user.tree == 4) {
      message.user.c5 += 1;

      return bot(`Вы выиграли Дерево, но у вас уже такое есть, мы дарим вам еще 1 кейс`, {
        

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

            "color": "positive"

          }],]

        })

      });



    }

    message.user.tree = 4;

    message.user.irrigation = 100;

    message.user.leafpribil = 100;

    return bot(`Вы выиграли безлиственное дерево`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {

    let bon = utils.random(1, 100)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 5) {

    if (message.user.business.length >= 4) {

      message.user.c5 += 1;

      return bot(`у вас уже есть 4 бизнеса, поэтому мы дарим вам еще 1 кейс`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

            "color": "positive"

          }],]

        })

      });

    }

    message.user.business2.push({

      "id": 17,

      "upgrade": 1,

      "workers": 1,

      "moneys": 0

    });

    return bot(`Вы выиграли Праздничный бизнес`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 6) {

    let bon = utils.random(1000, 1200)

    message.user.rub += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val2}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": `Обмен ${val2}` },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 7) {

    if (message.user.business2.length >= 4) {

      message.user.c5 += 1;

      return bot(`у вас уже есть 4 бизнеса, поэтому мы дарим вам еще 1 кейс`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

            "color": "positive"

          }],]

        })

      });

    }

    message.user.business2.push({

      "id": 14,

      "upgrade": 1,

      "workers": 1,

      "moneys": 0

    });

    return bot(`Вы выиграли Праздничный бизнес`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 8) {

    if (message.user.settings.premium == true) {

      message.user.c5 += 1;

      return bot(`у вас уже есть Premium поэтому мы дарим вам еще 1 кейс`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

            "color": "positive"

          }],]

        })

      });

    }



    if (message.user.settings.titan == true) {

      message.user.settings.premium = true;

      return bot(`Вы выиграли Premium`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

            "color": "positive"

          }],]

        })

      });

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

    return bot(`Вы выиграли Premium`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    });

  } else {

    return bot(`вы ничего не выиграли.`, {
      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 5" },

          "color": "positive"

        }],]

      })

    });

  }
}
});

cmd.hear(/^(?:кейс открыть 6)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.user.c6 < 1) return bot(`У вас нет "Секретного кейса".`) // (советую настроить всю команду под себя)

  message.user.c6 -= 1


  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  let rand = utils.random(1, 15)

  if (rand == 1) {

    message.user.balance += 100000000

    return bot(`Вы выиграли 100.000.000 ${val1}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 2) {

    let bon = utils.random(4000, 6000)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 3) {

    let bon = utils.random(1, 30)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 4) {

    let bon = utils.random(1000, 10000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 5) {

    let bon = utils.random(1000, 10000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 6) {

    let bon = utils.random(1000, 10000)

    message.user.rub += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 7) {

    let bon = utils.random(500, 800)

    message.user.rub += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val2}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": `Обмен ${val2}`},

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 8) {

    if (message.user.settings.premium == true) {

      message.user.c6 += 1;

      return bot(`у вас уже есть Premium поэтому мы дарим вам еще 1 кейс`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

            "color": "positive"

          }],]

        })

      });

    }



    if (message.user.settings.titan == true) {

      message.user.settings.premium = true;

      return bot(`Вы выиграли Premium`, {

        keyboard: JSON.stringify({

          "inline": true,

          "buttons": [[{

            "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

            "color": "positive"

          }],]

        })

      });

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

    return bot(`Вы выиграли Premium`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    });

  }

  if (rand == 9) {

    message.user.balance += 100000000

    return bot(`Вы выиграли 100.000.000 ${val1} `, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 10) {

    message.user.balance += 100000000

    return bot(`Вы выиграли 100.000.000 ${val1} `, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 11) {

    let bon = utils.random(4000, 6000)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 12) {

    let bon = utils.random(1, 30)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 13) {

    let bon = utils.random(1000, 3000)

    message.user.opit += bon

    return bot(`Вы выиграли ${utils.sp(bon)} опыта`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 14) {

    let bon = utils.random(1, 60)

    message.user.rating += bon

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }

  if (rand == 15) {

    let bon = utils.random(1000, 10000)

    message.user.balance2 += bon

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}`, {

      keyboard: JSON.stringify({

        "inline": true,

        "buttons": [[{

          "action": { "type": "text", "payload": "{}", "label": "Кейс открыть 6" },

          "color": "positive"

        }],]

      })

    })

  }
}
});

cmd.hear(/^(?:кейс открыть 8)$/i, async (message, bot) => {


    if (!message.isChat || message.chat.type === 1) {
  if (message.user.c8 < 1) return bot(`У вас нет "Новогоднего кейса".`); // (советую настроить всю команду под себя)

  message.user.c8 -= 1;

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  let rand = utils.random(1, 10);

  if (rand === 1) {
    let bon = utils.random(2000, 10000);

    message.user.balance2 += bon;

    return bot(`Вы выиграли ${utils.sp(bon)} ${val4}`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: { command: `Кейс открыть 8` },
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }



  if (rand === 2) {
    if (message.user.transport.car == 21) {
      message.user.c8 += 1;

      return bot(`у вас уже есть лыжи, поэтому мы дарим вам еще 1 кейс`, {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: JSON.stringify({ command: `Кейс открыть 8` }),
                  label: `📦 Открыть снова`,
                },

                color: "positive",
              },
            ],
          ],
        }),
      });
    }

    message.user.transport.car = 21;

    return bot(`Вы выиграли лыжи`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 3) {
    let bon = utils.random(1, 35);

    message.user.rating += bon;

    return bot(`Вы выиграли ${utils.sp(bon)} рейтинга`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 4) {
    message.user.balance += 50000000;

    return bot(`Вы выиграли 50.000.000 ${val1}`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 5) {
    let bon = utils.random(100, 1000);

    message.user.opit += bon;

    return bot(`Вы выиграли ${utils.sp(bon)} опыта`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: { command: `Кейс открыть 8` },
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 6) {
    return bot(`Вы выиграли нихуя`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: { command: `Кейс открыть 8` },
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 7) {
    message.user.c3 += 1;

    return bot(`Вы выиграли донат кейс`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 8) {
    message.user.c6 += 1;

    return bot(`Вы выиграли секретный кейс`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand === 9) {
    message.user.c6 += 1;

    return bot(`Вы выиграли секретный кейс`, {
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 8` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });
  }

  if (rand == 10) {

  	message.user.prazdnikbussines=true;

  	return bot(`Вы выиграли новогодний бизнес, он будет приносить вам по 500.000 $ в минуту в автоматическом режиме`,{keyboard: JSON.stringify({"inline": true,"buttons": [[{"action": {"type": "text", "payload": "{}", "label": "Кейс открыть 8"}, "color": "positive"}],]})})

  }
}
});

cmd.hear(/(?:кейс открыть 9|Открыть 🔥 Premium кейс)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.user.c9 < 1) return bot(`У вас нет "🔥 Premium-кейса".`);

  if (message.user.questallfucker && !message.user.questpremcase) {

    message.user.questpremcase = true;

    await bot(`поздравляем, вы открыли премиум кейс и получили 50.000.000 ${val1}`);

    message.user.balance += 50000000;

  }

  let rand = utils.random(1, 100)

  message.user.c9 -= 1;

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  if (rand <= 40) {

    let mon = utils.random(1, 30);

    mon = mon * 1000000;

    message.user.balance += mon;

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(mon)} ${val1}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 40 && rand <= 60) {

    let mon = utils.random(1, 100);

    mon = mon * 100;

    message.user.opit += mon;

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(mon)} опыта📈`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 60 && rand <= 70) {

    let mon = utils.random(1, 100);

    mon = mon * 1;

    message.user.rating += mon;

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(mon)} рейтинга👑`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 70 && rand <= 71) {

    let bon = utils.random(1000, 10000)

    message.user.balance2 += bon

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(bon)} ${val4}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 71 && rand <= 73) {

    let bon = utils.random(1000, 15000)

    message.user.balance2 += bon

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(bon)} ${val4}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 73 && rand <= 85) {

    let bon = utils.random(1000, 15000)

    message.user.balance2 += bon

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(bon)} ${val4}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 85 && rand <= 98) {

    let mon = utils.random(1, 500);

    mon = mon * 1;

    message.user.btc += mon;

    return bot(`🔥Вы открыли Premium-кейс и выиграли ${utils.sp(mon)} биткоинов💸`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 98 && rand <= 100) {

    try {
      for (const key in spoler) {
          if (spoler.hasOwnProperty(key)) {
              const userId = spoler[key];

              if (userId !== "" && !isNaN(parseInt(userId))) {
                  try {
                      await vk.api.messages.send({
                          user_id: userId,
                          message: `▶️ УВЕДОМЛЕНИЕ:

♻️ Игрок @id${message.user.id} (${message.user.tag}) | vk.com/id${message.senderId} выиграл TITAN 🤗`,
                          random_id: 0
                      });
                  } catch (sendError) {
                      console.error(`Ошибка при отправке сообщения пользователю ${userId}:`, sendError);
                  }
              } else {

              }
          }
      }
      console.log('Уведомления обработаны.');
  } catch (error) {
      console.error('Общая ошибка при обработке spoler:', error);
  }

    message.user.settings.titan = true;

    message.user.limit.nicklimit = 48;

    message.user.level += 50;

    message.user.opit += 5000;

    message.user.limit.banklimit = 500000000;

    message.user.limit.farmlimit = 1000;

    message.user.limit.playerlimit = 300000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 100;

    return bot(`🔥Вы открыли Premium-кейс и выиграли TITAN VIP🔥`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 9` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });



  }
}
});

cmd.hear(/(?:кейс открыть 11)$/i, async (message, bot) => {

    if (!message.isChat || message.chat.type === 1) {

  if (message.user.c11 < 1) return bot(`У вас нет "Админ-кейса".`);

  message.user.c11 -= 1;
  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  let rand = utils.random(1, 10000000);

  mon = rand * 10;

  message.user.limitadd.playerlimitadd += mon;

  return bot(`🔥Вы открыли Админ-кейс и выиграли +${utils.sp(mon)} ${val1} к выдаче\n🏆Лимит обновиться через час!`,{
    keyboard: JSON.stringify({
      inline: true,

      buttons: [
        [
          {
            action: {
              type: "text",
              payload: JSON.stringify({ command: `Кейс открыть 11` }),
              label: `📦 Открыть снова`,
            },

            color: "positive",
          },
        ],
      ],
    }),
  });
}
});

cmd.hear(/(?:кейс открыть 10|Открыть 🔥 Ультра кейс)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.user.c10 < 1) return bot(`У вас нет "🔥 Ультра-кейса".`);

  let rand = utils.random(1, 1000)

  message.user.c10 -= 1;

  if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && !message.user.now.kv5){
    message.user.now.kv5 = true;
    message.user.balance2 += 50000;
    await bot(`✔ ты открыл кейс и получаешь подарок - 50.000 ${val4}

💡 Не забывай, что каждый кейс приносит хорошие бонусы в боте!`, {
  keyboard: JSON.stringify({
    "inline": true,
    "buttons": [
      [{
        "action": {
          "type": "text",
          payload: JSON.stringify({ command: `путь новичка` }),
          "label": `👀 Путь новичка`
        },
        "color": "positive"
      }]
    ]
  })
})
    
  }

  if (message.user.otkr == undefined) {
    message.user.otkr = 0;
  }
  message.user.otkr += 1;

  if (rand <= 300) {

    let mon = utils.random(1, 30);

    mon = mon * 1000000;

    message.user.balance += mon;

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(mon)} ${val1}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 300 && rand <= 500) {

    let mon = utils.random(1, 50);

    mon = mon * 100;

    message.user.opit += mon;

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(mon)} опыта📈`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 500 && rand <= 700) {

    let mon = utils.random(1, 65);

    mon = mon * 1;

    message.user.rating += mon;

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(mon)} рейтинга 👑`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 700 && rand <= 750) {

    let mon = utils.random(1, 20);

    message.user.rubli += Number(mon);

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(mon)} рублей на донат-счет`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 750 && rand <= 780) {

    let bon = utils.random(1000, 15000)

    message.user.balance2 += bon

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(bon)} ${val4}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }



  if (rand > 780 && rand <= 820) {

    let bon = utils.random(1000, 15000)

    message.user.balance2 += bon

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(bon)} ${val4}`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 820 && rand <= 970) {

    let mon = utils.random(1, 100);

    mon = mon * 1;

    message.user.btc += mon;

    return bot(`🔥Вы открыли Ультра-кейс и выиграли ${utils.sp(mon)} биткоинов💸`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 970 && rand <= 990) {

    vk.api.messages.send({

      user_id: message.user.id,

      message: `УВЕДОМЛЕНИЕ ✅\n🔥Ссылка на Titan беседу: ${sallka} `,

      random_id: 0

    });

    try {
      for (const key in spoler) {
          if (spoler.hasOwnProperty(key)) {
              const userId = spoler[key];

              if (userId !== "" && !isNaN(parseInt(userId))) {
                  try {
                      await vk.api.messages.send({
                          user_id: userId,
                          message: `▶️ УВЕДОМЛЕНИЕ:

♻️ Игрок @id${message.user.id} (${message.user.tag}) | vk.com/id${message.senderId} выиграл TITAN 🤗`,
                          random_id: 0
                      });
                  } catch (sendError) {
                      console.error(`Ошибка при отправке сообщения пользователю ${userId}:`, sendError);
                  }
              } else {

              }
          }
      }
      console.log('Уведомления обработаны.');
  } catch (error) {
      console.error('Общая ошибка при обработке spoler:', error);
  }

    message.user.settings.titan = true;

    message.user.limit.nicklimit = 48;

    message.user.level += 50;

    message.user.opit += 50000;

    message.user.limit.banklimit = 500000000000000;

    message.user.limit.farmlimit = 10000;

    message.user.limit.playerlimit = 300000000000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 100;

    return bot(`🔥Вы открыли Ультра-кейс и выиграли TITAN VIP🔥`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }

  if (rand > 990 && rand <= 1000) {

    try {
      for (const key in spoler) {
          if (spoler.hasOwnProperty(key)) {
              const userId = spoler[key];

              if (userId !== "" && !isNaN(parseInt(userId))) {
                  try {
                      await vk.api.messages.send({
                          user_id: userId,
                          message: `▶️ УВЕДОМЛЕНИЕ:

♻️ Игрок @id${message.user.id} (${message.user.tag}) | vk.com/id${message.senderId} выиграл Донат гиганта 🤗`,
                          random_id: 0
                      });
                  } catch (sendError) {
                      console.error(`Ошибка при отправке сообщения пользователю ${userId}:`, sendError);
                  }
              } else {

              }
          }
      }
      console.log('Уведомления обработаны.');
  } catch (error) {
      console.error('Общая ошибка при обработке spoler:', error);
  }

    message.user.stars5 = true;

    return bot(`🔥вы открыли Ультра-кейс и выиграли Донатного гиганта 💰`,{
      keyboard: JSON.stringify({
        inline: true,

        buttons: [
          [
            {
              action: {
                type: "text",
                payload: JSON.stringify({ command: `Кейс открыть 10` }),
                label: `📦 Открыть снова`,
              },

              color: "positive",
            },
          ],
        ],
      }),
    });

  }
}
});

cmd.hear(/^(?:кейс 1)\s([0-9]+)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.args[1] < 0) return;

  if (message.user.inf == true) return bot(`выключите безлимитный баланс`)

  message.args[1] = Number(message.args[1])

  let s = message.args[1] * 20000000

  s = Number(s)

  if (message.user.balance < s) return bot(`у вас недостаточно денег 😔 `)

  message.user.c1 += message.args[1]

  message.user.balance -= s

  return bot(`вы успешно купили «Обычный Кейс» (${utils.sp(message.args[1])} шт.) за ${utils.sp(s)} ${val1} 💵💰`)
}
});

cmd.hear(/^(?:кейс 2)\s([0-9]+)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.args[1] < 0) return;

  if (message.user.inf == true) return bot(`выключите безлимитный баланс`)

  message.args[1] = Number(message.args[1])

  let s = message.args[1] * 50000000

  s = Number(s)

  if (message.user.balance < s) return bot(` у вас недостаточно денег 😔 `)

  message.user.c2 += message.args[1]

  message.user.balance -= s

  return bot(`вы успешно купили «Золотой Кейс» (${utils.sp(message.args[1])} шт.) за ${utils.sp(s)} ${val1} 💵💰`)
}
});

cmd.hear(/^(?:кейс 3)\s([0-9]+)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.args[1] < 0) return;

  if (message.user.inf == true) return bot(`выключите безлимитный баланс`)

  message.args[1] = Number(message.args[1])

  let s = message.args[1] * 150

  s = Number(s)

  if (message.user.rub < s) return bot(`у вас недостаточно денег 😔 `)

  message.user.c3 += message.args[1]

  message.user.rub -= s;

  return bot(`вы успешно купили «Донат Кейс» (${utils.sp(message.args[1])} шт.) за ${utils.sp(s)} ${val2} 💵💰`)
}
});


cmd.hear(/^(?:кейс 1|🗂 Обычный кейс)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
  if (message.user.balance < 20000000) return bot(` у Вас недостаточно денег 😔 `)

  if (message.user.inf == true) return bot(`Выключите безлимитный баланс`)

  message.user.c1 += 1

  message.user.balance -= 520000000

  return bot(`вы успешно купили «Обычный Кейс» (1 шт.) 📦💰`)
}
});

cmd.hear(/^(?:кейс 2|🗂 Зотолотой кейс)$/i, async (message, bot) => {

    if (!message.isChat || message.chat.type === 1) {
  if (message.user.balance < 100000000) return bot(`у Вас недостаточно денег 😔`)
  if (message.user.inf == true) return bot(`Выключите безлимитный баланс`)
  message.user.c2 += 1
  message.user.balance -= 100000000
  return bot(`вы успешно купили «Золотой Кейс» (1 шт.) 📦💰`)
}
});

cmd.hear(/^(?:кейс 3|🗂 Донат кейс)$/i, async (message, bot) => {

    if (!message.isChat || message.chat.type === 1) {

  if (message.user.rub < 250) return bot(` у Вас недостаточно денег 😔 `)

  message.user.c3 += 1

  message.user.rub -= 250

  return bot(`вы успешно купили «Донат Кейс» (1 шт.) 📦💰`)
}

});



cmd.hear(/^(?:Посылки|📦 Список посылок|📦Посылки|📦 Посылка)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (typeof message.user.possilka1 != "number") message.user.possilka1 = 0;

  if (typeof message.user.possilka2 != "number") message.user.possilka2 = 0;

  if (typeof message.user.possilka3 != "number") message.user.possilka3 = 0;

  let text = `Ваши посылки:`;

  if (message.user.possilka1 > 0) {

    text += `💵 1. Денежная посылка: (${utils.sp(message.user.possilka1)} шт.)`;

  }

  if (message.user.possilka2 > 0) {

    text += `📩 2. Элитная посылка: (${utils.sp(message.user.possilka2)} шт.)`;

  }

  if (message.user.possilka3 > 0) {

    text += `🔮 3. Премиум посылка: (${utils.sp(message.user.possilka3)} шт.)`;

  }



  return bot(`Посылки:

📦 1. Денежная посылка — 250 ЧакоРуб [15 rub]
➖ Падает: от 1.000.000 до 90.000.000 вирт💵
➖➖➖➖➖➖
📦 2. Элитная посылка - 1.000 ЧакоРуб [50 rub]
➖ Падает: от 1.000.000 до 90.000.000 вирт💵
➖ Падает: от 1 рейтинга до 100 рейтинга👑
🛑 Выпадает два предмета вместе!
➖➖➖➖➖➖
📦 3. Премиум посылка - 5.000 ЧакоРуб [100 rub]
➖ Падает: от 1.000.000 до 100.000.000 вирт💵
➖ Падает: от 1.000 до 100.000 ${val4} 👑
➖ Падает: от 500 ЧакоРуб до 10.000 ЧакоРуб⁉️
🛑 Выпадает три предмета вместе!
➖➖➖➖➖➖
📂 Открыть: Посылка открыть [номер]
🛒 Покупка за ЧакоРуб: ЧакоРуб [17/18/19]
🔹 Покупка за донат-рубли: «Донат»

${text}`);
}
});



cmd.hear(/^(?:Посылка открыть 1)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (message.user.possilka1 < 1) return bot(`🛑У вас нет данной посылки.`);

  message.user.possilka1 -= 1;

  let t = utils.random(1, 90);

  message.user.balance += t * 1000000;

  return bot(`Денежная посылка была успешно открыта!\n\n✅ ➖ Вам выпало: ${utils.sp(t * 0)} ${val1}`);

}
});

cmd.hear(/^(?:Посылка открыть 2)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (message.user.possilka2 < 1) return bot(`🛑У вас нет данной посылки.`)

  message.user.possilka2 -= 1;

  let t = utils.random(1, 90);

  let t1 = utils.random(1, 100);

  message.user.balance += t * 1000000;

  message.user.rating += t1 * 1;

  return bot(`Элитная посылка была успешно открыта!\n\n✅ ➖ Вам выпало:\n💰 Деньги: ${utils.sp(t)} ${val1}\n👑 Рейтинг: ${utils.sp(t1)}`);


}
});

cmd.hear(/^(?:Посылка открыть 3)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
  if (message.user.possilka3 < 1) return bot(`🛑У вас нет данной посылки.`)

  message.user.possilka3 -= 1;

  let t = utils.random(1, 100);

  let t1 = utils.random(1000, 100000);

  let t2 = utils.random(1, 10);

  message.user.balance += t * 1000000;

  message.user.balance2 += t1 * 1;

  message.user.rub += t2 * 500;

  return bot(`Элитная посылка была успешно открыта!\n\n✅ ➖ Вам выпало:\n💰 Деньги: ${utils.sp(t)} ${val1}\n👑 ${val4}: ${utils.sp(t1)}\n⁉️ ${val2}: ${utils.sp(t2)}`);
}
});

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

module.exports = commands;
