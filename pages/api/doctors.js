
import dbConnect from '../../utils/dbConnect';
import Doctor from '../../models/Doctor';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();
            const { name, specialty, rating, reviews, services } = req.body;

            const newDoctor = new Doctor({
                name,
                specialty,
                rating,
                reviews,
                services,
            });

            await newDoctor.save();

            res.status(201).json({ success: true, doctor: newDoctor, message: ' successfully' });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}

// export default handler;