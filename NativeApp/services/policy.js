import http from "./http";

class Policy {
    get() {
        return http.get('/')
    }
    getById(actuatorID) {
        return http.get(`/policys/${actuatorID}`)
    }
}

export default new Policy();