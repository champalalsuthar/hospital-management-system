"use client"

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function DoctorForm() {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        rating: 0,
        reviews: 0,
        services: [],
        email: '',
        experience: 0,
        popular: false,
    });
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // const { name, value, type, checked } = e.target;
        // const newValue = type === 'checkbox' ? checked : value;
        // setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.specialty || !formData.email || !formData.rating || !formData.reviews || !formData.services || !formData.experience) {
            toast.error('plese fill required fields!');
            // alert("plese fill required fields");
            // console.log("plese fill required fields");
            return;
        }

        try {
            // Send POST request to backend to save the doctor data
            const response = await fetch('/api/alldoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // alert('Doctor data saved successfully!');
                toast.success("Doctor Data Saved");
                // Clear the form after submission
                setFormData({
                    name: '',
                    specialty: '',
                    rating: 0,
                    reviews: 0,
                    services: [],
                    email: '',
                    experience: 0,
                    popular: false,
                });
                router.push('/doctors');
            }
            else if (response.status === 302) {
                toast.error("Email allready exsit");
                return;
            }
            else {
                toast.error("Failed to save Doctor Data");
                throw new Error('Failed to save doctor data');
            }
        } catch (error) {
            console.error('Error saving doctor data:', error);
            // alert('Error saving doctor data. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-16">
            <h2 className="text-xl text-center mb-4 text-blue-500 underline font-bold ">Add a New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Specialty:</label>
                    <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Rating:</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Reviews:</label>
                    <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Services:</label>
                    <input type="text" name="services" value={formData.services} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Experience:</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                {/* <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="mr-2" />
                        <span>Popular</span>
                    </label>
                </div> */}
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    );
}

export default DoctorForm;
