"use client"
import React, { useState, useEffect } from 'react'

import DoctorCard from '../doctors/_DoctorCard';


const PopularDoctors = () => {
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

                // console.log(data);
                // console.log(data.doctors);
                setDoctors(data.doctors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);
    return (
        <div className=" bg-gray-300 ds py-20 px-5 text-center">

            <div>
                <h2 className='font-bold text-4xl tracking-wide m-4 '> Popular<span className='text-blue-500 '> Doctors</span></h2>
                {/* <h2 className='font-bold text-4xl tracking-wide m-4 '>Popular<span className='text-blue-500 '> Doctors</span></h2> */}

                <div className="ds-card-main-div grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-8">
                    {doctors.map((doctor, index) => (
                        doctor.popular === false ? null : (
                            <DoctorCard doctor={doctor} />
                        )
                    ))}
                </div>
            </div>
        </div>

    )
}

export default PopularDoctors