#!/bin/bash

# Скрипт для збірки backend Docker образу

echo "🚀 Збірка backend Docker образу..."

# Переходимо в кореневу директорію проекту
cd "$(dirname "$0")/.."

# Підготовлюємо файли для Docker
echo "📁 Підготовка файлів для Docker..."
./scripts/prepare-docker.sh

# Перевіряємо, чи Docker запущений
if ! docker info > /dev/null 2>&1; then
    echo "❌ Помилка: Docker демон не запущений"
    echo "Запустіть Docker Desktop або docker daemon"
    exit 1
fi

echo "🐳 Запуск збірки Docker..."

# Збираємо backend з папки backend (правильний контекст)
cd backend
docker build -t ds-delayed-backend .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Backend Docker образ зібрано успішно!"
    echo ""
    echo "Для запуску використовуйте:"
    echo "docker run -p 3001:3001 ds-delayed-backend"
    echo ""
    echo "Або через Docker Compose:"
    echo "cd .."
    echo "docker-compose -f docker-compose.backend.yml up"
else
    echo "❌ Помилка при збірці Docker образу"
    exit 1
fi 