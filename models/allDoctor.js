const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    services: {
        type: Array,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
    popular: {
        type: Boolean,
        required: true,
        default: false,
    },

});

const allDoctor = mongoose.models.AllDoctor || mongoose.model('AllDoctor', doctorSchema);

module.exports = allDoctor;

