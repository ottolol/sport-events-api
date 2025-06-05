const express = require("express");
const router = express.Router();
const remindController = require("../controllers/remindController");

router.post("/send", remindController.sendReminders);

module.exports = router;
