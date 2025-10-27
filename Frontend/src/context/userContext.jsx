import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //             const response = await fetch('/api/users/profile', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     // Include auth token if needed
    //                 },
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUser(data.user);
    //             }
    //         } catch (error) {   
    //             console.error('Failed to fetch user profile:', error);
    //         } finally {
    //             setLoading(false);
    //         }

    //     };
    //     fetchUserProfile();
    // }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;