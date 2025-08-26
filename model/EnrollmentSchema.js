const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema(
    {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: ['enrolled', 'completed', 'dropped'], default: 'enrolled' },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    enrollmentDate: { type: Date, default: Date.now },
    completionDate: { type: Date }
},
{
    timestamps: true,
}
);

// Compound index to prevent duplicate enrollments
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);