module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.ENUM("upcoming", "completed"),
  });
  return Event;
};
