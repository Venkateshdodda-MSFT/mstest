// src/axiosInstance.ts
import axios from 'axios';

const url: string = import.meta.env.VITE_AZURE_BASE_URL || ""

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;
