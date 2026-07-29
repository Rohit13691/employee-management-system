import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
export const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const showToast = (message, success = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(false), 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email:email.toLowerCase(), password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.userName);
            localStorage.setItem('role', response.data.role);
            showToast('✓ Login successful');
            setTimeout(() => navigate('/employees'), 1000);
        } catch (error) {
            showToast(error.response?.data || 'Invalid Credentials', false);
        }
    }
    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        ;
    }
    

    return (
        <div className='flex justify-center items-center h-full px-4 py-8'>
            {/* Toast */}
            {toast && (
                <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${toast.success ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}
            <div className='bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md'>
                <h2 className='text-xl md:text-2xl font-bold text-center mb-2'>Welcome Back</h2>
                <p className='text-gray-500 text-center text-sm mb-6'>Login to manage your employee</p>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className='w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition mb-6 hover:cursor-pointer'
                >
                    <FcGoogle className='text-2xl' />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className='flex items-center gap-3 mb-6'>
                    <hr className='flex-1 border-gray-300' />
                    <span className='text-gray-400 text-sm'>or</span>
                    <hr className='flex-1 border-gray-300' />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            Email <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>
                            Password <span className='text-red-500'>*</span>
                        </label>
                        <div className=' relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-black'
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer'
                    >
                        Login
                    </button>

                </form>

                <p className='text-center text-sm text-gray-500 mt-6'>
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className='text-black font-semibold cursor-pointer hover:underline'
                    >
                        Sign Up
                    </span>
                </p>

            </div>
        </div>
    )
}
