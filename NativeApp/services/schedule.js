import http from "./http";

class Schedule {
    get(hardwareID) {
        return http.get(`schedule?hardwareID=${hardwareID}`)
    }
    create(data) {
        return http.post('schedule/add', data)
    }
    update(data) {
        return http.put('schedule/update', data)
    }
}

export default new Schedule();
