"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from next/navigation


const ServiceCard = ({ services, index }) => {
    const router = useRouter(); // Initialize the useRouter hook
    const rotateClass = index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2';
    const scaleClass = index % 2 === 0 ? 'hover:scale-105' : 'hover:scale-90';
    const handleCardClick = () => {
        console.log(services._id);
        router.push(`/services/${services._id}`);
    };

    return (
        <div
            //  onClick={handleCardClick}
            className={`w-50 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md 
      transition-transform transform ${scaleClass} hover:border-blue-500 hover:border-solid hover:shadow-lg duration-300 ease-in-out ${rotateClass} `}>
            {/* <div class="col-span-2 text-lg font-bold capitalize rounded-md">
        {services.name}
      </div> */}
            <div class="col-span-2 rounded-md">
                <h3 className="font-bold text-xl mb-2">{services.name}</h3>
                <p className="text-gray-600 mb-4"> <span className='font-semibold'>Category:</span> {services.category}</p>
                <p className="text-gray-600"><span  className='font-semibold'>Department:</span> {services.department}</p>
                <p className="text-gray-600"><span className='font-semibold'>Description:</span> {services.short_description}</p>
                <p className={`font-bold ${services.isActive === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                    {services.isActive}
                </p>
            </div>
            <div class="col-span-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents the card click event from firing
                        handleCardClick(); // Handle navigation when clicking the button
                    }} class="rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </button>
            </div>


        </div >
    );
};

export default ServiceCard;
