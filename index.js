import 'dotenv/config';

import path from 'path';
import express from 'express';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

const whoamiPath = path.join(process.cwd(), 'whoami.txt');
app.get('/', logger, (req, res) => {
  res.download(whoamiPath, 'whoami.txt', (err) => {
    if (err) return res.sendStatus(500);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
