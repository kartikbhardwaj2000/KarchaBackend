const path = require('path');
const TableExtracter = require('./tableExtracter');
const TransactionExtracter = require('./transactionExtracter');

const executeJob = async (data) => {
  const tableExtracter = new TableExtracter(data);
  const fileNameWithoutExtn = data.fileName.split('.')[0];
  const transactionExtracter = new TransactionExtracter({ dirName: path.join(__dirname, 'temp', 'extractedFiles', fileNameWithoutExtn, 'tables'), bankName: data.bankName });
  await tableExtracter.removeProtection();
  await tableExtracter.extractTables();
  await tableExtracter.extractZipFiles();
  await transactionExtracter.initializeFiles();
  await transactionExtracter.extractTransactions();

  return transactionExtracter.transactions;
};

module.exports = executeJob;
