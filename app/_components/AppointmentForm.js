"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { useUser } from '../../context/UserContext';

const AppointmentForm = () => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState({
        patientName: '',
        fatherName: '',
        age: '',
        city: '',
        state: '',
        mobile: '',
        gender: '',
        problem: '',
        doctor: '',
        doctorid: '65f05ad2ff9a41ae8dde8faf',
        dateTime: '',
        query: '',
        user_id: '',
    });


    const [formErrors, setFormErrors] = useState({});
    const router = useRouter();
    // const { user, setUser } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.user_id = user._id;
        console.log(formData.user_id);
        const errors = {};
        if (!formData.patientName || !formData.mobile || !formData.dateTime) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                toast.error("Failed to submit the form");
                throw new Error('Failed to submit the form');
            }

            // console.log('Form Data Submitted:', formData);
            toast.success("Appointment booked successfully!");
            toast.success("Confirm Mail Sended!");
            router.push('/dashboard/user');
        } catch (error) {
            console.error('Form Submission Error:', error.message);
            toast.error("please retry!! not booked !");
        }
    };


    return (
        <div className=" w-full lg:w-4/5  mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">
                        Patient Name:
                    </label>
                    <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fatherName" className="block text-gray-700 text-sm font-bold mb-2">
                        Father's Name:
                    </label>
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                        Age:
                    </label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                        State:
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                        Mobile No:
                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                        Gender:
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="problem" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Problem:
                    </label>
                    <select
                        id="problem"
                        name="problem"
                        value={formData.problem}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select Problem
                        </option>
                        <option value="general">General</option>
                        <option value="dental">Dental</option>
                        <option value="orthopedic">Orthopedic</option>
                        <option value="other">Other</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Doctor:
                    </label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select Doctor
                        </option>
                        <option value="drSmith">Dr. Smith</option>
                        <option value="drJones">Dr. Jones</option>
                        <option value="other">Other</option>

                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="dateTime" className="block text-gray-700 text-sm font-bold mb-2">
                        Date and Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="query" className="block text-gray-700 text-sm font-bold mb-2">
                        Query:
                    </label>
                    <textarea
                        id="query"
                        name="query"
                        value={formData.query}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>

                {/* Display form errors, if any */}
                {formErrors.requiredFields && (
                    <div className="text-red-500 mb-4">{formErrors.requiredFields}</div>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
