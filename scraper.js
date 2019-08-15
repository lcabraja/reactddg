const request = require('request');

function search(term, callback) {
  request(
    `http://api.duckduckgo.com/?q=${term}&format=json`,
    (error, res, html) => {
      if (!error && res.statusCode == 200) {
        callback(JSON.parse(html));
      }
    }
  );
}

module.exports = search;
