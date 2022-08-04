const fs = require('fs');
const path = require('path');
const { ADOBE } = require('../constants');
const adobeAPICreds = require('./adobe-api-creds.json');
adobeAPICreds.client_credentials.client_id=ADOBE.CLIENT_ID;
adobeAPICreds.client_credentials.client_secret=ADOBE.CLIENT_SECRET;
adobeAPICreds.service_account_credentials.account_id=ADOBE.ACCOUNT_ID;
adobeAPICreds.service_account_credentials.organization_id=ADOBE.ORGANIZATION_ID;
adobeAPICreds.service_account_credentials.private_key_file=ADOBE.PRIVATE_KEY_FILE_PATH;

fs.writeFileSync(path.join('./adobe-api-creds.json'),JSON.stringify(adobeAPICreds));
console.log('adobe-creds-api-loaded');