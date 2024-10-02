'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';
import toast from 'react-hot-toast';
import { useUser } from "../../../context/UserContext";
import Review from '@/app/_components/Review';
import Image from 'next/image';


export default function DoctorDetailPage({ params }) {
    const { id } = params;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("latestFirst");
    const [sortedComments, setSortedComments] = useState(commentData);
    const [Comment, setComment] = useState("");
    const [newCommentContent, setNewCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [departmentData, setDepartmentData] = useState(null);

    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();
    // console.log(user.email);

    // console.log(id);
    const LogedUserEmail = user.email

    const fetchdeptData = async (id) => {
        if (id) {
            try {
                const response = await fetch(`/api/department?id=${id}`); // Fetch department by ID
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        console.log(data.data);
                        setDepartmentData(data.data);
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
    const fetchData = async () => {
        if (id) {
            try {
                const response = await fetch(`/api/alldoctor?id=${id}`); // Fetch doctor by ID
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setDoctor(data.data);
                        fetchdeptData(data.data.department)
                    } else {
                        console.error('Error fetching doctor:', data.error);
                    }
                } else {
                    console.error('Failed to fetch doctor:', response.status);
                }
            } catch (error) {
                console.error('Error fetching doctor:', error);
            } finally {
                setLoading(false);
            }
        }
    };



    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!doctor) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>doctor not found</p></div>;

    return (
        < div className="bg-gradient-to-l from-slate-300 to-slate-100 mt-16" >
            <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  shadow-lg  p-8 lg:p-16 ">
                <div className="mx-0 lg:mx-4 bg-light-ray-100 p-4">
                    <div className='h-40 w-40 lg:ml-4'>
                        {doctor.imageUrl &&
                            <Image
                                alt="doctorpic"
                                src={doctor.imageUrl}
                                width={200}
                                height={200}
                                className=" w-full rounded-lg object-cover" // You may want to adjust this for proper sizing
                            />
                        }
                    </div>
                    <h1 className="text-3xl font-bold text-light-blue-900 mb-4">{doctor.name}</h1>
                    {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">{doctor.specialty}</h2> */}
                    {doctor.specialty && <p className=" p-1 w-1/5 pl-1 text-sm font-semibold  mb-4 text-center rounded-xl bg-gray-50 text-blue-500 border border-1 border-blue-500">
                        {doctor.specialty.length > 20 ? doctor.specialty.slice(0, 12) + '...' : doctor.specialty}
                    </ p>}
                    <p className=" line-clamp-3 text-sm/relaxed font-semibold text-blue-500 mb-4">{doctor.experience} Years Experience  </ p>

                    <p className="text-gray-600 mb-4">
                        <StarRating rating={doctor.rating} /></p>
                    {/* <p className="text-gray-600 mb-4">{doctor.reviews} <strong>Reviews</strong>  </p> */}
                </div>
                <div className="mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline ">Details</h3>
                    {/* <p><strong>Price:</strong> ${doctor.price.toFixed(2)}</p> */}
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>phoneNumber:</strong> {doctor.phoneNumber}</p>
                    <p><strong>Department:</strong></p>
                    <p className={`font-bold ${doctor.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        Status: {doctor.isActive ? 'Active' : 'Inactive'}
                    </p>
                </div>

                <div className="mt-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline">Services:</h3>
                    <ul className="list-disc ml-5">
                        {doctor?.services?.length > 0 ? (
                            doctor.services.map((slot, index) => (
                                <li key={index}>
                                    {slot}
                                </li>
                            ))
                        ) : (
                            <li>No service available</li>
                        )}
                    </ul>
                </div>
                <div className="mt-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline">Departments:</h3>
                    <ul className="list-disc ml-5">
                        {/* {doctor?.department ? (<li>{doctor.department}</li>
                        ) : (
                            <li>No department available</li>
                        )} */}  
                        {doctor?.department ? (
                            departmentData ? (
                                <li>{departmentData.name}</li>
                            ) : (
                                <li>{doctor.department}</li>
                            )
                        ) : (
                            <li>No department available</li>
                        )}
                    </ul>
                </div>
            </div >
            <Review type="doctor" id={id} LogedUserData={user} />
        </div >
    );
}
