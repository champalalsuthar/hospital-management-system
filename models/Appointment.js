
// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   doctor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor',
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'completed'],
//     default: 'pending',
//   },
// });

// const Appointment = mongoose.model('Appointment', appointmentSchema);

// module.exports = Appointment;

// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    fatherName: String,
    age: String,
    city: String,
    state: String,
    mobile: String,
    gender: String,
    problem: String,
    doctor: String,
    dateTime: String,
    query: String,
    user_id: String,
    doctorid: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'complete'],
        default: 'pending',
    },


});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
