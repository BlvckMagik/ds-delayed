#!/bin/bash

echo "Запуск PostgreSQL..."

# Запуск PostgreSQL сервісу
sudo systemctl start postgresql

# Зачекаємо трохи
sleep 3

# Перевіряємо статус
if sudo systemctl is-active --quiet postgresql; then
    echo "PostgreSQL запущено успішно!"
    
    # Створюємо базу даних якщо вона не існує
    sudo -u postgres psql -c "CREATE DATABASE ds_delayed;" 2>/dev/null || echo "База даних вже існує"
    
    echo "PostgreSQL готовий до використання!"
else
    echo "Помилка запуску PostgreSQL"
    exit 1
fi 