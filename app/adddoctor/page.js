"use client"

"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function DoctorForm() {
    const [department, setDepartment] = useState([]);
    const [services, setServices] = useState([]);


    const fetchActiveServices = async () => {
        try {
            const response = await fetch('/api/service');

            if (response.status === 200) {
                const data = await response.json();
                console.log(data.data);
                const filteredServices = data.data.filter(service => service.isActive);
                setServices(filteredServices);
            } else {
                toast.error('Failed to load departments');
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            toast.error('Error loading data');
            console.error('Error fetching service data:', error);
        } finally {
            //setloading(false);
        }
    };
    const fetchDepartments = async () => {
        try {
            // Fetch data from your API endpoint for departments
            const response = await fetch('/api/department');

            if (response.status === 200) {
                const data = await response.json();
                console.log(data.data);
                const filteredServices = data.data.filter(dept => dept.status === "active");
                setDepartment(data.data);
            } else {
                toast.error('Failed to load departments');
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            toast.error('Error loading data');
            console.error('Error fetching department data:', error);
        } finally {
            //setloading(false);
        }
    };

    useEffect(() => {
        fetchActiveServices();
        fetchDepartments();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        rating: 0,
        reviews: 0,
        services: [],
        department: '',
        email: '',
        experience: 0,
        popular: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const router = useRouter();


    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.specialty) newErrors.specialty = 'Specialty is required';
        if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
        if (formData.reviews < 0) newErrors.reviews = 'Reviews must be a positive number';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.services.length) newErrors.services = 'Select at least one service';
        if (formData.experience < 0) newErrors.experience = 'Experience must be positive';
        return newErrors;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (isSubmitted) {
            setErrors(validate());
        }

    };

    const handleServiceChange = (e) => {
        const options = e.target.options;
        const selectedServices = [];
        for (let i = 0, len = options.length; i < len; i++) {
            if (options[i].selected) {
                selectedServices.push(options[i].value);
            }
        }
        setFormData({ ...formData, services: selectedServices });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        try {
            const response = await fetch('/api/alldoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Doctor Data Saved");
                setFormData({
                    name: '',
                    specialty: '',
                    rating: 0,
                    reviews: 0,
                    services: [],
                    department: '',
                    email: '',
                    experience: 0,
                    popular: false,
                });
                router.push('/doctors');
            } else if (response.status === 302) {
                toast.error("Email already exists");
            } else {
                toast.error("Failed to save Doctor Data");
                throw new Error('Failed to save doctor data');
            }
        } catch (error) {
            console.error('Error saving doctor data:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-16">
            <h2 className="text-xl text-center mb-4 text-blue-500 underline font-bold">Add a New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Specialty:</label>
                    <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
                    {errors.specialty && <p className="text-red-500">{errors.specialty}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Rating:</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    {errors.rating && <p className="text-red-500">{errors.rating}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Reviews:</label>
                    <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    {errors.reviews && <p className="text-red-500">{errors.reviews}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Services:</label>
                    <select multiple name="services" onChange={handleServiceChange} className="w-full px-3 py-2 border rounded-md">
                        {services.map(service => (
                            <option key={service._id} value={service._id}>{service.name}</option>
                        ))}
                    </select>
                    {errors.services && <p className="text-red-500">{errors.services}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Department:</label>
                    <select name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                        {department.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.name}</option>
                        ))}
                    </select>
                    {errors.department && <p className="text-red-500">{errors.department}</p>}

                </div>
                <div className="mb-4">
                    <label className="block mb-2">Experience (in years):</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    {errors.experience && <p className="text-red-500">{errors.experience}</p>}

                </div>
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    );
}

export default DoctorForm;

// import React, { useState ,useEffect} from 'react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// function DoctorForm() {
//     const [department, setDepartment] = useState([]);
//     const fetchalldepartment = async () => {
//         try {
//             const response = await fetch('/api/department');

//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             console.log(response);
//             const data = await response.json();
//             // const activeFaqs = data.data.filter(faq => faq.status === "active");
//             // console.log(activeFaqs);
//             console.log(data.data);
//             setDepartment(data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     useEffect(() => {
//         fetchalldepartment();
//     }, []);
//     const [formData, setFormData] = useState({
//         name: '',
//         specialty: '',
//         rating: 0,
//         reviews: 0,
//         services: [],
//         email: '',
//         experience: 0,
//         popular: false,
//     });
//     const router = useRouter();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         // const { name, value, type, checked } = e.target;
//         // const newValue = type === 'checkbox' ? checked : value;
//         // setFormData({ ...formData, [name]: newValue });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.name || !formData.specialty || !formData.email || !formData.rating || !formData.reviews || !formData.services || !formData.experience) {
//             toast.error('plese fill required fields!');
//             // alert("plese fill required fields");
//             // console.log("plese fill required fields");
//             return;
//         }

//         try {
//             // Send POST request to backend to save the doctor data
//             const response = await fetch('/api/alldoctor', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//             if (response.ok) {
//                 // alert('Doctor data saved successfully!');
//                 toast.success("Doctor Data Saved");
//                 // Clear the form after submission
//                 setFormData({
//                     name: '',
//                     specialty: '',
//                     rating: 0,
//                     reviews: 0,
//                     services: [],
//                     email: '',
//                     experience: 0,
//                     popular: false,
//                 });
//                 router.push('/doctors');
//             }
//             else if (response.status === 302) {
//                 toast.error("Email allready exsit");
//                 return;
//             }
//             else {
//                 toast.error("Failed to save Doctor Data");
//                 throw new Error('Failed to save doctor data');
//             }
//         } catch (error) {
//             console.error('Error saving doctor data:', error);
//             // alert('Error saving doctor data. Please try again.');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-16">
//             <h2 className="text-xl text-center mb-4 text-blue-500 underline font-bold ">Add a New Doctor</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block mb-2">Name:</label>
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Email:</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Specialty:</label>
//                     <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Rating:</label>
//                     <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Reviews:</label>
//                     <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Services:</label>
//                     <input type="text" name="services" value={formData.services} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-2">Experience:</label>
//                     <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                 </div>
//                 {/* <div className="mb-4">
//                     <label className="flex items-center cursor-pointer">
//                         <input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="mr-2" />
//                         <span>Popular</span>
//                     </label>
//                 </div> */}
//                 <div>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default DoctorForm;
