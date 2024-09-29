"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';
import Loading from '@/app/_components/Loading/Loading';

const PrivateRoutelogin = ({ children }) => {
    const { userLogin } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userLogin === null) {
            // Still loading, user login status hasn't been determined yet
            setLoading(true);
        } else if (userLogin) {
            // User is already logged in
            toast.error("Already Logged in...!");
            router.push('/');
            setLoading(false);
        } else {
            // User is not logged in, we can render the children
            setLoading(false);
        }
    }, [userLogin, router]);

    if (loading) {
        return <Loading />; // You can add a spinner or loading component here
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoutelogin;
