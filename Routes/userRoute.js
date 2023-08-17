const express = require('express');
const { signup, login, logout, changePassword , updateUser } = require('../Controllers/userController');
const { isLoggedIn, restrictTo } = require('../Middelware/authMiddelware');

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', isLoggedIn, changePassword);
router.post('/updateUser', updateUser);
router.get('/logout', logout);

module.exports = router;