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

### Продакшн

```bash
pnpm build
pnpm start
```

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

### Групи
- `GET /api/groups` - Отримати всі групи
- `POST /api/groups` - Створити групу

### Заняття
- `GET /api/lessons` - Отримати всі заняття
- `POST /api/lessons` - Створити заняття

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