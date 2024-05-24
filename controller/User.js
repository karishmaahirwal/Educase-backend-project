
const User = require("../model/userSchema");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const config = require("../config");
const jwt = require("jsonwebtoken");
const baseResponse = require("../helper/baseResponse");
const helper = require("../helper/helper");
const logger = require("../helper/logger")
const { generateToken } = require("../helper/auth")
const moment = require("moment");



// post for Register
const Register = async (req, res) => {
  let { userName, password, confirmPassword } = req.body;
  try {
    if (!userName || !password || !confirmPassword ) {
      res.send({ message: "enter all data", status: false });

    } else {
      if (password != confirmPassword) {
        res.send({ message: "check your password", status: false });
      } else {
        const hashpwd = bcrypt.hashSync(password, 10);
        var obj = await new User({
          userName,
          password: hashpwd,
          confirmPassword,

        });
        const user = await obj.save();
        if (obj) {
          // res.send({ message: "user saved succesfully", status: true });
          res.status(200).send(baseResponse.withSuccess('User Register  successfully!',user));
        } else {
          res.send({ message: "user not saved", status: false });
          //  res.status(500).send(err.message);
        }
      }
    }
  } catch (error) {
    // res.send({ message: error.message, status: false });
    res.status(500).send(baseResponse.withError(''));
  }
};




// post for login
const login = async (req, res) => {
  let { userName, password } = req.body;
  try {
    if (!userName || !password) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const users = await User.findOne({ userName: userName });
      if (!users) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let token = await jwt.sign(
          {
            id: users.userId,
          },
          config.JWT_TOKEN_KEY
        );
        User.token = token;
        var compare = bcrypt.compareSync(password, users.password);
        if (compare === false) {
          res.json({
            message: "Invalid UserName/password",
            status: false,
          });
        } else {
          res.json({ message: "login success", token, status: true });
          // res.status(200).send(baseResponse.withSuccess("Your have logged in successfully.")) 

        }
      }
    }
  } catch (err) {
    // res.json({ message: err.message, status: false });
    res.status(500).send(baseResponse.withError('Internal server error'));

  }
};


module.exports = {
  login,
  Register,
};













