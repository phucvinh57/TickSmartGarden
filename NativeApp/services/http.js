import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.1.224:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})

export default http;