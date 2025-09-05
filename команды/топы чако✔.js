let utils = require('../utils.js');

const commands = [];

const fs = require('fs');

let double = require('../database/users.json');

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
const vk = require('../vk-api.js'); 


cmd.hear(
    /^(?:💌 Топ сообщения|топ сообщения|топ смс|топ-10 сообщения)$/i,
    async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            let top = [];
            double
                .filter((x) => x.bantop === false)
                .map((x) => {
                    top.push({sms: x.sms, tag: x.tag, id: x.id, mention: x.mention});
                });

            top.sort((a, b) => {
                return b.sms - a.sms;
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

                text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — ${utils.sp(user.sms)} сообщ. 💌`;
            }

            return bot(
                `топ игроков по сообщениям:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(
                    message.user.sms
                )} сообщ. 💌`,

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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );

        }
    }
)


//кнопка

cmd.hear(
    /^(?:топ рейтинг|🏆 топ рейтинг|🏆 Топ игроков)$/i,
    async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            let top = [];

            double
                .filter((x) => x.bantop === false)
                .map((x) => {
                    top.push({
                        balance: x.balance,
                        rating: x.rating,
                        tag: x.tag,
                        id: x.id,
                        mention: x.mention,
                    });
                });

            top.sort((a, b) => {
                return b.rating - a.rating;
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

                text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 👑${utils.sp(user.rating)} | $${utils.rn(user.balance)}`;
            }


            return bot(
                `топ игроков:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(
                    message.user.rating
                )} | $${utils.rn(message.user.balance)}`,

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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );
        }
    }
);

cmd.hear(/^(?:топ баланс|💰 Топ баланс)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let top = [];

        double
            .filter((x) => x.bantop === false)
            .map((x) => {
                top.push({
                    balance: x.balance,
                    rating: x.rating,
                    tag: x.tag,
                    id: x.id,
                    mention: x.mention,
                });
            });

        top.sort((a, b) => {
            return b.balance - a.balance;
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

            text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 👑${utils.sp(user.rating)} | $${utils.rn(user.balance)}`;
        }


        return bot(
            `топ игроков:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(
                message.user.rating
            )} | $${utils.rn(message.user.balance)}`,

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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );
        }
    }
);

cmd.hear(/^(?:топ реферал|🔅 топ реферал|топ реф)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let top = [];

        double
            .filter((x) => x.bantop === false)
            .map((x) => {
                top.push({
                    refcount: x.refcount,
                    tag: x.tag,
                    id: x.id,
                    mention: x.mention,
                });
            });

        top.sort((a, b) => {
            return b.refcount - a.refcount;
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

            text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 👑${utils.sp(user.refcount)}`;
        }

        return bot(
            `топ по рефералам:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(
                message.user.refcount
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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );
        }
    }
);

cmd.hear(
    /^(?:🌐 топ (btc|биткоины)|топ биткоины|топ btc)$/i,
    async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            let top = [];

            double
                .filter((x) => x.bantop === false)
                .map((x) => {
                    top.push({
                        btc: x.btc,
                        rating: x.rating,
                        tag: x.tag,
                        id: x.id,
                        mention: x.mention,
                    });
                });

            top.sort((a, b) => {
                return b.btc - a.btc;
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

                text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 👑${utils.sp(user.rating)} | 🌐 BTC - ${utils.rn(user.btc)}`;
            }

            return bot(
                `топ по биткоинам:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(
                    message.user.rating
                )} | 🌐 BTC - ${utils.rn(message.user.btc)}`,

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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );
        }
    }
);

cmd.hear(/^(?:топ опыт|〽️ топ опыт)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let top = [];

        double
            .filter((x) => x.bantop === false)
            .map((x) => {
                top.push({
                    balance: x.balance,
                    opit: x.opit,
                    tag: x.tag,
                    id: x.id,
                    mention: x.mention,
                });
            });

        top.sort((a, b) => {
            return b.opit - a.opit;
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

            text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 🏆${utils.sp(user.opit)} | $${utils.rn(user.balance)}`;
        }

        return bot(
            `топ игроков:${text}
		➖➖➖➖➖➖➖➖
	${utils.gi(find() + 1)} ${message.user.tag} — 🏆${utils.sp(
                message.user.opit
            )} | $${utils.rn(message.user.balance)}`,

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
                            },

                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "🏆 Топ рейтинг",
                                    },

                                    color: "default",
                                }
                            
                            
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

                                    color: "default",
                                },
                            ],

                            [
                                {
                                    action: {
                                        type: "text",

                                        payload: "{}",

                                        label: "💌 Топ сообщения",
                                    },

                                    color: "default",
                                },
                            ],
                        ],
                    }),
                }
            );
        }
    }

);

cmd.hear(/^(?:топ работа)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let top = [];

        double
            .filter((x) => x.bantop === false)
            .map((x) => {
                top.push({level: x.level, tag: x.tag, id: x.id, mention: x.mention});
            });

        top.sort((a, b) => {
            return b.level - a.level;
        });

        let text = ``;

        const find = () => {
            let pos = 100;

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

            text += `\n${i === 9 ? `🔟` : `${i + 1}⃣`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`} — 🏆${utils.sp(user.level)}lvl`;
        }

        return bot(`топ работников:${text}
		➖➖➖➖➖➖➖➖
➡${utils.gi(find() + 1)} ${message.user.tag} — 🏆${utils.sp(
            message.user.level
        )} lvl`);
    }
});


module.exports = commands;