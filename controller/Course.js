
const express = require('express');
const bodyParser = require('body-parser');
const Course = require("../model/CourseSchema");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const config = require("../config");
const jwt = require("jsonwebtoken");
const baseResponse = require("../helper/baseResponse");
const helper = require("../helper/helper");
const logger = require("../helper/logger")
const { generateToken } = require("../helper/auth")


// CRUD Operations
// Create Course
 const CreateCourese = async(req,res) => {
    try{
        // Temporarily removed auth check for testing
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    }catch(err) {
        console.log('CreateCourse Error:', err.message)
        return res.status(500).json({
            success: false,
            msg: "Server Error: " + err.message,
            errors: {}
        })
    }
}

// Read Course
const readCourse = async (req, res) => {
    try {
        const readCourse = await Course.findById(req.params.id);
        if (readCourse){
            res.json({ message: "Course get  successfully by id", status: true });
        }else{
            res.json({ message: "Course  not found", status: false});
        }

    }catch(error){
        res.json({ message: error.message, status: false });
    }
}


const updateCourse = async (req,res) => {
    try{
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(updatedCourse){
            res.json({message : 'Course updated successfully!', status: true});
        }else{
            res.json({message :"Error in updating course. Enter correct id to edit", status: 'error'});
        }
    }catch(error){
        res.json({ message: error.message, status: false });
    }
}


const deleteCourse = async (req, res) => {
    try{
        const courseRemove = await Course.findByIdAndDelete(req.params.id);
        if (courseRemove){
            res.json({ message: "Course deleted successfully", status: true });

        }else{
            res.json({ message: "Course cannot be found. Enter correct id to delete", status: false});
        }
    }catch(err){
        console.log("Error in deleting Course");

    }
}



module.exports = {
    CreateCourese,
    deleteCourse,
    updateCourse,
    readCourse
};


