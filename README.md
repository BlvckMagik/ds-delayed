# DS Delayed - Відкладені повідомлення Telegram

Монорепозиторій для створення відкладених повідомлень в Telegram з нагадуваннями про заняття.

## Структура проекту

```
ds-delayed/
├── frontend/          # Next.js додаток з FSD архітектурою
├── backend/           # NestJS API сервер
├── package.json       # Кореневий package.json для монорепозиторію
└── pnpm-workspace.yaml
```

## Технології

### Frontend
- Next.js 14
- TypeScript
- Material-UI (MUI)
- Zustand
- RTK Query
- FSD (Feature-Sliced Design) архітектура

### Backend
- NestJS
- TypeScript
- TypeORM
- SQLite
- node-telegram-bot-api
- date-fns

### DevOps
- Docker
- Docker Compose
- pnpm workspaces

## Встановлення

1. Клонуйте репозиторій:
```bash
git clone <repository-url>
cd ds-delayed
```

2. Встановіть залежності:
```bash
pnpm install
```

## Запуск

### Розробка

#### Автоматичний запуск (рекомендовано)
```bash
# Запуск через скрипт - автоматично запустить frontend та backend
./scripts/dev.sh
```

#### Ручний запуск

Запустіть фронтенд та бекенд одночасно:
```bash
pnpm dev
```

Або окремо:

**Frontend (порт 3000):**
```bash
cd frontend
pnpm dev
```

**Backend (порт 3001):**
```bash
cd backend
pnpm start:dev
```

**Детальні інструкції:** [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)

### Продакшн

```bash
pnpm build
pnpm start
```

### Docker

#### Збірка Backend

Для збірки backend Docker образу:

```bash
# Варіант 1: Автоматична збірка (рекомендовано)
./scripts/build-backend.sh

# Варіант 2: Ручна підготовка + збірка
./scripts/prepare-docker.sh
cd backend
docker build -t ds-delayed-backend .

# Варіант 3: З кореневої директорії
docker build -f backend/Dockerfile -t ds-delayed-backend .

# Варіант 4: Docker Compose
docker-compose -f docker-compose.backend.yml up --build
```

**Примітка:** 
- Якщо виникають проблеми з Docker збіркою, дивіться [DOCKER_TROUBLESHOOTING.md](./DOCKER_TROUBLESHOOTING.md)
- **Якщо Docker не запущений** - використовуйте локальну розробку: [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
- ✅ **Виправлено:** Проблема з `start:prod` скриптом - Dockerfile тепер правильно запускає backend
- ✅ **Виправлено:** Проблема з `--frozen-lockfile` - тепер використовується звичайний `pnpm install`
- ✅ **Виправлено:** Проблема з шляхом до `dist/main` - тепер збірка виконується в правильній директорії

#### Запуск контейнерів

```bash
# Запуск backend
docker run -p 3001:3001 ds-delayed-backend

# Запуск з PostgreSQL
docker-compose -f docker-compose.backend.yml up
```

### Розгортання на Render

#### Швидке розгортання

1. **Перевірка готовності:**
```bash
./scripts/check-deployment.sh
```

2. **Підготовка до розгортання:**
```bash
./scripts/deploy-render.sh
```

3. **Автоматичне розгортання:**
- Підключіть репозиторій до Render
- Використайте `render.yaml` для автоматичного налаштування
- Або створіть сервіси вручну згідно з `RENDER_DEPLOYMENT.md`

#### Ручне розгортання

Детальні інструкції дивіться в [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

#### CI/CD

Налаштуйте автоматичне розгортання через GitHub Actions:
1. Додайте секрети в GitHub:
   - `RENDER_API_KEY`
   - `RENDER_BACKEND_SERVICE_ID`
   - `RENDER_FRONTEND_SERVICE_ID`
2. Push в `main` гілку автоматично запустить розгортання

## Функціональність

### Групи
- Створення груп з назвою, посиланням на Meet та Telegram токеном
- Перегляд списку груп

### Заняття
- Створення занять з назвою, часом та вибором групи
- Перегляд списку занять з інформацією про групу та час

### Telegram повідомлення
- Автоматична відправка нагадувань про заняття
- Показ часу в часових зонах Києва та Берліна
- Включення посилання на Meet
- Генерація унікальних побажань за допомогою LLM

### GPT інтеграція
- Інтеграція з OpenAI GPT-3.5-turbo API
- Генерація персоналізованих побажань для кожного заняття
- Fallback до вбудованих побажань при недоступності API

## API Endpoints

### Системні
- `GET /` - Перевірка роботи API
- `GET /health` - Health check з перевіркою бази даних

### Групи
- `GET /api/groups` - Отримати всі групи
- `POST /api/groups` - Створити групу
- `PUT /api/groups/:id` - Оновити групу
- `DELETE /api/groups/:id` - Видалити групу

### Заняття
- `GET /api/lessons` - Отримати всі заняття
- `POST /api/lessons` - Створити заняття
- `PUT /api/lessons/:id` - Оновити заняття
- `DELETE /api/lessons/:id` - Видалити заняття

## Налаштування Telegram

Для роботи з Telegram потрібно:

1. Створити бота через @BotFather
2. Отримати токен бота
3. Додати бота до групи/каналу
4. Використовувати токен при створенні групи

## Структура FSD архітектури

```
frontend/src/
├── app/              # Налаштування додатку
├── pages/            # Сторінки
├── widgets/          # Віджети (композиція features)
├── features/         # Бізнес-функції
├── entities/         # Бізнес-сутності
└── shared/           # Спільний код
```

## Ліцензія

MIT 