import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FooterComponent } from './FooterComponent'
import { FiList, FiUserPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

export const HomeComponent = () => {

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <div className='min-h-screen bg-gray-50'>

            {/* Hero Section */}
            <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeUp}
                className='flex flex-col justify-center items-center text-center px-4 py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white'
            >
                <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>
                    Employee Management <br />
                    <span className='text-gray-400'>Made Simple</span>
                </h1>
                <p className='text-gray-400 text-lg md:text-xl mb-10 max-w-xl'>
                    Add, Update, Delete and View Employees all in one place. Fast, simple and secure.
                </p>
                {isLoggedIn ? (
                    <div className='flex flex-col items-center gap-4'>
                        <p className='text-gray-300 text-lg'>Welcome back, <span className='text-white font-bold'>{userName}</span>!</p>
                        <button onClick={() => navigate('/employees')} className='bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition hover:cursor-pointer'>
                            Go to Dashboard →
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-4'>
                        <button onClick={() => navigate('/signup')} className='bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition hover:cursor-pointer'>
                            Get Started →
                        </button>
                        <button onClick={() => navigate('/login')} className='bg-transparent text-white font-semibold px-8 py-3 rounded-full border-2 border-white hover:bg-white hover:text-black transition hover:cursor-pointer'>
                            Login
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeUp}
                className='bg-black text-white px-6 py-12'
            >
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center'>
                    <div className='p-4'>
                        <h3 className='text-4xl font-bold mb-2'>1000+</h3>
                        <p className='text-gray-400 text-sm'>Users</p>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-4xl font-bold mb-2'>4</h3>
                        <p className='text-gray-400 text-sm'>Core Features</p>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-4xl font-bold mb-2'>99%</h3>
                        <p className='text-gray-400 text-sm'>Uptime</p>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-4xl font-bold mb-2'>24/7</h3>
                        <p className='text-gray-400 text-sm'>Availability</p>
                    </div>
                </div>
            </motion.div>


            {/* How It Works Section */}
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeUp}
                className='px-6 py-16 bg-gray-50'
            >
                <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>

                    <div className='flex flex-col items-center text-center'>
                        <div className='w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4'>1</div>
                        <h3 className='text-lg font-bold mb-2'>Sign Up</h3>
                        <p className='text-gray-500 text-sm'>Create your account with email verification using OTP.</p>
                    </div>

                    <div className='flex flex-col items-center text-center relative'>
                        {/* Arrow - hidden on mobile */}
                        <div className='hidden md:block absolute -left-4 top-6 text-gray-300 text-3xl'>→</div>
                        <div className='w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4'>2</div>
                        <h3 className='text-lg font-bold mb-2'>Add Employees</h3>
                        <p className='text-gray-500 text-sm'>Add your employees with their name and email details.</p>
                    </div>

                    <div className='flex flex-col items-center text-center relative'>
                        {/* Arrow - hidden on mobile */}
                        <div className='hidden md:block absolute -left-4 top-6 text-gray-300 text-3xl'>→</div>
                        <div className='w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4'>3</div>
                        <h3 className='text-lg font-bold mb-2'>Manage</h3>
                        <p className='text-gray-500 text-sm'>Update, delete and manage your employees anytime.</p>
                    </div>

                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeUp}
                className='px-6 py-16 max-w-5xl mx-auto'
            >
                <h2 className='text-3xl font-bold text-center mb-10'>What You Can Do</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                    <div className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition'>
                        <div className='w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4'>
                            <FiList className='text-white text-xl' />
                        </div>
                        <h3 className='text-lg font-bold mb-2'>List Employees</h3>
                        <p className='text-gray-500 text-sm'>View all employees in a clean and organized list.</p>
                    </div>

                    <div className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition'>
                        <div className='w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4'>
                            <FiUserPlus className='text-white text-xl' />
                        </div>
                        <h3 className='text-lg font-bold mb-2'>Add Employee</h3>
                        <p className='text-gray-500 text-sm'>Add new employees with their name and email.</p>
                    </div>

                    <div className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition'>
                        <div className='w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4'>
                            <FiEdit className='text-white text-xl' />
                        </div>
                        <h3 className='text-lg font-bold mb-2'>Update Employee</h3>
                        <p className='text-gray-500 text-sm'>Edit and update existing employee details anytime.</p>
                    </div>

                    <div className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition'>
                        <div className='w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4'>
                            <FiTrash2 className='text-white text-xl' />
                        </div>
                        <h3 className='text-lg font-bold mb-2'>Delete Employee</h3>
                        <p className='text-gray-500 text-sm'>Remove employees from the system with one click.</p>
                    </div>

                </div>
            </motion.div>


            {/* Quick Actions - only when logged in */}
            {isLoggedIn && (
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className='bg-white px-6 py-16'
                >
                    <h2 className='text-3xl font-bold text-center mb-10'>Quick Actions</h2>
                    <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
                        <button onClick={() => navigate('/employees')} className='w-full md:w-auto bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition hover:cursor-pointer'>
                            View All Employees
                        </button>
                        <button onClick={() => navigate('/add-employee')} className='w-full md:w-auto bg-white text-black font-semibold px-8 py-2.5 rounded-lg border-2 border-black hover:bg-black hover:text-white transition hover:cursor-pointer'>
                            Add New Employee
                        </button>
                    </div>

                </motion.div>
            )}
            {/* CTA - only when not logged in */}
            {!isLoggedIn && (
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className='flex flex-col items-center text-center px-4 py-16 bg-black text-white'
                >
                        <h2 className='text-3xl font-bold mb-4'>Manage Your Team Effortlessly</h2>
                        <p className='text-gray-400 mb-8'>Everything you need to manage your employees in one simple system</p>
                        <button onClick={() => navigate('/signup')} className='bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer'>
                            Get Started
                        </button>
                </motion.div>
            )}
            <FooterComponent />
        </div>
    )
}