const cron = require("node-cron");
const remindController = require("./controllers/remindController");

cron.schedule("0 9 * * *", () => {
  console.log("Отправка напоминаний...");
  remindController.sendReminders({}, { status: () => {}, json: () => {} });
});
