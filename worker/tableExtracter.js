// role is to extract tables from pdf and convert it to csv files
const PDFServicesSDK = require('@adobe/pdfservices-node-sdk');
const ExtractPdfSDK = require('@adobe/pdftools-extract-node-sdk');
const zipExtract = require('extract-zip');
const path = require('path');

function TableExtracter({ filePath, filePassword, fileName }) {
  this.filePath = filePath;
  this.filePassword = filePassword;
  this.fileName = fileName;
}
TableExtracter.prototype.extractTables = async function () {
  try {
    const credentials = ExtractPdfSDK.Credentials
      .serviceAccountCredentialsBuilder()
      .fromFile(path.join(__dirname, 'adobe-api-creds.json'))
      .build();
    const clientContext = ExtractPdfSDK.ExecutionContext
      .create(credentials);
    const extractPDFOperation = ExtractPdfSDK.ExtractPDF.Operation
      .createNew();

    // Set operation input from a source file.
    const input = ExtractPdfSDK.FileRef.createFromLocalFile(
      path.join(__dirname, 'temp', 'unlockedFiles', this.fileName),
      ExtractPdfSDK.ExtractPDF.SupportedSourceFormat.pdf,
    );
    extractPDFOperation.setInput(input);
    extractPDFOperation.addElementToExtract(ExtractPdfSDK.PDFElementType.TABLES);
    extractPDFOperation.addTableStructureFormat(ExtractPdfSDK.TableStructureType.CSV);
    await extractPDFOperation.execute(clientContext).then((result) => result.saveAsFile(path.join(__dirname, 'temp', 'zipFiles', this.fileName))).catch((error) => console.log(error));
  } catch (error) {
    console.log('Exception encountered while executing operation', err);
  }
};

TableExtracter.prototype.removeProtection = async function () {
  try {
    const credentials = PDFServicesSDK.Credentials.serviceAccountCredentialsBuilder().fromFile(path.join(__dirname, 'adobe-api-creds.json')).build();
    const executionContext = PDFServicesSDK.ExecutionContext.create(credentials);
    const removeProtectionOperation = PDFServicesSDK.RemoveProtection.Operation.createNew();
    const input = PDFServicesSDK.FileRef.createFromLocalFile(
      this.filePath,
      PDFServicesSDK.RemoveProtection.SupportedSourceFormat.pdf,
    );
    removeProtectionOperation.setInput(input);
    removeProtectionOperation.setPassword(this.filePassword);
    await removeProtectionOperation.execute(executionContext).then((result) => result.saveAsFile(path.join(__dirname, 'temp', 'unlockedFiles', this.fileName))).catch((err) => {
      if (err instanceof PDFServicesSDK.Error.ServiceApiError
                || err instanceof PDFServicesSDK.Error.ServiceUsageError) {
        console.log('Exception encountered while executing operation', err);
      } else {
        console.log('Exception encountered while executing operation', err);
      }
    });
  } catch (error) {
    console.log('Exception encountered while executing operation', error);
  }
};

TableExtracter.prototype.extractZipFiles = async function () {
  try {
    const fileNameWithoutExtn = this.fileName.split('.')[0];
    const zipFileName = `${fileNameWithoutExtn}.zip`;
    await zipExtract(path.join(__dirname, 'temp', 'zipFiles', zipFileName), { dir: path.join(__dirname, 'temp', 'extractedFiles', fileNameWithoutExtn) });
  } catch (error) {
    console.log(error);
  }
};

module.exports = TableExtracter;
