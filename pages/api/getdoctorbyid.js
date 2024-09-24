import allDoctor from "@/models/allDoctor";
import dbConnect from "@/utils/dbConnect";


export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { _id } = req.body;
        {
            console.log(" id in if called", _id);
            try {
                const doctor = await allDoctor.findById(_id);
                console.log("Fetched doctor:", doctor);
                if (!doctor) {
                    return res.status(404).json({ success: false, error: "Doctor not found" });
                }
                return res.status(200).json({ success: true, doctor });
            } catch (error) {
                console.error('Error fetching doctor:', error);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        }
    }
    else if (req.method === 'GET') {
        try {

            // Fetch all doctors from the database
            const doctors = await allDoctor.find();
            console.log(doctors);
            res.status(200).json({ success: true, doctors });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}