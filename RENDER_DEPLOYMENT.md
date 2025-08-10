# Розгортання на Render

## Підготовка до розгортання

### 1. Налаштування змінних середовища

Створіть файл `.env` в корені проекту:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ds_delayed_user
DB_PASSWORD=your_password_here
DB_DATABASE=ds_delayed_db

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-app.onrender.com

# For frontend
NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
```

### 2. Створення бази даних на Render

1. Перейдіть на [Render Dashboard](https://dashboard.render.com/)
2. Натисніть "New +" → "PostgreSQL"
3. Налаштуйте:
   - **Name**: `ds-delayed-db`
   - **Database**: `ds_delayed_db`
   - **User**: `ds_delayed_user`
   - **Password**: згенеруйте безпечний пароль
4. Скопіюйте `Internal Database URL` та `External Database URL`

### 3. Розгортання Backend

1. Створіть новий **Web Service**
2. Підключіть ваш GitHub репозиторій
3. Налаштування:
   - **Name**: `ds-delayed-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && pnpm install && pnpm run build`
   - **Start Command**: `cd backend && pnpm run start:prod`
   - **Root Directory**: `backend`

4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=<Internal Database URL з кроку 2>
   TELEGRAM_BOT_TOKEN=<ваш токен>
   OPENAI_API_KEY=<ваш ключ>
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```

### 4. Розгортання Frontend

1. Створіть новий **Static Site**
2. Підключіть ваш GitHub репозиторій
3. Налаштування:
   - **Name**: `ds-delayed-frontend`
   - **Build Command**: `cd frontend && pnpm install && pnpm run build`
   - **Publish Directory**: `frontend/.next`
   - **Root Directory**: `frontend`

4. **Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
   ```

## Альтернативне розгортання через Docker

### 1. Використання docker-compose

```bash
# Збудувати та запустити
docker-compose -f docker-compose.prod.yml up --build

# Запустити в фоновому режимі
docker-compose -f docker-compose.prod.yml up -d --build
```

### 2. Окремі Docker контейнери

```bash
# Backend
cd backend
docker build -t ds-delayed-backend .
docker run -p 3001:3001 --env-file .env ds-delayed-backend

# Frontend
cd frontend
docker build -t ds-delayed-frontend .
docker run -p 3000:3000 --env-file .env ds-delayed-frontend
```

## Перевірка розгортання

### 1. Health Check

```bash
# Backend health
curl https://your-backend-app.onrender.com/health

# Frontend доступність
curl https://your-frontend-app.onrender.com
```

### 2. API Endpoints

```bash
# Групи
curl https://your-backend-app.onrender.com/api/groups

# Заняття
curl https://your-backend-app.onrender.com/api/lessons
```

## Важливі моменти

### 1. База даних
- Використовуйте **Internal Database URL** для backend
- **External Database URL** тільки для локального підключення
- База даних автоматично створюється при першому підключенні

### 2. CORS
- Backend налаштований на прийняття запитів з frontend URL
- Переконайтеся, що `FRONTEND_URL` правильно встановлений

### 3. Telegram Bot
- Бот має бути активним
- Перевірте, що токен правильний
- Бот має мати доступ до груп/каналів

### 4. OpenAI API
- Перевірте ліміти API
- Налаштуйте fallback повідомлення

## Моніторинг

### 1. Render Dashboard
- Переглядайте логи в реальному часі
- Моніторте використання ресурсів
- Перевіряйте статус сервісів

### 2. Health Check
- Регулярно перевіряйте `/health` ендпоінт
- Налаштуйте алерти при збоях

### 3. База даних
- Моніторте підключення
- Перевіряйте розмір бази даних

## Troubleshooting

### 1. Backend не запускається
- Перевірте логи в Render Dashboard
- Переконайтеся, що всі змінні середовища встановлені
- Перевірте підключення до бази даних

### 2. Frontend не завантажується
- Перевірте `NEXT_PUBLIC_API_URL`
- Переконайтеся, що backend доступний
- Перевірте CORS налаштування

### 3. База даних недоступна
- Перевірте статус PostgreSQL в Render
- Переконайтеся, що `DATABASE_URL` правильний
- Перевірте мережеві налаштування

## Корисні команди

```bash
# Логи backend
docker logs <backend-container-id>

# Логи frontend
docker logs <frontend-container-id>

# Підключення до бази даних
psql <DATABASE_URL>

# Перезапуск сервісів
docker-compose -f docker-compose.prod.yml restart
``` 