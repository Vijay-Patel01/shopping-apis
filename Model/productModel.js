module.exports = (sequelize, DataTypes) => {
  return sequelize.define('product', {
    productId: {
      type: DataTypes.INTEGER().UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: new DataTypes.STRING(),
    },
    description: {
      type: new DataTypes.TEXT()
    },
    price: {
      type: DataTypes.DECIMAL(),
    },
    image: {
      type: new DataTypes.TEXT('long')
    },
    status: {
      type: DataTypes.STRING(),
    }
  }, { timestamps: true });
}