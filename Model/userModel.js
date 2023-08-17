module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING(364),
      unique: {
        arg: true,
        msg: 'This email is already taken.'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      max: {
        args: [32],
        msg: "Maximum 32 characters allowed in last name"
      },
      min: {
        args: [8],
        msg: "Minimum 8 characters required in last name"
      }

    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user"
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  },
    { timestamps: true },);
  return User;
};