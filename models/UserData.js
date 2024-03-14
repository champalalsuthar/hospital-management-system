import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    password_confirmation: String,
    marketing_accept: { type: Boolean, default: false },
    role: {
        type: String,
        default: 'user',
    }
});

const UserData = mongoose.models.UserData || mongoose.model('UserData', userSchema);

export { UserData };
