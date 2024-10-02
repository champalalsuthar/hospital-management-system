// PrivateRoute.js
"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

const PrivateRouteAppointment = ({ children }) => {
    const { user, userrole, setUserRole, userLogin, setUserLogin } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (!userLogin || userrole !== 'user') {
            router.push('/');
            toast.error("this page only for User!");
        }
    }, [userLogin, userrole, router]);

    if (userLogin && userrole === 'user') {
        return <>{children}</>;
    }

    return null;
};

export default PrivateRouteAppointment;
