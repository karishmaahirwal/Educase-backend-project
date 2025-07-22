const SchoolModel = require('../model/SchoolModel');

async function setupDatabase() {
    try {
        await SchoolModel.createTable();
        console.log('Schools table created successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

module.exports = { setupDatabase };