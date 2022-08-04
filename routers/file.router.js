const express = require('express');
const { USER } = require('../constants');
const { uploadFile } = require('../controllers/file.controller');
const authorize = require('../middlewares/authorize');
const { celebrate: validate } = require('celebrate');
const { transFileUpload } = require('../utils/multer');
const { fileUpload } = require('../validations/file.validation');
const router = express.Router();

router.post('/upload',authorize([USER]),transFileUpload,validate(fileUpload),uploadFile);

module.exports = router;