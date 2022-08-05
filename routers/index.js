const express = require('express');
const fileRouter = require('./file.router');
const authRouter = require('./auth.router');
const jobRouter = require('./job.router');

const router = express.Router();

router.use('/file', fileRouter);
router.use('/auth', authRouter);
router.use('/job', jobRouter);

module.exports = router;
