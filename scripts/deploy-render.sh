#!/bin/bash

echo "🚀 Розгортання DS Delayed на Render..."

# Перевіряємо чи є змінні середовища
if [ ! -f "../backend/.env" ]; then
    echo "❌ Файл backend/.env не знайдено!"
    echo "Створіть файл backend/.env на основі backend/env.example"
    exit 1
fi

if [ ! -f "../frontend/.env" ]; then
    echo "❌ Файл frontend/.env не знайдено!"
    echo "Створіть файл frontend/.env на основі frontend/env.example"
    exit 1
fi

echo "✅ Змінні середовища знайдено"

# Збираємо backend
echo "🔨 Збірка backend..."
cd ../backend
pnpm run build
if [ $? -ne 0 ]; then
    echo "❌ Помилка збірки backend"
    exit 1
fi
echo "✅ Backend зібрано"

# Збираємо frontend
echo "🔨 Збірка frontend..."
cd ../frontend
pnpm run build
if [ $? -ne 0 ]; then
    echo "❌ Помилка збірки frontend"
    exit 1
fi
echo "✅ Frontend зібрано"

# Перевіряємо Docker
if command -v docker &> /dev/null; then
    echo "🐳 Docker знайдено, збірка образів..."
    
    # Збірка backend образа
    cd ../backend
    docker build -t ds-delayed-backend .
    if [ $? -ne 0 ]; then
        echo "❌ Помилка збірки backend Docker образа"
        exit 1
    fi
    echo "✅ Backend Docker образ зібрано"
    
    # Збірка frontend образа
    cd ../frontend
    docker build -t ds-delayed-frontend .
    if [ $? -ne 0 ]; then
        echo "❌ Помилка збірки frontend Docker образа"
        exit 1
    fi
    echo "✅ Frontend Docker образ зібрано"
    
    echo "🐳 Docker образи готові для розгортання"
else
    echo "⚠️  Docker не знайдено, пропускаємо збірку образів"
fi

echo ""
echo "🎉 Розгортання завершено!"
echo ""
echo "📋 Наступні кроки:"
echo "1. Створіть PostgreSQL базу даних на Render"
echo "2. Створіть Web Service для backend"
echo "3. Створіть Static Site для frontend"
echo "4. Налаштуйте змінні середовища"
echo "5. Запустіть розгортання"
echo ""
echo "📖 Детальні інструкції: RENDER_DEPLOYMENT.md" 