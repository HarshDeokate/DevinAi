import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        axios.get('/users/profile')
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log('Session expired');
            localStorage.removeItem("token");
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
