# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо backend package.json та pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Встановлюємо pnpm
RUN npm install -g pnpm

# Встановлюємо залежності backend
RUN pnpm install

# Копіюємо backend файли
COPY src/ ./src/
COPY nest-cli.json ./
COPY tsconfig.json ./

# Збираємо backend додаток
RUN pnpm run build

# Видаляємо dev залежності
RUN pnpm prune --prod

# Відкриваємо порт
EXPOSE 3001

# Запускаємо backend додаток
CMD ["node", "dist/main"] 