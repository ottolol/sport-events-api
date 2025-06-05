const express = require("express");
const router = express.Router();
const exportController = require("../controllers/exportController");

router.get("/participants", exportController.exportParticipants);

module.exports = router;
