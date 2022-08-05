require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  USER: 'USER',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
  ADOBE: {
    CLIENT_ID: process.env.ADOBE_CLIENT_ID,
    CLIENT_SECRET: process.env.ADOBE_CLIENT_SECRET,
    ORGANIZATION_ID: process.env.ADOBE_ORGANIZATION_ID,
    ACCOUNT_ID: process.env.ADOBE_ACCOUNT_ID,
    PRIVATE_KEY_FILE_PATH: process.env.ADOBE_PRIVATE_KEY_FILE_PATH,
  },
  SBI: 'SBI',
  SBI_IDENTIFIER: '﻿Date  ,Transaction Reference  ,Ref.No./Chq.No.  ,Credit  ,Debit  ,Balance  ',
};
