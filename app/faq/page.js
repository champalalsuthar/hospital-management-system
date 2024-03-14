import React from 'react'
import Footer from '../_components/Footer';

const page = () => {
    const questions = [
        {
            "question": "What are the hospital's visiting hours?",
            "answer": "Visiting hours are from 10:00 AM to 8:00 PM. However, exceptions can be made for special cases."
        },
        {
            "question": "How can I make an appointment?",
            "answer": "You can make an appointment by calling our appointment hotline or using our online appointment booking system on the hospital website."
        },
        {
            "question": "What types of insurance do you accept?",
            "answer": "We accept a wide range of insurance plans. Please check with our billing department for specific details related to your insurance coverage."
        },
        {
            "question": "Is there parking available at the hospital?",
            "answer": "Yes, we have designated parking areas for patients and visitors. Parking is available on a first-come, first-served basis."
        },
        {
            "question": "Do you have emergency services?",
            "answer": "Yes, our hospital has a dedicated emergency department that operates 24/7 to provide immediate care for emergencies."
        },
        {
            "question": "What specialties does the hospital offer?",
            "answer": "We offer a range of specialties including cardiology, orthopedics, pediatrics, obstetrics, and more. Check our website for a complete list of specialties."
        },
        {
            "question": "How can I access my medical records?",
            "answer": "Patients can access their medical records through our patient portal. You can request access during your visit or contact our medical records department for assistance."
        },
        {
            "question": "Are there accommodation facilities for family members?",
            "answer": "We provide accommodation options for family members, and arrangements can be made based on availability. Please inquire at the front desk for more information."
        },
        {
            "question": "What safety measures are in place for COVID-19?",
            "answer": "We have implemented strict safety protocols to protect patients and staff from COVID-19. This includes regular sanitization, temperature checks, and social distancing measures."
        },
        {
            "question": "How can I provide feedback or file a complaint?",
            "answer": "You can provide feedback or file a complaint by reaching out to our patient relations department. We value your feedback and strive to continuously improve our services."
        }
    ]

    return (
        <div className='bg-gray-300  mt-16 py-4'>
            <div className="space-y-4 bg-gray-300">
                <div className='text-center'>
                    <h2 className='font-bold text-4xl  m-4 '> <span className='text-blue-500 '>FAQ </span></h2>
                </div>
                <div className='m-4 lg:mx-12 space-y-4'>
                    {questions.map((question, index) => (
                        <details
                            key={index}
                            className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                <h2 className="text-lg font-medium text-gray-900">{question.question}</h2>

                                <span className="shrink-0 rounded-full bg-gray-300 p-1.5 text-gray-900 sm:p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700">{question.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
            <Footer />

        </div>

    )
}
export default page;