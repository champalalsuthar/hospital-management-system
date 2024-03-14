"use client"
import React, { useState, useEffect } from 'react';
import Footer from '@/app/_components/Footer';
import { Edit, Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/UserContext';



const page = () => {
    const [doctorAppointment, setDoctorAppointment] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [delpopup, setDelPopup] = useState(false);
    const [deldoctorid, setDelDoctorId] = useState();
    const [delappid, setDelAppId] = useState();
    const [delApp, setDelApp] = useState(false);
    // console.log("deldoctid" + deldoctorid);
    const router = useRouter();
    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();



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
                setDoctorAppointment(data.data); // Assuming your data structure has a 'data' property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your API endpoint
                const response = await fetch('/api/alldoctor');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                // Set the retrieved data to the state
                // console.log(data);
                // console.log(data.doctors);
                setDoctors(data.doctors);
                // console.log(doctors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);


    const deleteDoctor = async (doctorId) => {
        try {
            const response = await fetch('/api/alldoctor', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: doctorId })
            });

            const data = await response.json();

            if (data.success) {
                setDelDoctorId();
                setDelPopup(false);
                toast.success("Doctor account deleted");
                // console.log("Doctor deleted successfully");
                // Handle success, maybe update UI or show a success message
            } else {
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
                setDelApp(false);
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

    let i = 1;

    return (
        <div className='mt-20  bg-gray-300'>
            <p className={` text-center pt-10 ${delpopup ? 'hidden' : ''} `} >
                <Link href="/adddoctor"  >
                    <Button>+ ADD Doctor</Button>
                </Link>
            </p>
            <div className=" bg-gray-300 relative">

                <div className={` h-full w-full  ${delpopup ? 'hidden' : ''} `}>
                    <div className="  mx-auto text-center  min-h-10 bg-gray-300  ">
                        <div className="mx-auto h-50  p-5  text-center">
                            <div className="">
                                <h1 className="mx-auto text-2xl text-sky-600 ">

                                    <span className="font-bold text-black text-3xl  underline">Welcome!
                                        <span className='text-red-500'>Admin 👋</span>
                                    </span>
                                    <p>{user.first_name} {user.last_name}!</p>

                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto text-center my-8 border border-black ">
                        <p className="text-4xl font-semibold text-red-400 underline m-5 ">All Doctors  </p>
                        <table className="min-w-full bg-white border border-black">
                            <thead className="text-xl">
                                <tr>
                                    <th className="py-2 px-4 border border-black">SR NO.</th>
                                    <th className="py-2 px-4 border border-black">Name</th>
                                    <th className="py-2 px-4 border border-black">Specialty</th>
                                    <th className="py-2 px-4 border border-black">rating</th>
                                    <th className="py-2 px-4 border border-black">reviews</th>
                                    <th className="py-2 px-4 border border-black">experience</th>
                                    <th className="py-2 px-4 border border-black">Action</th>
                                </tr>
                            </thead>
                            {doctors.length > 0 ? (
                                <tbody>
                                    {doctors.map((doctor, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border border-black">{index + 1}</td>
                                            <td className="py-2 px-4 border border-black">{doctor.name}</td>
                                            <td className="py-2 px-4 border border-black">{doctor.specialty}</td>
                                            <td className="py-2 px-4 border border-black">{doctor.rating}</td>
                                            <td className="py-2 px-4 border border-black">{doctor.reviews}</td>
                                            <td className="py-2 px-4 border border-black">{doctor.experience}</td>
                                            <td className="py-2 px-4 border border-black flex items-center align-baseline justify-center gap-2">
                                                <Edit className=" cursor-pointer"
                                                    onClick={() => {
                                                        toast.error("Server Busy........");
                                                    }}
                                                />
                                                <img src='/alternate-trash.svg' alt='delete'
                                                    className='cursor-pointer' width={15} height={15}
                                                    onClick={() => {
                                                        setDelDoctorId(doctor._id);
                                                        setDelPopup(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="text-2xl py-2 px-4 border border-black" colSpan="6">No found</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>


                    <div className="overflow-x-auto text-center my-8  border border-black">
                        <p className="text-4xl font-semibold text-red-400 underline m-5 ">Pending Patient Appointment </p>
                        <table className="min-w-full bg-white border border-black  overflow-x-hidden ">
                            <thead className="text-xs">
                                <tr>
                                    <th className="py-2 px-4 border border-black">SR NO.</th>
                                    <th className="py-2 px-4 border border-black">Patient Name</th>
                                    <th className="py-2 px-4 border border-black">Father Name</th>
                                    <th className="py-2 px-4 border border-black">Age</th>
                                    <th className="py-2 px-4 border border-black">City</th>
                                    <th className="py-2 px-4 border border-black">State</th>
                                    <th className="py-2 px-4 border border-black">Mobile NO.</th>
                                    <th className="py-2 px-4 border border-black">Gender</th>
                                    <th className="py-2 px-4 border border-black">Problem</th>
                                    <th className="py-2 px-4 border border-black">Doctor Name</th>
                                    <th className="py-2 px-4 border border-black">dateTime</th>
                                    <th className="py-2 px-4 border border-black">status</th>
                                    <th className="py-2 px-4 border border-black">query</th>
                                </tr>
                            </thead>
                            {doctorAppointment.length > 0 ? (
                                <tbody>
                                    {doctorAppointment.map((appointment, index) => (
                                        appointment.status !== 'pending' ? null : (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="py-2 px-4 border border-black">{i++}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.patientName}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.fatherName}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.age}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.city}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.state}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.mobile}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.gender}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.problem}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.doctor}</td>
                                                <td className="py-2 px-4 border border-black">{appointment.dateTime}</td>
                                                <td className="py-2 px-4 border border-black flex justify-center items-center gap-2">{appointment.status}  <Edit className="mr-2 cursor-pointer"
                                                    onClick={() => {
                                                        toast.error("Server Busy........");
                                                    }}
                                                />
                                                    <img src='/alternate-trash.svg' alt='delete'
                                                        className='cursor-pointer' width={15} height={15}
                                                        onClick={() => {
                                                            setDelAppId(appointment._id);
                                                            setDelApp(true);
                                                            setDelPopup(true);
                                                        }}
                                                    />
                                                </td>
                                                <td className="py-2 px-4 border border-black">{appointment.query}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className=" text-2xl py-2 px-4 border border-black" colSpan="13">No Panding Patient Appointment found</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div className="overflow-x-auto text-center my-8  border border-black ">
                        <p className="text-4xl font-semibold text-red-400 underline m-5 ">All Patient Appointment </p>
                        <table className="min-w-full bg-white border border-Black ">
                            <thead className="text-xs">
                                <tr>
                                    <th className="py-2 px-4 border border-black">SR NO.</th>
                                    <th className="py-2 px-4 border border-black">Patient Name</th>
                                    <th className="py-2 px-4 border border-black">Father Name</th>
                                    <th className="py-2 px-4 border border-black">Age</th>
                                    <th className="py-2 px-4 border border-black">City</th>
                                    <th className="py-2 px-4 border border-black">State</th>
                                    <th className="py-2 px-4 border border-black">Mobile NO.</th>
                                    <th className="py-2 px-4 border border-black">Gender</th>
                                    <th className="py-2 px-4 border border-black">Problem</th>
                                    <th className="py-2 px-4 border border-black">Doctor Name</th>
                                    <th className="py-2 px-4 border border-black">dateTime</th>
                                    <th className="py-2 px-4 border border-black">status</th>
                                    <th className="py-2 px-4 border border-black">query</th>
                                </tr>
                            </thead>
                            {doctorAppointment.length > 0 ? (
                                <tbody>
                                    {doctorAppointment.map((appointment, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border border-black">{index + 1}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.patientName}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.fatherName}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.age}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.city}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.state}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.mobile}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.gender}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.problem}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.doctor}</td>
                                            <td className="py-2 px-4 border border-black">{appointment.dateTime}</td>
                                            <td className="py-2 px-4 border border-black flex justify-center items-center gap-2">{appointment.status}
                                                <Edit className="mr-2 cursor-pointer"
                                                    onClick={() => {
                                                        toast.error("Server Busy........");
                                                    }}></Edit>
                                                <img src='/alternate-trash.svg' alt='delete'
                                                    className='cursor-pointer' width={15} height={15}
                                                    onClick={() => {
                                                        setDelAppId(appointment._id);
                                                        setDelApp(true);
                                                        setDelPopup(true);
                                                    }}
                                                />
                                            </td>
                                            <td className="py-2 px-4 border border-black">{appointment.query}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className=" text-2xl py-2 px-4 border border-black" colSpan="13">No Patient Appointment found</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                    <Footer />
                </div>

                <div className={` w-full h-screen flex justify-center items-center absolute inset-0   ${delpopup ? 'bg-opacity-10 ' : ''}`}
                // onClick={() => setDelPopup(false)}
                >
                    {/* Popup */}
                    {delpopup && (
                        <div className=" text-white p-16 px-8 bg-black shadow-lg border border-white absolute z-10  inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 text-center flex flex-col justify-center items-center rounded-lg">
                            <p className='font-bold'>Are You Sure to Permanently Delete...</p>
                            <div className="flex gap-5 justify-evenly mt-4">
                                <button className='bg-green-500 px-2 py-1 rounded-lg hover:bg-yellow-300'
                                    onClick={() => {
                                        setDelAppId()
                                        setDelDoctorId()
                                        setDelPopup(false)
                                    }
                                    }
                                >No</button>
                                {
                                    delApp && <button className='bg-red-400 px-2 py-1 rounded-lg hover:bg-red-700'
                                        onClick={
                                            () => deleteAppointment(delappid)
                                        }>Yes
                                    </button>
                                }
                                {
                                    !delApp && <button className='bg-red-400 px-2 py-1 rounded-lg hover:bg-red-700'
                                        onClick={
                                            () => deleteDoctor(deldoctorid)
                                        }>Yes
                                    </button>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div >
    )
};
export default page;

