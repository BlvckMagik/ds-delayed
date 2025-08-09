#!/bin/bash

echo "Налаштування PostgreSQL для DS Delayed..."

# Ініціалізація бази даних (якщо потрібно)
if [ ! -d "/var/lib/postgres/data" ]; then
    echo "Ініціалізація PostgreSQL..."
    sudo -u postgres initdb -D /var/lib/postgres/data
fi

# Запуск PostgreSQL сервісу
echo "Запуск PostgreSQL сервісу..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Створення користувача та бази даних
echo "Створення користувача та бази даних..."
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'postgres' SUPERUSER;"
sudo -u postgres psql -c "CREATE DATABASE ds_delayed OWNER postgres;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ds_delayed TO postgres;"

echo "PostgreSQL налаштовано! База даних 'ds_delayed' створена."
echo "Користувач: postgres"
echo "Пароль: postgres" 