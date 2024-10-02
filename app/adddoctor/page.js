"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import Loading from '../_components/Loading/Loading';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const DoctorForm = () => {
    const { user, setUser, doctorFormData, setDoctorFormData } = useUser();

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
        service: [],
        doctor: '',
        department: '',
        popular: '',
        isActive: '',
        imageUrl: "",
        marketing_accept: true,
        role: 'doctor',
    });


    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState([]);
    const [services, setServices] = useState([]);
    const [imageuploadUrl, setImageuploadUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (doctorFormData) {
            setImageuploadUrl(doctorFormData.imageUrl);
            setFormData({
                _id: doctorFormData._id || '',
                first_name: doctorFormData.first_name || '',
                last_name: doctorFormData.last_name || '',
                name: doctorFormData.name || '',
                password: doctorFormData.password || '',
                specialty: doctorFormData.specialty || '',
                email: doctorFormData.email || '',
                rating: doctorFormData.rating || '',
                reviews: doctorFormData.reviews || '',
                phoneNumber: doctorFormData.phoneNumber || '',
                experience: doctorFormData.experience || '',
                service: doctorFormData.service || [],
                doctor: doctorFormData.doctor || '',
                department: doctorFormData.department || '',
                popular: doctorFormData.popular || '',
                isActive: doctorFormData.isActive || '',
                imageUrl: doctorFormData.imageUrl || '',
                marketing_accept: doctorFormData.marketing_accept || true,
                role: doctorFormData.role || 'doctor',
            });
        }
    }, [doctorFormData]);

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
            setLoading(false);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveServices();
        fetchDepartments();
    }, []);

    const router = useRouter();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            setSelectedImage(image);
            handleImageUpload(e);
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]; // Get the selected image file
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error uploading image');
            }
            console.log("response in image uploading api", response);
            const data = await response.json();
            console.log("response in image uploading API", data);
            setImageuploadUrl(data.url);
            // setFormErrors()
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        }
    };

    const handleChange = (e) => {
        const { name, value, options } = e.target;

        if (name === 'service') {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);

            const selectedServices = selectedValues.map(value => {
                const [id, serviceName] = value.split(' ');  // Split the combined value
                return { id, name: serviceName };  // Store both id and name
            });

            setFormData(prevData => ({
                ...prevData,
                service: selectedServices,
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }

        validateField(name, value);  // Validate field when changing
    };

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
            case 'service':
                if (!value.length) error = 'Service selection is required';
                break;
            case 'phoneNumber':
                if (!value) error = 'Phone number is required';
                break;
            case 'specialty':
                if (!value) error = 'Specialty is required';
                break;
            case 'popular':
                if (!value) error = 'Popular Status is required';
                break;
            case 'isActive':
                if (!value) error = 'Status is required';
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
        if (!formData.password) errors.password = "Password's Name is required";
        if (!formData.email) errors.email = 'email is required';
        if (!formData.experience) errors.experience = 'Experience selection is required';
        if (!formData.department) errors.department = 'Department selection is required';
        if (!formData.specialty) errors.specialty = 'Specialty is required';
        if (!formData.popular) errors.popular = 'Popular Status is required';
        if (!formData.isActive) errors.isActive = 'Status is required';
        if (!formData.service) errors.service = 'Service selection is required';
        if (!formData.phoneNumber) errors.phoneNumber = 'phoneNumber number is required';
        if (!formData.rating) errors.rating = 'rating is required';
        if (!formData.reviews) errors.reviews = 'reviews is required';
        if (!imageuploadUrl) errors.imageUrl = 'cover is required';

        // return field ? { [field]: errors[field] } : errors;
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log(doctorFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        console.log(formData);
        formData.imageUrl = imageuploadUrl;
        formData.name = formData.first_name + " " + formData.last_name;
        console.log(formData);
        if (doctorFormData) {
            try {
                const response = await fetch(`/api/alldoctor?id=${doctorFormData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                if (result.success) {
                    toast.success('Doctor updated successfully');
                    setDoctorFormData();
                    router.push('/dashboard/admin');
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error('Error updating doctor:', error);
            }
        }
        else {
            try {
                const response = await fetch('/api/alldoctor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (response.status === 201 && data.success) {
                    toast.success('Registered Successfully');
                    router.push('/doctors');
                } else if (response.status === 302) {
                    toast.error('Email already exists, please use a different email');
                } else {
                    toast.error(data.error || 'Something went wrong');
                }
            } catch (error) {
                console.error('Form Submission Error:', error);
                toast.error('Network or server error occurred');
            }
        }
    };
    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    return (
        <div className="ds py-20 px-5 text-center bg-gray-300">
            <div>
                <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>{doctorFormData ? "EDIT" : "ADD"} Doctor</h2>
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

                        <div className="mb-4 ">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password:
                            </label>
                            <div className="flex justify-center items-center gap-1 relative ">

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 "
                                />
                                <div type="button" onClick={() => setShowPassword(!showPassword)} className='text-[22px] absolute top-50% right-2'>
                                    {showPassword ? <IoMdEyeOff /> : <IoEye />}
                                </div>
                            </div>
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
                                disabled={doctorFormData}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="specialty" className="block text-gray-700 text-sm font-bold mb-2">
                                Specialty:
                            </label>
                            <input
                                type="text"
                                id="specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.specialty && <p className="text-red-500 text-xs mt-1">{formErrors.specialty}</p>}

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
                            <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Department:
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select department
                                </option>
                                {department.map(dept => (
                                    <option key={dept._id} value={dept._id}>
                                        {dept.name}
                                    </option>
                                ))}
                                <option value="other" disabled>
                                    Other
                                </option>
                            </select>
                            {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
                        </div>

                        {/* <div className="mb-4">
                            <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Service:
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                multiple
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
                        </div> */}


                        <div className="mb-4">
                            <label htmlFor="popular" className="block text-gray-700 text-sm font-bold mb-2">
                                Popular:
                            </label>
                            <select
                                id="popular"
                                name="popular"
                                // value={formData.popular === true ? 'true' : formData.popular === false ? 'false' : ''}
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
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                pattern="[0-9]{10}"
                                placeholder='PLease Enter 10 digits!  Ex. 9876543210'
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
                                step={0.1}
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
                            {formErrors.isActive && <p className="text-red-500 text-xs mt-1">{formErrors.isActive}</p>}

                        </div>
                    </div>
                    <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
                        {/* Display either the selected image (newly chosen) or the pre-existing image */}
                        {selectedImage ? (
                            <div className='flex flex-col items-center justify-center'>
                                <img
                                    src={URL.createObjectURL(selectedImage)} // Display newly selected image
                                    className='cursor-pointer text-white m-2 h-24 w-24 rounded-full border border-1 border-blue-400'
                                    alt="profile"
                                />
                            </div>
                        ) : (
                            doctorFormData?.imageUrl && (
                                <div className='flex flex-col items-center justify-center'>
                                    <img
                                        src={doctorFormData.imageUrl} // Display pre-filled image if no new image selected
                                        className='cursor-pointer text-white m-2 h-24 w-24 rounded-full border border-1 border-blue-400'
                                        alt="profile"
                                    />
                                </div>
                            )
                        )}

                        <input
                            accept="image/*"
                            type="file"
                            onChange={imageChange} // Trigger the imageChange handler when selecting a new image
                        />
                        {formErrors.imageUrl && <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
                        >
                            {doctorFormData ? "EDIT" : "ADD"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorForm;