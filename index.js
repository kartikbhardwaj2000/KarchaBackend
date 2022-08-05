const express = require('express');
const router = require('./routers/index');
const { PORT } = require('./constants');
const {
  errorhandler, multerErrorHandler, notFoundHandler, validationErrorHandler,
} = require('./middlewares/errors');
const mongoose = require('./utils/mongoose');

const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use('/api', router);
app.use(multerErrorHandler);
app.use(validationErrorHandler);
app.use(errorhandler);
app.use(notFoundHandler);
app.listen(PORT, () => {
  console.log(`app has started on ${PORT}`);
});
