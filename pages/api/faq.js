import dbConnect from '../../utils/dbConnect';
import Faq from '../../models/Faq';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { qus_name, ans } = req.body;

        if (!qus_name || !ans) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        try {
            const Faq = new Faq(req.body);
            await Faq.save();
            return res.status(201).json({ success: true, data: Faq });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'GET') {
        try {
            // Fetch all Faqs from the database
            const Faqs = await Faq.find();
            console.log(Faqs); // Log the fetched FAQs

            return res.status(200).json({ success: true, data: Faqs });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'PUT') {
        try {
            const { id, qus_name, ans, status } = req.body;

            if (!id || (!qus_name && !ans && !status)) {
                return res.status(400).json({ message: 'Please provide the Faq ID and the fields to update' });
            }

            const updatedFaq = await Faq.findByIdAndUpdate(
                id,
                { qus_name, ans, status },
                { new: true } // Return the updated document
            );

            if (!updatedFaq) {
                return res.status(404).json({ success: false, message: 'Faq not found' });
            }

            return res.status(200).json({ success: true, data: updatedFaq });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const deletedFaq = await Faq.findByIdAndDelete({ _id: id });
            if (!deletedFaq) {
                return res.status(404).json({ success: false, message: 'Faq not found' });
            }
            return res.status(200).json({ success: true, data: deletedFaq });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}