// context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);
    // const [user, setUser] = useState({ name: "clsutahr", role: "admin" .});
    const [user, setUser] = useState({});
    const [userrole, setUserRole] = useState();

    // Load user data from localStorage on component mount
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        // const storedUser = localStorage.getItem('user');
        const logeduser = window.localStorage.getItem("logeduserdata");
        const logeduserole = window.localStorage.getItem("logeduserrole");

        if (token) {
            // console.log(token);

            // let data=JSON.parse(storedUser);
            // setUser(JSON.parse(storedUser));
            // console.log(JSON.parse(logeduser));
            // console.log("type of logeduser " + typeof (logeduser));
            // console.log("type of data " + typeof (data));

            const data = JSON.parse(logeduser);
            // console.log(data);
            // console.log(data);
            // console.log("type of data " + typeof (data));
            setUser(data)
            // setUser(JSON.parse(storedUser));
            // console.log(logeduser);
            // console.log(user);
            setUserRole(logeduserole);
            setUserLogin(true);
            // setInterval(() => {
            // console.log(userLogin)
            // }, 5);

            // Also set user role if available
            // setUserRole(storedUserRole);
        }
    }, []);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', userrole);
    }, [user, userrole]);

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin, user, setUser, userrole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
