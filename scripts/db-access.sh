#!/bin/bash

echo "=== DS Delayed Database Access ==="
echo "1. Підключитися до бази даних"
echo "2. Показати структуру таблиць"
echo "3. Показати дані занять"
echo "4. Показати дані груп"
echo "5. Показати заняття з групами"
echo "6. Вийти"
echo ""

read -p "Виберіть опцію (1-6): " choice

case $choice in
  1)
    echo "Підключення до бази даних..."
    psql -h localhost -U postgres -d ds_delayed
    ;;
  2)
    echo "Структура таблиць:"
    psql -h localhost -U postgres -d ds_delayed -c "\dt"
    echo ""
    echo "Структура таблиці lesson:"
    psql -h localhost -U postgres -d ds_delayed -c "\d lesson"
    echo ""
    echo "Структура таблиці group:"
    psql -h localhost -U postgres -d ds_delayed -c '\d "group"'
    ;;
  3)
    echo "Дані занять:"
    psql -h localhost -U postgres -d ds_delayed -c "SELECT * FROM lesson;"
    ;;
  4)
    echo "Дані груп:"
    psql -h localhost -U postgres -d ds_delayed -c 'SELECT * FROM "group";'
    ;;
  5)
    echo "Заняття з групами:"
    psql -h localhost -U postgres -d ds_delayed -c 'SELECT l.name as lesson_name, l.day_of_week, l.time, g.name as group_name FROM lesson l JOIN "group" g ON l.group_id = g.id;'
    ;;
  6)
    echo "До побачення!"
    exit 0
    ;;
  *)
    echo "Невірний вибір"
    ;;
esac 