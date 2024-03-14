// pages/services/index.js

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const servicesData = [
    { title: 'Emergency Dental Care', description: 'Immediate treatment for dental emergencies.' },
    { title: 'Prosthodontics', description: 'Restoration and replacement of missing teeth with prosthetic devices.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Periodontal Care', description: 'Treatment for gum diseases, scaling, and root planing.' }
];

const HomeServices = () => {
    return (
        <div className="ds bg-gray-300 py-20 px-5 text-center">

            <h2 className='font-bold text-4xl tracking-wide m-4 '>Our <span className='text-blue-500 '>Services</span></h2>

            <div className="ds-card-main-div  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {servicesData.map((service, index) => (
                    <div key={index} className="ds-card relative bg-white p-4 rounded shadow-md">
                        <h3 className="ds-service-title text-lg  mb-2 underline text-blue-500 font-bold">{service.title}</h3>
                        <p className="ds-service-description text-sm pb-8">{service.description}</p>
                        <button className="absolute bottom-0 right-0 bg-blue-200 rounded-md p-1">More Details....</button>
                    </div>
                ))}
            </div>
            <div className='ds-button-div mt-4 text-center'>
                <Link href="/services#">
                    <Button>All Services</Button>
                </Link>
            </div>
        </div>
    );
};

export default HomeServices;
