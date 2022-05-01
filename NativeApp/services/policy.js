import http from "./http";

class Policy {
    get() {
        return http.get('/')
    }
}

export default new Policy();