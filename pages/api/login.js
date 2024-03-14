import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';
import { UserData } from '../../models/UserData';

export default function handler(req, res) {
    if (req.method === 'POST') {
        dbConnect().then(() => {
            const { email, password } = req.body;

            UserData.findOne({ email: email }).then(existingUser => {
                if (existingUser) {
                    bcrypt.compare(password, existingUser.password).then(isPasswordMatch => {
                        if (!isPasswordMatch) {
                            // console.log("Invalid password");
                            return res.status(401).json({ success: false, error: 'Invalid password' });
                        }

                        const token = jwt.sign(
                            { userId: existingUser._id, email: existingUser.email },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                        // console.log(existingUser);
                        const myuser = JSON.stringify(existingUser);
                        // console.log(myuser);

                        existingUser.password = undefined;

                        res.status(200).json({ success: true, token, myuser });
                        // console.log("200");
                    }).catch(error => {
                        console.error('Error comparing passwords:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                } else {
                    // console.log("Email does not exist");
                    res.status(404).json({ success: false, error: 'Email does not exist' });
                }
            }).catch(error => {
                console.error('Error finding user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
        }).catch(error => {
            console.error('Error connecting to database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
}
