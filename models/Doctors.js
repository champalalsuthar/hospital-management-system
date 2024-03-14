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
});

const Doctors = mongoose.models.Doctors || mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;

