const SchoolModel = require('../model/SchoolModel');
const baseResponse = require('../helper/baseResponse');

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                message: 'All fields (name, address, latitude, longitude) are required',
                status: false
            });
        }

        if (typeof name !== 'string' || typeof address !== 'string') {
            return res.status(400).json({
                message: 'Name and address must be strings',
                status: false
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                message: 'Latitude and longitude must be valid numbers',
                status: false
            });
        }

        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            return res.status(400).json({
                message: 'Invalid latitude or longitude values',
                status: false
            });
        }

        const result = await SchoolModel.addSchool({ name, address, latitude: lat, longitude: lon });
        
        res.status(201).json({
            message: 'School added successfully',
            status: true,
            data: { id: result.insertId, name, address, latitude: lat, longitude: lon }
        });

    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({
            message: 'Server error while adding school',
            status: false
        });
    }
};

const listSchools = async (req, res) => {
    try {
        console.log('Query params received:', req.query);
        console.log('Full request URL:', req.url);
        const { latitude, longitude } = req.query;

        // Validation
        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'User latitude and longitude are required',
                status: false
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({
                message: 'Invalid latitude or longitude format',
                status: false
            });
        }

        if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
            return res.status(400).json({
                message: 'Invalid latitude or longitude values',
                status: false
            });
        }

        const schools = await SchoolModel.getAllSchools();

        // Calculate distance and sort by proximity
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: SchoolModel.calculateDistance(userLat, userLon, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            message: 'Schools retrieved successfully',
            status: true,
            data: schoolsWithDistance
        });

    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({
            message: 'Server error while retrieving schools',
            status: false
        });
    }
};

module.exports = {
    addSchool,
    listSchools
};