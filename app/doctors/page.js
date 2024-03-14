"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import DoctorCard from './_DoctorCard';
import Footer from '../_components/Footer';
import { Faq } from '../_components/Faq';
import CategarySearch from '../_components/CategarySearch';


const page = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your API endpoint
                const response = await fetch('/api/alldoctor');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                // Set the retrieved data to the state
                // console.log(data);
                // console.log(data.doctors);
                setDoctors(data.doctors);
                // console.log(doctors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    return (
        <>
            {
                doctors.length > 0 ? (<div className=" bg-gray-300 ds py-20 px-5 text-center">
                    <div>
                        {/* <h2 className='font-bold text-4xl tracking-wide m-4 '> <span className='text-blue-500 '>ALL Doctors</span></h2> */}
                        <CategarySearch />
                        <div className="ds-card-main-div grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-8">
                            {doctors.map((doctor, index) => (
                                <DoctorCard doctor={doctor} />
                            ))}
                        </div>
                    </div>
                    <Faq />
                    <Footer />

                </div>) : (
                    <div>loading.....</div>
                )
            }
        </>
    )
}

export default page

