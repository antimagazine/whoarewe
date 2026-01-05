import 'dotenv/config';

import path from 'path';
import express from 'express';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', logger, (req, res) => {
  res.download(path.resolve('./whoami.txt'), 'whoami.txt', (err) => {
    if (err) return res.sendStatus(500);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
