const mongoose = require('mongoose');

// Define the Services Schema
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    short_description: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: Number,
        required: true,  // Duration of the service in minutes
        min: 5
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',  // Reference to a hospital department
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Lab Test', 'Surgery', 'Consultation', 'Emergency', 'Therapy', 'Other'], // categories of services
        default: 'Other'
    },
    availableSlots: [{
        dayOfWeek: {
            type: String,
            required: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        timeSlot: {
            type: String, // Format: "HH:mm - HH:mm"
            required: true
        }
    }],
    isActive: {
        type: Boolean,
        default: true // Whether the service is currently active
    },
    isTopActive: {
        type: Boolean,
        default: true // Whether the service is currently active
    }
}, {
    timestamps: true
});

// Compile and export the model
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
module.exports = Service;
