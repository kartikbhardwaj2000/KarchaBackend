const express = require('express');
const { uploadFile } = require('../controllers/file.controller');
const { transFileUpload } = require('../utils/multer');
const router = express.Router();

router.post('/upload',transFileUpload,uploadFile);

module.exports = router;