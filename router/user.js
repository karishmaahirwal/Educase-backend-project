const express=require("express")
const user = require("../controller/User")
const router = express.Router();


// router.post("/api/user/admin/signup",user)
router.post("/api/Register", user.Register);

router.post("/api/user/admin/login",user.login)

// router.put("/api/user/admin/change-password/:email",changePassword)

// router.get("/api/user/admin/get_signup",get_signup)

// router.post("/api/user/admin/emailsending",sendmail)

module.exports = router