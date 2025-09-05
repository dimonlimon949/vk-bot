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
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;

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



cmd.hear(/^(?:Подвал)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.realty.home === 0) {
      return bot(`У вас нет дома, чтобы иметь подвал! ❌`, {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({command: "дома"}),
                "label": "🏠 Посмотреть дома"
              },
              "color": "positive"
            }]
          ]
        })
      });
    }

    if (!message.user.realty.basement) {
      return bot(
        `Информация о Вашем подвале:\n\n🌐 Подвал используется для майнинга DogeCoin (DOG) 🪙\n💰 Цена подвала: 100 SpringCoins`, 
        {
          keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "купить подвал"}),
                  "label": "🛒 Купить подвал"
                },
                "color": "positive"
              }],
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "дома"}),
                  "label": "🏠 Вернуться к домам"
                },
                "color": "secondary"
              }]
            ]
          })
        }
      );
    }

    if (message.user.realty.basement && message.user.misc.videocard_count < 1) {
      return bot(
        `Информация о Вашем подвале:\n\n📼 У вас нет видеокарт! ❌`, 
        {
          keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "видеокарты"}),
                  "label": "🛒 Купить видеокарты"
                },
                "color": "positive"
              }]
             
            ]
          })
        }
      );
    }
 
    if (message.user.realty.basement && message.user.misc.videocard_count > 0) {
      const sell = videocards.find((x) => x.id === message.user.misc.videocard);
      const maxBalance = sell.prib * message.user.misc.videocard_count * 100;
      
      return bot(
        `Информация о Вашем подвале:\n\n📼 Ваши видеокарты:\n${sell.name} (${message.user.misc.videocard_count}шт.)\n` +
        `💰 Текущий баланс: ${utils.sp(message.user.videocard_dg)} DOG\n` +
        `🔝 Максимальный баланс: ${utils.sp(maxBalance)} DOG (100 часов)`,
        {
          keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "видеокарта снять"}),
                  "label": "💰 Снять DOGE"
                },
                "color": "positive"
              }],
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "видеокарты"}),
                  "label": "🔋 Мои видеокарты"
                },
                "color": "primary"
              }],
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "подвал"}),
                  "label": "🔄 Обновить"
                },
                "color": "secondary"
              }]
            ]
          })
        }
      );
    }
  }
});
cmd.hear(/^(?:Видеокарта снять)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.videocard) {
      return bot(`У вас нет видеокарты ❌`, {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({command: "видеокарты"}),
                "label": "🛒 Купить видеокарты"
              },
              "color": "positive"
            }]
          ]
        })
      });
    }

    if (!message.user.videocard_dg) {
      return bot(
        `На вашей видеокарте ничего нет, новые DogeCoin появятся скоро! ✅`,
        {
          keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
              [{
                "action": {
                  "type": "text",
                  "payload": JSON.stringify({command: "подвал"}),
                  "label": "🔙 К подвалу"
                },
                "color": "secondary"
              }]
            ]
          })
        }
      );
    }

    const dg_ = message.user.videocard_dg * message.user.misc.videocard_count;
    message.user.dcoins += dg_;
    message.user.videocard_dg = 0;

    return bot(
      `Вы собрали ${utils.sp(dg_)} DOG, следующие появятся через час. ⌚\n` +
      `🪙 Баланс DOG: ${utils.sp(message.user.dcoins)}`,
      {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({command: "продать догекоин"}),
                "label": "💰 Продать DOGE"
              },
              "color": "positive"
            }],
            [{
              "action": {
                "type": "text",
                "payload": JSON.stringify({command: "подвал"}),
                "label": "🔙 К подвалу"
              },
              "color": "secondary"
            }]
          ]
        })
      }
    );
  }
});

cmd.hear(/^(?:дом|🏡 Дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        // Проверка на наличие дома и подвала
        if (message.user.realty.home !== 0) {
            const homeInfo = `Информация о Вашем доме:\n\n🏡 Дом: «${homes[message.user.realty.home - 1].name}»`;
            let basementInfo = message.user.realty.basement 
                ? "▶️ Подвал: установлен" 
                : "▶️ Чтобы начать майнить DogeCoin, купите подвал!\n🔰 Цена подвала: 100 SpringCoins ☣️";
            
            // Создаем клавиатуру
            const buttons = [];
            
            // Добавляем кнопку подвала
            buttons.push([{
                "action": {
                    "type": "text",
                    "payload": JSON.stringify({command: "подвал"}),
                    "label": "🛠 Подвал"
                },
                "color": "primary"
            }]);
            
            // Если нет подвала - добавляем кнопку покупки
            if (!message.user.realty.basement) {
                buttons[0].push({
                    "action": {
                        "type": "text",
                        "payload": JSON.stringify({command: "купить подвал"}),
                        "label": "💰 Купить подвал"
                    },
                    "color": "positive"
                });
            }
            
            // Добавляем кнопку продажи дома
            buttons.push([{
                "action": {
                    "type": "text",
                    "payload": JSON.stringify({command: "продать дом"}),
                    "label": "💸 Продать дом"
                },
                "color": "negative"
            }]);
            
            return bot(`${homeInfo}\n${basementInfo}`, {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": buttons
                })
            });
        }

        // Остальной код без изменений
        if (!message.args[1]) {
            let homeList = `дома:\n\n`;
            
            homes.forEach(home => {
                const hasDiscount = home.sell > 0;
                const currentPrice = hasDiscount ? home.cost2 : home.cost;
                
                homeList += `${message.user.realty.home === home.id ? "✔️" : "✖️"} ${home.id}. ${home.name}\n`;
                homeList += `(${utils.sp(currentPrice)} ${val1})`;
                
                if (hasDiscount) {
                    homeList += ` 🔥 Скидка ${home.sell}%`;
                }
                
                homeList += `\n\n`;
            });
            
            homeList += `🛒 Для покупки введите «Дом [номер]»`;
            
            return bot(homeList);
        }
        
        // Остальной код покупки дома без изменений
        const sell = homes.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        
        if (message.user.realty.home) {
            return bot(
                `У вас уже есть дом «${homes[message.user.realty.home - 1].name}» ❌\nЧтобы его продать, введите «Продать дом»`, 
                {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать дом`}),
                                    "label": `💸 Продать дом`
                                },
                                "color": "negative"
                            }]
                        ]
                    })
                }
            );
        }
        
        if (message.user.balance < priceToPay) {
            return bot(
                `Недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(priceToPay)} ${val1}`
            );
        }
        
        message.user.balance -= priceToPay;
        message.user.realty.home = sell.id;
        
        let purchaseMessage = `Вы купили «${sell.name}» за ${utils.sp(priceToPay)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%, экономия ${utils.sp(sell.cost - priceToPay)} ${val1})`;
        }
        
        return bot(purchaseMessage);
    }
});

// Видеокарты с поддержкой скидок и клавиатурой
cmd.hear(/^(?:видеокарты|🔋 Видеокарты)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        // Проверки на дом и подвал
        if (message.user.realty.home === 0) return bot(`У Вас нет дома! ❌`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: "дом"}),
                            "label": "🏠 Посмотреть дома"
                        },
                        "color": "primary"
                    }]
                ]
            })
        });
        
        if (!message.user.realty.basement) return bot(`У Вас нет подвала! ❌`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: "купить подвал"}),
                            "label": "🛒 Купить подвал"
                        },
                        "color": "positive"
                    }]
                ]
            })
        });

        // Показать список видеокарт с клавиатурой
        if (!message.args[1]) {
            let vgaList = `🔋 Майнинг видеокарты:\n\n`;
            
            // Создаем кнопки для видеокарт
            const buttons = [];
            const maxButtonsPerRow = 2;
            
            videocards.forEach((vga, index) => {
                const hasDiscount = vga.sell > 0;
                const currentPrice = hasDiscount ? vga.cost2 : vga.cost;
                
                vgaList += `${message.user.misc.videocard === vga.id ? "✔️" : "✖️"} ${vga.id}. ${vga.name}\n`;
                vgaList += `Доход: ${utils.sp(vga.prib)} DOG/час\n`;
                vgaList += `Цена: ${utils.sp(currentPrice)} SpringCoins`;
                
                if (hasDiscount) {
                    vgaList += ` 🔥 Скидка ${vga.sell}%`;
                }
                
                vgaList += `\n\n`;
                
                // Добавляем кнопки
                if (index % maxButtonsPerRow === 0) {
                    buttons.push([{
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: `видеокарты ${vga.id} 1`}),
                            "label": `🛒 ${vga.id}. ${vga.name}`
                        },
                        "color": "primary"
                    }]);
                } else {
                    buttons[buttons.length - 1].push({
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: `видеокарты ${vga.id} 1`}),
                            "label": `🛒 ${vga.id}. ${vga.name}`
                        },
                        "color": "primary"
                    });
                }
            });
            
            // Добавляем кнопку проверки подвала
            buttons.push([{
                "action": {
                    "type": "text",
                    "payload": JSON.stringify({command: "подвал"}),
                    "label": "🔍 Мой подвал"
                },
                "color": "secondary"
            }]);
            
            vgaList += `📌 Выберите видеокарту для покупки:`;
            
            return bot(vgaList, {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": buttons
                })
            });
        }
        
        // Покупка видеокарт (остается без изменений)
        const sell = videocards.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
        if (count <= 0) return bot(`❌ Укажите количество больше 0`);
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        const totalPrice = priceToPay * count;
        
        // Проверки
        if (message.user.misc.videocard !== 0 && message.user.misc.videocard !== sell.id) {
            return bot(`❌ У вас уже установлен другой тип видеокарты!`);
        }
        
        if (count + message.user.misc.videocard_count > message.user.limit.videocardlimit) {
            return bot(`❌ Лимит: ${message.user.limit.videocardlimit} видеокарт`);
        }
        
        if (message.user.sprcoin < totalPrice) {
            return bot(
                `Недостаточно SpringCoins! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.sprcoin)}\n💳 Требуется: ${utils.sp(totalPrice)}`
            );
        }
        
        // Покупка
        message.user.sprcoin -= totalPrice;
        message.user.misc.videocard = sell.id;
        message.user.misc.videocard_count += count;
        
        let purchaseMessage = `Вы купили «${sell.name}» (${count} шт.) за ${utils.sp(totalPrice)} SpringCoins`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%)`;
        }
        
        // Добавляем кнопку проверки подвала после покупки
        return bot(purchaseMessage, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            "payload": JSON.stringify({command: "подвал"}),
                            "label": "🔍 Проверить подвал"
                        },
                        "color": "positive"
                    }]
                ]
            })
        });
    }
});

setInterval(() => {
    double.filter(x => x.misc.videocard !== 0 && x.bans.ban == false).forEach(x => {
        const vga = videocards.find(card => card.id === x.misc.videocard);
        if (!vga) return;
        
        // Рассчитываем максимально возможный баланс (100 часов добычи)
        const maxBalance = vga.prib * x.misc.videocard_count * 100;
        
        // Если текущий баланс уже достиг максимума - пропускаем
        if (x.videocard_dg >= maxBalance) return;
        
        // Начисляем доход
        x.videocard_dg += vga.prib * x.misc.videocard_count;
        
        // Проверяем, не превысили ли максимальный баланс после начисления
        if (x.videocard_dg > maxBalance) {
            x.videocard_dg = maxBalance;
        }
    });
}, 3600000); // Каждый час



module.exports = commands;
