"use client"
import React, { useState, useEffect } from 'react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = [
        {
            name: "Arjun Sharma",
            star: "5",
            image: "https://www.shutterstock.com/image-photo/handsome-hispanic-millennial-man-sit-260nw-2174725871.jpg",
            content: "The doctors and staff at Manipal Hospital are truly amazing. From the moment I walked in, I felt I was in safe hands. Their care, attention to detail, and the facility's cleanliness are top-notch. Highly recommended for anyone looking for quality treatment!",
        },
        {
            name: "Sneha Verma",
            star: "4",
            image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxpbmRpYW4lMjB3b21hbnxlbnwwfHx8fHwxNjQzNjk2NTcz&ixlib=rb-1.2.1&q=80&w=400",
            content: "Apollo Hospital is my go-to for any medical needs. The waiting time can sometimes be long, but once you're with the doctor, the care is great. They really listen and provide thorough consultations. The prices are a bit on the higher side, but it's worth it for the level of care.",
        },
        {
            name: "Ravi Kumar",
            star: "5",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE4fHxpbmRpYW4lMjBtYW58ZW58MHx8fHwxNjQzNjk2NTcz&ixlib=rb-1.2.1&q=80&w=400",
            content: "Fortis Hospital provided excellent care during my father’s surgery. The staff was compassionate, and the doctor made sure we understood the whole process. Post-surgery care was exceptional, and they kept us updated at every step. Would highly recommend them for any major treatments.",
        },
        {
            name: "Pooja Singh",
            star: "3",
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxpbmRpYW4lMjBtYW58ZW58MHx8fHwxNjQzNjk1Njk4&ixlib=rb-1.2.1&q=80&w=400",
            content: "I had mixed experiences at Narayana Health. While the doctors were good, the administrative process was very slow. It took almost an hour just to get registered. The treatment was satisfactory, but the overall experience was bogged down by the inefficiencies in management.",
        },
        {
            name: "Aman Gupta",
            star: "4",
            image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
            content: "Visited AIIMS for a check-up. The infrastructure is top-class, but the crowd management can be improved. I was happy with the doctor’s advice, though the consultation took longer than expected. AIIMS is ideal for complicated cases, but expect longer wait times due to the high number of patients.",
        },
    ];


    const slidesToShow = window.innerWidth >= 768 ? 3 : 1;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000); // Auto-slide every 4 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const visibleTestimonials = Array.from({ length: slidesToShow }, (_, i) => {
        const index = (currentIndex + i) % data.length;
        return data[index];
    });

    return (
        <section className="bg-gray-300 relative">
            <div className="mx-auto  max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ">
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Read trusted reviews from our customers
                </h2>
                <div className=' flex justify-center flex items-center relative '>
                    <div className="absolute inset-y-0 -left-4 flex items-center z-12">
                        <button
                            onClick={prevSlide}
                            className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
                        >
                            <span className="sr-only">Previous Slide</span>
                            &lt; {/* Icon for left button */}
                        </button>
                    </div>
                    <div className=" mt-8 flex justify-center">
                        {visibleTestimonials.map((testimonial, index) => (
                            <blockquote key={index} className="rounded-lg bg-gray-50 m-4  p-6 shadow-sm sm:p-8 transition-transform duration-300 transform hover:scale-105">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt={testimonial.name}
                                        src={testimonial.image}
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="flex justify-center gap-0.5">
                                            {/* Filled Stars */}
                                            {[...Array(parseInt(testimonial.star))].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-green-500"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeWidth="1"
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                    />
                                                </svg>
                                            ))}
                                            {/* Unfilled Stars */}
                                            {[...Array(5 - parseInt(testimonial.star))].map((_, i) => (
                                                <svg
                                                    key={i + testimonial.star}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-black"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1"
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                    />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="mt-0.5 text-lg font-medium text-gray-900">{testimonial.name}</p>
                                    </div>
                                </div>
                                <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-700">
                                    {testimonial.content}
                                </p>
                            </blockquote>
                        ))}
                        {/* Navigation Buttons */}

                    </div>
                    <div className="absolute inset-y-0 -right-4 flex just items-center z-12">
                        <button
                            onClick={nextSlide}
                            className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
                        >
                            <span className="sr-only">Next Slide</span>
                            &gt; {/* Icon for right button */}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;



// "use client"
// import React, { useState, useEffect } from 'react';

// const Testimonials = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [slidesToShow, setSlidesToShow] = useState(1);
//     const data = [
//         {
//             name: "Arjun Sharma",
//             star: "5",
//             image: "https://www.shutterstock.com/image-photo/handsome-hispanic-millennial-man-sit-260nw-2174725871.jpg",
//             content: "The doctors and staff at Manipal Hospital are truly amazing. From the moment I walked in, I felt I was in safe hands. Their care, attention to detail, and the facility's cleanliness are top-notch. Highly recommended for anyone looking for quality treatment!",
//         },
//         {
//             name: "Sneha Verma",
//             star: "4",
//             image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxpbmRpYW4lMjB3b21hbnxlbnwwfHx8fHwxNjQzNjk2NTcz&ixlib=rb-1.2.1&q=80&w=400",
//             content: "Apollo Hospital is my go-to for any medical needs. The waiting time can sometimes be long, but once you're with the doctor, the care is great. They really listen and provide thorough consultations. The prices are a bit on the higher side, but it's worth it for the level of care.",
//         },
//         {
//             name: "Ravi Kumar",
//             star: "5",
//             image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE4fHxpbmRpYW4lMjBtYW58ZW58MHx8fHwxNjQzNjk2NTcz&ixlib=rb-1.2.1&q=80&w=400",
//             content: "Fortis Hospital provided excellent care during my father’s surgery. The staff was compassionate, and the doctor made sure we understood the whole process. Post-surgery care was exceptional, and they kept us updated at every step. Would highly recommend them for any major treatments.",
//         },
//         {
//             name: "Pooja Singh",
//             star: "3",
//             image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxpbmRpYW4lMjBtYW58ZW58MHx8fHwxNjQzNjk1Njk4&ixlib=rb-1.2.1&q=80&w=400",
//             content: "I had mixed experiences at Narayana Health. While the doctors were good, the administrative process was very slow. It took almost an hour just to get registered. The treatment was satisfactory, but the overall experience was bogged down by the inefficiencies in management.",
//         },
//         {
//             name: "Aman Gupta",
//             star: "4",
//             image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
//             content: "Visited AIIMS for a check-up. The infrastructure is top-class, but the crowd management can be improved. I was happy with the doctor’s advice, though the consultation took longer than expected. AIIMS is ideal for complicated cases, but expect longer wait times due to the high number of patients.",
//         },
//     ];

//     useEffect(() => {
//         const handleResize = () => {
//             setSlidesToShow(window.innerWidth >= 1024 ? 3 : 1); // Show 3 slides on laptop, 1 on mobile
//         };

//         handleResize(); // Set initial slide number based on screen size

//         window.addEventListener('resize', handleResize); // Listen for window resizing

//         return () => {
//             window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
//         };
//     }, []);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => {
//             if (slidesToShow === 3) {
//                 return (prevIndex + 1) % data.length;
//             }
//             return (prevIndex + 1) % data.length;
//         });
//     };
//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => {
//             if (slidesToShow === 3) {
//                 return prevIndex === 0 ? data.length - 1 : prevIndex - 1;
//             }
//             return prevIndex === 0 ? data.length - 1 : prevIndex - 1;
//         });
//     };

//     useEffect(() => {
//         const interval = setInterval(nextSlide, 2000); // Auto-slide every 4 seconds
//         return () => clearInterval(interval); // Clear interval on unmount
//     }, [slidesToShow]);

//     const visibleTestimonials = Array.from({ length: slidesToShow }, (_, i) => {
//         const index = (currentIndex + i) % data.length;
//         return data[index];
//     });

//     return (
//         <>
//             {/* <section className="bg-gray-300 relative">
//                 <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//                     <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//                         Read trusted reviews from our customers
//                     </h2>
//                     <div className='flex justify-center flex items-center relative'>
//                         <div className="absolute inset-y-0 -left-4 flex items-center z-12">
//                             <button
//                                 onClick={prevSlide}
//                                 className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
//                             >
//                                 <span className="sr-only">Previous Slide</span>
//                                 &lt;
//                             </button >
//                         </div >

//                         <div className="mt-8 flex justify-center overflow-hidden relative transition-all duration-500 ease-in-out">
//                             {visibleTestimonials.map((testimonial, index) => (
//                                 <blockquote
//                                     key={index}
//                                     className={`rounded-lg bg-gray-50 m-4 p-6 shadow-sm sm:p-8 transition-transform duration-500 ease-in-out ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
//                                         }`}
//                                 >
//                                     <div className="flex items-center gap-4">
//                                         <img
//                                             alt={testimonial.name}
//                                             src={testimonial.image}
//                                             className="size-14 rounded-full object-cover transition-opacity duration-500"
//                                             style={{ transition: 'opacity 0.5s ease-in-out' }} // Image transition
//                                         />
//                                         <div>
//                                             <div className="flex justify-center gap-0.5">

//                                                 {[...Array(parseInt(testimonial.star))].map((_, i) => (
//                                                     <svg
//                                                         key={i}
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         className="h-5 w-5 text-green-500"
//                                                         viewBox="0 0 20 20"
//                                                         fill="currentColor"
//                                                         stroke="currentColor"
//                                                     >
//                                                         <path
//                                                             strokeWidth="1"
//                                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//                                                         />
//                                                     </svg>
//                                                 ))}
//                                                 {[...Array(5 - parseInt(testimonial.star))].map((_, i) => (
//                                                     <svg
//                                                         key={i + testimonial.star}
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         className="h-5 w-5 text-black"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         stroke="currentColor"
//                                                     >
//                                                         <path
//                                                             strokeLinecap="round"
//                                                             strokeLinejoin="round"
//                                                             strokeWidth="1"
//                                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//                                                         />
//                                                     </svg>
//                                                 ))}
//                                             </div>
//                                             <p className="mt-0.5 text-lg font-medium text-gray-900">{testimonial.name}</p>
//                                         </div>
//                                     </div>
//                                     <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-700">
//                                         {testimonial.content}
//                                     </p>
//                                 </blockquote>
//                             ))}
//                         </div>

//                         <div className="absolute inset-y-0 -right-4 flex items-center z-12">
//                             <button
//                                 onClick={nextSlide}
//                                 className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
//                             >
//                                 <span className="sr-only">Next Slide</span>
//                                 &gt;
//                             </button>
//                         </div>
//                     </div >
//                 </div >
//             </section > */}
//             <section className="bg-gray-300 relative">
//                 <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//                     <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//                         Read trusted reviews from our customers
//                     </h2>
//                     <div className="flex justify-center flex items-center relative">
//                         <div className="absolute inset-y-0 -left-4 flex items-center z-12">
//                             <button
//                                 onClick={prevSlide}
//                                 className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
//                             >
//                                 <span className="sr-only">Previous Slide</span>
//                                 &lt; {/* Icon for left button */}
//                             </button>
//                         </div>

//                         <div className="mt-8 flex justify-center overflow-hidden relative transition-all duration-500 ease-in-out">
//                             {visibleTestimonials.map((testimonial, index) => (
//                                 <blockquote
//                                     key={index}
//                                     className={`rounded-lg bg-gray-50 m-4 p-6 shadow-sm sm:p-8 transition-transform duration-500 ease-in-out ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
//                                         }`}
//                                 >
//                                     <div className="flex items-center gap-4">
//                                         <img
//                                             alt={testimonial.name}
//                                             src={testimonial.image}
//                                             className="size-14 rounded-full object-cover transition-opacity duration-500"
//                                             style={{ transition: 'opacity 0.5s ease-in-out' }}
//                                         />
//                                         <div>
//                                             <div className="flex justify-center gap-0.5">
//                                                 {[...Array(parseInt(testimonial.star))].map((_, i) => (
//                                                     <svg
//                                                         key={i}
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         className="h-5 w-5 text-green-500"
//                                                         viewBox="0 0 20 20"
//                                                         fill="currentColor"
//                                                         stroke="currentColor"
//                                                     >
//                                                         <path
//                                                             strokeWidth="1"
//                                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//                                                         />
//                                                     </svg>
//                                                 ))}
//                                             </div>
//                                             <p className="mt-1 text-lg font-medium text-gray-700">{testimonial.name}</p>
//                                         </div>
//                                     </div>
//                                     <p className="mt-4 text-gray-500">{testimonial.content}</p>
//                                 </blockquote>
//                             ))}
//                         </div>

//                         <div className="absolute inset-y-0 -right-4 flex items-center z-12">
//                             <button
//                                 onClick={nextSlide}
//                                 className="w-5 h-[15%] bg-gray-500 text-white rounded-full hover:bg-gray-400 transition"
//                             >
//                                 <span className="sr-only">Next Slide</span>
//                                 &gt; {/* Icon for right button */}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>

//     );
// };

// export default Testimonials;