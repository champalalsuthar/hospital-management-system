const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',  // Reference to a doctor who heads the department
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);  // Example: validation for 10 digit number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    location: {
        type: String,
        trim: true  // E.g., "Building A, 3rd Floor"
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],  // Example: restrict the values for status
        default: 'active'

    },
}, {
    timestamps: true
});

const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);

module.exports = Department;
