
"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    const [questions, setquestions] = useState([]);
    const fetchallfaq = async () => {
        try {
            const response = await fetch('/api/faq');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            console.log(response);
            const data = await response.json();
            console.log(data);
            console.log(data.data);
            if (data.data) {
                data.data.forEach(faq => {
                    console.log('FAQ Status:', faq.status); // Log the status for each FAQ
                });
            }
            const activeFaqs = data.data.filter(faq =>
                faq.status && faq.status.trim().toLowerCase() === "active"
            );

            console.log('Active FAQs:', activeFaqs); // Log active FAQs to debug

            setquestions(activeFaqs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchallfaq();
    }, []);

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
                                <h2 className="text-lg font-medium text-gray-900">{question.qus_name}</h2>

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

                            <p className="mt-4 leading-relaxed text-gray-700">{question.ans}</p>
                        </details>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default page;