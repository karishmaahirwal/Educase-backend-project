const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controller/SchoolMock');

// Add School API
router.post('/addSchool', addSchool);

// List Schools API
router.get('/listSchools', listSchools);

module.exports = router;