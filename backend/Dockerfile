# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та pnpm-lock.yaml з кореневої директорії
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Встановлюємо pnpm
RUN npm install -g pnpm

# Встановлюємо залежності
RUN pnpm install

# Копіюємо тільки backend файли
COPY backend/ ./backend/
COPY nest-cli.json ./
COPY tsconfig.json ./

# Збираємо backend додаток
RUN cd backend && pnpm run build

# Видаляємо dev залежності
RUN pnpm prune --prod

# Відкриваємо порт
EXPOSE 3001

# Запускаємо backend додаток
CMD ["node", "backend/dist/main"] 