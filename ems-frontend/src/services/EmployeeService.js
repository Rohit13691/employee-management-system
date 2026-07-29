import axios from 'axios';
import axiosInstance from './axiosInstance';


const REST_API_BASE_URL = '/api/employees';

export const listEmployees = () => axiosInstance.get(REST_API_BASE_URL);

export const createEmpployee = (employee)=> axiosInstance.post(REST_API_BASE_URL,employee)

export const getEmployee = (id) => axiosInstance.get(REST_API_BASE_URL + '/' + id);

export const updateEmployee = (id, employee) => axiosInstance.put(REST_API_BASE_URL + '/' + id, employee);

export const deleteEmployee = (id) => axiosInstance.delete(REST_API_BASE_URL + '/' +id);