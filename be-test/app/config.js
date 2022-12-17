const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
    
    serviceName: process.env.SERVICE_NAME, 
    rootPath: path.resolve(__dirname, '..'), 
    secretKey: process.env.SECRET_KEY,

    //----- konfigurasi database ----//
    dbConfig: process.env.DB_CONFIG,

};
