// PrivateRoute.js
"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

const PrivateRoutelogin = ({ children }) => {
    const { user, userrole, setUserRole, userLogin, setUserLogin } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (userLogin) {
            router.push('/');
            toast.error("Already Logged in...!")
        }
    }, [userLogin]);

    return <>
        {children}
    </>;
};

export default PrivateRoutelogin;
