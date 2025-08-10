#!/bin/bash

# Скрипт для збірки backend Docker образу

echo "Збірка backend Docker образу..."

# Переходимо в кореневу директорію проекту
cd "$(dirname "$0")/.."

# Збираємо backend з правильним контекстом
docker build -f backend/Dockerfile -t ds-delayed-backend .

echo "Backend Docker образ зібрано успішно!"
echo "Для запуску використовуйте: docker run -p 3001:3001 ds-delayed-backend" 