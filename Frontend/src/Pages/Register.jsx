import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import { useState } from 'react'
import UserContext from '../context/userContext'
import { useContext } from 'react'


const Register = () => {

    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/register', {
                email, password 
            });
            console.log('Registration successful:', response.data);
            localStorage.setItem('token', response.data.data.token);
            setUser(response.data.data.user);
            console.log(user);
            navigate('/');
            // You can redirect the user or perform other actions here
        } catch (error) {
            // console.error('Registration failed:', error.response ? error.response.data : error.message);
            console.error('Registration failed:', error.message);
        }
    }


    
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900">
            <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-white mb-8">
                Create Account !!
                </h2>

                <form 
                onSubmit={submitHandler}
                className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm uppercase tracking-wide">
                    Full Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm uppercase tracking-wide">
                    Email
                    </label>
                    <input
                    onChange = {(e)=>setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-300 mb-2 text-sm uppercase tracking-wide">
                    Password
                    </label>
                    <input
                    onChange = {(e)=>setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-300 mb-2 text-sm uppercase tracking-wide">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200"
                >
                    Register
                </button>
                </form>

                <p className="text-center text-gray-300 mt-6 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                    Login here
                </Link>
                </p>

                <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-600"></div>
                <span className="text-gray-400 px-3 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-600"></div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-500 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Sign up with Google
                </button>
            </div>
        </div>
    </div>
  )
}

export default Register