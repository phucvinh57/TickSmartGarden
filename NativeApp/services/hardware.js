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
    toggle(turnOnNotOff, hardwareID) {
        return http.post(`/hardware/toggle`, {
           action: turnOnNotOff ? "ON" : "OFF",
           hardwareID: hardwareID,
        })
    }
    update(hardwareID, name, operatingTime) {
        return http.post(`/hardware/update`, {
            hardwareID: hardwareID,
            name: name,
            operatingTime: operatingTime,            
        })
    }
}

export default new Hardware();