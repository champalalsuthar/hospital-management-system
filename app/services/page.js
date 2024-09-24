// pages/services/index.js
"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Change this import

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '../_components/Footer';
import { Faq } from '../_components/Faq';




const page = () => {
    const router = useRouter(); // Use the Next.js router for navigation

    const [servicesData, setServicesData] = useState([]);

    let index = 0;
    const rotateClass = index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2';
    const scaleClass = index % 2 === 0 ? 'hover:scale-105' : 'hover:scale-90';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your API endpoint for departments
                const response = await fetch('/api/service');

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data.data);
                    // Set the retrieved data to the state
                    setServicesData(data.data);
                } else {
                    toast.error('Failed to load departments');
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                toast.error('Error loading data');
                console.error('Error fetching service data:', error);
            }
        };

        // Fetch data when the component mounts
        fetchData();
    }, []);

    // Handle card click to navigate to service detail page
    const handleCardClick = (id) => {
        router.push(`/services/${id}`);
    };
    return (
        <div className=" bg-gray-300 ds py-20 px-5 text-center">
            <div>
                <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>All Services</h2>

                <div className="ds-card-main-div grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 ">
                    {servicesData.map((service, index) => (
                        <Link key={service._id} href={`/services/${service._id}`}>

                            <div
                                // onClick={handleCardClick}
                                className={`w-50 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md 
                          transition-transform transform ${scaleClass} hover:border-blue-500 hover:border-solid hover:shadow-lg duration-300 ease-in-out  `}>
                                {/* <div class="col-span-2 text-lg font-bold capitalize rounded-md">
                            {service.name}
                          </div> */}
                                <div class="col-span-2 rounded-md">
                                    <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                                    <h4 className="font-bold text-xl mb-2">{service.short_description}</h4>
                                    <h3 className="font-bold text-xl mb-2">Category:{service.category}</h3>
                                    <h3 className="font-bold text-xl mb-2">Price:{service.price}</h3>
                                    <h3 className="font-bold text-xl mb-2">Duration:{service.duration}</h3>
                                    <p className={`font-bold ${service.isActive ? 'text-green-500' : 'text-red-500'}`}>
                                        {service.isActive}
                                    </p>
                                </div>
                                <div class="">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents the card click event from firing
                                            handleCardClick(service._id) // Handle navigation when clicking the button
                                        }} class="rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg><p ><strong>More...</strong></p>
                                    </button>
                                </div>


                            </div >
                        </Link>
                    ))}
                </div>
            </div>
            <Faq />
            <Footer />

        </div>
    );
};

export default page;
