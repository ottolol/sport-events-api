const nodemailer = require("nodemailer");
const { Event, Participant } = require("../models");

exports.sendReminders = async (req, res) => {
  const daysBefore = 1;
  const now = new Date();
  const reminderDate = new Date(now.getTime() + daysBefore * 86400000);

  const events = await Event.findAll({
    where: {
      date: {
        $gte: now,
        $lte: reminderDate,
      },
    },
    include: [Participant],
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const event of events) {
    for (const participant of event.Participants) {
      if (participant.contact.includes("@")) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: participant.contact,
          subject: `Напоминание: ${event.title}`,
          text: `Привет! Напоминаем, что вы зарегистрированы на мероприятие "${event.title}". Оно состоится ${new Date(event.date).toLocaleString()}!`,
        });
      }
    }
  }

  res.json({ message: "Напоминания отправлены!" });
};
