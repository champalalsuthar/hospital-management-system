import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import allDoctor from '@/models/allDoctor';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, error: 'No token provided' });
            }
            // console.log("token", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decoded", decoded);

            await dbConnect();
            const user = await allDoctor.findById(decoded.userId).select('-password');


            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            return res.status(200).json({ success: true, user });
        } else {
            return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
