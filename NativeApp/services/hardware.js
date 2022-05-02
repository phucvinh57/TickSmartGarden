import http from "./http";

class Hardware{
    getAll(gardenID) {
        return http.get(`/hardware/all?gardenID=${gardenID}`)
    }
    getById(hardwareID, gardenID) {
        return http.get(`/hardware?hardwareID=${hardwareID}&gardenID=${gardenID}`)
    }
    getNhan() {
        return http.get(`/policys/0lamp0`)
    }
}

export default new Hardware();