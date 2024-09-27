'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/app/_components/Loading/Loading';

export default function ServiceDetailPage({ params }) {
    const { id } = params;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/service?id=${id}`); // Fetch service by ID

                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            setService(data.data);
                        } else {
                            console.error('Error fetching service:', data.error);
                        }
                    } else {
                        console.error('Failed to fetch service:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching service:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);


    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!service) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>Service not found</p></div>;

    return (
        <div className="bg-gray-300 mt-16">
            <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  rounded-xl shadow-lg p-8 lg:p-16 ">
                <h1 className="text-3xl font-bold text-light-blue-900 mb-4">{service.name}</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{service.short_description}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline ">Details</h3>
                    <p><strong>Category:</strong> {service.category}</p>
                    <p><strong>Price:</strong> ${service.price.toFixed(2)}</p>
                    <p><strong>Duration:</strong> {service.duration} minutes</p>
                    <p><strong>Department:</strong> {/* Fetch department name using ID */}</p>
                    <p className={`font-bold ${service.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        Status: {service.isActive ? 'Active' : 'Inactive'}
                    </p>
                </div>

                <div className="mt-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline">Available Slots</h3>
                    <ul className="list-disc ml-5">
                        {service.availableSlots.map((slot, index) => (
                            <li key={index}>
                                {slot.dayOfWeek}: {slot.timeSlot}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
