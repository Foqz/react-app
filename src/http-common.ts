import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})