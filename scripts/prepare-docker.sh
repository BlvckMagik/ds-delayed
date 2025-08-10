#!/bin/bash

# Скрипт для підготовки файлів для збірки Docker

echo "Підготовка файлів для збірки Docker..."

# Переходимо в кореневу директорію проекту
cd "$(dirname "$0")/.."

# Перевіряємо, чи існує папка backend
if [ ! -d "backend" ]; then
    echo "❌ Помилка: Папка backend не знайдена"
    exit 1
fi

echo "✅ Backend папка знайдена"

# Перевіряємо, чи існує backend/package.json
if [ ! -f "backend/package.json" ]; then
    echo "❌ Помилка: backend/package.json не знайдено"
    exit 1
fi

echo "✅ backend/package.json знайдено"

# Перевіряємо, чи існує backend/pnpm-lock.yaml
if [ ! -f "backend/pnpm-lock.yaml" ]; then
    echo "❌ Помилка: backend/pnpm-lock.yaml не знайдено"
    exit 1
fi

echo "✅ backend/pnpm-lock.yaml знайдено"

echo ""
echo "Тепер можна запускати збірку Docker:"
echo "cd backend"
echo "docker build -t ds-delayed-backend ."
echo ""
echo "Або використовувати скрипт збірки:"
echo "./scripts/build-backend.sh" 