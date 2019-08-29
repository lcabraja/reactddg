const search = require('./scraper');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = 'mongodb://localhost:27017/ddg'

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log('Database created!')
  db.close()
})

app.get('/api/ddg', (req, res) => {
  console.log(`Received query for: ${req.query.q}`);
  search(req.query.q, data => {
    var bulk = [];
    for (let r = 0; r < data.RelatedTopics.length; r++) {
      const circle = data.RelatedTopics[r];
      if (circle['Topics'] && 'Array' === 'Array') {
        for (let i = 0; i < circle.Topics.length; i++) {
          bulk.push(circle.Topics[i]);
        }
      } else {
        bulk.push(circle);
      }
    }
    total = data.Results.concat(bulk);
    console.log(`Sending Results with ${total.length} link(s)`);
    res.json(total);
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
