// Mock controller for testing without MySQL
let schools = [
    { id: 1, name: "Delhi Public School", address: "Sector 45, Gurgaon", latitude: 28.4595, longitude: 77.0266 },
    { id: 2, name: "St. Xavier's School", address: "Fort, Mumbai", latitude: 18.9322, longitude: 72.8264 }
];
let nextId = 3;

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                message: 'All fields required',
                status: false
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                message: 'Invalid coordinates',
                status: false
            });
        }

        const school = { id: nextId++, name, address, latitude: lat, longitude: lon };
        schools.push(school);
        
        res.status(201).json({
            message: 'School added successfully',
            status: true,
            data: school
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            status: false
        });
    }
};

const listSchools = async (req, res) => {
    try {
        console.log('Query params received:', req.query);
        const { latitude, longitude } = req.query;
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'latitude and longitude query parameters required',
                status: false
            });
        }

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({
                message: 'Invalid coordinates - must be numbers',
                status: false
            });
        }

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };

        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            message: 'Schools retrieved successfully',
            status: true,
            data: schoolsWithDistance
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            status: false
        });
    }
};

module.exports = { addSchool, listSchools };