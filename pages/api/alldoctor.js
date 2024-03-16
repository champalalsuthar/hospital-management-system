import allDoctor from "@/models/allDoctor";
import dbConnect from "@/utils/dbConnect";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();
            const { name, specialty, rating, reviews, services, email, experience, popular } = req.body;

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
    else if (req.method === 'GET') {
        try {
            await dbConnect();

            // Fetch all doctors from the database
            const doctors = await allDoctor.find();
            console.log(doctors);
            res.status(200).json({ success: true, doctors });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    else if (req.method === 'DELETE') {
        try {
            await dbConnect();

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
    else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}