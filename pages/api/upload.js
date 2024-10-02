import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer to handle file data
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

function uploadFromBuffer(req) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Use multer to handle the file upload in memory
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });

    // Upload the file to Cloudinary
    const result = await uploadFromBuffer(req);

    // Respond with the Cloudinary URL of the uploaded image
    res.status(200).json({ message: 'Success', url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading image' });
  }
}

// import multer from 'multer';
// import fs from 'fs';
// import { promisify } from 'util';
// import next from 'next';

// const imageDir = './public/images'; // Directory for saving images

// // Check if the directory exists, and create it if necessary
// if (!fs.existsSync(imageDir)) {
//     fs.mkdirSync(imageDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, imageDir); // Save files to the specified directory
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Use the original file name
//     }
// });

// // Initialize multer with the defined storage configuration
// const upload = multer({ storage: storage });

// // Promisify the multer middleware for Next.js
// const uploadMiddleware = promisify(upload.single('image'));

// // Disable Next.js default body parser to use Multer
// export const config = {
//     api: {
//         bodyParser: false, // Multer will handle the file data
//     },
// };

// // Handle the file upload in the Next.js API route
// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//     }

//     try {
//         // Apply the multer middleware to handle file upload
//         await uploadMiddleware(req, res);

//         // Construct the URL to access the uploaded image
//         const fileUrl = `http://localhost:3000/images/${req.file.originalname}`;
//         return res.status(200).json({ message: "Success", url: fileUrl });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error uploading image' });
//     }
// }
