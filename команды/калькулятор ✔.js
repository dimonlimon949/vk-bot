let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const tokensFilePath = './database/tokens.json';

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

function formatExpression(expression) {
    //Форматируем числа в выражении, оставляя операторы без изменений
    return expression.replace(/(-?\d+(\.\d+)?)/g, (match) => utils.sp(parseFloat(match)));
}

cmd.hear(/^(?:реши)\s(.+)$/i, async (message, bot) => {

        let expression = message.args[1];

        expression = expression.replace(/(-?\d+(\.\d+)?)((к|k)+)/gi, (match, num, dec, suffix) => parseFloat(num + (dec || '')) * Math.pow(1000, suffix.length));
        expression = expression.replace(/(-?\d+(\.\d+)?)((м|m)+)/gi, (match, num, dec, suffix) => parseFloat(num + (dec || '')) * Math.pow(1000000, suffix.length));

        expression = expression.replace(/(\.|\,)(?!\d)/g, '');
        expression = expression.replace(/\s/g, '');

        try {
            const result = evaluateExpression(expression);
            return bot(`🧮 ${formatExpression(expression)} = ${utils.sp(result)}`);
        } catch (error) {
            return bot(`❌ Ошибка при вычислении: ${error.message}`);
        }
    
});

function evaluateExpression(expression) {
    while (expression.includes('(')) {
        let start = expression.lastIndexOf('(');
        let end = expression.indexOf(')', start);
        if (end === -1) throw new Error('Несоответствие скобок');
        let innerExpression = expression.substring(start + 1, end);
        let result = evaluateSimpleExpression(innerExpression);
        expression = expression.substring(0, start) + result + expression.substring(end + 1);
    }
    return evaluateSimpleExpression(expression);
}

function evaluateSimpleExpression(expression) {
    // Обработка степеней
    expression = expression.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, function (match, base, _, exp) {
        return Math.pow(parseFloat(base), parseFloat(exp));
    });

    // Обработка умножения и деления
    expression = expression.replace(/(-?\d+(\.\d+)?)([\*\/:])(-?\d+(\.\d+)?)/g, function (match, num1, dec1, op, num2, dec2) {
        const n1 = parseFloat(num1 + (dec1 || ''));
        const n2 = parseFloat(num2 + (dec2 || ''));
        switch (op) {
            case '*': return n1 * n2;
            case '/': return n1 / n2;
            case ':': return n1 / n2;
            default: return match;
        }
    });

    // Обработка сложения и вычитания
    let numbers = expression.split(/([+\-])/);
    let result;

    if (numbers && numbers.length > 0) {
        result = parseFloat(numbers[0]);
        if (isNaN(result)) throw new Error("Некорректное число в выражении");

        for (let i = 1; i < numbers.length; i += 2) {
            const op = numbers[i];
            const num = parseFloat(numbers[i + 1]);
            if (isNaN(num)) throw new Error("Некорректное число в выражении");
            result = op === '+' ? result + num : result - num;
        }
    } else {
        result = parseFloat(expression);
        if (isNaN(result)) throw new Error("Некорректное число в выражении");
    }

    return result;
}

module.exports = commands;
