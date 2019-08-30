const Query = require('./models/query');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/ddg'; //connecting to ddg
const options = { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true };

mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + mongoURI);
});

mongoose.connection.on('error', (err) => {
  console.log('handle mongo errored connection: ' + err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('App terminated, closing mongo connections');
    process.exit(0);
  });
})

const upload = async function (q, t = null, r = null) {
    const data = {
        query: q,
        title: t,
        results: r
    }
    await Query.addQuery(data);
    console.log(`Added search: '${q}' to db...`);
}

const download = async function () {
    return await Query.listQueries();
}

module.exports = {
    upload,
    download
}