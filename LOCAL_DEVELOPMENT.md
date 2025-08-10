# Локальна розробка без Docker

## Швидкий запуск

### Автоматичний запуск (рекомендовано)
```bash
# Запуск через скрипт
./scripts/dev.sh
```

Цей скрипт автоматично:
- Встановить всі залежності
- Запустить backend на порту 3001
- Запустить frontend на порту 3000

### Ручний запуск

#### 1. Встановлення залежностей
```bash
# Встановлення всіх залежностей проекту
pnpm install
```

#### 2. Запуск Backend
```bash
cd backend
pnpm install
pnpm run start:dev
```

Backend буде доступний на: http://localhost:3001

#### 3. Запуск Frontend (в новому терміналі)
```bash
cd frontend
pnpm install
pnpm run dev
```

Frontend буде доступний на: http://localhost:3000

## Структура портів

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5432 (якщо запущений)

## Залежності

### Обов'язкові
- Node.js 18+
- pnpm
- Git

### Опціональні
- PostgreSQL (для повної функціональності)
- Docker (для контейнеризації)

## Перевірка роботи

### Backend
```bash
curl http://localhost:3001/health
```

### Frontend
Відкрийте http://localhost:3000 в браузері

## Зупинка серверів

### Автоматичний запуск
Натисніть `Ctrl+C` в терміналі зі скриптом `dev.sh`

### Ручний запуск
Натисніть `Ctrl+C` в кожному терміналі з серверами

## Розв'язання проблем

### Порт зайнятий
```bash
# Перевірка, що використовує порт
lsof -i :3000
lsof -i :3001

# Зупинка процесу
kill -9 <PID>
```

### Проблеми з залежностями
```bash
# Очищення кешу
pnpm store prune

# Перевстановлення залежностей
rm -rf node_modules
pnpm install
```

### Проблеми з базою даних
```bash
# Запуск PostgreSQL через Docker (якщо встановлений)
./scripts/start-postgres.sh

# Або встановлення локально
./scripts/setup-postgres.sh
```

## Переваги локальної розробки

✅ **Швидкий запуск** - без очікування збірки Docker  
✅ **Гаряча перезавантаження** - автоматичне оновлення при змінах  
✅ **Легке налагодження** - прямий доступ до логів  
✅ **Гнучкість** - можна легко змінювати конфігурацію  
✅ **Швидкість** - без накладних витрат контейнеризації  

## Перехід на Docker

Коли будете готові до Docker:

1. **Запустіть Docker Desktop**
2. **Використайте скрипт збірки:**
   ```bash
   ./scripts/build-backend.sh
   ```
3. **Або Docker Compose:**
   ```bash
   docker-compose -f docker-compose.backend.yml up --build
   ``` 