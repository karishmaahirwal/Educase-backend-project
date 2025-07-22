const mysql = require('mysql2/promise');
const config = require('./config');

async function testConnection() {
    try {
        const connection = await mysql.createConnection(config.MYSQL_CONFIG);
        console.log('✅ MySQL Connected Successfully!');
        await connection.end();
    } catch (error) {
        console.log('❌ Connection Failed:', error.message);
    }
}

testConnection();