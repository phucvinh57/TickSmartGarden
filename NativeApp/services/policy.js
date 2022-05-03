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
}

export default new Policy();