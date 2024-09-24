import dbConnect from '../../utils/dbConnect';
import Department from '../../models/Department';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const department = new Department(req.body);
            await department.save();
            return res.status(201).json({ success: true, data: department });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'GET') {
        if (req.query.id) {
            try {
                const department = await Department.findById(req.query.id);
                if (!department) {
                    return res.status(404).json({ success: false, message: 'Department not found' });
                }
                return res.status(200).json({ success: true, data: department });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
        }
        try {
            const departments = await Department.find();
            return res.status(200).json({ success: true, data: departments });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'PUT') {
        try {
            const department = await Department.findByIdAndUpdate(req.query.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!department) {
                return res.status(404).json({ success: false, message: 'Department not found' });
            }
            return res.status(200).json({ success: true, data: department });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const department = await Department.findByIdAndDelete(req.query.id);
            if (!department) {
                return res.status(404).json({ success: false, message: 'Department not found' });
            }
            return res.status(200).json({ success: true, message: 'Department deleted' });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
