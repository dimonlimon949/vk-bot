let utils = require('../utils.js')

const commands =[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};


cmd.hear(/^(?:рандом|ранд)\s(\d+)-(\d+)$/i, async (message) => {
    if (!message.isChat || message.chat.type === 1) {
        const min = parseInt(message.args[1], 10);
        const max = parseInt(message.args[2], 10);

        if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
            message.reply("⚠️ Пожалуйста, введите корректный диапазон (например, 'рандом 0-10')!");
            return;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        message.reply(`${utils.sp(randomNumber)}`);
    }
});




module.exports = commands;
