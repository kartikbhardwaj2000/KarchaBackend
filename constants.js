module.exports ={
    PORT:process.env.PORT||8000,
    MONGO_URI: process.env.MONGO_URI||'mongodb://localhost:27017/KarchaDB',
    JWT_SECRET: process.env.JWT_SECRET||'lskjflkjasgljklklklkaslkjlk',
    USER:'USER',
    PENDING:'PENDING',
    FAILED:'FAILED',
    SUCCESS:'SUCCESS',
    ADOBE:{
        CLIENT_ID:process.env.ADOBE_CLIENT_ID||'dd8fa4d5d93f4d4f83aea2832c736f2c',
        CLIENT_SECRET:process.env.ADOBE_CLIENT_SECRET||'p8e-w4-paf5eomjD7igI5ejbn7ayoXghLx9T',
        ORGANIZATION_ID:process.env.ADOBE_ORGANIZATION_ID||'085D2A8962B3F7CC0A495C8B@AdobeOrg',
        ACCOUNT_ID:process.env.ACCOUNT_ID||'150146B762D796060A495FB0@techacct.adobe.com',
        PRIVATE_KEY_FILE_PATH:process.env.ADOBE_PRIVATE_KEY_FILE_PATH||'private.key',
    },
    SBI:'STATE BANK OF INDIA',
    SBI_IDENTIFIER:"﻿Date  ,Transaction Reference  ,Ref.No./Chq.No.  ,Credit  ,Debit  ,Balance  "
}