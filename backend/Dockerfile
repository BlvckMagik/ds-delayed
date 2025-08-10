# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Встановлюємо pnpm
RUN npm install -g pnpm

# Встановлюємо залежності
RUN pnpm install --frozen-lockfile

# Копіюємо код додатку
COPY . .

# Збираємо додаток
RUN pnpm run build

# Видаляємо dev залежності
RUN pnpm prune --prod

# Відкриваємо порт
EXPOSE 3001

# Запускаємо додаток
CMD ["pnpm", "run", "start:prod"] 