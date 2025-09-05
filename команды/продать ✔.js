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
const {VK} = require('vk-io');
const vk = new VK({token: tokenData.token});

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

let val1 = tokenData3?.val1 || 'руб.'; // Валюта по умолчанию
let val2 = tokenData3?.val2 || '$'; // Валюта по умолчанию
let val3 = tokenData3?.val3 || '€'; // Валюта по умолчанию
let val4 = tokenData3?.val4 || 'голдов'; // Валюта по умолчанию
let val5 = tokenData3?.val5 || 'коинов'; // Валюта по умолчанию

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

const cursFilePath = './курс/curs.json';

function getCursData() {
    try {
        const data = JSON.parse(fs.readFileSync(cursFilePath, 'utf8'));
        return data;
    } catch (error) {
        console.error('Ошибка при чтении файла curs.json:', error);
        return { btc: 0, dog: 0 }; // Значения по умолчанию
    }
}


let cursData = getCursData();
let btc = Number(cursData.btc);
let dog = Number(cursData.dog);

setInterval(() => {
    cursData = getCursData(); // Просто обновляем значения из файла
    btc = cursData.btc; // Извлекаем значения
    dog = cursData.dog; // Извлекаем значения
     console.log(`Новое значение BTC из файла : ${btc}`);
     console.log(`Новое значение DOG из файла : ${dog}`);
}, 50000);





let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let presidents = require("../database/presidents.json");
let phones = require('../spisok/телефоны.js')
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
let businesses = require("../spisok/business spisok.js");
let botinfo = require("../database/botinfo.json"); 

cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let options = {
            count: null,
        };

        message.args[2] = message.args[1].split(" ")[1];
 
        if (!message.args[2]) options.count = 1;
        if (message.args[2]) {
            message.args[2] = message.args[2].replace(/([.,])/gi, "");
            message.args[2] = message.args[2].replace(/([кk])/gi, "000");
            message.args[2] = message.args[2].replace(/([мm])/gi, "000000");
            message.args[2] = Math.floor(Number(message.args[2]));

            if (message.args[2] <= 0) return;
            if (!message.args[2]) options.count = 1;
            else if (message.args[2]) options.count = message.args[2];
        }
        //убрал все эти проверки message.isChat || message.chat.type == 1 так как она итак делается выше
        if (/мяч/i.test(message.args[1].toLowerCase())) {
            if (!message.user.ball) return bot(`у вас нет мяча`);
            let a = Math.floor(balls[message.user.ball - 1].cost * 0.5);

            message.user.balance += Math.floor(balls[message.user.ball - 1].cost * 0.5);
            message.user.ball = 0;

            return bot(
                `вы продали свой мяч за ${utils.sp(
                    a
                )} ${val1} 🏀\n\n🛒 Вам было возвращено 50% от гос. стоимости мяча ♻️`
            );

        }

        if (/машин/i.test(message.args[1].toLowerCase())) {
            if (!message.user.transport.car) return bot(`у вас нет машины`);
            let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.6);

            message.user.balance += Math.floor(
                cars[message.user.transport.car - 1].cost * 0.6
            );
            message.user.transport.car = 0;
            message.user.scar.gosnomer = "undefined";
            message.user.scar.prok_1 = 1;
            message.user.scar.prok_2 = 1;
            message.user.scar.prok_3 = 1;
            message.user.scar.prok_4 = 1;
            message.user.scar.prok_5 = 1;
            message.user.scar.prok_6 = 1;

            return bot(
                `вы продали свою машину за ${utils.sp(
                    a
                )} ${val1} 🚗\n\n🛒 Вам было вернуто 60% от гос. стоимости машины ♻️`
            );

        }


        if (/ферм/i.test(message.args[1].toLowerCase())) {
            if (message.user.misc.farm === 0) return bot(`У вас нет ферм.. 😢`);
            if (options.count > message.user.misc.farm_count)
                return bot(`У вас нет столько ферм! ❌`);
            if (options.count <= 0) return bot(`вы не можете продать столько ферм`);
            let a = Math.floor(
                farms[message.user.misc.farm - 1].cost * options.count * 0.1
            );

            message.user.balance += a;
            message.user.misc.farm_count -= options.count;
            if (message.user.misc.farm_count === 0) message.user.misc.farm = 0;

            return bot(
                `вы продали свои фермы (${options.count} шт.) за ${utils.sp(
                    a
                )} ${val1} 🔋\n\n🛒 Вам было вернуто 10% от гос. стоимости ферм ♻️`
            );

        }

        if (/видеокарт/i.test(message.args[1].toLowerCase())) {
            if (message.user.misc.videocard === 0) return bot(`😒У вас нет видеокарты`);
            if (options.count > message.user.misc.videocard_count)
                return bot(`😒У вас нет столько видеокарт`);
            if (options.count <= 0)
                return bot(`😒Вы не можете продать столько видеокарт`);
            let a = Math.floor(
                videocards[message.user.misc.videocard - 1].cost * options.count * 0.6
            );

            message.user.sprcoin += a;
            message.user.misc.videocard_count -= options.count;
            if (message.user.misc.videocard_count === 0)
                message.user.misc.videocard = 0;

            return bot(
                `Вы продали свои видеокарты (${options.count} шт.) за ${utils.sp(
                    a
                )} SpringCoins ☣️\n\n🛒 Вам было возвращено 60% от гос. стоимости видеокарт ♻️`
            );

        }

        if (/догекои/i.test(message.args[1].toLowerCase())) {
            if (!message.user.dcoins) return bot(`у вас нет 💸 DogeCoins!`);
            if (options.count > message.user.dcoins)
                return bot(`недостаточно 💸 DogeCoins!`);

            if (!message.args[2]) options.count = message.user.dcoins; //
            else if (message.args[2]) options.count = message.args[2]; //
            let a = Math.floor(dog * options.count);

            message.user.balance += Math.floor(a);
            message.user.dcoins -= options.count;

            return bot(
                `вы продали 💸 DogeCoins (${options.count} шт.) за ${utils.sp(a)} ${val1}`
            );

        }

        if (/желез/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.zhelezo < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a2 = message.user.ruds.zhelezo * botinfo.kurszhelezo;
            const zhelezosda = message.user.ruds.zhelezo;

            message.user.balance += message.user.ruds.zhelezo * botinfo.kurszhelezo;
            message.user.ruds.zhelezo = 0;
            return bot(
                `Вы продали ${utils.sp(zhelezosda)}ед. железа за ${utils.sp(a2)} ${val1} 💵`
            );
        }

        if (/золот/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.zoloto < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a4 = message.user.ruds.zoloto * botinfo.kurszoloto;
            const zhelezosda3 = message.user.ruds.zoloto;

            message.user.balance += message.user.ruds.zoloto * botinfo.kurszoloto;
            message.user.ruds.zoloto = 0;

            return bot(
                `вы продали ${utils.sp(zhelezosda3)}ед. золота за ${utils.sp(a4)} ${val1} 💵`
            );

        }

        if (/алмаз/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.almaz < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a3 = message.user.ruds.almaz * botinfo.kursalmaz;
            const zhelezosda2 = message.user.ruds.almaz;

            message.user.balance += message.user.ruds.almaz * botinfo.kursalmaz;
            message.user.ruds.almaz = 0;

            return bot(
                `вы продали ${utils.sp(zhelezosda2)}ед. алмазов за ${utils.sp(a3)} ${val1} 💵`
            );

        }

        if (/матери/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.materia < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a5 = message.user.ruds.materia * botinfo.kursmateria;
            const zhelezosda4 = message.user.ruds.materia;

            message.user.balance += message.user.ruds.materia * botinfo.kursmateria;
            message.user.ruds.materia = 0;

            return bot(
                `вы продали ${utils.sp(zhelezosda4)}ед. материи за ${utils.sp(a5)} ${val1} 💵`
            );

        }

        if (/обсидиан/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.obsidian < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a6 = message.user.ruds.obsidian * botinfo.kursobsidian;
            const zhelezosda5 = message.user.ruds.obsidian;

            message.user.balance += message.user.ruds.obsidian * botinfo.kursobsidian;
            message.user.ruds.obsidian = 0;

            return bot(
                `вы продали ${utils.sp(zhelezosda5)}ед. обсидиана за ${utils.sp(a6)} ${val1} 💵`
            );

        }

        if (/плазму/i.test(message.args[1].toLowerCase())) {
            if (message.user.ruds.plazma < 1)
                return bot(`у Вас нету вида данной руды! 😢`);
            let a6 = message.user.ruds.plazma * botinfo.kursplazma;
            const zhelezosda6 = message.user.ruds.plazma;

            message.user.balance += message.user.ruds.plazma * botinfo.kursplazma;
            message.user.ruds.plazma = 0;

            return bot(
                `вы продали ${utils.sp(zhelezosda6)}ед. плазмы за ${utils.sp(a6)} ${val1} 💵`
            );

        }

        if (/яхт/i.test(message.args[1].toLowerCase())) {
            if (!message.user.transport.yacht) return bot(`у вас нет яхты`);
            let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.6);

            message.user.balance += Math.floor(
                yachts[message.user.transport.yacht - 1].cost * 0.6
            );
            message.user.transport.yacht = 0;

            return bot(
                `вы продали свою яхту за ${utils.sp(
                    a
                )} ${val1} 🚤\n\n🛒 Вам было вернуто 60% от гос. стоимости яхты ♻️`
            );

        }

        if (/инструмен(т|ты)/i.test(message.args[1].toLowerCase())) {
            if (!message.user.minertool) return bot(`у вас нет инструментов`);
            let a = Math.floor(minertool[message.user.minertool - 1].cost * 0.6);

            message.user.balance += Math.floor(
                minertool[message.user.minertool - 1].cost * 0.6
            );
            message.user.minertool = 0;

            return bot(
                `вы продали свои инструменты за ${utils.sp(
                    a
                )} ${val1} 🔧\n\n🛒 Вам было возвращено 60% от гос. стоимости инструмента ♻️`
            );

        }

        if (/дерево/i.test(message.args[1].toLowerCase())) {
            if (!message.user.tree)
                return bot(`У Вас нету дерева! 🌲\nДля покупки дерева отправьте «деревья»`);
            let a = Math.floor(trees[message.user.tree - 1].cost * 0.6);
            //Листики
            message.user.balance += Math.floor(a);
            message.user.tree = 0;
            message.user.leafpribil = 0;

            return bot(
                `вы продали своё дерево за ${utils.sp(
                    a
                )} ${val1} 🌲\n\n🛒 Вам было возвращено 60% от стоимости дерева ♻️`
            );

        }

        if (/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase())) {
            if (!message.user.transport.airplane) return bot(`у вас нет самолёта`);
            let a = Math.floor(
                airplanes[message.user.transport.airplane - 1].cost * 0.6
            );

            message.user.balance += Math.floor(
                airplanes[message.user.transport.airplane - 1].cost * 0.6
            );
            message.user.transport.airplane = 0;

            return bot(
                `вы продали свой самолёт за ${utils.sp(
                    a
                )} ${val1} 🛩️\n\n🛒 Вам было возвращено 60% от гос. стоимости самолёта ♻️`
            );

        }

        if (/в([иея])рт([ао])л(е|ё|йо)т/i.test(message.args[1].toLowerCase())) {
            if (!message.user.transport.helicopter) return bot(`у вас нет вертолета`);
            let a = Math.floor(
                helicopters[message.user.transport.helicopter - 1].cost * 0.6
            );

            message.user.balance += Math.floor(
                helicopters[message.user.transport.helicopter - 1].cost * 0.6
            );
            message.user.transport.helicopter = 0;

            return bot(
                `вы продали свой вертолёт за ${utils.sp(
                    a
                )} ${val1} 🚁\n\n🛒 Вам было возвращено 60% от гос. стоимости вертолёта ♻️`
            );

        }

        if (/дом/i.test(message.args[1].toLowerCase())) {
            if (!message.user.realty.home) return bot(`у вас нет дома`);
            let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.6);

            message.user.balance += Math.floor(
                homes[message.user.realty.home - 1].cost * 0.6
            );
            message.user.realty.home = 0;

            return bot(
                `вы продали свой дом за ${utils.sp(
                    a
                )} ${val1} 🏡\n\n🛒 Вам было вернуто 60% от гос. стоимости дома ♻️`
            );

        }

        if (/квартир/i.test(message.args[1].toLowerCase())) {
            if (!message.user.realty.apartment) return bot(`у вас нет квартиры`);
            let a = Math.floor(
                apartments[message.user.realty.apartment - 1].cost * 0.6
            );

            message.user.balance += Math.floor(
                apartments[message.user.realty.apartment - 1].cost * 0.6
            );
            message.user.realty.apartment = 0;

            return bot(
                `вы продали свою квартиру за ${utils.sp(
                    a
                )} ${val1} 🌆\n\n🛒 Вам было возвращено 60% от гос. стоимости квартиры ♻️`
            );

        }

        if (/телефон/i.test(message.args[1].toLowerCase())) {
            if (!message.user.misc.phone) return bot(`у вас нет телефона`);
            let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.6);

            message.user.balance += Math.floor(
                phones[message.user.misc.phone - 1].cost * 0.6
            );
            message.user.misc.phone = 0;

            return bot(
                `вы продали свой телефон за ${utils.sp(
                    a
                )} ${val1} 📲\n\n🛒 Вам было возвращено 60% от гос. стоимости телефона ♻️`
            );

        }

        if (/компьютер/i.test(message.args[1].toLowerCase())) {
            if (!message.user.misc.computer) return bot(`у вас нет компьютера`);
            let a = Math.floor(computers[message.user.misc.computer - 1].cost * 0.6);

            message.user.balance += Math.floor(
                computers[message.user.misc.computer - 1].cost * 0.6
            );
            message.user.misc.computer = 0;

            return bot(
                `вы продали свой компьютер за ${utils.sp(
                    a
                )} ${val1}   🖥️\n\n🛒 Вам было возвращено 60% от гос. стоимости компьютера ♻️`
            );

        }

        if (/рейтинг/i.test(message.args[1].toLowerCase())) {
            if (options.count > message.user.rating) return bot(`у вас нет рейтинга`);
            if (!message.args[2]) options.count = message.user.rating; //
            else if (message.args[2]) options.count = message.args[2]; //
            let a;

            if (!message.user.settings.imperator) {
                a = 500000 * options.count;
            } else {
                a = 1000000 * options.count;
            }
            if (message.user.settings.topdon || message.user.settings.king) {
                a = 900000 * options.count;
            }

            message.user.balance += Math.floor(a);
            message.user.rating -= options.count;

            return bot(
                `вы продали ${options.count} ${utils.decl(options.count, [
                    "рейтинг",
                    "рейтинга",
                    "рейтинга",
                ])} за ${utils.sp(Math.floor(a))}`
            );
        }

        if (/бизнес/i.test(message.args[1]?.toLowerCase())) {
            if (message.user.business2.length === 0) return bot(`У вас нет бизнеса`);

            // Проверка корректности count
            if (options.count < 1 || options.count > message.user.business2.length)
                return bot(`Используйте: Продать бизнес [от 1 до ${message.user.business2.length}]`);

            if (options.count > message.user.business2.length)
                return bot(`У вас нет этого бизнеса`);

            options.count--;

            let a = Math.floor(
                businesses2[message.user.business2[options.count].id - 1][
                    message.user.business2[options.count].upgrade - 1
                    ].cost * 0.6
            );

            message.user.balance += Math.floor(a);
            message.user.business2.splice(options.count, 1);

            return bot(
                `Вы продали свой бизнес №${options.count + 1} за ${utils.sp(a)} ${val1} 🏢\n\n🛒 Вам было возвращено 60% от гос. стоимости + улучшений бизнеса ♻️`
            );

        }
	   if (/звезд(у|а)/i.test(message.args[1].toLowerCase())) {
        if (options.count < 1 || options.count > 5)
            return bot(`используйте: Продать звезду [от 1 до 5]`);

        if (options.count === 1) {
            if (message.user.stars1) {
                message.user.ruds.almaz += 7500;
                message.user.stars1 = false;

                return bot(`вы продали свою звезду за 7.500 Алмазов 💎`);
            } else {
                return bot(`У вас нет данной звезды`);
            }
        }

        if (options.count === 2) {
            if (message.user.stars2) {
                message.user.ruds.materia += 5000;
                message.user.stars2 = false;

                return bot(`вы продали свою звезду за 5.000 Материи 🌌`);
            } else {
                return bot(`У вас нет данной звезды`);
            }
        }

        if (options.count === 3) {
            if (message.user.stars3) {
                message.user.ruds.obsidian += 2500;
                message.user.stars3 = false;

                return bot(`вы продали свою звезду за 2.500 Обсидиана 🌌`);
            } else {
                return bot(`У вас нет данной звезды`);
            }
        }

        if (options.count === 4) {
            if (message.user.stars4) {
                message.user.ruds.plazma += 1500;
                message.user.stars4 = false;

                return bot(`вы продали свою звезду за 1.500 Плазмы 🌌`);
            } else {
                return bot(`У вас нет данной звезды`);
            }
        }

        if (options.count === 5) {
            if (message.user.stars5) {
                message.user.rub += 7500;
                message.user.stars5 = false;

                return bot(`вы продали свою звезду за 7.500 ЧакоРуб 💰`);
            } else {
                return bot(`У вас нет данной звезды`);
            }
        }
    }




    if (/биткоин/i.test(message.args[1].toLowerCase())) {
        if (typeof btc !== 'number') {
            console.error("Ошибка: btc не является числом.");
            return bot("Произошла ошибка при получении курса биткоина."); // Важно сообщить об ошибке пользователю
        }
    
        if (options.count > message.user.btc) return bot(`недостаточно биткоинов`);
    
        if (!message.args[2]) {
            options.count = message.user.btc;
        } else {
            // Проверка, что message.args[2] является числом
            const parsedCount = parseFloat(message.args[2]);
            if (isNaN(parsedCount)) {
                return bot("Укажите корректное количество биткоинов для продажи.");
            }
            options.count = parsedCount;
        }
    
        if (options.count <= 0) {
            return bot("Укажите положительное количество биткоинов для продажи.");
        }
    
        let a = Math.floor(btc * options.count);
    
        if (isNaN(a)) {
            console.error("Ошибка: a не является числом. btc:", btc, "options.count:", options.count);
            return bot("Произошла ошибка при расчете суммы продажи."); // Сообщаем об ошибке, если a не число
        }
    
        message.user.balance += Math.floor(a);
        message.user.btc -= options.count;
    
        return bot(
            `вы продали ${utils.sp(options.count)}₿ за ${utils.sp(a)} ${val1} (1₿=${(
                btc
            )})${""}`
        );
    }
    }

	    if (message.chat.type === 2) {
        let options = {
            count: null,
        };

        message.args[2] = message.args[1].split(" ")[1];

        if (!message.args[2]) options.count = 1;
        if (message.args[2]) {
            message.args[2] = message.args[2].replace(/([.,])/gi, "");
            message.args[2] = message.args[2].replace(/([кk])/gi, "000");
            message.args[2] = message.args[2].replace(/([мm])/gi, "000000");
            message.args[2] = Math.floor(Number(message.args[2]));

            if (message.args[2] <= 0) return;
            if (!message.args[2]) options.count = 1;
            else if (message.args[2]) options.count = message.args[2];
        }

        if (/бизнес/i.test(message.args[1].toLowerCase())) {
            if (message.user.business.length === 0) return bot(`у вас нет бизнеса`);
            if (
                (options.count < 1 || options.count > 4) &&
                message.user.business.length <= 4
            )
                return bot(`используйте: Продать бизнес [от 1 до 4]`);
            if (message.user.business.length < options.count)
                return bot(`у вас нет этого бизнеса`);

            options.count--;

            let a = Math.floor(
                businesses[message.user.business[options.count].id - 1][
                    message.user.business[options.count].upgrade - 1
                    ].cost * 0.6
            );

            message.user.balance2 += Math.floor(a);
            message.user.business.splice(options.count, 1);

            return bot(
                `вы продали свой бизнес №${options.count} за ${utils.sp(
                    a
                )} ${val4} 🏢\n\n🛒 Вам было возвращено 60% от гос. стоимости + улучшений бизнеса ♻️`
            );
        }
    }
});


module.exports = commands;