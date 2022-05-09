import http from "./http";

class Policy {
    get(hardwareID) {
        return http.get(`policys/${hardwareID}`)
    }
    create(data) {
        return http.post('policys/add', data)
    }
    getById(actuatorID) {
        return http.get(`/policys/${actuatorID}`)
    }
    update(data) {
        return http.post('policys/update', data)
    }
    delete(name, hardwareID) {
        return http.delete(`policys/delete?name=${name}&hardwareID=${hardwareID}`)
    }
}

export default new Policy();