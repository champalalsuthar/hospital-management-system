const mongoose = require('mongoose');

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true,
        // You can add email validation if needed
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500  // Limit comment length
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AllDoctor',
        // required: true  // Referencing the doctor being commented on
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',  // Ensure this matches the name of your Service model
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',  // Ensure this matches the name of your Department model
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true  // To keep track of when the comment was made
});

// Compile and export the model
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

module.exports = Comment;
