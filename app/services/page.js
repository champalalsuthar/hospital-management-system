// pages/services/index.js

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '../_components/Footer';
import { Faq } from '../_components/Faq';

const servicesData = [
    { title: 'Emergency Dental Care', description: 'Immediate treatment for dental emergencies.' },
    { title: 'Prosthodontics', description: 'Restoration and replacement of missing teeth with prosthetic devices.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Prosthodontics', description: 'Restoration and replacement of missing teeth with prosthetic devices.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Prosthodontics', description: 'Restoration and replacement of missing teeth with prosthetic devices.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Pediatric Dentistry', description: 'Specialized dental care for children, preventive and restorative services.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Oral Surgery', description: 'Tooth extraction, wisdom teeth removal, and dental implant placement.' },
    { title: 'Endodontic Services', description: 'Root canal therapy to treat infected or inflamed tooth pulp.' },
    { title: 'Periodontal Care', description: 'Treatment for gum diseases, scaling, and root planing.' }
];

const page = () => {
    return (
        <div className=" bg-gray-300 ds py-20 px-5 text-center">
            <div>
                {/* <h3 className="dt-title text-2xl font-bold mb-4">
                <span> Our Services</span>
            </h3> */}
                <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>All Services</h2>

                <div className="ds-card-main-div grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 ">
                    {servicesData.map((service, index) => (
                        <div key={index} className="ds-card bg-slate-300 p-4 rounded shadow-md relative">
                            <h3 className="ds-service-title text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="ds-service-description text-sm">{service.description}</p>
                            <Button className=' m-4'>More Details..</Button>
                        </div>
                    ))}
                </div>
            </div>
            <Faq />
            <Footer />

        </div>
    );
};

export default page;
