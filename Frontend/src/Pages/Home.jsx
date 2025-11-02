import React from 'react'
import {useContext} from 'react'
import UserContext from '../context/userContext.jsx'
import axios from '../../config/axios'

const Home = () => {
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    
    <div>{JSON.stringify(user)}</div>
  )
}

export default Home