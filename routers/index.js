const express = require('express');
const fileRouter = require('./file.router')
const router = express.Router();

router.use('/file',fileRouter);

module.exports = router;