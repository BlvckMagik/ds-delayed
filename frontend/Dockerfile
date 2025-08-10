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
COPY . .

# Збираємо додаток
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Використовуємо nginx для обслуговування статичних файлів
FROM nginx:alpine

# Копіюємо зібраний додаток
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/.next/static ./.next/static
COPY --from=0 /app/public ./public

# Копіюємо nginx конфігурацію
COPY nginx.conf /etc/nginx/nginx.conf

# Відкриваємо порт
EXPOSE 3000

# Запускаємо nginx
CMD ["nginx", "-g", "daemon off;"] 