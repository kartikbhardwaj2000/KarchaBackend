const express = require('express');
const { celebrate: validate } = require('celebrate');
const authController = require('../controllers/auth.controller');
const { register, login } = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(register), authController.register);
router.post('/login', validate(login), authController.login);
module.exports = router;
