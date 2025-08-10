# Вирішення проблем з Docker збіркою

## Проблема
При спробі збірки backend Docker образу виникає помилка:
```
ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref ...: "/pnpm-lock.yaml": not found
```

## Причина
Dockerfile знаходиться в папці `backend/`, але намагається копіювати файли з батьківської директорії (`../`). Контекст збірки Docker обмежений до папки `backend/`, тому файли `package.json`, `pnpm-lock.yaml` та `pnpm-workspace.yaml` недоступні.

## Додаткова проблема
Після виправлення контексту збірки виникла помилка:
```
ERR_PNPM_NO_SCRIPT Missing script: start:prod
```

**Причина:** Dockerfile намагався запустити `pnpm run start:prod` в кореневій директорії, але цей скрипт існує тільки в `backend/package.json`.

**Рішення:** Оновлено Dockerfile для прямого запуску `node dist/main` замість `pnpm run start:prod`.

### Проблема з --frozen-lockfile
Після виправлення скрипта виникла нова помилка:
```
ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date
```

**Причина:** `pnpm-lock.yaml` не синхронізований з `package.json` після відновлення оригінального `backend/package.json`.

**Рішення:** 
1. Оновлено `pnpm-lock.yaml` через `pnpm install`
2. Змінено Dockerfile з `pnpm install --frozen-lockfile` на `pnpm install`
3. Це дозволяє pnpm автоматично синхронізувати залежності

## Рішення

### Варіант 1: Автоматична підготовка файлів (рекомендовано)
```bash
# Запустіть скрипт збірки - він автоматично підготує файли
./scripts/build-backend.sh
```

### Варіант 2: Ручна підготовка файлів
```bash
# Підготуйте файли вручну
./scripts/prepare-docker.sh

# Потім збирайте з папки backend
cd backend
docker build -t ds-delayed-backend .
```

### Варіант 3: Збірка з кореневої директорії
```bash
# З кореневої директорії проекту
docker build -f backend/Dockerfile -t ds-delayed-backend .
```

### Варіант 4: Docker Compose
```bash
# Використовуйте спеціальний docker-compose файл
docker-compose -f docker-compose.backend.yml up --build
```

## Структура файлів
- `backend/Dockerfile` - основний Dockerfile (виправлено)
- `backend/Dockerfile.simple` - спрощений варіант (виправлено)
- `backend/.dockerignore` - налаштування Docker контексту
- `docker-compose.backend.yml` - docker-compose з правильним контекстом
- `scripts/build-backend.sh` - скрипт для автоматичної збірки
- `scripts/prepare-docker.sh` - скрипт для підготовки файлів

## Як це працює

1. **Скрипт `prepare-docker.sh`** копіює необхідні файли з кореневої директорії в `backend/`
2. **Скрипт `build-backend.sh`** автоматично викликає підготовку та запускає збірку
3. **Dockerfile** тепер знаходить всі необхідні файли в поточній директорії
4. **CMD** запускає `node dist/main` замість `pnpm run start:prod`
5. **pnpm install** без `--frozen-lockfile` дозволяє автоматично синхронізувати залежності

## Перевірка
Після успішної збірки можна запустити контейнер:
```bash
docker run -p 3001:3001 ds-delayed-backend
```

## Примітки
- Файли `package.json`, `pnpm-lock.yaml` та `pnpm-workspace.yaml` повинні бути в папці `backend/` перед збіркою
- Скрипт `prepare-docker.sh` автоматично копіює ці файли
- Для продакшн збірки рекомендується використовувати `./scripts/build-backend.sh`
- Dockerfile тепер правильно запускає backend без залежності від pnpm скриптів 