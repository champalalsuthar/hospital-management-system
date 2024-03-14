const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
});

const Hospital = mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;