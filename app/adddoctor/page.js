"use client"

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import Loading from '../_components/Loading/Loading';

const AppointmentForm = () => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: "",
        name: "",
        password: '',
        specialty: "",
        email: '',
        rating: '',
        reviews: '',
        phoneNumber: '',
        experience: '',
        service: '',
        serviceid: '',
        doctor: '',
        department: '',
        popular: '',
        isActive: '',
        imageUrl: "",
        marketing_accept: "",
        role: '',
    });


    const [formErrors, setFormErrors] = useState({});
    // const [servicesData, setServicesData] = useState([]);
    // const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            if (name === 'service') {
                if (value === 'other') {
                    return {
                        ...prevData,
                        serviceid: '',  // Clear service ID for 'Other'
                        service: 'Other',  // Set service to 'Other'
                    };
                } else {
                    // Find selected service by ID
                    const selectedService = services.find(service => service._id === value);
                    return {
                        ...prevData,
                        serviceid: value,  // Store service ID
                        service: selectedService?.name || '',  // Store service name
                    };
                }
            } else {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
        });

        // Validate the specific field being changed
        validateField(name, value);
    };
    // console.log(formData.doctor);
    // console.log(formData.department);
    // console.log(formData.service);
    // console.log(formData.serviceid);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'first_name':
                if (!value) error = 'First Name is required';
                break;
            case 'password':
                if (!value) error = "Password Name is required";
                break;
            case 'email':
                if (!value) error = 'Email is required';
                break;
            case 'experience':
                if (!value) error = 'Experience is required';
                break;
            case 'department':
                if (!value) error = 'Department selection is required';
                break;
            case 'serviceid':
                if (!value) error = 'Service selection is required';
                break;
            case 'popular':
                if (!value) error = 'Popularity is required';
                break;
            case 'phoneNumber':
                if (!value) error = 'Phone number is required';
                break;
            case 'rating':
                if (!value) error = 'Rating is required';
                break;
            case 'reviews':
                if (!value) error = 'Reviews is required';
                break;
            default:
                break;
        }
        // Set or clear the error for the specific field
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error || undefined, // Clear error if no error exists
        }));
    };


    const validateForm = (field = null) => {
        const errors = {};

        if (!formData.first_name) errors.first_name = 'Patient Name is required';
        if (!formData.password) errors.password = "Father's Name is required";
        if (!formData.email) errors.email = 'email is required';
        if (!formData.experience) errors.experience = 'experience is required';
        if (!formData.department) errors.department = 'Department selection is required';
        if (!formData.serviceid) errors.service = 'Service selection is required';
        if (!formData.popular) errors.popular = 'Date and Time are required';
        if (!formData.phoneNumber) errors.phoneNumber = 'phoneNumber number is required';
        if (!formData.rating) errors.rating = 'rating is required';
        if (!formData.reviews) errors.reviews = 'reviews is required';

        // If a specific field is passed, only return the error for that field
        return field ? { [field]: errors[field] } : errors;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.user_id = user._id;
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Stop submission if there are errors
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
            // toast.success("Confirm Mail Sended!");
            router.push('/dashboard/user');
        } catch (error) {
            console.error('Form Submission Error:', error.messemail);
            toast.error("please retry!! not booked !");
        }
    };
    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    return (
        <div className="ds py-20 px-5 text-center bg-gray-300">
            <div>
                <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>Add Doctor Form</h2>
            </div>
            <div className=" w-full lg:w-4/5 bg-gray-200  mx-auto mt-8 p-6 rounded-md shadow-md">
                {/* <h2 className="text-2xl font-bold mb-4">Book Appointment</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.first_name && <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.last_name && <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password:
                            </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                                Experience(in years):
                            </label>
                            <input
                                type="text"
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.experience && <p className="text-red-500 text-xs mt-1">{formErrors.experience}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Department:
                            </label>
                            <select
                                id="doctor"
                                name="doctor"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Doctor
                                </option>
                                {department.map(doctor => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                            {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Service:
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={formData.serviceid}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Service
                                </option>
                                {services.map(service => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                                <option value="other">Other</option>
                            </select>
                            {formErrors.service && <p className="text-red-500 text-xs mt-1">{formErrors.service}</p>}
                        </div>


                        <div className="mb-4">
                            <label htmlFor="popular" className="block text-gray-700 text-sm font-bold mb-2">
                                Popular:
                            </label>
                            <select
                                id="popular"
                                name="popular"
                                value={formData.popular}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select popular
                                </option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                            {formErrors.popular && <p className="text-red-500 text-xs mt-1">{formErrors.popular}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone No:
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
                                Rating:
                            </label>
                            <input
                                type="number"
                                id="rating"
                                min={0}
                                max={5}
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.rating && <p className="text-red-500 text-xs mt-1">{formErrors.rating}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="reviews" className="block text-gray-700 text-sm font-bold mb-2">
                                Reviews:
                            </label>
                            <input
                                type="number"
                                id="reviews"
                                defaultValue={0}
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.reviews && <p className="text-red-500 text-xs mt-1">{formErrors.reviews}</p>}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="isActive" className="block text-gray-700 text-sm font-bold mb-2">
                                IsActive(Status):
                            </label>
                            <select
                                id="isActive"
                                name="isActive"
                                value={formData.isActive}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Status
                                </option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                    </div>
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
        </div>
    );
};

export default AppointmentForm;

// "use client";

// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// function DoctorForm() {
//     const [department, setDepartment] = useState([]);
//     const [services, setServices] = useState([]);


//     const fetchActiveServices = async () => {
//         try {
//             const response = await fetch('/api/service');

//             if (response.status === 200) {
//                 const data = await response.json();
//                 console.log(data.data);
//                 const filteredServices = data.data.filter(service => service.isActive);
//                 setServices(filteredServices);
//             } else {
//                 toast.error('Failed to load departments');
//                 throw new Error('Failed to fetch data');
//             }
//         } catch (error) {
//             toast.error('Error loading data');
//             console.error('Error fetching service data:', error);
//         } finally {
//             //setloading(false);
//         }
//     };
//     const fetchDepartments = async () => {
//         try {
//             // Fetch data from your API endpoint for departments
//             const response = await fetch('/api/department');

//             if (response.status === 200) {
//                 const data = await response.json();
//                 console.log(data.data);
//                 const filteredServices = data.data.filter(dept => dept.status === "active");
//                 setDepartment(data.data);
//             } else {
//                 toast.error('Failed to load departments');
//                 throw new Error('Failed to fetch data');
//             }
//         } catch (error) {
//             toast.error('Error loading data');
//             console.error('Error fetching department data:', error);
//         } finally {
//             //setloading(false);
//         }
//     };

//     useEffect(() => {
//         fetchActiveServices();
//         fetchDepartments();
//     }, []);

//     const [formData, setFormData] = useState({
//         name: '',
//         specialty: '',
//         rating: 0,
//         reviews: 0,
//         services: [],
//         department: '',
//         email: '',
//         experience: 0,
//         popular: false,
//     });
//     const [errors, setErrors] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const router = useRouter();


//     const validate = () => {
//         const newErrors = {};
//         if (!formData.name) newErrors.name = 'Name is required';
//         if (!formData.specialty) newErrors.specialty = 'Specialty is required';
//         if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
//         if (formData.reviews < 0) newErrors.reviews = 'Reviews must be a positive number';
//         if (!formData.email) newErrors.email = 'Email is required';
//         if (!formData.services.length) newErrors.services = 'Select at least one service';
//         if (formData.experience < 0) newErrors.experience = 'Experience must be positive';
//         return newErrors;
//     };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         if (isSubmitted) {
//             setErrors(validate());
//         }

//     };

//     const handleServiceChange = (e) => {
//         const options = e.target.options;
//         const selectedServices = [];
//         for (let i = 0, len = options.length; i < len; i++) {
//             if (options[i].selected) {
//                 selectedServices.push(options[i].value);
//             }
//         }
//         setFormData({ ...formData, services: selectedServices });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitted(true);
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }


//         try {
//             const response = await fetch('/api/alldoctor', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 toast.success("Doctor Data Saved");
//                 setFormData({
//                     name: '',
//                     specialty: '',
//                     rating: 0,
//                     reviews: 0,
//                     services: [],
//                     department: '',
//                     email: '',
//                     experience: 0,
//                     popular: false,
//                 });
//                 router.push('/doctors');
//             } else if (response.status === 302) {
//                 toast.error("Email already exists");
//             } else {
//                 toast.error("Failed to save Doctor Data");
//                 throw new Error('Failed to save doctor data');
//             }
//         } catch (error) {
//             console.error('Error saving doctor data:', error);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-16">
//             <h2 className="text-xl text-center mb-4 text-blue-500 underline font-bold">Add a New Doctor</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block mb-2">Name:</label>
//                     <input type="text" name="name" value={formData.name} onChange={handleChange}  className="w-full px-3 py-2 border rounded-md" />
//                     {errors.name && <p className="text-red-500">{errors.name}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Email:</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleChange}  className="w-full px-3 py-2 border rounded-md" />
//                     {errors.email && <p className="text-red-500">{errors.email}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Specialty:</label>
//                     <input type="text" name="specialty" value={formData.specialty} onChange={handleChange}  className="w-full px-3 py-2 border rounded-md" />
//                     {errors.specialty && <p className="text-red-500">{errors.specialty}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Rating:</label>
//                     <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     {errors.rating && <p className="text-red-500">{errors.rating}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Reviews:</label>
//                     <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     {errors.reviews && <p className="text-red-500">{errors.reviews}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Services:</label>
//                     <select multiple name="services" onChange={handleServiceChange} className="w-full px-3 py-2 border rounded-md">
//                         {services.map(service => (
//                             <option key={service._id} value={service._id}>{service.name}</option>
//                         ))}
//                     </select>
//                     {errors.services && <p className="text-red-500">{errors.services}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Department:</label>
//                     <select name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
//                         {department.map(dep => (
//                             <option key={dep._id} value={dep._id}>{dep.name}</option>
//                         ))}
//                     </select>
//                     {errors.department && <p className="text-red-500">{errors.department}</p>}

//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">Experience (in years):</label>
//                     <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     {errors.experience && <p className="text-red-500">{errors.experience}</p>}

//                 </div>
//                 <div>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default DoctorForm;
