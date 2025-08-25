const express = require("express");
const mongoose = require("mongoose");
const Course = require("./router/Course");
const Enrollment = require("./router/Enrollment")
const user = require("./router/user");
const school = require("./router/School");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { setupDatabase } = require("./database/setup");



const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(fileupload())

const port = process.env.PORT || 8000;

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/test", {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err));

app.listen(port, async () => {
    console.log(`local server started on http://localhost:${port}`);
    // await setupDatabase(); // Commented out until MySQL is running
});

app.use("/api",Course)
app.use("/api",user)
app.use("/api",Enrollment)
app.use("/api",school)




