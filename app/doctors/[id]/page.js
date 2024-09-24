'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';

export default function DoctorDetailPage({ params }) {
    const { id } = params;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);
    const [FormData, setFormData] = useState({
        Comment: "",
    });
    useEffect(() => {
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

        fetchData();
    }, [id]);
    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };
    const submithandler = async (event) => {
        event.preventDefault();

        const dataToSend = {
            userEmail: "ch@gmail.com",
            content: FormData.Comment,
            doctor: id,
        };
        console.log(dataToSend);
        // axios.post("http://localhost:5000/comment", dataToSend)
        // axios.post("https://coding-club-quiz-backend.vercel.app/comment", dataToSend)
        //     .then((response) => {
        //         if (response.data.code === 200) {
        //             toast.success("comment added");
        //             window.location.reload();
        //         } else {
        //             toast.error(response.data.message);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         toast.error("Failed to submit comment");
        //     });
        try {
            const response = await fetch("/api/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            // if (response.status === 200) {
            //     const data = await response.json();
            //     if (data.code === 200) {
            //         toast.success("Comment added");
            //         window.location.reload(); // Optionally reload the page
            //     } else {
            //         toast.error(data.message);
            //     }
            // } else {
            //     toast.error('Failed to submit comment');
            // }
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // setDoctor(data.data);
                    toast.success("Comment added");
                    // window.location.reload(); // Optionally reload the page
                }
            } else {
                console.error('Failed to fetch comment:', response.status);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error("Failed to submit comment");

        };

    };


    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!doctor) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>doctor not found</p></div>;

    return (
        < div className="bg-gray-300 lg:mt-20" >
            <div className=" bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600  shadow-lg p-16 ">
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

                {/* <div className="mt-4 mx-0 lg:mx-4 bg-light-ray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 border-2">
                    <h3 className="text-[22px] font-bold text-red-400 underline">Available Slots</h3>
                    <ul className="list-disc ml-5">
                        {doctor.availableSlots.map((slot, index) => (
                            <li key={index}>    
                                {slot.dayOfWeek}: {slot.timeSlot}
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
            <div className='w-full h-full bg-slate-200  '>
                <p className="text-4xl text-center font-bold text-red-500 underline my-8"> Comments </p>
                <form autoComplete="on" className=" rounded-md p-4 bg-slate-200 w-2/3 flex flex-col gap-y-4  mx-auto"
                    onSubmit={submithandler}
                >
                    <label className="w-full h-20">
                        <p className="text-[0.875rem] text-black mb-1 leading-[1.375]">
                            Comment Text: <sup className="text-red-400">*</sup>
                        </p>
                        <textarea
                            className="bg-slate-200 border p-1 outline-none border-red-300 rounded-[0.5rem] text-richblack-5 w-full"
                            name="Comment"
                            value={FormData.Comment}
                            required
                            placeholder="Write text here:"
                            onChange={changeHandler}
                        />
                    </label>
                    <button type="submit" className='w-1/2 mx-auto rounded-lg p-1 bg-yellow-300 border border-sky-100'>Submit</button>
                </form>
                <div className=" rounded-md p-4 bg-slate-200 w-2/3 flex flex-col gap-y-4  mx-auto text-center">
                    <p className="text-xl text-center font-bold text-red-500 underline m-1"> Old Comments ({commentData.length})</p>
                    <p className="text-sm text-center font-bold text-red-300 "> Sort By <span className='text-black underline' >Latest First</span></p>
                    <ul className="divide-y divide-gray-200">
                        {commentData.map((comment) => (
                            <li key={comment._id} className="py-4">
                                <div className="flex space-x-3 border border-red-300 p-1 rounded">
                                    {/* <img className="h-10 w-10 rounded-full" src={pic} alt="" />  */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900">{comment.firstname} {comment.Lastname}</h3>
                                            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.Comment}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div >
    );
}
