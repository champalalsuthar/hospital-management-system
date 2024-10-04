import Service from "@/models/Services";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const service = new Service(req.body);
            await service.save();
            return res.status(201).json({ success: true, data: service });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'GET') {
        if (req.query.id) {
            try {
                const service = await Service.findById(req.query.id);
                if (!service) {
                    return res.status(404).json({ success: false, message: 'Service not found' });
                }
                return res.status(200).json({ success: true, data: service });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
        }

        try {
            const services = await Service.find();
            return res.status(200).json({ success: true, data: services });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'PUT') {
        try {
            const service = await Service.findByIdAndUpdate(req.query.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!service) {
                return res.status(404).json({ success: false, message: 'Service not found' });
            }
            return res.status(200).json({ success: true, data: service });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    if (req.method === 'DELETE') {
        try {
            console.log(req.query.id);
            const service = await Service.findByIdAndDelete(req.query.id);
            if (!service) {
                return res.status(404).json({ success: false, message: 'Service not found' });
            }
            console.log(service);
            return res.status(200).json({ success: true, message: 'Service deleted' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
