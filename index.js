const express = require('express');
const router = require('./routers/index');
const { PORT } = require('./constants');
const { errorhandler } = require('./middlewares/errors');
const app = express();

app.use(express.static('./public'));
app.use('/api',router);
app.use(errorhandler);
app.listen(PORT,()=>{
    console.log(`app has started on ${PORT}`);
})