"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toast, ToastBar, Toaster } from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import Loading from './Loading/Loading';

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
        service: '',
        serviceid: '',
        doctor: '',
        doctorid: '',
        dateTime: '',
        query: '',
        user_id: '',
    });


    const [formErrors, setFormErrors] = useState({});
    const [servicesData, setServicesData] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);


    const router = useRouter();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setFormData((prevData) => {
    //         if (name === 'doctor') {
    //             const [doctorId, doctorName] = value.split(',');  // split the combined value
    //             return {
    //                 ...prevData,
    //                 doctorid: doctorId,  // set the doctor ID
    //                 doctor: doctorName,  // set the doctor name
    //             };
    //         }
    //         if (name === 'service') {
    //             if (value === 'other') {
    //                 return {
    //                     ...prevData,
    //                     serviceid: '',  // clear service ID for 'Other'
    //                     service: 'Other',  // set service as 'Other'
    //                 };
    //             } else {
    //                 const [serviceId, serviceName] = value.split(',');  // split _id and name
    //                 return {
    //                     ...prevData,
    //                     serviceid: serviceId,  // store service ID
    //                     service: serviceName,  // store service name
    //                 };
    //             }
    //         } else {
    //             return {
    //                 ...prevData,
    //                 [name]: value,
    //             };
    //         }
    //     });
    //     // const fieldError = validateForm(name);
    //     // setFormErrors((prevErrors) => ({
    //     //     ...prevErrors,
    //     //     ...fieldError,
    //     // }));
    //     validateField(name, value);

    // };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            if (name === 'doctor') {
                // Find selected doctor by ID
                const selectedDoctor = doctors.find(doctor => doctor._id === value);
                return {
                    ...prevData,
                    doctorid: value,  // Store doctor ID
                    doctor: selectedDoctor?.name || '',  // Store doctor name
                };
            } else if (name === 'service') {
                if (value === 'other') {
                    return {
                        ...prevData,
                        serviceid: '',  // Clear service ID for 'Other'
                        service: 'Other',  // Set service to 'Other'
                    };
                } else {
                    // Find selected service by ID
                    const selectedService = servicesData.find(service => service._id === value);
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
    // console.log(formData.doctorid);
    // console.log(formData.service);
    // console.log(formData.serviceid);

    const validateField = (name, value) => {
        let error = '';

        // Apply validation rules for each field
        switch (name) {
            case 'patientName':
                if (!value) error = 'Patient Name is required';
                break;
            case 'fatherName':
                if (!value) error = "Father's Name is required";
                break;
            case 'age':
                if (!value) error = 'Age is required';
                break;
            case 'gender':
                if (!value) error = 'Gender is required';
                break;
            case 'doctorid':
                if (!value) error = 'Doctor selection is required';
                break;
            case 'serviceid':
                if (!value) error = 'Service selection is required';
                break;
            case 'dateTime':
                if (!value) error = 'Date and Time are required';
                break;
            case 'mobile':
                if (!value) error = 'Mobile number is required';
                break;
            case 'city':
                if (!value) error = 'City is required';
                break;
            case 'state':
                if (!value) error = 'State is required';
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


    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                // Fetch data from your API endpoint
                const response = await fetch('/api/alldoctor');

                if (response.status === 200) {
                    const data = await response.json();
                    const filteredDoctors = data.doctors.filter(dept => dept.isActive);
                    setDoctors(filteredDoctors);
                }
                else {
                    toast.error('Retry...!');
                    throw new Error('Failed to fetch data');
                }

            } catch (error) {
                toast.error('Error...!');
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        const fetchServicesData = async () => {
            try {
                // Fetch data from your API endpoint for servicesData
                const response = await fetch('/api/service');

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data.data);
                    const filteredServices = data.data.filter(service => service.isActive);
                    setServicesData(filteredServices);
                } else {
                    toast.error('Failed to load servicesData');
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                toast.error('Error loading data');
                console.error('Error fetching service data:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
        fetchServicesData();
    }, []);
    const validateForm = (field = null) => {
        const errors = {};

        if (!formData.patientName) errors.patientName = 'Patient Name is required';
        if (!formData.fatherName) errors.fatherName = "Father's Name is required";
        if (!formData.age) errors.age = 'Age is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.doctorid) errors.doctor = 'Doctor selection is required';
        if (!formData.serviceid) errors.service = 'Service selection is required';
        if (!formData.dateTime) errors.dateTime = 'Date and Time are required';
        if (!formData.mobile) errors.mobile = 'Mobile number is required';
        if (!formData.city) errors.city = 'City is required';
        if (!formData.state) errors.state = 'State is required';

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
            console.error('Form Submission Error:', error.message);
            toast.error("please retry!! not booked !");
        }
    };
    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    return (
        <div className=" w-full lg:w-4/5 bg-gray-200  mx-auto mt-8 p-6 rounded-md shadow-md">
            {/* <h2 className="text-2xl font-bold mb-4">Book Appointment</h2> */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        {formErrors.patientName && <p className="text-red-500 text-xs mt-1">{formErrors.patientName}</p>}

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
                        {formErrors.fatherName && <p className="text-red-500 text-xs mt-1">{formErrors.fatherName}</p>}

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
                        {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}

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
                        {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}

                    </div>

                    <div className="mb-4">
                        <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">
                            Select Doctor:
                        </label>
                        <select
                            id="doctor"
                            name="doctor"
                            value={formData.doctorid}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select Doctor
                            </option>
                            {doctors.map(doctor => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.doctor && <p className="text-red-500 text-xs mt-1">{formErrors.doctor}</p>}
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
                            {servicesData.map(service => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                            <option value="other">Other</option>
                        </select>
                        {formErrors.service && <p className="text-red-500 text-xs mt-1">{formErrors.service}</p>}
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
                        {formErrors.dateTime && <p className="text-red-500 text-xs mt-1">{formErrors.dateTime}</p>}

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
                        {formErrors.mobile && <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>}

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
                        {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}

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
                        {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}

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
    );
};

export default AppointmentForm;
