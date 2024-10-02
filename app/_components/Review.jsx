'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/Loading/Loading';
import StarRating from '@/app/_components/StarRating';
// import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';
// import { useUser } from '@/UserContext';

const Review = ({ type, id, LogedUserData }) => {
    const [filledStars, setFilledStars] = useState();
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("latestFirst");
    const [sortedComments, setSortedComments] = useState(commentData);
    const [Comment, setComment] = useState("");
    const [newCommentContent, setNewCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    // const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();
    // console.log(user);
    // console.log(id);
    // console.log(type);
    // console.log(LogedUserData);

    const LogedUserEmail = LogedUserData.email;
    const fetchDoctorComments = async () => {
        if (id) {
            try {
                // const response = await fetch(`/api/comment?${type}=${id}`); // Fetch doctor by ID
                const response = await fetch(`/api/comment?${type}=${id}`); // Fetch doctor by ID
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        const commentsdata = data.data;
                        const filteredComments = commentsdata.filter(review => review.isActive);
                        setCommentData(filteredComments);
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
        console.log("Type:", type, "ID:", id, "LogedUserData:", LogedUserData);
        fetchDoctorComments();
    }, [type, id]);
    useEffect(() => {
        let sorted = [...commentData];
        switch (sortCriteria) {
            case "latestFirst":
                sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldestFirst":
                sorted = sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "mostLiked":
                sorted = sorted.sort((a, b) => b.likes - a.likes);
                break;
            case "mostDisliked":
                sorted = sorted.sort((a, b) => b.dislikes - a.dislikes);
                break;
            case "lessLiked":
                sorted = sorted.sort((a, b) => a.likes - b.likes);
                break;
            case "lessDisliked":
                sorted = sorted.sort((a, b) => a.dislikes - b.dislikes);
                break;
            case "latestUpdated":
                sorted = sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            default:
                break;
        }
        setSortedComments(sorted);
    }, [sortCriteria, commentData]);


    const submithandler = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Please Login First");
            return;
        }

        let dataToSend;
        if (type === 'doctor') {
            dataToSend = {
                userEmail: LogedUserEmail,
                content: Comment,
                doctor: id
            };
        }
        else if (type === 'service') {
            dataToSend = {
                userEmail: LogedUserEmail,
                content: Comment,
                service: id
            };
        }
        else {
            dataToSend = {
                userEmail: LogedUserEmail,
                content: Comment,
                department: id
            };
        }
        console.log(dataToSend);
        try {
            const response = await fetch("/api/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // setDoctor(data.data);
                    toast.success("Review added");
                    setComment("");
                    await fetchDoctorComments();
                    // window.location.reload(); // Optionally reload the page
                }
            } else {
                toast.error("Failed to Reviews")
                console.error('Failed to fetch Reviews:', response.status);
            }
        } catch (error) {
            console.error('Error submitting Reviews:', error);
            toast.error("Failed to submit Reviews");
        };

    };
    // Delete handler
    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`/api/comment?id=${commentId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('review deleted successfully');
                await fetchDoctorComments();
                // setSortedComments(sortedComments.filter(comment => comment._id !== commentId)); // Remove comment from UI
            } else {
                toast.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Error deleting review');
        }
    };

    const handleHide = async (commentId) => {
        try {
            const response = await fetch(`/api/comment?id=${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: false }), // Send isActive: false to hide the comment
            });

            if (response.ok) {
                toast.success('Review hidden successfully');
                await fetchDoctorComments(); // Refresh the comments after hiding
            } else {
                toast.error('Failed to hide review');
            }
        } catch (error) {
            console.error('Error hiding review:', error);
            toast.error('Error hiding review');
        }
    };
    // Edit handler
    const handleEdit = async (comment) => {
        setEditingCommentId(comment._id); // Set comment in edit mode
        // const commentToEdit = sortedComments.find(comment => comment._id === commentId);
        setNewCommentContent(comment.content); // Set current content in input field
    };


    const handleSaveEdit = async (commentId) => {
        try {
            const response = await fetch(`/api/comment?id=${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newCommentContent }), // Sending only the updated content
            });

            if (response.ok) {
                toast.success('Review updated successfully');
                const updatedComment = await response.json(); // Parse the updated comment
                setSortedComments(sortedComments.map(comment =>
                    comment._id === commentId ? updatedComment.data : comment // Update the comment in the state
                ));
                setEditingCommentId(null);
            } else {
                toast.error('Failed to update Review');
            }
        } catch (error) {
            console.error('Error updating Review:', error);
            toast.error('Error updating Review');
        }
    };

    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;

    if (!commentData) return <div className=" bg-gray-300 ds py-20 px-5 text-center"><p>doctor not found</p></div>;

    return (
        <div className='w-full h-full bg-gradient-to-l from-slate-300 to-slate-100'>
            <p className="text-4xl text-center font-bold text-red-500 underline py-8">Reviews</p>
            <form autoComplete="on" className="rounded-md p-4 w-full lg:w-3/4 flex flex-col gap-y-4 mx-auto p-6"
                onSubmit={submithandler}>
                <label className="w-full h-20">
                    <p className="text-[0.875rem] text-black mb-1 leading-[1.375]">
                        Reviews Text: <sup className="text-red-400">*</sup>
                    </p>
                    <textarea
                        className=" border p-2 outline-none border-red-300 rounded-[0.5rem] text-richblack-5 w-full transition-transform transform "
                        name="Comment"
                        value={Comment}
                        required
                        placeholder="Write text here:"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button type="submit" className='w-1/2 lg:w-1/4 mx-auto rounded-lg p-1 bg-yellow-300 border border-sky-100 transition-transform transform hover:scale-110'>Submit</button>
            </form>

            <div className="rounded-lg p-6  w-full lg:w-3/4 flex flex-col gap-y-6 mx-auto">
                <p className="text-2xl text-center font-bold text-blue-600 underline mb-2">{commentData.length} Reviews</p>
                <p className="text-sm text-center font-bold text-gray-500 mb-4">
                    Sort By:
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("latestFirst")}>Latest First</span> |
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("oldestFirst")}>Oldest First</span> |
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("mostLiked")}>Most Liked</span> |
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("mostDisliked")}>Most Disliked</span> |
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("lessLiked")}>Less Liked</span> |
                    <span className="text-blue-600 underline cursor-pointer ml-2" onClick={() => setSortCriteria("lessDisliked")}>Less Disliked</span>
                </p>
                <ul className="divide-y divide-gray-300">
                    {sortedComments.map((comment) => (
                        <li key={comment._id} className="py-4">
                            <div className="flex space-x-4 bg-white border border-gray-200 p-4 rounded-lg shadow-md transform hover:rotate-1 hover:translate-y-1 transition duration-300 ease-in-out">


                                <div className="">
                                    <div className='flex items-center justify-between gap-4'>

                                        <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 uppercase">
                                            {comment.userEmail[0]}
                                        </div>
                                        {/* <div className="flex items-center justify-between mb-2"> */}
                                        <h3 className="text-md font-semibold text-black">{comment.userEmail}</h3>
                                        {/* <div className="flex flex-col items-end"> */}
                                        <p className="text-sm text-gray-500">Created: {new Date(comment.createdAt).toLocaleString()}</p>
                                        {/* <p className="text-sm text-gray-500">Updated: {new Date(comment.updatedAt).toLocaleString()}</p> */}
                                        {/* </div> */}
                                        {/* </div> */}
                                    </div>


                                    {editingCommentId === comment._id ? (
                                        <>
                                            <textarea
                                                value={newCommentContent}
                                                onChange={(e) => setNewCommentContent(e.target.value)}
                                                className="w-full border border-gray-300 rounded-md p-2 m-2"
                                            />

                                        </>
                                    ) : (<p className="text-gray-700 mb-2">{comment.content}</p>)}


                                    <div className="flex space-x-6 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            👍 <span className="ml-1 text-blue-600">{comment.likes}</span>
                                        </div>
                                        <div className="flex items-center">
                                            👎 <span className="ml-1 text-red-600">{comment.dislikes}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-center items-center gap-2 mt-2 lg:mt-0">
                                        {id === LogedUserData._id &&
                                            <button
                                                onClick={() => handleHide(comment._id)}
                                                className="bg-yellow-500 text-white px-4 py-1 rounded-full shadow hover:bg-yellow-600 transition-colors"
                                            >
                                                Hide
                                            </button>}

                                        {/* Only show Edit/Delete buttons if not editing */}
                                        {comment.userEmail === LogedUserEmail && (
                                            <>
                                                {editingCommentId !== comment._id &&
                                                    <button
                                                        onClick={() => handleEdit(comment)}
                                                        className="bg-blue-500 text-white px-4 py-1 rounded-full shadow hover:bg-blue-600 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                }
                                                {editingCommentId === comment._id &&
                                                    <button
                                                        onClick={() => handleSaveEdit(comment._id)}
                                                        className="bg-blue-500 text-white px-4 py-1 rounded-full shadow hover:bg-blue-600 transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                }
                                                <button
                                                    onClick={() => handleDelete(comment._id)}
                                                    className="bg-red-500 text-white px-4 py-1 rounded-full shadow hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>


                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Review;