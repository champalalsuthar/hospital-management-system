'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';

const DepartmentDetailPage = ({ params }) => {
    const { id } = params;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [doctorData, setDoctorData] = useState(null);
    const [department, setDepartment] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/department?id=${id}`); // Fetch department by ID
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            setDepartment(data.data);
                        } else {
                            console.error('Error fetching department:', data.error);
                        }
                    } else {
                        console.error('Failed to fetch department:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching department:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);


    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!department) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>Department not found</p></div>;

    return (
        < div className="bg-gray-300 lg:mt-20" >
        <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  shadow-lg p-16 ">
            <h1 className="text-3xl font-bold text-light-blue-900 mb-4">{department.name}</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{department.description}</h2>
            <p className="text-gray-600 mb-4">
                <StarRating rating={3.6} /></p>
            {/* <p className="text-gray-600 mb-4">{department.description} <strong>Reviews</strong></p> */}

            <div className="mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                <h3 className="text-[22px] font-bold text-red-400 underline ">Details</h3>
                {/* <p><strong>Price:</strong> ${department.price.toFixed(2)}</p> */}
                {/* <p><strong>Email:</strong> {department.email}</p> */}
                <p><strong>phoneNumber:</strong> {department.contactNumber}</p>
                <p><strong>Location:</strong> {department.location}</p>
                {/* <p><strong>Department:</strong></p> */}
                <p className={`font-bold ${department.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {department.isActive ? 'Active' : 'Inactive'}
                </p>
            </div>

            {/* <div className="mt-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                <h3 className="text-[22px] font-bold text-red-400 underline">Available Slots</h3>
                <ul className="list-disc ml-5">
                    {department.availableSlots.map((slot, index) => (
                        <li key={index}>    
                            {slot.dayOfWeek}: {slot.timeSlot}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    </div >
    );
};

export default DepartmentDetailPage;
