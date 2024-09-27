
// pages/services/index.js
"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Change this import

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '../_components/Footer';
import { Faq } from '../_components/Faq';
import ServiceCard from '../services/ServiceCard';
import Loading from './Loading/Loading';



const HomeServices = () => {
    const router = useRouter(); // Use the Next.js router for navigation

    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    const filteredServices = data.data.filter(service => service.isTopActive && service.isActive);
                    setServicesData(filteredServices);
                } else {
                    toast.error('Failed to load departments');
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                toast.error('Error loading data');
                console.error('Error fetching service data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle card click to navigate to service detail page
    const handleCardClick = (id) => {
        router.push(`/services/${id}`);
    };

    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;
    return (
        <>
            {Array.isArray(servicesData) && servicesData.length > 0 ? (
                <div className="bg-gray-300  ds py-20 px-5 text-center">
                    <div>
                        <h2 className="font-bold text-4xl tracking-wide m-4">
                            <span className="text-blue-500">Top services</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {servicesData.map((services) => (
                                <div key={services._id}>
                                    <ServiceCard key={services._id} services={services} index={index++} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link href="/services">
                        <Button className='m-10  bg-blue-500 '>Explore More Services</Button>
                    </Link>
                </div>
            ) : (
                <div>Loading servicesData...</div>
            )}
        </>
    );
};

export default HomeServices;
