"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import toast from 'react-hot-toast';
import Loading from '@/app/_components/Loading/Loading';

const PrivateRouteDashboard = ({ children }) => {
    const { userLogin, userrole } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

 
    useEffect(() => {
        const checkUserStatus = () => {
            if (userLogin === null) {
                setLoading(true);
            } else if (!userLogin) {
                if (loading) {
                    toast.error("Please log in first2!");
                    setLoading(false);
                }
                router.push('/login');
            } else {
                switch (userrole) {
                    case "admin":
                        router.push('/dashboard/admin');
                        break;
                    case "doctor":
                        router.push('/dashboard/doctor');
                        break;
                    case "user":
                        router.push('/dashboard/user');
                        break;
                    default:
                        toast.error("Unauthorized page!");
                        router.push('/');
                        break;
                }
                setLoading(false);
            }
        };

        checkUserStatus();
    }, [userLogin, userrole, router]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {userLogin && children}
        </>
    );
};

export default PrivateRouteDashboard;
