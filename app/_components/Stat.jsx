import React from 'react'

const Stat = () => {
    return (
        <section className="bg-gray-300">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Hospital state</h2> */}
                    <h2 className='font-bold text-4xl tracking-wide m-4 '>Hospital <span className='text-blue-500 '>Statistics</span></h2>


                    {/* <p className="mt-4 text-gray-500 sm:text-xl">
                       content
                    </p> */}
                </div>

                <div className="mt-8 sm:mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Total Doctors</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">356</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Patient recovered</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">8765</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Total Workers</dt>

                            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">987</dd>                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Stat
