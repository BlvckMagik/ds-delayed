# Вирішення проблем з Docker збіркою

## Проблема
При спробі збірки backend Docker образу виникає помилка:
```
ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref ...: "/pnpm-lock.yaml": not found
```

## Причина
Dockerfile знаходиться в папці `backend/`, але намагається копіювати файли з батьківської директорії (`../`). Контекст збірки Docker обмежений до папки `backend/`, тому файли `package.json`, `pnpm-lock.yaml` та `pnpm-workspace.yaml` недоступні.

## Рішення

### Варіант 1: Збірка з кореневої директорії (рекомендовано)
```bash
# З кореневої директорії проекту
docker build -f backend/Dockerfile -t ds-delayed-backend .
```

### Варіант 2: Використання готового скрипта
```bash
# Запустіть скрипт збірки
./scripts/build-backend.sh
```

### Варіант 3: Docker Compose
```bash
# Використовуйте спеціальний docker-compose файл
docker-compose -f docker-compose.backend.yml up --build
```

### Варіант 4: Підготовка файлів
```bash
# Скопіюйте необхідні файли в backend/ перед збіркою
./scripts/prepare-docker.sh

# Потім збирайте з папки backend/
cd backend
docker build -t ds-delayed-backend .
```

## Структура файлів
- `backend/Dockerfile` - оновлений Dockerfile без `../`
- `docker-compose.backend.yml` - docker-compose з правильним контекстом
- `scripts/build-backend.sh` - скрипт для зручної збірки
- `scripts/prepare-docker.sh` - скрипт для підготовки файлів

## Перевірка
Після успішної збірки можна запустити контейнер:
```bash
docker run -p 3001:3001 ds-delayed-backend
``` 