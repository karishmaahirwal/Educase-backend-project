const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema(
    {
    name: { type: String },
    description: { type: String },
    category:{ type: String },
    instructor: { type: String },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Course', CourseSchema);