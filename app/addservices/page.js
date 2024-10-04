"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import Loading from '../_components/Loading/Loading';
import PrivateRouteAddDoctor from '@/components/customprivateroute/PrivateRouteAddDoctor';

const DoctorForm = () => {
    const { user, setUser, doctorFormData, setDoctorFormData } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        short_description: "",
        description: '',
        price: '',
        duration: "",
        department: '',
        category: "Other",
        availableSlots: [{ dayOfWeek: '', timeSlot: '' }],
        isTopActive: '',
        isActive: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        if (doctorFormData) {
            // setImageuploadUrl(doctorFormData.imageUrl);
            setFormData({
                _id: doctorFormData._id || '',
                name: doctorFormData.name || '',
                short_description: doctorFormData.short_description || '',
                description: doctorFormData.description || '',
                price: doctorFormData.price || '',
                duration: doctorFormData.duration || '',
                department: doctorFormData.department || '',
                category: doctorFormData.category || '',
                availableSlots: doctorFormData.availableSlots || [],
                isActive: doctorFormData.isActive ? "true" : "false",
                isTopActive: doctorFormData.isTopActive ? "true" : "false",
            });
        }
    }, [doctorFormData]);

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
        fetchDepartments();
    }, []);

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, options } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        validateField(name, value);  // Validate field when changing
    };
    const handleSlotChange = (index, field, value) => {
        const newSlots = [...formData.availableSlots];
        newSlots[index][field] = value;
        setFormData(prevData => ({
            ...prevData,
            availableSlots: newSlots
        }));
    };
    const addSlot = () => {
        setFormData(prevData => ({
            ...prevData,
            availableSlots: [...prevData.availableSlots, { dayOfWeek: '', timeSlot: '' }]
        }));
    };
    const removeSlot = (index) => {
        const newSlots = formData.availableSlots.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            availableSlots: newSlots
        }));
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value.trim()) error = 'First Name is required';
                break;
            case 'short_description':
                if (!value.trim()) error = 'Short Description is required';
                break;
            case 'description':
                if (!value.trim()) error = 'Description is required';
                break;
            case 'price':
                if (!value || value < 0) error = 'Price must be a non-negative number';
                break;
            case 'duration':
                if (!value || value < 5) error = 'Duration must be at least 5';
                break;
            case 'department':
                if (!value) error = 'Department selection is required';
                break;
            case 'availableSlots':
                value.forEach((slot, index) => {
                    if (!slot.dayOfWeek) error = `Day of Week is required for slot ${index + 1}`;
                    if (!slot.timeSlot) error = `Time Slot is required for slot ${index + 1}`;
                });
                break;
            case 'isTopActive':
                if (!value) error = 'IsTopActive Status is required';
                break;
            case 'isActive':
                if (!value) error = 'Status is required';
                break;
            default:
                break;
        }
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: error || undefined,
        }));
    };

    const validateForm = (field = null) => {
        const errors = {};

        if (!formData.name) errors.name = 'Name is required';
        if (!formData.short_description) errors.short_description = "Short Description is required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        if (!formData.department) errors.department = 'Department selection is required';
        // if (!formData.category) errors.category = 'Category is required';
        if (!formData.availableSlots) errors.availableSlots = 'Available Slots is required';
        if (!formData.isTopActive) errors.isTopActive = 'IsTopActive Status is required';
        if (!formData.isActive) errors.isActive = 'Status is required';
        // if (!imageuploadUrl) errors.imageUrl = 'cover is required';

        formData.availableSlots.forEach((slot, index) => {
            if (!slot.dayOfWeek) errors[`availableSlots-${index}-dayOfWeek`] = 'Day of Week is required';
            if (!slot.timeSlot) errors[`availableSlots-${index}-timeSlot`] = 'Time Slot is required';
        });
        // return field ? { [field]: errors[field] } : errors;
        console.log(errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log(doctorFormData);

    const handleSubmit = async (e) => {
        console.log("handleSubmit is caaling")
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.log("isValid true")
            return;
        }
        console.log(formData);
        // formData.imageUrl = imageuploadUrl;
        // console.log(formData);
        if (doctorFormData) {
            console.log("doctorFormData true")

            try {
                const response = await fetch(`/api/service?id=${doctorFormData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                if (result.success) {
                    toast.success('Service updated successfully');
                    setDoctorFormData();
                    router.push('/dashboard/admin');
                } else if (response.status === 302) {
                    toast.error('name already exists, please use a different name');
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error('Error updating doctor:', error);
            }
        }
        else {
            console.log("doctorFormData else")

            try {
                const response = await fetch('/api/service', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (response.status === 201 && data.success) {
                    toast.success('Service added Successfully');
                    router.push('/services');
                } else if (response.status === 302) {
                    toast.error('name already exists, please use a different name');
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
        < PrivateRouteAddDoctor>
            <div className="ds py-20 px-5 text-center bg-gray-300">
                <div>
                    <h2 className='font-bold text-4xl tracking-wide m-4 text-blue-500 underline'>{doctorFormData ? "EDIT" : "ADD"} Service</h2>
                </div>
                <div className=" w-full lg:w-4/5 bg-gray-200  mx-auto mt-8 p-6 rounded-md shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    // disabled={doctorFormData}

                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}

                            </div>
                            <div className="mb-4">
                                <label htmlFor="short_description" className="block text-gray-700 text-sm font-bold mb-2">
                                    Short Description:
                                </label>
                                <input
                                    type="text"
                                    id="short_description"
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.short_description && <p className="text-red-500 text-xs mt-1">{formErrors.short_description}</p>}

                            </div>

                            <div className="mb-4 ">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                    description:
                                </label>
                                <div className="flex justify-center items-center gap-1 relative ">

                                    <input
                                        type='text'
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 "
                                    />

                                </div>
                                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}

                            </div>

                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                                    price:
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}

                            </div>
                            <div className="mb-4">
                                <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
                                    duration:
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.duration && <p className="text-red-500 text-xs mt-1">{formErrors.duration}</p>}

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
                            <div className="mb-4">
                                <label htmlFor="isTopActive" className="block text-gray-700 text-sm font-bold mb-2">
                                    isTopActive:
                                </label>
                                <select
                                    id="isTopActive"
                                    name="isTopActive"
                                    // value={formData.isTopActive === true ? 'true' : formData.isTopActive === false ? 'false' : ''}
                                    value={formData.isTopActive}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>
                                        Select isTopActive
                                    </option>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                                {formErrors.isTopActive && <p className="text-red-500 text-xs mt-1">{formErrors.isTopActive}</p>}

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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Available Slots:</label>
                                {formData.availableSlots.map((slot, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-2 mb-4">
                                        <div>
                                            <label htmlFor={`dayOfWeek-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                                                Day of Week:
                                            </label>
                                            <select
                                                id={`dayOfWeek-${index}`}
                                                name="dayOfWeek"
                                                value={slot.dayOfWeek}
                                                onChange={(e) => handleSlotChange(index, 'dayOfWeek', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="" disabled>Select Day</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                            {formErrors[`availableSlots-${index}-dayOfWeek`] && <p className="text-red-500 text-xs mt-1">{formErrors[`availableSlots-${index}-dayOfWeek`]}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor={`timeSlot-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                                                Time Slot (HH:mm - HH:mm):
                                            </label>
                                            <input
                                                type="text"
                                                id={`timeSlot-${index}`}
                                                name="timeSlot"
                                                value={slot.timeSlot}
                                                onChange={(e) => handleSlotChange(index, 'timeSlot', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                            />
                                            {formErrors[`availableSlots-${index}-timeSlot`] && <p className="text-red-500 text-xs mt-1">{formErrors[`availableSlots-${index}-timeSlot`]}</p>}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addSlot}
                                    className="bg-green-500 text-white px-2 py-1 rounded-md focus:outline-none hover:bg-green-600"
                                >
                                    Add Slot
                                </button>
                            </div>


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
        </PrivateRouteAddDoctor>
    );
};

export default DoctorForm;

// const [services, setServices] = useState([]);
// const [imageuploadUrl, setImageuploadUrl] = useState('');
// const [selectedImage, setSelectedImage] = useState();
// const [showdescription, setShowdescription] = useState(false);

// const imageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//         const image = e.target.files[0];
//         setSelectedImage(image);
//         handleImageUpload(e);
//     }
// };

// const handleImageUpload = async (e) => {
//     const image = e.target.files[0]; // Get the selected image file
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//         const response = await fetch('/api/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Error uploading image');
//         }
//         console.log("response in image uploading api", response);
//         const data = await response.json();
//         console.log("response in image uploading API", data);
//         setImageuploadUrl(data.url);
//         // setFormErrors()
//         toast.success('Image uploaded successfully');
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         toast.error('Error uploading image');
//     }
// };




{/* <div className="mb-4 flex flex-col lg:flex-row items-center justify-center">
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
                        </div> */}



