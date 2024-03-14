// PrivateRoute.js
"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import toast, { Toast } from 'react-hot-toast';

const userappcontact = ({ children }) => {
    const { user, userrole, userLogin, setUserRole } = useUser();

    const router = useRouter();

    useEffect(() => {
        if ((!userLogin) || (userLogin && userrole !== 'user')) {
            router.push('/');
            toast.error("Private ...! Only for Users")
        }
    }, [userrole, router, userLogin]);
    // return userrole === 'user' ? children : null;

    return <>
        {children}
    </>;
};

export default userappcontact;
