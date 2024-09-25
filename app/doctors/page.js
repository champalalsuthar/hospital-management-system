"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'// pages/services/index.js
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Change this import
import DoctorCard from './_DoctorCard';
import CategarySearch from '../_components/CategarySearch';

const page = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your API endpoint
                const response = await fetch('/api/alldoctor');

                if (response.status === 200) {
                    const data = await response.json();
                    // Set the retrieved data to the state
                    console.log(data);
                    // console.log(data.doctors);
                    setDoctors(data.doctors);
                    setFilteredDoctors(data.doctors);
                }
                else {
                    toast.error('Retry...!');
                    throw new Error('Failed to fetch data');
                }

            } catch (error) {
                toast.error('Error...!');
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const handleSearch = () => {
        if (searchQuery === '') {
            // If the search query is empty, show all doctors
            setFilteredDoctors(doctors);
        } else {
            // Filter doctors based on the search query
            const filtered = doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    };

    return (
        <>
            <div className=" bg-gray-300 ds py-20 px-5 text-center">
                <div>
                    {/* <h2 className='font-bold text-4xl tracking-wide m-4 '> <span className='text-blue-500 '>ALL Doctors</span></h2> */}
                    <div className=' bg-gray-300' >
                        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                            <div className='  items-center flex flex-col gap-2 text-center' >
                                <h2 className='font-bold text-2xl tracking-wide'>Search <span className='text-blue-500'>Doctors</span></h2>
                                <h2 className=' text-gray-400 text-xl'>
                                    Search Your Doctors and Book Appointment in one Click
                                </h2>
                                <div className="flex mt-3 w-full max-w-sm items-center space-x-2">
                                    <Input type="text" placeholder="Search" value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                    <Button type="button" onClick={handleSearch}><Search className='h-4 w-4 mr-2' /> Search</Button>
                                </div>
                            </div>

                            {/* <div className="mt-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500"> Dentist</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">Dentist</dd>
                                        </div>

                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500">Cardiologist</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">Cardiologist</dd>
                                        </div>
                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500">Orthopedic</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">Orthopedic</dd>
                                        </div>
                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500">Neurologist</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">Neurologist</dd>
                                        </div>
                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500">Otology</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">Otology</dd>
                                        </div>
                                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                            <dt className="order-last text-lg font-medium text-blue-500">General Doctors</dt>

                                            <dd className="text-2xl font-extrabold text-blue-600 md:text-xl">General Doctor</dd>
                                        </div>
                                    </div>

                                </div> */}
                        </div>
                    </div>
                    {
                        filteredDoctors.length > 0 ? (<div className="ds-card-main-div grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-8">
                            {filteredDoctors.map((doctor, index) => (
                                <DoctorCard doctor={doctor} />
                            ))}
                        </div>) : (
                            <div className="bg-gray-300  py-20 px-5 text-center h-100vh ">Not Found.....</div>
                        )}
                </div>

            </div>
        </>
    )
}

export default page

