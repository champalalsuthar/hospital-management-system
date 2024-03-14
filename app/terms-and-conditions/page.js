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
                <h1 className="text-3xl font-bold underline text-red-500" >Terms and Conditions</h1>
                <p className="my-4 font-rubik text-lg leading-relaxed text-pink-800">
                    Welcome to Rk clinic! Before you proceed with signing up, please carefully read and understand
                    the following terms and conditions:
                </p>
                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">1. Acceptance of Terms</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    By signing up on Rk clinic, you agree to comply with and be bound by these terms and conditions.
                    If you do not agree with any part of these terms, please do not proceed with the sign-up process.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">2. Privacy Policy</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Your privacy is important to us. Please review our{' '}
                    <a href="/privacy-policy" className="text-blue-900 underline">Privacy Policy</a> to understand how we collect, use, and protect your personal
                    information.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">3. Account Registration</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    To access certain features of our services, you may be required to register for an account. You are
                    responsible for maintaining the confidentiality of your account information and password.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">4. Code of Conduct</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Users of Rk clinic must adhere to a code of conduct. This includes but is not limited to
                    respectful communication, compliance with applicable laws, and refraining from engaging in any harmful
                    activities on the platform.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">5. Termination of Account</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Rk clinic reserves the right to terminate or suspend your account at any time for violations of
                    these terms or for any other reason deemed necessary by the administration.

                </p>
                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">6. Changes to Terms</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Rk clinic may update or modify these terms and conditions at any time. It is your responsibility
                    to regularly check for changes. Continued use of the platform after changes indicates acceptance of the
                    updated terms.
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