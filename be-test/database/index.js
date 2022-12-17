// import package mongoose
const mongoose = require('mongoose');

// kita import konfigurasi terkait MongoDB dari `app/config.js`
const { dbConfig } = require('../app/config');

mongoose.connect(dbConfig, {useNewUrlParser: true, useUnifiedTopology: true}); //local env
// mongoose.connect("mongodb://root:root@%2Fhome%2Frobbyizh%2Fmongodb-0.sock/restaurant", {useNewUrlParser: true, useUnifiedTopology: true}); //socket
// mongoose.connect("mongodb://idealfirst:idealfirst@ac-htdfxyz-shard-00-00.ttmv6fe.mongodb.net:27017,ac-htdfxyz-shard-00-01.ttmv6fe.mongodb.net:27017,ac-htdfxyz-shard-00-02.ttmv6fe.mongodb.net:27017/?ssl=true&replicaSet=atlas-ta8j13-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}); //atlas

// simpan koneksi dalam const `db` 
const db = mongoose.connection;

// export `db` supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;