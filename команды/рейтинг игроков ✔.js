let utils = require('../utils.js');
const fs = require('fs');
const axios = require('axios');

const commands = [];

let double = require('../database/users.json');

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

// Загружаем список видео из файла
let videoAttachments = [];
try {
    const data = fs.readFileSync('./видео/список видео.json', 'utf8');
    videoAttachments = JSON.parse(data);
} catch (err) {
    console.error('Ошибка при загрузке списка видео из ./видео/список видео.json. Используется пустой список.', err);
    videoAttachments = [];
}
 

const getRandomVideo = () => {
    if (videoAttachments.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * videoAttachments.length);
    return videoAttachments[randomIndex];
};

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

let val1 = tokenData3.val1;
let val2 = tokenData3.val2;
let val3 = tokenData3.val3;
let val4 = tokenData3.val4;
let val5 = tokenData3.val5;



cmd.hear(/^(?:рейтинг|топ|👥 Топ игроков|Топ SpringCoin|🏆 ТОП)$/i, async (message, bot) => {
    const randomVideo = getRandomVideo();
    if (!message.isChat) {
        return bot(`ваш рейтинг ${message.user.rating} 👑`);
    }

    if (message.chat.type === 1) {
        let top = [];

        double
            .filter((x) => x.bantop === false)
            .map((x) => {
                top.push({
                    sprcoin: x.sprcoin,
                    tag: x.tag,
                    id: x.id,
                    mention: x.mention,
                });
            });

        top.sort((a, b) => {
            return b.sprcoin - a.sprcoin;
        });

        let text = ``;

        const find = () => {
            let pos = 1000;

            for (let i = 0; i < top.length; i++) {
                if (top[i].id === message.senderId) return (pos = i);
            }

            return pos;
        };

        const maxTopEntries = Math.min(10, double.filter((x) => x.bantop === false).length);

        for (let i = 0; i < maxTopEntries; i++) {
            if (!top[i]) {
                break; //Прерываем если больше нет игроков
            }


            const user = top[i];

            text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — ☣${utils.sp(user.sprcoin)}`;
        }

        return bot(
            `топ игроков по SpringCoin ☣️${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — ☣${utils.sp(
                message.user.sprcoin
            )}`,

            {
                keyboard: JSON.stringify({
                    inline: true,

                    buttons: [
                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "🔅 Топ реферал",
                                },

                                color: "default",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "😈 Босс топ",
                                },

                                color: "default",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "🏆 Топ рейтинг",
                                },

                                color: "default",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "👥 Топ игроков",
                                },

                                color: "default",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "🌐 Топ биткоины",
                                },

                                color: "default",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "〽️ Топ опыт",
                                },

                                color: "default",
                            },

                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "🏎️ Топ гонщиков",
                                },

                                color: "default",
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "💰 Топ баланс",
                                },
                            },
                        ],

                        [
                            {
                                action: {
                                    type: "text",

                                    payload: "{}",

                                    label: "💌 Топ сообщения",
                                },
                            },
                        ],
                    ],
                }),
                attachment: getRandomVideo()
            }
        );
    }

    if (message.chat.type === 2) {
        //console.log( double.filter(x => !x.bantop).length);
        if (double.filter(x => !x.bantop).length < 1) { // Проверяем, есть ли хоть один не забаненный игрок
            return bot(`В топе нет игроков 😔`, { attachment: randomVideo });
        }

        let top = [];

        double.map(x => {
            if (!x.bantop) top.push({ balance2: x.balance2, tag: x.tag, id: x.id, mention: x.mention });
        });

   
        for (let b in double) {
            for (let a in top) {
                if (double[b].x?.bantop === true) { // ? добавлен для проверки на существование свойства x
                    if (top[a].id == double[b].id) {
                        top[a].balance2 = -9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                    }
                }
            }
        }

        top.sort((a, b) => {
            return b.balance2 - a.balance2;
        });

        let text = ``;
        const find = () => {
            let pos = 1000;

            for (let i = 0; i < top.length; i++) {
                if (top[i].id === message.senderId) return pos = i;
            }

            return pos;
        }

        const maxTopEntries = Math.min(10, top.length); // Учитываем, что top отфильтрован

        for (let i = 0; i < maxTopEntries; i++) {
            if (!top[i]) break; // Если нет больше элементов - выходим из цикла.
            const user = top[i]

            text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} - ${utils.sp(user.balance2)} ${val4}
`; 
        }


        let myposition = ''

        if ((find() + 1) > 10) myposition = `———————————————
${utils.gi(find() + 1)} [id${message.user.id}|${message.user.tag}] — ${utils.sp(message.user.balance2)} ${val4} \n\n`
        return bot(`топ игроков по балансу:\n\n${text} ${myposition}`, {
            attachment: getRandomVideo()
        });
    }


}
);

module.exports = commands;