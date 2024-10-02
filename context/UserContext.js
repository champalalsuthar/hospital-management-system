// context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);
    const [user, setUser] = useState({});
    const [doctorFormData,setDoctorFormData] = useState({});
    const [userrole, setUserRole] = useState();
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const token = window.localStorage.getItem('token');

        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await fetch('/api/verifyToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();
                    console.log(data);
                    console.log(data.user);
                    if (response.ok && data.success) {
                        setUser(data.user);
                        setUserRole(data.user.role);
                        setUserLogin(true);
                    } else {
                        throw new Error(data.error || 'Invalid token');
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('logeduserdata');
                    localStorage.removeItem('logeduserrole');
                    setUserLogin(false);
                }
            }
            setLoading(false); // Set loading to false after checking token

        };

        verifyToken();
    }, []);

    // console.log("user data in usercontext", user);
    // console.log("userrole data in usercontext", userrole);
    // console.log("userLogin status data in usercontext", userLogin);

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin, user, setUser, userrole, setUserRole, doctorFormData, setDoctorFormData }}>
            {/* {!loading ? null : children} */}
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
