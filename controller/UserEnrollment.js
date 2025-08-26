
const express = require('express');
const bodyParser = require('body-parser');
const Enrollment = require("../model/EnrollmentSchema");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const config = require("../config");
const jwt = require("jsonwebtoken");
const baseResponse = require("../helper/baseResponse");
const helper = require("../helper/helper");
const logger = require("../helper/logger")
const { generateToken } = require("../helper/auth")


// Course Enrollment
const existingEnrollment  = async(req,res) =>{
    const { userId, courseId } = req.body;
    
    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
            message: 'Invalid userId or courseId format',
            status: false
        });
    }
    try {
        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).send('User is already enrolled in this course');
        }

        // Create new enrollment
        const newEnrollment = new Enrollment({ userId, courseId });
        await newEnrollment.save();
        res.status(201).send('Enrollment successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Get all courses for a specific user
const getCoursesForUser = async (req,res) => {
    const userID = req.params.userId;
    if (!userID) {
        return res.status(400).send('No User ID provided')
    }
    try {
        const result = await Course.find({ userId : userID })
         .populate([
             { courseUsers:"users" },       
              "title description imageUrl createdAt updatedAt",
          ]);
      
        return baseResponse.success(result,"Successfully fetched user's courses").send(res,result);    
    }catch(e){
        return baseResponse.error(e.toString(),"Error occured while getting user'   courses").send(res,result);
        return baseResponse.error(e.toString(),'Error Fetching User Courses').send(res,result);
    }
};


// View Enrolled Courses
const enrolledCourses = async (req, res) => {
    const userId = req.query.userId || (req.user && req.user.userId);
        
        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                status: false
            });
        }
    try {
        const enrolledCourses = await Enrollment.find({ userId }).populate('courseId');
        res.json(enrolledCourses);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    enrolledCourses,
    getCoursesForUser,
    existingEnrollment,
};

