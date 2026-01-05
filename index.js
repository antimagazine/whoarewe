require('dotenv/config');

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(require('./logger'));

app.get('/', (req, res) => {
  res.download(path.resolve(__dirname, 'whoami.txt'), 'whoami.txt', (err) => {
    if (err) return res.sendStatus(500);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
