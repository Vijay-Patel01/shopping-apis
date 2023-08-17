const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const db = require('../Model');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const { log } = require('console');

const User = db.users;

const isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies['jwt']) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const loginUser = await User.findOne({
        where: { id: decode.id }
      });
      if (!loginUser) {
        return next(new appError("You are not login please login!", 401));
      }
      req.user = loginUser;
      return next()
    } catch (err) {
      return next(new appError("something went wrong", 400));
    }
  }
  return next(new appError("You are not login please login!", 401));
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new appError("You don't have permission to perform this action. ", 403));
    }
    next();
  }
};

module.exports = {
  isLoggedIn, restrictTo
}