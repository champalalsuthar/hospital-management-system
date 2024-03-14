"use client"
// import React from 'react';

import Footer from "../_components/Footer";
// import PrivateRoute from '../components/PrivateRoute';
import userappcontact from '../../components/customprivateroute/userappcontact';
import toast from "react-hot-toast";

const page = () => {
    return (
        // <userappcontact>
        <div className="bg-gray-300 mt-16">
            <h1 className="text-3xl font-bold underline text-red-500 text-center py-8" >Contact Us</h1>

            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="text-2xl font-bold text-pink-600">Rk Clinic+</p>
                            <p className="max-w-xl text-lg">
                                At RK Clinic, our commitment to being wholly owned and independent from external influences assures you that our treatment recommendations are solely based on what is best for your health and well-being
                            </p>

                            <div className="mt-8">
                                <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
                                <address className="mt-2 not-italic">Tonk Rd, Near SMS STADIUM, Jaipur Nagar Nigam, Lalkothi, Jaipur, Rajasthan 302015 </address>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form action="#" className="space-y-4">
                                <div>
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <input
                                        className="w-full rounded-lg p-3 text-sm outline-none border-2 border-black"
                                        placeholder="Name"
                                        type="text"
                                        id="name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="sr-only" htmlFor="email">Email</label>
                                        <input
                                            className="w-full rounded-lg outline-none border-2 border-black p-3 text-sm "
                                            placeholder="Email address"
                                            type="email"
                                            id="email"
                                        />
                                    </div>

                                    <div>
                                        <label className="sr-only" htmlFor="phone">Phone</label>
                                        <input
                                            className="w-full rounded-lg outline-none border-2 border-black p-3 text-sm"
                                            placeholder="Phone Number"
                                            type="tel"
                                            id="phone"
                                        />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 justify-center content-center ">
                                    <p>Select any option</p>
                                    <div>
                                        <select id="optionSelect" class="block w-full cursor-pointer rounded-lg borderoutline-none border-2 border-black p-2">
                                            {/* <option value="Option2"className="px-2 py-1">New Openness</option> */}
                                            <option value="Option1" className="px-2 py-1">Call me Back</option>
                                            <option value="Option2" className="px-2 py-1">New Openness</option>
                                            <option value="Option3" className="px-2 py-1">Not Satisfied Services</option>
                                            <option value="Option4" className="px-2 py-1">other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="message">Message</label>

                                    <textarea
                                        className="w-full rounded-lg outline-none border-2 border-black p-3 text-sm"
                                        placeholder="Message"
                                        rows="8"
                                        id="message"
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button onClick={() => toast.success("Response Sended")}
                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Send Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        // </userappcontact>
    )
};
export default page;

// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'your_email@gmail.com', // Your Gmail email address
//         pass: 'your_password' // Your Gmail password
//     }
// });

// app.post('/send-email', (req, res) => {
//     const { name, email, phone, message, option } = req.body;

//     const mailOptions = {
//         from: email,
//         to: 'recipient_email@example.com', // Email address where you want to receive inquiries
//         subject: 'New Inquiry from Hospital Website',
//         html: `
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone}</p>
//             <p><strong>Option:</strong> ${option}</p>
//             <p><strong>Message:</strong> ${message}</p>
//         `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send('Failed to send email');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Email sent successfully');
//         }
//     });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// EMAIL_USER=your_email@gmail.com
// EMAIL_PASS=your_password
// Install the dotenv package to load environment variables from the .env file:

// bash
// Copy code
// npm install dotenv
// Modify your server.js file to load the environment variables and use them in the Nodemailer transporter configuration:

// javascript
// Copy code
// require('dotenv').config(); // Load environment variables

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // Use environment variable for email address
//         pass: process.env.EMAIL_PASS // Use environment variable for password
//     }
// });