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

### Проблема з шляхом до dist/main
Після виправлення залежностей виникла помилка:
```
Error: Cannot find module '/app/dist/main'
```

**Причина:** 
1. `pnpm run build` виконувався в кореневій директорії замість backend
2. Шлях до зібраного файлу був неправильним

**Рішення:** 
1. Змінено збірку на `cd backend && pnpm run build`
2. Оновлено CMD на `node backend/dist/main`
3. Тепер збірка виконується в правильній директорії

### Проблема з cd backend
Після виправлення шляху збірки виникла помилка:
```
/bin/sh: cd: line 0: can't cd to backend: No such file or directory
```

**Причина:** 
1. `COPY . .` копіював всі файли з кореневої директорії
2. Але структура папок не зберігалася правильно
3. Папка `backend/` не існувала в контейнері

**Рішення:** 
1. Змінено копіювання на `COPY backend/ ./backend/`
2. Додано копіювання конфігураційних файлів `nest-cli.json` та `tsconfig.json`
3. Тепер структура файлів в контейнері відповідає очікуваній

### Проблема з COPY backend/
Після виправлення структури файлів виникла помилка:
```
ERROR: failed to calculate checksum of ref ...: "/backend": not found
```

**Причина:** 
1. Dockerfile намагався копіювати `COPY backend/src/ ./backend/src/`
2. Але контекст збірки з кореневої директорії не міг знайти папку `backend/`
3. Потрібно копіювати конкретні файли та папки

**Рішення:** 
1. Змінено копіювання на конкретні шляхи: `COPY backend/src/ ./backend/src/`
2. Додано копіювання окремих файлів: `nest-cli.json`, `tsconfig.json`, `package.json`
3. Тепер Docker правильно знаходить всі необхідні файли

### Проблема з контекстом збірки
Після виправлення шляхів копіювання виникла помилка:
```
ERROR: failed to calculate checksum of ref ...: "/backend/tsconfig.json": not found
```

**Причина:** 
1. Dockerfile намагався копіювати `COPY backend/tsconfig.json ./backend/`
2. Але контекст збірки з кореневої директорії не включав папку `backend/`
3. Потрібно змінити контекст збірки або шляхи копіювання

**Рішення:** 
1. Змінено контекст збірки на папку `backend/`
2. Оновлено шляхи копіювання: `COPY src/ ./backend/src/`
3. Тепер збірка виконується з правильної директорії

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
4. **CMD** запускає `node backend/dist/main` замість `pnpm run start:prod`
5. **pnpm install** без `--frozen-lockfile` дозволяє автоматично синхронізувати залежності
6. **Збірка** виконується в `backend/` директорії для правильного створення `dist/`
7. **Копіювання файлів** тепер використовує конкретні шляхи замість загальних папок
8. **Контекст збірки** тепер правильно встановлений на папку `backend/`

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