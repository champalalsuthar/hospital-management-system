// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password_confirmation: { type: String, required: true },
  marketing_accept: { type: Boolean, default: false },
  role: {
    type: String,
    default: "user"
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;




// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'doctor', 'admin'],
//     default: 'user',
//   },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
