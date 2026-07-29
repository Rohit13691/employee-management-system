import React, { useEffect, useRef, useState } from 'react'
import { createEmpployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

export const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState(false);
    // const [submitted, setSubmitted] = React.useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const firstNameRef = useRef(null);

    const validateEmail = (value) => {
        if (!value) {
            return 'Email is required';
        } else if (value.indexOf('@') === 0) {
            return 'Email must have a username before @';
        } else if (!value.includes('@')) {
            return 'Email must contain @';
        } else if (value.endsWith('@')) {
            return 'Email must have a domain after @';
        } else if (!value.includes('.')) {
            return 'Email must contain .';
        } else {
            return '';
        }
    };
    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setErrors({ firstName: '', lastName: '', email: '' });
        firstNameRef.current.focus();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            if (id) {
                // update mode
                updateEmployee(id, employee).then((response) => {
                    showToast('✓ Employee updated successfully!');
                }).catch(error => {
                    console.log(error);
                    
                    if (!error.response) {
                        showToast('⚠ Server is not connected. Please try again later.', false);
                    } else {
                        showToast(error.response?.data || 'Failed to update employee', false);
                    }
                });
            } else {
                // add mode
                createEmpployee(employee).then((response) => {
                    console.log(response.data);
                    showToast('✓ Employee added successfully!');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    firstNameRef.current.focus();
                }).catch(error => {
                    console.log(error);
                    
                    if (!error.response) {
                        showToast('⚠ Server is not connected. Please try again later.', false);
                    } else {
                        showToast(error.response?.data || 'Failed to add employee', false);
                    }
                });
            }

        }
    };
    const showToast = (message) => {
        setToast(message);
        setTimeout(() => {
            setToast(false);
            if (id) navigate('/employees');
        }, 3000);
    };

    const validateForm = () => {
        let valid = true;

        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        const emailError = validateEmail(email);
        if (emailError.trim()) {
            errorsCopy.email = emailError;
            valid = false;
        } else {
            errorsCopy.email = '';
        }
        setErrors(errorsCopy);
        return valid;
    }

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => console.error(error))
        }
    }, [id])

    return (
        <div className='flex justify-center items-center h-full px-4 py-8'>
            {/* Toast Notification */}
            {toast && (
                <div className='fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition'>
                    {toast}
                </div>
            )}
            <div className='bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md'>

                <h2 className='text-xl md:text-2xl font-bold text-center mb-6'>
                    {id ? 'Update Employee' : 'Add Employee'}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            First Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter first name'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                setErrors({ ...errors, firstName: '' });
                            }}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                            ref={firstNameRef}
                        />
                        {errors.firstName && <p className='text-red-500 text-sm mt-1'>⚠ {errors.firstName}</p>}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            Last Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter last name'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                setErrors({ ...errors, lastName: '' });
                            }}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.lastName && <p className='text-red-500 text-sm mt-1'>⚠ {errors.lastName}</p>}
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>
                            Email <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrors({ ...errors, email: '' });
                            }}
                            // onBlur={(e) => {
                            //     setErrors({ ...errors, email: validateEmail(e.target.value) });
                            // }}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                            e />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>⚠ {errors.email}</p>}
                    </div>

                    <div className='flex gap-3'>
                        <button
                            type='submit'
                            className='flex-1 bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer'
                        >
                            {id ? 'Update Employee' : 'Add Employee'}
                        </button>
                        {id ? (
                            <button
                                type='button'
                                onClick={() => navigate('/employees')}
                                className='flex-1 bg-white text-black font-semibold py-2 rounded-lg border-2 border-black hover:bg-gray-100 hover:cursor-pointer'
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                type='button'
                                onClick={handleClear}
                                className='flex-1 bg-white text-black font-semibold py-2 rounded-lg border-2 border-black hover:bg-gray-100 hover:cursor-pointer'
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
