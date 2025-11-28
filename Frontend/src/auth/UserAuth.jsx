import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Navigate } from 'react-router-dom'

const UserAuth = ({ children }) => {

    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" />;
    if (!user) return <Navigate to="/login" />;

    return children;
};

export default UserAuth;
