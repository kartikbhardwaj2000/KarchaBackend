const multer = require('multer');
const path = require('path');
const { cwd } = require('process');
const ApiError = require('./apiError');

const uploadHandler = multer({storage: multer.diskStorage({
    destination:path.join(__dirname,'../','uploadedFiles'),
    filename:function(req,file,cb){
    const extn = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = file.fieldname+'-'+uniqueSuffix+extn;
    console.log(fileName)
    cb(null,fileName)

}}),fileFilter:function(req,file,cb){
    const extn = path.extname(file.originalname);
    if(extn==='.pdf')
    {
       return cb(null,true);
    }
    cb(new ApiError({status:400, message:'file should be of pdf type'}),false);
}});
exports.transFileUpload = uploadHandler.single('transFile');