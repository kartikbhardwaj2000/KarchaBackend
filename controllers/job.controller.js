const { default: mongoose } = require('mongoose');
const { PENDING, FAILED } = require('../constants');
const jobModal = require('../modals/job.modal');
const ApiError = require('../utils/apiError');

exports.jobStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = (await jobModal.findOne({ _id: mongoose.Types.ObjectId(id) })).toObject();
    if (!job) {
      throw new ApiError({ status: 404, message: 'job not found' });
    }
    if (!job.nextRunAt && !job.result) {
      return res.json({
        status: 200,
        message: 'job status fetched success',
        data: {
          jobStatus: PENDING,
        },
      });
    }
    if (job.failCount > 0) {
      return res.json({
        status: 200,
        message: 'job status fetched success',
        data: {
          jobStatus: FAILED,
        },
      });
    }
    const response = {
      status: 200,
      message: 'job compeleted successfully',
      data: job.result,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
