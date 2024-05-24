const express = require("express");
const Course = require("./router/Course");
const Enrollment = require("./router/Enrollment")
const user = require("./router/user");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")



const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(fileupload())

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`local server started on http://localhost:${port}`);
});

app.use("/",Course)
app.use("/",user)
app.use("/",Enrollment)




