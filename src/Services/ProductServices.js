import axios from "axios"
import { BASE_URL } from "./userServices"

export const fetchAllElectronics = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-electronics`)
        return response.data

    } catch (error) {
        throw error.response.data
    }
}

export const fetchMensCollection = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-mens`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchWomensCollection = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-womens`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchFurnitures = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-furniture`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}


//Filtered Electronic products

export const fetchMobiles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/electronics/mobiles`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchTelevisions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/electronics/tv`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchLaptop = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/electronics/laptop`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchWatch = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/electronics/android-watch`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}