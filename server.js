const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const paymentRouter = require("./routes/payment");
const eventRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const exportRouter = require("./routes/export");
const remindRouter = require("./routes/remind");
const { syncDb } = require("./models");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API для мероприятий работает!");
});

app.use("/api/events", eventRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/auth", authRouter);
app.use("/api/export", exportRouter);
app.use("/api/remind", remindRouter);

const PORT = process.env.PORT || 5000;

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});
