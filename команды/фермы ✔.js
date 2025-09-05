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



// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
let farms = require('../spisok/фермы.js')
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

const val1 = tokenData3.val1
const val2 = tokenData3.val2
const val3 = tokenData3.val3
const val4 = tokenData3.val4
const val5 = tokenData3.val5

// Фермы с поддержкой скидок
cmd.hear(/^(?:фермы|🔋 Фермы)\s?([0-9]+)?\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (message.user.inf) return bot(`👁️ Выключите безлимитный баланс`);

        // Показать список ферм
        if (!message.args[1]) {
            let farmList = `🔋 Майнинг фермы:\n\n`;
            
            farms.forEach(farm => {
                const hasDiscount = farm.sell > 0;
                const currentPrice = hasDiscount ? farm.cost2 : farm.cost;
                
                farmList += `${message.user.misc.farm === farm.id ? "✔️" : "✖️"} ${farm.id}. ${farm.name}\n`;
                farmList += `Доход: ${utils.sp(farm.prib)} ₿/час\n`;
                farmList += `Цена: ${utils.sp(currentPrice)} ${val1}`;
                
                if (hasDiscount) {
                    farmList += ` 🔥 Скидка ${farm.sell}% `;
                }
                
                farmList += `\n\n`;
            });
            
            farmList += `🛒 Для покупки введите «Фермы [номер] [количество]»`;
            
            return bot(farmList);
        }
        
        // Покупка ферм
        const sell = farms.find((x) => x.id === Number(message.args[1]));
        if (!sell) return;
        
        const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
        if (count <= 0) return bot(`❌ Укажите количество больше 0`);
        
        const priceToPay = sell.sell > 0 ? sell.cost2 : sell.cost;
        const totalPrice = priceToPay * count;
        
        // Проверки
        if (message.user.misc.farm !== 0 && message.user.misc.farm !== sell.id) {
            return bot(`❌ У вас уже установлен другой тип фермы!`);
        }
        
        const limit = message.user.settings.imperator ? 1000000 : message.user.limit.farmlimit;
        if (count + message.user.misc.farm_count > limit) {
            return bot(`❌ Лимит: ${limit} ферм`);
        }
        
        if (message.user.balance < totalPrice) {
            return bot(
                `Недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n💳 Требуется: ${utils.sp(totalPrice)} ${val1}`
            );
        }
        
        // Покупка
        message.user.balance -= totalPrice;
        message.user.misc.farm = sell.id;
        message.user.misc.farm_count += count;
        
        let purchaseMessage = `Вы купили «${sell.name}» (${count} шт.) за ${utils.sp(totalPrice)} ${val1}`;
        if (sell.sell > 0) {
            purchaseMessage += ` (скидка ${sell.sell}%, экономия ${utils.sp((sell.cost - priceToPay) * count)} ${val1})`;
        }
        purchaseMessage += `\n\n🔋 Теперь у вас ${message.user.misc.farm_count} ферм`;
        
        // Бонус за выполнение квеста
        if (message.user.now.kv1 && !message.user.now.kv2) { 
            message.user.now.kv2 = true;
            message.user.misc.farm_count += 10;
            purchaseMessage += `\n\n✅ Бонус за задание: +10 ферм!`;
        }
        
        return bot(purchaseMessage);
    }
});
 
cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.farm) return bot(`у вас нет фермы`);

    if (!message.user.farm_btc)
      return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

    let btc_ = message.user.farm_btc * message.user.misc.farm_count;

    if (message.user.farm_count >= 10000000) Math.floor((btc_ /= 2));

    message.user.btc += btc_;

    message.user.farm_btc = 0;

    return bot(`вы собрали ${utils.sp(
      btc_
    )} ₿, следующие биткоины появятся через час
💾 Биткоинов: ${utils.sp(message.user.btc)} ฿`);
  }
});

cmd.hear(/^(?:ферма инфо)$/i, async (message, bot) => {
  const farmss = [
    { id: 1, name: farms.find((x) => x.id === Number(1)).name, prib: farms.find((x) => x.id === Number(1)).prib },
    { id: 2, name: farms.find((x) => x.id === Number(2)).name, prib: farms.find((x) => x.id === Number(2)).prib },
    { id: 3, name: farms.find((x) => x.id === Number(3)).name, prib: farms.find((x) => x.id === Number(3)).prib },
    { id: 4, name: farms.find((x) => x.id === Number(4)).name, prib: farms.find((x) => x.id === Number(4)).prib },
    { id: 5, name: farms.find((x) => x.id === Number(5)).name, prib: farms.find((x) => x.id === Number(5)).prib },
    { id: 6, name: farms.find((x) => x.id === Number(6)).name, prib: farms.find((x) => x.id === Number(6)).prib },
    { id: 7, name: farms.find((x) => x.id === Number(7)).name, prib: farms.find((x) => x.id === Number(7)).prib },
  ];

  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.farm) return bot('у вас нет фермы');

    const farmCount = message.user.misc.farm_count;
    const farmType = message.user.misc.farm; // Получаем тип фермы
    const farm = farmss.find(f => f.id === farmType); // Находим ферму по типу

    if (!farm) {
      return bot('Ошибка: Не удалось найти информацию о ферме.');
    }

    const btcPerHourPerFarm = farm.prib; 
    
    const nameferm = farm.name; // Используем farm.prib

    const btc_ = message.user.farm_btc * message.user.misc.farm_count;

    let btcPerHourTotal = Math.round(btcPerHourPerFarm * farmCount)


    const formattedBtcPerHourTotal = utils.sp(btcPerHourTotal); // Убрали toFixed(3)

    return bot(`На ваших фермах накопилось ${utils.sp(btc_)} ₿ 🌐 \n` +
               `Статистика:\n` +
               `📊 Название: ${nameferm}\n` +
               `📊 Количество: ${utils.sp(farmCount)} шт.\n` +
               `✅ Доход: ${formattedBtcPerHourTotal} ฿/час`);
  }
});

module.exports = commands;
