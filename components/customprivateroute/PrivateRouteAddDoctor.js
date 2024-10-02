"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

const PrivateRouteAddDoctor = ({ children }) => {
    const { user, userrole, setUserRole, userLogin, setUserLogin } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (!userLogin || userrole !== 'admin') {
            router.push('/');
            toast.error("Unauthorized page!");
        }
    }, [userLogin, userrole, router]);

    if (userLogin && userrole === 'admin') {
        return <>{children}</>;
    }

    return null;
};

export default PrivateRouteAddDoctor;
