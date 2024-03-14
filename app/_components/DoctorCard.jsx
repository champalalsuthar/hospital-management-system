

import React from 'react'
import { Star } from 'lucide-react'

const DoctorCard = ({ doctor }) => {
    // const doctor=props.doctor;
    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg border border-spacing-9 " >
            {/* <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
            /> */}
            <img alt="d1" src={doctor.img} className="h-65 w-full object-cover" />

            <div className="bg-gray-200 p-4 sm:p-6">

                <p>
                    <h3 className="mt-0.5 text-lg text-gray-900">{doctor.name} </h3>
                </p>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{doctor.title} </ p>
                <div className="flex items-center justify-center mt-2">
                    <p className="text-sm text-gray-500">{doctor.stars}</p>
                    <span className="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{doctor.reviews} Reviews </p>
            </div>
        </article>
    )
}
export default DoctorCard

