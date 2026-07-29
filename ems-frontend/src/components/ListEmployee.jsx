import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { span } from 'framer-motion/client';
export const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [activeDelete, setActiveDelete] = useState(null);
    const [serverError, setServerError] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
            setServerError(false);
        }).catch(error => {
            if (!error.response) {
                // setServerError(true);
            }
            console.error(error);
        })
    }, [])

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/update-employee/${id}`)
    }

    function removeEmployee(id) {
        setActiveDelete(id);
        setDeleteId(id);
        setModal(true);
    }

    function confirmDelete() {
        deleteEmployee(deleteId).then(() => {
            setEmployees(employees.filter(employee => employee.id !== deleteId));
            setModal(false);
            setDeleteId(null);
            setActiveDelete(null);
        }).catch(error => {
            // setModal(false);
            // if (!error.response) {
            //     alert('⚠ Server is not connected. Please try again later.');
            // }
            console.error(error)
        });
    }

    const filteredEmployees = employees.filter(employee =>
        employee.id.toString().includes(search) ||
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='relative'>
            {/* Modal */}
            {modal && (
                <div className='fixed inset-0 flex justify-center items-center z-50'>
                    <div className='bg-white rounded-lg shadow-lg p-6 w-80 border border-gray-200'>
                        <h3 className='text-lg font-bold mb-2'>Delete Employee</h3>
                        <p className='text-gray-500 text-sm mb-6'>Are you sure you want to delete this employee? This action cannot be undone.</p>
                        <div className='flex gap-3'>
                            <button
                                onClick={confirmDelete}
                                className='flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer'
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => {
                                    setModal(false);
                                    setActiveDelete(null);
                                }}
                                className='flex-1 bg-white text-black font-semibold py-2 rounded-lg border-2 border-black hover:bg-gray-100 hover:cursor-pointer'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='container mx-auto px-4 py-6'>

                {/* Header */}
                <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                    <h2 className='text-xl md:text-2xl font-bold w-full md:w-auto'>List Of Employees</h2>
                    <div className='flex items-center justify-end gap-4 w-full md:w-auto'>
                        {/* Search */}
                        <div className='flex items-center gap-2'>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchOpen ? 'w-48 md:w-64 opacity-100' : 'w-0 opacity-0'}`}>
                                <div className=' relative'>
                                    <input
                                        type='text'
                                        placeholder='Search...'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className='w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-black text-sm'
                                        autoFocus={searchOpen}
                                    />
                                    {search && (
                                        <span
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                setSearch('');
                                            }}
                                            className='absolute right-2 top-2.5 text-gray-400 cursor-pointer hover:text-black text-sm'
                                        >

                                            ✕
                                        </span>
                                    )}
                                </div>
                            </div>
                            <FiSearch
                                onClick={() => setSearchOpen(!searchOpen)}
                                className='text-2xl cursor-pointer hover:text-gray-500 transition'
                            />
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={addNewEmployee}
                            className='bg-black text-white font-semibold px-4 md:px-6 py-2 rounded-lg hover:bg-white hover:text-black border-2 border-black transition text-sm md:text-base'
                        >
                            Add Employee
                        </button>
                    </div>
                </div>

                {/* {serverError && (
                    <div className='bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4'>
                        ⚠ Server is not connected. Please try again later.
                    </div>
                )} */}

                {/* Table - desktop */}
                <div className='hidden md:block overflow-x-auto'>
                    <table className='w-full border-collapse border border-gray-300 shadow-lg'>
                        <thead className='bg-black text-white'>
                            <tr>
                                <th className='border border-gray-300 px-4 py-3'>ID</th>
                                <th className='border border-gray-300 px-4 py-3'>First Name</th>
                                <th className='border border-gray-300 px-4 py-3'>Last Name</th>
                                <th className='border border-gray-300 px-4 py-3'>Email</th>
                                <th className='border border-gray-300 px-4 py-3'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee =>
                                <tr className='hover:bg-gray-100 text-center even:bg-gray-50' key={employee.id}>
                                    <td className='border border-gray-300 px-4 py-2'>{employee.id}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{employee.firstName}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{employee.lastName}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{employee.email}</td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        <button
                                            onClick={() => updateEmployee(employee.id)}
                                            className='bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-white hover:text-black border-2 border-black transition hover:cursor-pointer'
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => removeEmployee(employee.id)}
                                            className={`px-3 py-1 rounded-lg text-sm border-2 border-red-500 transition hover:cursor-pointer ml-2 ${activeDelete === employee.id
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white text-red-500 hover:bg-red-500 hover:text-white'
                                                }`}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cards - mobile */}
                <div className='md:hidden flex flex-col gap-4'>
                    {filteredEmployees.map(employee =>
                        <div key={employee.id} className='bg-white border border-gray-200 rounded-lg shadow p-4'>
                            <p className='text-xs text-gray-400 mb-1'>ID: {employee.id}</p>
                            <h3 className='text-lg font-bold'>{employee.firstName} {employee.lastName}</h3>
                            <p className='text-gray-500 text-sm'>{employee.email}</p>
                            <button
                                onClick={() => updateEmployee(employee.id)}
                                className='w-full bg-black text-white px-3 py-2 rounded-lg text-sm hover:bg-white hover:text-black border-2 border-black transition hover:cursor-pointer'
                            >
                                Update
                            </button>
                            <button
                                onClick={() => removeEmployee(employee.id)}
                                className='w-full bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-white hover:text-red-500 border-2 border-red-500 transition hover:cursor-pointer mt-2'
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>

    )
}