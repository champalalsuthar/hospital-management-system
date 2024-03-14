"use client"

import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userlogin, setUserLogin] = useState(false);
    // const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userlogin, setUserLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
