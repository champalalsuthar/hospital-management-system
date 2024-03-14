import React from 'react'
import AppointmentForm from '../_components/AppointmentForm'
import Footer from '../_components/Footer'

const page = () => {
    return (
        <div className="ds py-20 px-5 text-center bg-gray-300">
            <div>
                <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>Appointment Form</h2>
            </div>
            <AppointmentForm />
            <Footer />
        </div>
    )
}
export default page