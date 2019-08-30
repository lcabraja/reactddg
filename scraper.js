const get = require('axios');

async function search(query) {
  return await get(`http://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`)
    .then((response) => { return response.data })
    .catch((error) => console.log('There was an error in search!', error))
}

function processData(data) {
  var bulk = [];
  let circle;
  for (let r = 0; r < data.RelatedTopics.length; r++) {
    circle = data.RelatedTopics[r];
    if (circle.Topics) {
      for (let i = 0; i < circle.Topics.length; i++) {
        bulk.push(circle.Topics[i]);
      }
    } 
    else {
      bulk.push(circle);
    }
  }
  var total = data.Results.concat(bulk);

  return total;
}

module.exports = { 
  search,
  processData
}
