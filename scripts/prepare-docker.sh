#!/bin/bash

# Скрипт для підготовки файлів перед збіркою Docker

echo "Підготовка файлів для збірки Docker..."

# Копіюємо необхідні файли в backend/
cp package.json backend/
cp pnpm-lock.yaml backend/
cp pnpm-workspace.yaml backend/

echo "Файли скопійовано в backend/"
echo "Тепер можна запускати збірку Docker з папки backend/" 