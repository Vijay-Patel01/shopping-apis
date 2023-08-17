const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:vijay123@localhost:5432/product`, { dialect: "postgres" });

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((err) => {
  console.error("Unable to connect to the database:", err);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel')(sequelize, DataTypes);
db.product = require('./productModel')(sequelize, DataTypes);

module.exports = db