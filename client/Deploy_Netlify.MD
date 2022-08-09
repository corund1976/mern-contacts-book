1. Создать файл netlify.toml
   [build]
   publish = "build"

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

2. Установить набор инструментов Netlify
   npm i netlify-cli

3. Подтверждаем авторизацию
   netlify login
   и в открывшемся браузере нажимаем Authorize

4. В package.json в scripts добавляем :
   "deploy": "netlify deploy -p"

5. Стрелками на клавиатуре подтверждаем выбор
   2х пунктов последовательно

6. Получаем ссылку на Live URL
   Website URL: https://mern-contacts-client.netlify.app

7. После обновления приложения перед загрузкой на хостинг
   каждый раз запускаем
   npm run build
   npm run deploy

---

8. Устанавливаем modern-normalize
   npm install modern-normalize

9. Импортируем в index.js
   import 'modern-normalize/modern-normalize.css';
