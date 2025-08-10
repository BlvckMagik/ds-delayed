#!/bin/bash

echo "🔍 Перевірка готовності до розгортання..."

# Перевіряємо структуру проекту
echo "📁 Перевірка структури проекту..."
required_dirs=("backend" "frontend" "scripts")
for dir in "${required_dirs[@]}"; do
    if [ -d "../$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ не знайдено"
        exit 1
    fi
done

# Перевіряємо файли конфігурації
echo "📄 Перевірка файлів конфігурації..."
required_files=(
    "backend/package.json"
    "frontend/package.json"
    "backend/src/main.ts"
    "frontend/next.config.js"
    "backend/src/config/database.config.ts"
    "RENDER_DEPLOYMENT.md"
)
for file in "${required_files[@]}"; do
    if [ -f "../$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file не знайдено"
        exit 1
    fi
done

# Перевіряємо змінні середовища
echo "🔐 Перевірка змінних середовища..."
if [ -f "../backend/.env" ]; then
    echo "✅ backend/.env"
else
    echo "⚠️  backend/.env не знайдено (створіть на основі backend/env.example)"
fi

if [ -f "../frontend/.env" ]; then
    echo "✅ frontend/.env"
else
    echo "⚠️  frontend/.env не знайдено (створіть на основі frontend/env.example)"
fi

# Перевіряємо залежності
echo "📦 Перевірка залежностей..."
cd ../backend
if [ -d "node_modules" ]; then
    echo "✅ backend/node_modules"
else
    echo "⚠️  backend/node_modules не знайдено (запустіть pnpm install)"
fi

cd ../frontend
if [ -d "node_modules" ]; then
    echo "✅ frontend/node_modules"
else
    echo "⚠️  frontend/node_modules не знайдено (запустіть pnpm install)"
fi

# Перевіряємо Docker
echo "🐳 Перевірка Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker встановлено"
    if command -v docker-compose &> /dev/null; then
        echo "✅ Docker Compose встановлено"
    else
        echo "⚠️  Docker Compose не знайдено"
    fi
else
    echo "⚠️  Docker не встановлено (опціонально для розгортання)"
fi

# Перевіряємо Git
echo "📚 Перевірка Git..."
if [ -d "../.git" ]; then
    echo "✅ Git репозиторій"
    cd ..
    current_branch=$(git branch --show-current)
    echo "📍 Поточна гілка: $current_branch"
    
    # Перевіряємо чи є незбережені зміни
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  Є незбережені зміни в Git"
        git status --short
    else
        echo "✅ Git чистий"
    fi
else
    echo "❌ Git репозиторій не знайдено"
    exit 1
fi

echo ""
echo "🎯 Результат перевірки:"
echo "✅ Проект готовий до розгортання на Render!"
echo ""
echo "📋 Наступні кроки:"
echo "1. Запустіть: ./scripts/deploy-render.sh"
echo "2. Слідуйте інструкціям в RENDER_DEPLOYMENT.md"
echo "3. Створіть сервіси на Render Dashboard" 