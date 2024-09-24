const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema
    ({
        name: {
            type: String,
            required: true,
            trim: true
        },
        specialty: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            // validate: {
            //     validator: function (v) {
            //         return /^[0-9]{10}$/.test(v);  // Example regex for a 10-digit phone number
            //     },
            //     message: props => `${props.value} is not a valid phone number!`
            // }
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            // validate: {
            //     validator: function (v) {
            //         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);  // Basic email regex
            //     },
            //     message: props => `${props.value} is not a valid email!`
            // }
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0,
            min: 0
        },
        services: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true  // Referencing the Service schema
        }],
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true
    });

const allDoctor = mongoose.models.AllDoctor || mongoose.model('AllDoctor', doctorSchema);

module.exports = allDoctor;

