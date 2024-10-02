import mongoose from 'mongoose';
import allDoctor from "@/models/allDoctor";
import dbConnect from "@/utils/dbConnect";
import bcrypt from 'bcrypt';



export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { first_name, last_name, name, password, specialty, phoneNumber, email, rating, reviews, services, department, isActive, experience, imageUrl, popular, marketing_accept, role } = req.body;
        try {
            // console.log('Received data:', req.body);
            const existingdoctor = await allDoctor.findOne({ email });
            if (existingdoctor) {
                return res.status(302).json({ success: false, error: "Email allready exsit" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newDoctor = new allDoctor({
                first_name,
                last_name,
                name,
                password: hashedPassword,
                email,
                role,
                isActive,
                marketing_accept,
                imageUrl,
                specialty: role === 'doctor' ? specialty : null,
                phoneNumber: role === 'doctor' ? phoneNumber : null,
                rating: role === 'doctor' ? rating : 0,
                reviews: role === 'doctor' ? reviews : 0,
                services: role === 'doctor' ? services : [],
                department: role === 'doctor' ? department : null,
                experience: role === 'doctor' ? experience : null,
                popular: role === 'doctor' ? popular : false,
            });

            await newDoctor.save();
            res.status(201).json({ success: true, doctor: newDoctor, message: ' Registered Successfully' });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    if (req.method === 'GET') {
        if (req.query.id) {
            try {
                const doctor = await allDoctor.findById(req.query.id);
                if (!doctor) {
                    return res.status(404).json({ success: false, message: 'Doctor not found' });
                }
                return res.status(200).json({ success: true, data: doctor });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
        }
        try {

            const doctors = await allDoctor.find();
            // console.log(doctors);
            res.status(200).json({ success: true, doctors });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        try {

            const { id } = req.body;

            // Find the doctor by ID and delete it
            const deletedDoctor = await allDoctor.findByIdAndDelete(id);

            if (!deletedDoctor) {
                return res.status(404).json({ success: false, error: "Doctor not found" });
            }

            res.status(200).json({ success: true, message: "Doctor deleted successfully" });
        } catch (error) {
            console.error('Error deleting doctor:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        try {
            const doctorId = req.query.id; // Get the doctor's ID from the query
            const { password, ...updateData } = req.body;

            // Fetch the existing doctor record
            const doctor = await allDoctor.findById(doctorId);

            if (!doctor) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }

            // If the password is provided and different from the current password
            if (password && doctor.password !== password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword; // Add the hashed password to the update data
            }

            // Update the doctor's information
            const updatedDoctor = await allDoctor.findByIdAndUpdate(doctorId, updateData, {
                new: true,
                runValidators: true
            });

            return res.status(200).json({ success: true, data: updatedDoctor });
            // const doctor = await allDoctor.findByIdAndUpdate(req.query.id, req.body, {
            //     new: true,
            //     runValidators: true
            // });
            // if (!doctor) {
            //     return res.status(404).json({ success: false, message: 'Doctor not found' });
            // }
            // if (doctor.password !== req.body.password) {
            //     const hashedPassword = await bcrypt.hash(password, 10);
            //     doctor.password = hashedPassword;
            // }
            // return res.status(200).json({ success: true, data: doctor });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
