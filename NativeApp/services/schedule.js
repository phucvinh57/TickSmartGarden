import http from "./http";

class Logger {
    getById(hardwareID) {
        return http.get(`/schedule?hardwareID=${hardwareID}`)
    }
}

export default new Logger();