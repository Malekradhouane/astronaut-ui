import axios from 'axios';
const baseUrl = process.env.API_PUBLIC_BASE_URL || "http://127.0.0.1:8080";

export default axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});