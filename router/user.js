const express=require("express")
const user = require("../controller/User")
const router = express.Router();


// router.post("/api/user/admin/signup",user)
router.post("/Register", user.Register);

router.post("/api/user/admin/login",user.login);


module.exports = router