

"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import StarRating from '../_components/StarRating';
import Image from 'next/image'
import { Search } from 'lucide-react'// pages/services/index.js
import { useRouter } from 'next/navigation'; // Change this import
import { useUser } from "../../context/UserContext";


const DoctorCard = ({ doctor }) => {
    const router = useRouter(); // Use the Next.js router for navigation
    const handleCardClick = (id) => {
        router.push(`/doctors/${id}`);
    };
    // const doctor=props.doctor;
    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();

    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg p-3 border border-yellow-500 hover:border-blue-500 w-full">
            {/* <div style={{ width: '255px', height: '350px', position: 'relative' }}> */}
            {/* <Image
                    alt="d1"
                    src={doctor.imageUrl ? doctor.imageUrl : '/d1.jpg'}
                    layout="fill"  // Ensures the image fills the container
                    objectFit="cover"  // Ensures the image covers the container
                    className="rounded-lg"
                /> */}
            <Image
                alt="doctorpic"
                src={doctor.imageUrl ? doctor.imageUrl : '/d1.jpg'}
                width={200}
                height={200}
                className=" object-cover max-w-[100%] max-h-[50%] w-full h-full rounded-lg" // You may want to adjust this for proper sizing
            // style={{ objectFit: 'cover' }}
            // className="h-68 w-full rounded-lg object-cover" // You may want to adjust this for proper sizing
            />
            {/* </div> */}
            {doctor.specialty &&
                <p className=" p-1 w-1/2 pl-1 mt-4   text-center font-semibold rounded-xl  bg-gray-50 text-xs text-blue-500">
                    {doctor.specialty.length > 20 ? doctor.specialty.slice(0, 15) + '...' : doctor.specialty}
                </ p>
            }

            <div className="bg-gray-300  pl-1 pt-2  text-start sm:pt-2 rounded-lg">

                <p>
                    <h3 className="mt-[2px] text-lg text-black font-bold">{doctor.name} </h3>
                </p>

                <p className=" line-clamp-3 text-sm/relaxed font-semibold text-blue-500">{doctor.experience} Years Experience  </ p>
                <StarRating rating={doctor.rating} />
            </div>

            <button onClick={(e) => {
                e.stopPropagation();
                handleCardClick(doctor._id)
            }} className='m-1'>
                <button className='px-3 py-1  rounded-xl text-xs  bg-white hover:bg-blue-500  text-blue-500 border border-blue-500 hover:text-white'>More Details...</button>
            </button>
            {userrole === "user" &&
                <Link href="/appointment#" className='m-2'>
                    <button className='px-3 py-1  rounded-xl text-xs  bg-white hover:bg-blue-500  text-blue-500 border border-blue-500 hover:text-white'>Book Appointment</button>
                </Link>
            }
        </article>
    )
}

export default DoctorCard