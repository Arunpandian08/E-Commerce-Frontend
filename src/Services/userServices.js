import axios from 'axios';
import { Zoom, toast } from 'react-toastify';


export const BASE_URL = 'http://localhost:3001/api';

export const registerUserApi = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, userData, { withCredentials: true });
        toast.success( response.data.message, {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Registration Failed!', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        throw error.response.data;
    }
};

export const signInUserApi = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, userData, { withCredentials: true });
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        return response.data;
      
    } catch (error) {
        toast.error(error.response.data.message || 'Login Failed!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        throw error.response.data;
    }
};

export const getUserApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const userLogout = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
        toast.success('Logout Successful!', {
            position: "bottom-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Logout Failed!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        throw error.response.data;
    }
};

export const updateUserProfileApi = async (userProfile) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/profile/upload`, userProfile, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success('Profile Updated Successfully!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Profile Update Failed!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
        throw error.response.data;
    }
};
