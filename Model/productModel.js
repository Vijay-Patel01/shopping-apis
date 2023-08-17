module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    productId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    description: {
      type: new DataTypes.TEXT()
    },
    price: {
      type: DataTypes.DECIMAL(8),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price can't be empty"
        }
      }
    },
    image: {
      type: new DataTypes.TEXT('long')
    },
    status: {
      type: DataTypes.ENUM(['active', 'inactive']),
      defaultValue: 'active'
    }
  }, { timestamps: true },);
  return Product;
}