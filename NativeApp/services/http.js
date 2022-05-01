import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.1.14:8080/api",
    headers: {
        "Content-type": "application/json"
    }
    // baseURL: "http://192.168.137.1:8080/api",
})

export default http;