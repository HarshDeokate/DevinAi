import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const UserAuth = ({ children }) => {
  let { Loguser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token ||!Loguser) {
      console.log('No token found, redirecting to login');
      navigate('/login');
    }
  }, [token, Loguser]); // re-run when Loguser updates!

  return <>{children}</>;
};

export default UserAuth;
