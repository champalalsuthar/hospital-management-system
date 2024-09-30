import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dbConnect from '../../utils/dbConnect';
import { UserData } from '../../models/UserData';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const { first_name, last_name, email, password, marketing_accept, role } = req.body;

            // Check if passwords match
            // if (password !== password_confirmation) {
            //     return res.status(303).json({ success: false, error: 'Passwords do not match' });
            // }
            const existingUser = await UserData.findOne({ email });

            if (existingUser) {
                return res.status(302).json({ success: false, error: 'Email already exists' });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log(hashedPassword);
            // console.log(role);


            // Create a new user instance
            const newUser = new UserData({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                marketing_accept,
                role: role,
            });
            // console.log(newUser);


            // Save the user to MongoDB
            await newUser.save();
            // Return the token as a response
            return res.status(200).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error('Error saving user:', error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    else if (req.method === 'DELETE') {
        try {
            await dbConnect();
            const { id } = req.body;

            // Check if ID is provided
            if (!id) {
                return res.status(400).json({ success: false, error: 'ID is required for deletion' });
            }

            // Find user by ID and delete
            const deletedUser = await UserData.findByIdAndDelete({ _id: id });

            if (!deletedUser) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            return res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    else {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
