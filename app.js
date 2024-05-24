const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const config = require("./config");
const course = require("./router/Course");
const Enrollment = require("./router/Enrollment");
const user = require("./router/user");
// security
app.use(helmet());

// cors
app.use(cors());

// convert everything to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb database connect 
mongoose.connect(
"mongodb://localhost:27017/test",
    {
      useNeWUrlParser:true,
      useUnifiedTopology:true,
    }
  )
  .then(() => console.log("mongodb connected sucessfully..."))
  .catch((err) => console.log(err));





app.get("/", (req, res) => res.send("success"));

app.use("/api", course);
app.use("/api", Enrollment)
app.use("/api", user)




module.exports = app;
