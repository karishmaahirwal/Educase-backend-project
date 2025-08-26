const express=require("express")
const Enrollment = require("../controller/UserEnrollment")
const router = express.Router();
const auth = require("../auth/adminMiddleware")


router.get("/enrolledCourses",Enrollment.enrolledCourses);
router.post("/existingEnrollment",Enrollment.existingEnrollment);
router.get("/getCoursesForUser/:userId",Enrollment.getCoursesForUser);

module.exports = router