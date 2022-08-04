// role is to extract transactions from csv files.
const fs = require('fs')
const path = require('path');
const { SBI, SBI_IDENTIFIER } = require('../constants');
const {parse} = require('csv-parse/dist/cjs/sync.cjs')
const fsPromise = fs.promises;
function TransactionExtracter({dirName,bankName}){
    this.dirName = dirName;
    this.bankName = bankName;
    this.filteredFiles = [];
    this.transactions = [];
}
TransactionExtracter.prototype.initializeFiles = async function(){
    try {
        this.files = await fsPromise.readdir(this.dirName);
        console.log(this.files);
        await this.filterFiles();
    } catch (error) {
        console.log(error);
    }
}

function readPromise(filehandle,buffer,offset,length,position){
    return new Promise((resolve,reject)=>{
        try {
            filehandle.read(buffer,offset,length,position).then(data =>{
                resolve(buffer.toString().split('\n')[0]);
            })
        } catch (error) {
            reject(error);
        }
       
    })
}
TransactionExtracter.prototype.filterFiles= async function(){
    
    for (let index = 0; index < this.files.length; index++) {
        const fileName = this.files[index];
        const fileHandle = await fsPromise.open(path.join(this.dirName,fileName),'r+');
        const buffer = Buffer.alloc(100);
        const data = await readPromise(fileHandle,buffer,0,100,null)
        if(data === SBI_IDENTIFIER)
        {
           this.filteredFiles.push(fileName);
        }
    }
    console.log(this.filteredFiles);
}
TransactionExtracter.prototype.extractTransactions = function(){
    for (let index = 0; index < this.filteredFiles.length; index++) {
        const fileName = this.filteredFiles[index];
        const fileData = fs.readFileSync(path.join(this.dirName,fileName),{encoding:'utf-8'});
        const records = new parse(fileData,{delimiter:',',skip_records_with_error:true,skip_empty_lines:true,columns:true,trim:true,bom:true});
        this.transactions= this.transactions.concat(records);
    }
}
module.exports=TransactionExtracter;