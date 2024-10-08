"use client"
import React, { useState, useEffect } from 'react';
import { Edit, Delete } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useUser } from '../../../context/UserContext';
import { Noto_Sans_Tamil_Supplement } from 'next/font/google';
import { useRouter } from 'next/navigation';


const page = () => {
    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();
    const [delpopup, setDelPopup] = useState(false);
    const [userAppointment, setUserAppointment] = useState([]);
    const [delapp, SetDelApp] = useState(false);
    const [delappid, setDelAppId] = useState();

    const router = useRouter();

    // const [userid, setUserId] = useState();
    // console.log(user);
    const data1 = JSON.stringify(user)
    // console.log(typeof (user));
    // console.log(typeof (data1));
    // console.log(user._id);
    // setUserId(user._id);
    // console.log(user.existingUser?._id);

    let i = 1, j = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your backend API endpoint
                const response = await fetch('/api/appointments');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                // Parse the JSON response
                const data = await response.json();
                // Set the retrieved data to the state
                setUserAppointment(data.data); // Assuming your data structure has a 'data' property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);
    const deleteuser = async (userid) => {
        try {
            const response = await fetch('/api//signup', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userid })
            });

            const data = await response.json();

            if (data.success) {
                setDelPopup(false);
                toast.success("Your Account Permanently Deleted");
                console.log("Your deleted successfully");
                router.push('/signup');
                // Handle success, maybe update UI or show a success message
            } else {
                setDelPopup(false);
                toast.success("Please Retry.......!");
                console.error("Error deleting doctor:", data.error);
                // Handle error, maybe show an error message to the user
            }
        } catch (error) {
            console.error("Error deleting doctor:", error);
            toast.error("Error deleting doctor. Please try again later.");
            // Handle error, maybe show an error message to the user
        }
    };
    const deleteAppointment = async (id) => {
        try {
            const response = await fetch('/api/appointments', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            if (data.success) {
                setDelAppId();
                SetDelApp(false)
                setDelPopup(false);
                toast.success("Appointment deleted.....");
                return true; // Success
            } else {
                toast.error("Failed to delete appointment");
                return false; // Failure
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
            toast.error("Error deleting appointment. Please try again later.");
            return false; // Failure
        }
    };

    return (
        <div className="pt-28 bg-gray-300 ">
            <div className={` h-full w-full mt-20 ${delpopup ? 'hidden' : ''} `}>
                {/* <Profile user={userData} /> */}
                <div className="  mx-auto text-center  bg-gray-300  mt-2">
                    <div className="relative lg:flex mx-auto w-full h-full p-5  text-center">

                        <img src='/profile.jpg' alt="prfile" className="   p-5  mx-auto rounded-full" />
                        <div className="absolute top-0 right-0  "
                            onClick={() => {
                                setDelPopup(true);
                            }}>
                            <button className="bg-red-500   text-white py-2 px-2 rounded hover:bg-yellow-600 transition duration-300 m-4 flex justify-center items-center gap-2">
                                <p>Account Delete</p>
                                <img src='/alternate-trash.svg' alt='delete'
                                    className='cursor-pointer' width={15} height={15} />
                            </button>
                        </div>
                        <div className="">
                            <h1 className="mt-20 ">
                                <strong className="text-teal-500  text-2xl px-16 font-extrabold italic">
                                    Health is the greatest wealth, and prevention is the key.
                                </strong>
                                <br /> <p className="  mt-2 font-bold">– RK Clinic Motto</p>
                            </h1>
                            <h1 className="mx-auto mt-24 text-2xl text-sky-600 ">
                                {/* <span className="font-bold text-black">Welcome! 👋</span> <p>{userData.firstname} {userData.Lastname}</p> */}
                                <span className="font-bold text-black underline">Welcome!  <span className='text-red-500'>User 👋</span>  </span>
                                <p>  {user.first_name} {user.last_name}!</p>
                            </h1>
                        </div>
                    </div>


                </div>
                <div className="overflow-x-auto text-center  border border-black my-8 ">
                    <p className="text-4xl font-semibold text-red-400 underline m-5 ">Pending Appointment </p>
                    <table className="min-w-full bg-white  border border-black">
                        <thead className="text-xl">
                            <tr>
                                <th className="py-2 px-4 border border-black">SR NO.</th>
                                <th className="py-2 px-4 border border-black">Problem</th>
                                <th className="py-2 px-4 border border-black">doctor Name</th>
                                <th className="py-2 px-4 border border-black">dateTime</th>
                                <th className="py-2 px-4 border border-black">status</th>
                                <th className="py-2 px-4 border border-black">query</th>
                            </tr>
                        </thead>
                        {userAppointment.length > 0 ? (
                            <tbody>
                                {userAppointment.map((appointment, index) => (
                                    appointment.user_id === user._id && appointment.status === 'pending' ? (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border border-black">{i++}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.problem}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.doctor}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.dateTime}</td>
                                            <td className="py-2 px-4 border border-black flex justify-center items-center">{appointment.status}
                                                <Edit className="mr-2 cursor-pointer"
                                                    onClick={() => {
                                                        toast.error("Server Busy........");
                                                    }}></Edit>
                                                <img src='/alternate-trash.svg' alt='delete'
                                                    className='cursor-pointer' width={15} height={15}
                                                    onClick={() => {
                                                        setDelAppId(appointment._id);
                                                        SetDelApp(true);
                                                        setDelPopup(true);
                                                    }}
                                                />
                                            </td>
                                            <td className="py-2 px-4 border border-black">{appointment.query}</td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td className=" py-2 px-4 border border-black" colSpan="5">No Panding Appointment found</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="overflow-x-auto text-center border border-black my-8">
                    <p className="text-4xl font-semibold text-red-400 underline m-5 ">completed Appointment Overview/state</p>
                    <table className="min-w-full bg-white border border-black">
                        <thead className="text-xl">
                            <tr>
                                <th className="py-2 px-4 border border-black">SR NO.</th>
                                <th className="py-2 px-4 border border-black">Problem</th>
                                <th className="py-2 px-4 border border-black">doctor Name</th>
                                <th className="py-2 px-4 border border-black">dateTime</th>
                                <th className="py-2 px-4 border border-black">status</th>
                                <th className="py-2 px-4 border border-black">query</th>
                            </tr>
                        </thead>
                        {userAppointment.length > 0 ? (
                            <tbody>
                                {userAppointment.map((appointment, index) => (
                                    appointment.user_id === user._id && appointment.status === 'complete' ? (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border border-black">{j++}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.problem}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.doctor}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.dateTime}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.status}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.query}</td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td className=" py-2 px-4 border border-black" colSpan="6">No Complted Appointment found</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div >
            <div className={` w-full h-screen flex justify-center items-center absolute inset-0   ${delpopup ? 'bg-opacity-10 ' : 'hidden'}`}
            // onClick={() => setDelPopup(false)}
            >
                {/* Popup */}
                {delpopup && (
                    <div className=" text-white p-16 px-8 bg-black shadow-lg border border-white absolute z-10  inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 text-center flex flex-col justify-center items-center rounded-lg">
                        <p className='font-bold'>Are You Sure to Permanently Delete This account</p>
                        <div className="flex gap-5 justify-evenly mt-4">
                            <button className='bg-green-500 px-2 py-1 rounded-lg hover:bg-yellow-300'
                                onClick={() => {
                                    setDelAppId();
                                    setDelPopup(false)
                                }}
                            >No
                            </button>
                            {
                                delapp && <button className='bg-red-400 px-2 py-1 rounded-lg hover:bg-red-700'
                                    onClick={
                                        () => deleteAppointment(delappid)
                                    }>Yes
                                </button>
                            }
                            {
                                !delapp && <button className='bg-red-400 px-2 py-1 rounded-lg hover:bg-red-700'
                                    onClick={
                                        () => deleteuser(user._id)
                                    }>Yes
                                </button>
                            }
                        </div>
                    </div>
                )}
            </div>

        </div >
    )
};
export default page;