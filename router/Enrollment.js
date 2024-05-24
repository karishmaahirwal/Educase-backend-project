const express=require("express")
const Enrollment = require("../controller/UserEnrollment")
const router = express.Router();
const auth = require("../auth/adminMiddleware")


router.post("/api",Enrollment.enrolledCourses)

// router.post("/api/user/admin/login",login)

// router.put("/api/user/admin/change-password/:email",changePassword)

// router.get("/api/user/admin/get_signup",get_signup)

// router.post("/api/user/admin/emailsending",sendmail)

module.exports = router