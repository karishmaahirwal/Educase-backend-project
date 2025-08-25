const express = require("express");
const router = express.Router();
const Course = require("../controller/Course")
const auth = require("../auth/adminMiddleware");


// post Register from Books
// router.post("/register", );

// post login from Books
router.get("/api",Course.readCourse);

router.post("/add/course", auth, Course.CreateCourese);

//Delete course
router.delete("/delete/course/:id", auth, Course.deleteCourse);

//Update course
router.patch("/update/course/:id", auth, Course.updateCourse);




module.exports = router;