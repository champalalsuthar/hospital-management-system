"use client"

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
// import "../../Styles/Legal/LegalDocument.css";

function page() {
    // useEffect(() => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // });

    return (
        <div className="mt-16 bg-gray-300 ">
            <div className="p-3 md:p-8 bg-opacity-90 bg-gray-300 text-center">
                <h1 className="text-3xl font-bold underline text-red-500" >Legal Support</h1>
                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">General Info</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Welcome to Rk Clinic, your trusted online healthcare platform. Our
                    mission is to provide accessible and personalized healthcare services
                    to individuals seeking expert medical advice and treatment. By using
                    our platform, you agree to the terms outlined in our Privacy Policy
                    and Terms of Service.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">Privacy Policy</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Your privacy is paramount to us. Our
                    {' '}
                    <a href="/privacy-policy" className="text-blue-900 underline">Privacy Policy</a>
                    outlines how we
                    collect, use, and protect your personal and medical information. We
                    ensure secure data handling, and you can trust that your information
                    is treated with the utmost confidentiality.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">Terms of Service</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    When using Rk Clinic, you agree to our Terms of Service. This
                    includes guidelines for using our platform, interacting with doctors,
                    and the responsibilities of both parties. It's essential to understand
                    these terms to ensure a smooth experience for all users.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">Consultations</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Our platform connects you with expert doctors who provide online
                    consultations. These consultations are not a replacement for in-person
                    medical visits but serve as a convenient option for medical advice,
                    prescriptions, and guidance. It's crucial to provide accurate and
                    complete information to receive the best possible care.
                </p>

                <p className="my-4 pb-2 border-b-2 border-gray-500 font-poppins font-bold text-2xl text-center">How it Works</p>
                <p className="mb-4 font-rubik text-lg leading-relaxed">
                    Rk Clinic is designed to simplify healthcare access. You can choose
                    a specialist, schedule an appointment, and engage in a virtual
                    consultation. Our specialists offer personalized advice and treatment
                    plans tailored to your needs. Please remember that emergencies require
                    immediate medical attention and should be directed to your local
                    medical facility.
                </p>
                <a href="/" className="text-center">
                    <Button>Back to Home</Button>
                </a>
            </div>
        </div>
    );
}

export default page;