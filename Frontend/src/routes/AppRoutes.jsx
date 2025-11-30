import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import Home from '../Pages/Home.jsx';
import Project from '../Pages/Project.jsx';
import UserAuth from '../auth/UserAuth.jsx';
import {UserContext ,UserProvider } from '../context/userContext.jsx';
import { BrowserRouter } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          
          <Route path='/' element={<UserAuth> <Home/> </UserAuth>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/project' element={<UserAuth><Project/></UserAuth>}></Route>
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default AppRoutes