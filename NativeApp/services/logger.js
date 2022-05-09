import http from "./http";

class Logger {
    getById(actuatorID) {
        return http.get(`/log?actuatorID=${actuatorID}`)
    }
    create(hardwareID, action) {
        return http.post(`/log/create`, {
            hardwareID: hardwareID,
            action: action
        })
    }
}

export default new Logger();