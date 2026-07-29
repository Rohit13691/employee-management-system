import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/AuthService';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const SignupComponent = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmError, setConfirmError] = useState('');
    const navigate = useNavigate();

    const showToast = (message, success = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(false), 3000);
    };

    const handleSentOtp = async () => {
        if (!email.trim()) {
            setErrors({ ...errors, email: "Email is required" });
            return;
        }
        try {
            await sendOtp(email.toLowerCase());
            setOtpSent(true);
            showToast('OTP sent to ' + email);
        } catch (error) {
            showToast(error.response?.data || 'Failed to send OTP', false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast('Passwords do not match', false);
            return;
        }
        try {
            await signup({ userName, email: email.toLowerCase(), password, otp });
            showToast('✓ Registered Successfully');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            showToast(error.response?.data || 'Signup Failed', false);
        }
    };

    return (
        <div className='flex justify-center items-center h-full px-4 py-8'>
            {toast && (
                <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${toast.success ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}
            <div className='bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md'>
                <h2 className='text-xl md:text-2xl font-bold text-center mb-6'>Create Account</h2>
                <form onSubmit={handleSignup}>

                    {/* UserName */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            Username <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter username'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            Email <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                                required
                            />

                            <button
                                type='button'
                                onClick={handleSentOtp}
                                className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm hover:cursor-pointer'
                            >
                                {otpSent ? 'Resend' : 'Send OTP'}
                            </button>
                        </div>
                        {errors.email && <p className='text-red-500 text-sm mt-1'>⚠ {errors.email}</p>}
                    </div>

                    {/* OTP field - shows after otp sent */}
                    {otpSent && (
                        <>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium mb-2'>
                                    OTP <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter OTP'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
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


                            <div className='block text-sm font-medium mb-2'>
                                <label className='block text-sm font-medium mb-2'>
                                    Confirm Password <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (e.target.value != password) {
                                            setConfirmError('Password do not match');
                                        } else {
                                            setConfirmError('');
                                        }
                                    }}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                                    required
                                />
                                {confirmError && <p className='text-red-500 text-sm mt-1'>⚠ {confirmError}</p>}
                            </div>

                        </>

                    )}

                    {/* Password  */}


                    {/* Confirm Password */}


                    <button
                        type='submit'
                        className='w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer'
                    >
                        Sign Up
                    </button>

                </form>

                <p className='text-center text-sm text-gray-500 mt-6'>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className='text-black font-semibold cursor-pointer hover:underline'
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    )
}
