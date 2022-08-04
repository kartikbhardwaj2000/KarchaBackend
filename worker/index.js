const Agenda = require('agenda');
const TableExtracter = require('./tableExtracter');
const { MONGO_URI } = require('../constants');
const executeJob = require('./executeJob');
require('./load-adobe-creds');


const worker = new Agenda({db:{address:MONGO_URI, collection:"jobs"}});
worker.name(`worker ${process.pid}`);

// agenda.on('fail', (err, job) => {
//     if (isErrorTemporary(err)) { // checking that the error is a network error for instance
//       job.attrs.nextRunAt = moment().add(10000, 'milliseconds').toDate(); // retry 10 seconds later
//       job.save();
//     }
//   });
worker.define("ProcessPdf", async (job) =>{
   console.log('job started');
   const data = job.attrs.data;
   const records = await executeJob(data);
   console.log(records);
   console.log('done');
   return records;
   
});
 
worker.on('ready',async ()=>{
    console.log('ready');
});
worker.start();