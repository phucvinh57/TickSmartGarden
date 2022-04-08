import axios from "axios";

const http = axios.create({
    baseURL: "http://192.168.221.212:8080/api",
})

export default http;