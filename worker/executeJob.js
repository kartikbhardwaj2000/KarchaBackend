const TableExtracter  = require('./tableExtracter');
const TransactionExtracter = require('./transactionExtracter');
const path = require('path');
const { SBI } = require('../constants');

const executeJob = async (data)=>{
    // const tableExtracter = new TableExtracter({filePath:"C:\\Users\\Asus\\Desktop\\projects\\KarchaBackend\\uploadedFiles\\transFile-1659590892551-459563008.pdf",fileName:"transFile-1659590892551-459563008.pdf",filePassword:"95400150201"});
    // const transactionExtracter = new TransactionExtracter({dirName:path.join(__dirname,'temp','extractedFiles','transFile-1659590892551-459563008','tables'),bankName:SBI});
    const tableExtracter = new TableExtracter(data);
    const fileNameWithoutExtn = data.fileName.split('.')[0];
    const transactionExtracter = new TransactionExtracter({dirName:path.join(__dirname,'temp','extractedFiles',fileNameWithoutExtn,'tables'), bankName:SBI});
    await tableExtracter.removeProtection();
    await tableExtracter.extractTables();
    await tableExtracter.extractZipFiles();
    await transactionExtracter.initializeFiles();
    await transactionExtracter.extractTransactions();
    
    return transactionExtracter.transactions;
}

module.exports = executeJob;