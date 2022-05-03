import http from "./http";

class Policy {
    get(hardwareID) {
        return http.get(`policys/${hardwareID}`)
    }
    create(data) {
        return http.post('policys/add', data)
    }
}

export default new Policy();