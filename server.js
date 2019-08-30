const scraper = require('./scraper');
const express = require('express');
const db = require('./db');

const app = express();
const { search, processData } = scraper;
const { upload, download } = db;

app.get('/api/history', // returns an array containing previous search requests
async function (req, res) {
  return Promise.resolve()
  .then(() => download())
  .then(queries => res.status(200).json(queries))
  .catch(error => console.log('Something went wrong in API: ', error.error))
})

app.get('/api/ddg', // returns an object containing URL's and Titles
  async function (req, res) {
    return Promise.resolve()
      .then(() => upload(req.query.q))
      .then(() => search(req.query.q))
      .then(data => res.status(200).json(processData(data)))
      .catch(error => console.log('Something went wrong in API: ', error.error))
  }
)

const port = 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
