const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./Model');
const userRoute = require('./Routes/userRoute');
const productRoute = require('./Routes/productRoute');

const User = db.users;

const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("db has been re sync")
// })

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.use((err, req, res, next) => {
  // res.locals.error = err;
  return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})