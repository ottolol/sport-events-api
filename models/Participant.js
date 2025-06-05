module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define("Participant", {
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
  });
  return Participant;
};
