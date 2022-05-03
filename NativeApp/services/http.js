import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.1.11:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})

export default http;