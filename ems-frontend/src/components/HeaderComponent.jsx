import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';

export const HeaderComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        navigate('/login');
    };
    const isLoggedIn = !!localStorage.getItem('token')
    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
            <header>

                <nav className='bg-black p-3 shadow-lg '>
                    <div className='w-full flex justify-between items-center'>

                        {/* Logo */}
                        <a href='/' className='text-white text-lg md:text-2xl font-bold'>
                            Employee Management System
                        </a>

                        {/* Hamburger - mobile */}
                        <button
                            className='md:hidden text-white text-2xl'
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>

                        {/* Links - desktop */}
                        <div className='hidden md:flex gap-6'>
                            <a href='/' className='text-white hover:text-gray-300 font-medium'>Home</a>

                            {isLoggedIn ? (
                                <>
                                    <a href='/employees' className='text-white hover:text-gray-300 font-medium'>Employees</a>
                                    <a href='/add-employee' className='text-white hover:text-gray-300 font-medium'>Add Employee</a>
                                    <FiLogOut
                                        onClick={handleLogout}
                                        className='text-white text-xl cursor-pointer hover:text-gray-300 transition'
                                        title='Logout'
                                    />
                                </>

                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='text-white text-left font-medium hover:text-gray-300 transition hover:cursor-pointer'
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className='text-white text-left font-medium hover:text-gray-300 transition hover:cursor-pointer'
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>

                    </div>

                    {/* Links - mobile dropdown */}
                    {menuOpen && (
                        <div className='md:hidden flex flex-col gap-3 mt-3 border-t border-gray-700 pt-3'>
                            <a href='/' className='text-white hover:text-gray-300 font-medium'>Home</a>

                            {isLoggedIn ? (
                                <>
                                    <a href='/employees' className='text-white hover:text-gray-300 font-medium'>Employees</a>
                                    <a href='/add-employee' className='text-white hover:text-gray-300 font-medium'>Add Employee</a>
                                    <FiLogOut
                                        onClick={handleLogout}
                                        className='text-white text-xl cursor-pointer hover:text-gray-300 transition'
                                        title='Logout'
                                    />

                                </>

                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='text-white text-left font-medium hover:text-gray-300 transition'
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className='text-white text-left font-medium hover:text-gray-300 transition'
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                </nav>
            </header>
        </div>
    )
}
