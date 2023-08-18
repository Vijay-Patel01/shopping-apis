module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER().UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(),
    },
    email: {
      type: DataTypes.STRING(),
    },
    password: {
      type: DataTypes.STRING(),
    },
    role: {
      type: DataTypes.STRING(),
    },
    status: {
      type: DataTypes.STRING(),
    }
  },
    { timestamps: true },);
};