const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ApiRoute = require('./api');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})
app.use('/api', ApiRoute);
console.log(`${__dirname}/../build`)
app.use(express.static(`${__dirname}/../build`));

app.listen(PORT, () => console.log(`Server listening @ ${PORT}`));
