

import React from 'react'
import Link from 'next/link'
import StarRating from '../_components/StarRating';

const DoctorCard = ({ doctor }) => {
    // const doctor=props.doctor;
    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg p-3 border border-yellow-500 hover:border-blue-500">
            {/* <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
            /> */}
            <img alt="d1" src='/d1.jpg' className="h-52 w-full rounded-lg object-cover" />

            <div className="bg-gray-300 w-1/2 pl-1 pt-4  text-start sm:pt-6 rounded-lg">
                <p className=" p-1  text-center font-semibold rounded-xl  bg-gray-50 text-xs text-blue-500">{doctor.specialty} </ p>

                <p>
                    <h3 className="mt-[2px] text-lg text-black font-bold">{doctor.name} </h3>
                </p>

                <p className=" line-clamp-3 text-sm/relaxed font-semibold text-blue-500">{doctor.experience} Years </ p>
                {/* <div className=" ml-1 flex items-center justify-start mt-2">
                    <p className="text-sm text-gray-500">{doctor.rating}</p>
                    <span className="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></span>
                </div> */}
                <p className="line-clamp-3 text-sm/relaxed text-gray-500">{doctor.reviews} Reviews </p>
                <a className=' line-clamp-3  text-red-600 text-sm/relaxed '>more info..</a>
                <StarRating rating={doctor.rating} />


            </div>
            <Link href="/appointment#" className='mt-1'>
                <button className='px-3 py-1  rounded-xl text-xs  bg-white hover:bg-blue-500  text-blue-500 border border-blue-500 hover:text-white'>Book Appointment</button>
            </Link>
        </article>
    )
}

export default DoctorCard