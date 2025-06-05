# 🏗️ Sport Events API (Backend)

REST API для управления спортивными мероприятиями, регистрацией участников и оплатой через Stripe.

---

## 🛠️ Технологии

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- Stripe
- Nodemailer
- ExcelJS
- JWT
- Node-cron
- Render.com + Railway.app (для БД)

---

## 🚀 Установка

### 1. Клонируй репозиторий

```bash
git clone https://github.com/ваше-имя/sport-events-backend.git 
cd sport-events-backend```

### 2. Установка зависимостей
```bash
npm install```

### 3. Запустить сервер
```bash
npm start```

## Доступные эндпоинты:
| ------ | ------ |
| GET | /api/events | Получить список мероприятий |
| POST | /api/events | Создать мероприятие |
| PUT | /api/events/:id | Обновить мероприятие |
| POST | /api/payment/create-intent | Создать платежное намерение |
| POST | /api/auth/login | Вход администратора |
| GET | /api/export/participants | Экспорт списка участников в Excel |
| POST | /api/remind/send | Отправка email-напоминаний |
