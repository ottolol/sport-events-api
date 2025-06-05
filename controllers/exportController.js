const ExcelJS = require("exceljs");
const { Participant } = require("../models");

exports.exportParticipants = async (req, res) => {
  const participants = await Participant.findAll({ include: ["Event"] });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Участники");

  worksheet.columns = [
    { header: "Имя", key: "name", width: 20 },
    { header: "Контакт", key: "contact", width: 25 },
    { header: "Мероприятие", key: "eventTitle", width: 30 },
  ];

  participants.forEach(p => {
    worksheet.addRow({
      name: p.name,
      contact: p.contact,
      eventTitle: p.Event?.title || "",
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=participants.xlsx");

  await workbook.xlsx.write(res);
  res.end();
};
