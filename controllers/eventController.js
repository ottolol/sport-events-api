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

// exports.updateEvent = async (req, res) => {
//   const { id } = req.params;
//   const eventData = req.body;

//   try {
//     const event = await Event.findByPk(id);
//     if (!event) return res.status(404).json({ error: "Мероприятие не найдено" });

//     await event.update(eventData);
//     res.json(event);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Ошибка обновления мероприятия" });
//   }
// };

exports.upsertEvent = async (req, res) => {
  const { id, title, description, date, location, photoUrl, price, status } = req.body;

  try {
    if (!title || !description || !location || !date || !price) {
      return res.status(400).json({ error: "Все обязательные поля должны быть заполнены" });
    }

    let event;

    if (!id || id <= 0) {
      const maxEvent = await Event.findOne({
        order: [["id", "DESC"]],
        attributes: ["id"],
      });

      const newId = maxEvent ? maxEvent.id + 1 : 1;

      event = await Event.create({
        id: newId,
        title,
        description,
        date,
        location,
        photoUrl,
        price,
        status,
      });
    } else {
      const existingEvent = await Event.findByPk(id);
      if (!existingEvent) {
        return res.status(404).json({ error: "Мероприятие не найдено" });
      }

      event = await existingEvent.update({
        title,
        description,
        date,
        location,
        photoUrl,
        price,
        status,
      });
    }

    res.json(event); // Важно: возвращаем созданное/обновленное событие
  } catch (err) {
    console.error("Ошибка сохранения мероприятия", err);
    res.status(500).json({ error: "Не удалось сохранить мероприятие" });
  }
};
