import 'dotenv/config';

import path from 'path';
import express from 'express';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

const whoamiPath = path.join(process.cwd(), 'whoami.zip');
app.get('/', logger, (_, res) => {
  res.download(whoamiPath, 'whoami.zip', (err) => {
    if (err) return res.sendStatus(500);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
