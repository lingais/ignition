const express = require('express');
const app = express();
const port = 80;

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log('serveur running on port ' + port);
});