
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
        if (req.user.role !== 'superadmin') {
            res.status(403).send('Unauthorized');
        } else {
            const newCourse = new Course(req.body);
            newCourse.save()
                .then(course => res.status(201).json(course))
                .catch(err => res.status(400).send(err.message));
        }
    }catch(err) {
        console.log(err.message)
        return baseResponse.errorBaseResponce(res,"Server Error",500)
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


const updateCourse  =  async (req,res)=>{
    try{
        Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        const updateCourse = await updateCourse.findByIdAndDelete(req.params.id, req.body,{ new: true });
        if(updateCourse){
            res.json({message : 'Course updated successfully!'});
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


