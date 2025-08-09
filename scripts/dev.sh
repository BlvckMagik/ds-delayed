#!/bin/bash

echo "🚀 Запуск DS Delayed в режимі розробки..."

echo "📦 Встановлення залежностей..."
pnpm install

echo "🔧 Запуск бекенду..."
cd backend && pnpm start:dev &
BACKEND_PID=$!

echo "⏳ Очікування запуску бекенду..."
sleep 5

echo "🎨 Запуск фронтенду..."
cd ../frontend && pnpm dev &
FRONTEND_PID=$!

echo "✅ Додаток запущено!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"

trap "echo '🛑 Зупинка серверів...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait 