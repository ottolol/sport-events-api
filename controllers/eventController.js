const { Event } = require("../models");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Ошибка загрузки мероприятий" });
  }
};

exports.createEvent = async (req, res) => {
  const eventData = req.body;

  try {
    const newEvent = await Event.create(eventData);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сохранения мероприятия" });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: "Мероприятие не найдено" });

    await event.update(eventData);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка обновления мероприятия" });
  }
};
