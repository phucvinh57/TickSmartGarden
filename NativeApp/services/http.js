import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.56.1:8080/api",
    // baseURL: "http://172.20.6.149:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})

export default http;