'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../../context/UserContext'

function Navbar() {
    const { userLogin, setUserLogin, user, setUser, userrole, setUserRole } = useUser();


    const [nav, setNav] = useState(false);


    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('logeduserrole');
        window.localStorage.removeItem('logeduserdata');
        toast.success("Logout Success")
        setUserRole("none");
        setUser({});
        setUserLogin(false)
    }


    return (
        <div>
            <nav className="w-full bg-blue-500 fixed top-0 left-0 right-0 z-10">
                <div className="justify-between items-center px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            {/* LOGO */}
                            <Link href="/">
                                <h2 className="text-4xl text-black font-extrabold ">Rk Clinic+</h2>
                            </Link>
                            {/* HAMBURGER BUTTON FOR MOBILE */}
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNav(!nav)}
                                >
                                    {nav ? (
                                        <Image src="/close.svg" width={30} height={30} alt="logo" />
                                    ) : (
                                        <Image
                                            src="/hamburger-menu.svg"
                                            width={30}
                                            height={30}
                                            alt="logo"
                                            className="focus:border-none active:border-none"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center items-center  mt-8 md:block md:pb-0 md:mt-0 ${nav ? 'p-12 md:p-0 block' : 'hidden'
                                }`}
                        >
                            <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                <li className=" text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                    <Link href="/" onClick={() => setNav(!nav)}>
                                        Home
                                    </Link>
                                </li>
                                <li className=" text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                    <Link href="/services" onClick={() => setNav(!nav)}>
                                        Services
                                    </Link>
                                </li>
                                <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                    <Link href="/doctors" onClick={() => setNav(!nav)}>
                                        Doctors
                                    </Link>
                                </li>
                                <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                    <Link href="/department" onClick={() => setNav(!nav)}>
                                        Departments
                                    </Link>
                                </li>

                                {userLogin ? (
                                    <>
                                        {
                                            userrole === 'user' &&
                                            <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                                <Link href="/appointment" onClick={() => setNav(!nav)}>
                                                    Appointment
                                                </Link>
                                            </li>
                                        }
                                        {userrole === 'user' && (
                                            <li className="text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                                <Link href="/dashboard/user" onClick={() => setNav(!nav)}>
                                                    <Button>   User-Dashboard</Button>
                                                </Link>
                                            </li>

                                        )}

                                        {userrole === 'doctor' && (
                                            <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                                <Link href="/dashboard/doctor" onClick={() => setNav(!nav)}>
                                                    <Button>   Doctor-Dashboard</Button>
                                                </Link>
                                            </li>
                                        )}
                                        {userrole === 'admin' && (
                                            <li className="text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                                <Link href="/dashboard/admin" onClick={() => setNav(!nav)}>
                                                    <Button>  Admin-Dashboard</Button>
                                                </Link>
                                            </li>
                                        )}
                                        {userrole != 'doctor' && userrole != 'user' && userrole != 'admin' && (
                                            <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                                <Link href="/dashboard/user" onClick={() => setNav(!nav)}>
                                                    <Button>  Tester-User</Button>
                                                </Link>
                                            </li>
                                        )}



                                        <li className="text-xl text-white py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-purple-600 border-purple-900 md:hover:text-purple-600 md:hover:bg-transparent">
                                            <Link href="/" onClick={() => {
                                                setNav(!nav);
                                                logout();
                                            }}> <Button>Logout</Button>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>

                                        <li className="text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                            <Link href="/login" onClick={() => setNav(!nav)}>
                                                <Button> Login</Button>
                                            </Link>
                                        </li>
                                        <li className=" text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                                            <Link href="/signup" onClick={() => setNav(!nav)}>
                                                <Button>   Signup</Button>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;


