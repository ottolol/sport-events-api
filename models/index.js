const db = require("../config/db");
const Event = require("./Event")(db, db.Sequelize.DataTypes);
const Participant = require("./Participant")(db, db.Sequelize.DataTypes);

Event.hasMany(Participant);
Participant.belongsTo(Event);

const syncDb = async () => {
  await db.sync({ force: false });
};

module.exports = {
  Event,
  Participant,
  syncDb,
};
