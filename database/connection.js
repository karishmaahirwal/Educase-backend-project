const config = require('../config');

async function createConnection() {
    return await mysql.createConnection(config.MYSQL_CONFIG);
}

module.exports = { createConnection };