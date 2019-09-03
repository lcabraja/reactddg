const scraper = require('./scraper');
const express = require('express');
const db = require('./db');

const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const { search, processData } = scraper;
const { upload, download, prune } = db;

app.get('/api/history', // returns an array containing previous search requests, if prompted to will delete all of aforementioned search requests
async function (req, res) {
  if (req.query.q === 'delete')
    await prune();
  return Promise.resolve()
  .then(() => download())
  .then(queries => res.status(200).json(queries.reverse()))
  .catch(error => console.log('Something went wrong in API: ', error.error))
})

app.get('/api/ddg', // returns an object containing URL's and Titles for GET requests
  async function (req, res) {
    return Promise.resolve()
      .then(() => upload(req.query.q))
      .then(() => search(req.query.q))
      .then(data => res.status(200).json(processData(data)))
      .catch(error => console.log('Something went wrong in API: ', error.error))
  }
)

app.post('/api/ddg', // returns an object containing URL's and Titles for POST requests
  async function (req, res) {
    return Promise.resolve()
      .then(() => upload(req.body.q))
      .then(() => search(req.body.q))
      .then(data => res.status(200).json(processData(data)))
      .catch(error => console.log('Something went wrong in API: ', error.error))
  }
)

const port = 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
