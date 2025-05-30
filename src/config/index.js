const dbConnect = require('./connect_db');
const errorFile_data = require('./error_msg');
const app_constant = require('./app_constant')

module.exports = {
    dbConnect: dbConnect(),
    errorFile_data: errorFile_data(),
    app_constant,
};
