import allDoctor from "@/models/allDoctor";
import dbConnect from "@/utils/dbConnect";


export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, specialty, rating, reviews, services, email, experience, popular } = req.body;
        try {
            const existingdoctor = await allDoctor.findOne({ email });
            if (existingdoctor) {
                return res.status(302).json({ success: false, error: "Email allready exsit" });
            }

            const newDoctor = new allDoctor({
                name,
                specialty,
                rating,
                reviews,
                services,
                email,
                experience,
                popular
            });

            await newDoctor.save();
            res.status(201).json({ success: true, doctor: newDoctor, message: ' successfully' });
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

            // Fetch all doctors from the database
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
            const doctor = await allDoctor.findByIdAndUpdate(req.query.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!doctor) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }
            return res.status(200).json({ success: true, data: doctor });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
