import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/auth";

export const sendOtp = (email) => axiosInstance.post(BASE_URL+'/send-otp?email='+email);

export const signup = (signupRequest) => axiosInstance.post(BASE_URL+'/signup',signupRequest);

export const login = (loginRequest) => axiosInstance.post(BASE_URL+'/login',loginRequest);