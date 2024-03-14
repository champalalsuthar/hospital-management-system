import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Search } from 'lucide-react'


const CategarySearch = () => {
    return (
        <div className=' bg-gray-300' >
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className='  items-center flex flex-col gap-2 text-center' >
                    <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-blue-500'>Doctors</span></h2>
                    <h2 className=' text-gray-400 text-xl'>
                        Search Your Doctors and Book Appointment in one Click
                    </h2>
                    <div className="flex mt-3 w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="Search" />
                        <Button type="submit"><Search className='h-4 w-4 mr-2' /> Search</Button>
                    </div>
                </div>

                {/* <div className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500"> Dentist</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">Dentist</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500">Cardiologist</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">Cardiologist</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500">Orthopedic</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">Orthopedic</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500">Neurologist</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">Neurologist</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500">Otology</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">Otology</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-blue-500">General Doctors</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">General Doctor</dd>
                        </div>
                    </div>

                </div> */}
            </div>
        </div>
    )
}

export default CategarySearch