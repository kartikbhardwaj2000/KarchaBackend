const JobModal = require('../modals/job.modal');

exports.uploadFile = async (req, res, next) => {
  try {
    const doc = await JobModal.create({
      name: 'ProcessPdf',
      data: {
        filePath: req.file.path, fileName: req.file.filename, filePassword: req.body.filePassword, bankName: req.body.bankName,
      },
      nextRunAt: Date(),
    });
    const response = {
      status: 200,
      message: 'job created successfully',
      data: {
        jobId: doc._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
