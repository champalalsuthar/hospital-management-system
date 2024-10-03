'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';
import Review from '@/app/_components/Review';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';


const DepartmentDetailPage = ({ params }) => {
    const { id } = params;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [doctorData, setDoctorData] = useState(null);
    const [department, setDepartment] = useState(null);
    const [headDoctor, setHeadDoctor] = useState(null); // Store head doctor data

    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();
    // console.log(user.email);
    // console.log(id);
    const LogedUserEmail = user.email
    const fetchData = async () => {
        if (id) {
            try {
                const response = await fetch(`/api/department?id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setDepartment(data.data);
                        fetchDoctorData(data.data.head);
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
    const fetchDoctorData = async (doctorId) => {
        if (doctorId) {
            try {
                const response = await fetch(`/api/alldoctor?id=${doctorId}`); // Fetch doctor by ID
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setHeadDoctor(data.data);
                    } else {
                        console.error('Error fetching doctor:', data.error);
                    }
                } else {
                    console.error('Failed to fetch doctor:', response.status);
                }
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);


    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!department) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>Department not found</p></div>;

    return (
        < div className=" bg-gradient-to-l from-slate-300 to-slate-100 mt-16" >
            <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  shadow-lg p-8 lg:p-16 ">
                <h1 className="text-3xl font-bold text-light-blue-900 mb-4">{department.name}</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{department.description}</h2>
                <p className="text-gray-600 mb-4">
                    <StarRating rating={4.6} /></p>
                {/* <p className="text-gray-600 mb-4">{department.description} <strong>Reviews</strong></p> */}

                <div className="m-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
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

                {headDoctor && (
                    <div className="m-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">Head of Department</h3>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <img src={headDoctor.imageUrl} alt={headDoctor.name} className="w-40 h-40 rounded-full object-cover mr-6 border border-1 border-blue-600" />
                            <div>
                                <h4 className="text-xl font-semibold">{headDoctor.name}</h4>
                                <p><strong>Specialty:</strong> {headDoctor.specialty}</p>
                                <p><strong>Experience:</strong> {headDoctor.experience} years</p>
                                <p><strong>Email:</strong> <Link href={`mailto:${headDoctor.email}`} className="text-blue-600 underline">{headDoctor.email}</Link></p>
                                <p><strong>Phone Number:</strong> {headDoctor.phoneNumber}</p>
                                <p className="mt-2"><StarRating rating={headDoctor.rating} /> ({headDoctor.reviews} reviews)</p>

                                <Link href={`/doctors/${headDoctor._id}`} className="text-blue-600 underline mt-4 ">
                                    View {headDoctor.name}'s Profile
                                </Link>
                            </div>

                        </div>

                    </div>
                )}

            </div>
            <Review type="department" id={id} LogedUserData={user} />
        </div >
    );
};

export default DepartmentDetailPage;
