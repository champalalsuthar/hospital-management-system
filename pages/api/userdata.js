import dbConnect from '../../utils/dbConnect';
import { UserData } from '../../models/UserData';
export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { qus_name, ans } = req.body;

        if (!qus_name || !ans) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        try {
            const UserData = new UserData(req.body);
            await UserData.save();
            return res.status(201).json({ success: true, data: UserData });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'GET') {
        if (req.query.id) {
            try {
                const UserDatas = await UserData.findById(req.query.id);
                if (!UserDatas) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                return res.status(200).json({ success: true, data: UserDatas });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
        }
        try {
            const UserDatas = await UserData.find();
            console.log(UserDatas);

            return res.status(200).json({ success: true, data: UserDatas });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'PUT') {
        try {
            const { id, qus_name, ans, status } = req.body;

            if (!id || (!qus_name && !ans && !status)) {
                return res.status(400).json({ message: 'Please provide the UserData ID and the fields to update' });
            }

            const updatedUser = await UserData.findByIdAndUpdate(
                id,
                { qus_name, ans, status },
                { new: true } // Return the updated document
            );

            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'UserData not found' });
            }

            return res.status(200).json({ success: true, data: updatedUser });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const deletedupdatedUser = await UserData.findByIdAndDelete({ _id: id });
            if (!deletedupdatedUser) {
                return res.status(404).json({ success: false, message: 'UserData not found' });
            }
            return res.status(200).json({ success: true, data: deletedupdatedUser });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}