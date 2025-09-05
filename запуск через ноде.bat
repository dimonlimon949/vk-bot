@echo off
chcp 65001 > nul
setlocal

color 0A

set NODE_NO_WARNINGS=1

echo Проверка установки Node.js...
node -v
if %errorlevel% neq 0 (
  echo Node.js не установлена или не добавлена в PATH. Пожалуйста, установите Node.js и добавьте её в PATH.
  pause
  exit /b 1
)


echo Запуск бота...
node --expose-gc bot.js
if %errorlevel% neq 0 (
  echo Произошла ошибка при запуске бота. Проверьте логи бота для получения дополнительной информации.
) else (
  echo Бот успешно запущен.
)

endlocal
PAUSE