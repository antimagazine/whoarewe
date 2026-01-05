import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// import the credentials as a base64 encoded string from environment variable
const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS, 'base64').toString('utf8'));

const serviceAccountAuth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

export default async function (req, _, next) {
  try {
    await doc.loadInfo(); // loads document properties and worksheets
    await doc.sheetsByIndex[0].addRow({
      timestamp: new Date().toISOString(),
      request: JSON.stringify({
        ip: req.ip,
        url: req.url,
        method: req.method,
        headers: req.headers
      })
    });
  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
  }
  return next();
}
