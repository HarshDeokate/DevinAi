import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Login from '../Pages/login.jsx';
import Register from '../Pages/Register.jsx';
import Home from '../Pages/Home.jsx';
import Project from '../Pages/project.jsx';
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/project' element={<Project/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes