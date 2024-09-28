'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';
import toast from 'react-hot-toast';
import Review from '@/app/_components/review';
import { useUser } from "../../../context/UserContext";

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
    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();
    // console.log(user.email);
    // console.log(id);
    const LogedUserEmail = user.email
    const fetchData = async () => {
        if (id) {
            try {
                const response = await fetch(`/api/alldoctor?id=${id}`); // Fetch doctor by ID
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setDoctor(data.data);
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
        < div className="bg-gray-300 mt-16" >
            <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  shadow-lg  p-8 lg:p-16 ">
                <h1 className="text-3xl font-bold text-light-blue-900 mb-4">{doctor.name}</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{doctor.specialty}</h2>
                <p className="text-gray-600 mb-4">
                    <StarRating rating={doctor.rating} /></p>
                <p className="text-gray-600 mb-4">{doctor.reviews} <strong>Reviews</strong>  </p>
                <div className="mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline ">Details</h3>
                    {/* <p><strong>Price:</strong> ${doctor.price.toFixed(2)}</p> */}
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>phoneNumber:</strong> {doctor.phoneNumber} minutes</p>
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
                        {doctor?.department?.length > 0 ? (
                            doctor.department.map((slot, index) => (
                                <li key={index}>
                                    {slot}
                                </li>
                            ))
                        ) : (
                            <li>No department available</li>
                        )}
                    </ul>
                </div>
                {/* <Review type="service" id={id} /> */}
                {/* <Review type="department" id={id} LogedUserEmail={LogedUserEmail}  /> */}
                <Review type="doctor" id={id} LogedUserEmail={LogedUserEmail} />
            </div>
        </div >
    );
}
