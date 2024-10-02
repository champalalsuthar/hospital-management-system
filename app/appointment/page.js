import React from 'react'
import AppointmentForm from '../_components/AppointmentForm'
import Footer from '../_components/Footer'
import PrivateRouteAppointment from '@/components/customprivateroute/PrivateRouteAppointment'

const page = () => {
    return (
        <PrivateRouteAppointment>
            <div className="ds py-20 px-5 text-center bg-gray-300">
                <div>
                    <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>Appointment Form</h2>
                </div>
                <AppointmentForm />
            </div>
        </PrivateRouteAppointment>
    )
}
export default page