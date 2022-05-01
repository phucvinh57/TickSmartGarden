import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.137.1:8080/api",
    withCredentials: true
})

export default http;