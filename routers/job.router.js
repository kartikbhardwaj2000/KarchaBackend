const express = require('express');
const { celebrate: validate } = require('celebrate');
const { jobStatus } = require('../controllers/job.controller');
const jobValidation = require('../validations/job.validation');

const router = express.Router();

router.get('/status/:id', validate(jobValidation.jobStatus), jobStatus);
module.exports = router;
