#!/bin/bash

# Скрипт для підготовки файлів перед збіркою Docker

echo "Підготовка файлів для збірки Docker..."

# Переходимо в кореневу директорію проекту
cd "$(dirname "$0")/.."

# Перевіряємо, чи існують необхідні файли
if [ ! -f "package.json" ]; then
    echo "❌ Помилка: package.json не знайдено в кореневій директорії"
    exit 1
fi

if [ ! -f "pnpm-lock.yaml" ]; then
    echo "❌ Помилка: pnpm-lock.yaml не знайдено в кореневій директорії"
    exit 1
fi

if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ Помилка: pnpm-workspace.yaml не знайдено в кореневій директорії"
    exit 1
fi

# Копіюємо необхідні файли в backend/
echo "📁 Копіювання файлів в backend/..."
cp package.json backend/
cp pnpm-lock.yaml backend/
cp pnpm-workspace.yaml backend/

echo "✅ Файли успішно скопійовано в backend/"
echo ""
echo "Тепер можна запускати збірку Docker:"
echo "cd backend"
echo "docker build -t ds-delayed-backend ."
echo ""
echo "Або використовувати скрипт збірки:"
echo "./scripts/build-backend.sh" 