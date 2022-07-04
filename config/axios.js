import axios from 'axios';
const BASE_URL = "http://localhost:4000/api";

export default axios.create({
    headers: { "Content-Type": "application/json" },
    Accept: "application/json",
    baseURL: BASE_URL,
});
