import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import { useState } from 'react'
import UserContext from '../context/userContext'
import { useContext } from 'react'  

const Login = () => {

    const [email , setEmail] = useState('');    
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    let { setUser } = useContext(UserContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                email, password
            });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
            // You can redirect the user or perform other actions here
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }   
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-center text-white mb-8">
                    Welcome Back !!
                    </h2>

                    <form onSubmit={submitHandler}
                    className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-sm uppercase tracking-wide">
                        Email
                        </label>
                        <input
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200"
                    >
                        Login
                    </button>
                    </form>

                    <p className="text-center text-gray-300 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-pink-400 hover:underline">
                        Create one
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
                    Continue with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login