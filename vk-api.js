const { VK } = require('vk-io');
const { readFileSync } = require('fs');
const path = require('path');

const tokensFilePath = path.join(__dirname, './настройки/токены.json');

function getToken() {
  try {
    return JSON.parse(readFileSync(tokensFilePath, 'utf8'));
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData = getToken();
let vk = null;

if (tokenData && tokenData.token) {
  try {
    vk = new VK({
      token: tokenData.token,
      apiMode: 'parallel',
    });
    
    // Проверка подключения
    vk.api.utils.getServerTime()
      .then(() => console.log('VK API подключен'))
      .catch(err => {
        console.error('Ошибка подключения:', err);
        vk = null;
      });
  } catch (error) {
    console.error('Ошибка создания экземпляра VK:', error);
    vk = null;
  }
}

module.exports = vk;