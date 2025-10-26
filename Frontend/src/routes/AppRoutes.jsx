import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Login from '../Pages/login.jsx';
import Register from '../Pages/Register.jsx';
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div>Home Page</div>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<div><Register/></div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes