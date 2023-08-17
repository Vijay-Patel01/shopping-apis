const express = require('express');
const { signup, login, logout, changePassword } = require('../Controllers/userController');
const { isLoggedIn, restrictTo } = require('../Middelware/authMiddelware');

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', isLoggedIn, changePassword);
router.get('/logout', logout);

module.exports = router;