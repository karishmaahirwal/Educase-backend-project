const mysql = require('mysql2/promise');
const config = require('../config');

class SchoolModel {
    static async createConnection() {
        return await mysql.createConnection(config.MYSQL_CONFIG);
    }

    static async createTable() {
        const connection = await this.createConnection();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(500) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL
            )
        `;
        await connection.execute(createTableQuery);
        await connection.end();
    }

    static async addSchool(schoolData) {
        const connection = await this.createConnection();
        const { name, address, latitude, longitude } = schoolData;
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [name, address, latitude, longitude]);
        await connection.end();
        return result;
    }

    static async getAllSchools() {
        const connection = await this.createConnection();
        const query = 'SELECT * FROM schools';
        const [rows] = await connection.execute(query);
        await connection.end();
        return rows;
    }

    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}

module.exports = SchoolModel;