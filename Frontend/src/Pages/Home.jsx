import React from 'react'
import UserContext from '../context/userContext.jsx'
import axios from '../../config/axios'
import { useContext } from 'react'

const Home = () => {
  const { user , setUser} = useContext(UserContext);
  console.log(user);
  return (
    
    <div>{JSON.stringify(user)}</div>
  )
}

export default Home