const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Используем DATABASE_URL целиком
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Некоторые хосты требуют SSL
      rejectUnauthorized: false // Для тестов (не рекомендуется в продакшене)
    }
  }
});

module.exports = sequelize;