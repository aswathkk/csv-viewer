const fs = require('fs');
const parse = require('csv-parse');
const router = require('express').Router();
const exec = require('child_process').exec;

router.get('/', (req, res) => {
  res.send('API Route');
});

router.get('/file', (req, res) => {
  const files = fs.readdirSync(`${__dirname}/../uploads`).filter(file => file.split('.')[file.split('.').length - 1] == 'csv');
  let response = {};
  let count = 0;
  for(let i = 0; i < files.length; i++) {
    exec(`head -n 1 ${__dirname}/../uploads/${files[i]}`, (err, stdout, stderr) => {
      response[files[i]] = stdout.split(',').map(head => head.trim());
      if(++count == files.length)
        res.send(response);
    })
  }
});

router.get('/file/:file', (req, res) => {
  const fields = req.query.fields.split(',').map(val => parseInt(val));
  const fileName = req.params.file;
  const from = req.query.from || 2;
  const to = req.query.to || 99999999;
  const file = fs.readFileSync(`${__dirname}/../uploads/${fileName}`, 'utf8');
  parse(file, {from: from, to: to}, (err, data) => {
    if(err)
      res.send([]);
    else {
      data = data.map(row => row.filter((col, i) => fields.indexOf(i) >= 0));
      res.send(data);
    }
  });
});

module.exports = router;
