import Comment from "../../models/Comment";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { userEmail, content, doctor } = req.body;
        try {
            const newComment = new Comment({
                userEmail,
                content,
                doctor
            });

            await newComment.save();
            res.status(201).json({ success: true, comment: newComment, message: 'Comment added successfully' });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    if (req.method === 'GET') {
        // if (req.query.id) {
        //     try {
        //         const comment = await Comment.findById(req.query.id);
        //         if (!comment) {
        //             return res.status(404).json({ success: false, message: 'Comment not found' });
        //         }
        //         return res.status(200).json({ success: true, data: comment });
        //     } catch (error) {
        //         return res.status(400).json({ success: false, error: error.message });
        //     }
        // }
        if (req.query.doctor) {
            // console.log(req.query.doctor);
            try {
                const comments = await Comment.find({ doctor: req.query.doctor });
                return res.status(200).json({ success: true, data: comments });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
        }

        try {
            const comments = await Comment.find();
            res.status(200).json({ success: true, comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            const deletedComment = await Comment.findByIdAndDelete(id);

            if (!deletedComment) {
                return res.status(404).json({ success: false, error: "Comment not found" });
            }

            res.status(200).json({ success: true, message: "Comment deleted successfully" });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    if (req.method === 'PUT') {
        try {
            const comment = await Comment.findByIdAndUpdate(req.query.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!comment) {
                return res.status(404).json({ success: false, message: 'Review not found' });
            }
            return res.status(200).json({ success: true, data: comment });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
    // if (req.method === 'PUT') {
    //     try {
    //         const comment = await Comment.findByIdAndUpdate(req.query.id, req.body, {
    //             new: true, // Return the updated document
    //             runValidators: true, // Ensure the content is validated
    //         });
    //         if (!comment) {
    //             return res.status(404).json({ success: false, message: 'Review not found' });
    //         }
    //         return res.status(200).json({ success: true, data: comment });
    //     } catch (error) {
    //         return res.status(400).json({ success: false, error: error.message });
    //     }
    // }


    else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
