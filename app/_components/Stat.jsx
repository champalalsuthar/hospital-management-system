"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loading from '@/app/_components/Loading/Loading';

const Stat = () => {

    const [doctors, setDoctors] = useState(0);
    const [patientsRecovered, setPatientsRecovered] = useState(1689);
    const [totalWorkers, setTotalWorkers] = useState(450);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch doctors data
                const doctorsResponse = await fetch('/api/alldoctor');
                if (doctorsResponse.status === 200) {
                    const data = await doctorsResponse.json();
                    const doctorsData = data.doctors;
                    setDoctors(doctorsData.length);
                } else {
                    toast.error('Failed to load doctors');
                }

                // Fetch patients recovered data
                // const patientsResponse = await fetch('/api/patientsrecovered');
                // if (patientsResponse.status === 200) {
                //     const data = await patientsResponse.json();
                //     setPatientsRecovered(data.length); // Assuming the API returns an array of recovered patients
                // } else {
                //     toast.error('Failed to load recovered patients');
                // }

                // Fetch total workers data
                // const workersResponse = await fetch('/api/totalworkers');
                // if (workersResponse.status === 200) {
                //     const data = await workersResponse.json();
                //     setTotalWorkers(data.length); // Assuming the API returns an array of workers
                // } else {
                //     toast.error('Failed to load total workers');
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;
    return (
        <section className="bg-gray-300">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Hospital state</h2> */}
                    <h2 className='font-bold text-4xl tracking-wide m-4 '>Hospital <span className='text-blue-500 '>Statistics</span></h2>
                </div>

                <div className="mt-8 sm:mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Total Doctors</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{doctors}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Patient recovered</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{patientsRecovered}</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Total Workers</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{totalWorkers}</dd>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Stat
