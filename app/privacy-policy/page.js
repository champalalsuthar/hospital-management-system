"use client"

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "../_components/Footer";
// import "../../Styles/Legal/LegalDocument.css";

function page() {
    // useEffect(() => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // });

    return (
        <div className="mt-16 bg-gray-300 ">
            <div className="p-3 md:p-8 bg-opacity-90 bg-gray-300 text-center">
                <h1 className="text-3xl font-bold underline text-red-500" >Privacy Policy</h1>
                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">1. Information We Collect</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    We collect various types of information when you sign up and use our services. This may include personal
                    information such as your name, email, and other relevant details.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">2. Use of Information</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    The information we collect is used to provide and improve our services. We may use your information for
                    communication, account management, and to personalize your experience on Rk clinic.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">3. Security</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    We prioritize the security of your personal information. We implement measures to protect against unauthorized
                    access, disclosure, alteration, and destruction of data.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">4. Third-Party Services</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    We may use third-party services that collect, monitor, and analyze information. Please review the privacy
                    policies of these third-party services for more details.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">5. Changes to Privacy Policy</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Rk clinic may update or modify this Privacy Policy at any time. Check this page regularly for
                    changes. Continued use of our services after changes indicates acceptance of the updated policy.
                </p>
                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">6. Contact Information</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    If you have any questions or concerns regarding our Privacy Policy, please contact us at{' '}
                    <a href="mailto:privacy@rkclinic.com" className="text-red-800 underline">privacy@rkclinic.com</a>.
                </p>
                <a href="/" className="text-center">
                    <Button>Back to Home</Button>
                </a>
            </div>
            <Footer />
        </div>
    );
}

export default page;
