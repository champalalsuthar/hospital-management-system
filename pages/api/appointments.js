import dbConnect from '../../utils/dbConnect';
import Appointment from '../../models/Appointment';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const appointment = new Appointment(req.body);
            await appointment.save();
            return res.status(201).json({ success: true, data: appointment });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'GET') {
        try {
            // Fetch all appointments from the database
            const appointments = await Appointment.find();
            return res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const deletedAppointment = await Appointment.findByIdAndDelete({ _id: id });
            if (!deletedAppointment) {
                return res.status(404).json({ success: false, message: 'Appointment not found' });
            }
            return res.status(200).json({ success: true, data: deletedAppointment });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}