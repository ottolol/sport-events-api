const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", eventController.getAllEvents);
// router.post("/", ensureAdmin, eventController.createEvent);
router.post("/", ensureAdmin, eventController.upsertEvent);
router.put("/:id", ensureAdmin, eventController.updateEvent);

module.exports = router;
