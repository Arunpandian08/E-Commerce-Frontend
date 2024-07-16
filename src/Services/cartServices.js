import axios from "axios";
import { Flip, toast } from "react-toastify";
import { BASE_URL } from "./userServices";

export const fetchCartProductsApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cart`, { withCredentials: true });
        return response.data.products;
    } catch (error) {
        throw error.response.data;
    }
};

export const addProductsToCartApi = async ({ _id, category }) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-to-cart`, { _id, category }, { withCredentials: true });
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
        return response.data.products;
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
        throw error.response.data;
    }
};

export const removeFromCartApi = async (productId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/remove-from-cart/${productId}`, { withCredentials: true });
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
        return response.data.products;
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
        throw error.response.data;
    }
};

export const clearCartProductsApi = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/clear-cart`, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response.data
    }
}