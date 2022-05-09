import http from "./http";

class Garden{
    getAll(useremail) {
        return http.get(`gardens?accountEmail=${useremail}`)
    }
    create(data) {
        return http.post(`gardens/new`, data)
    }
}

export default new Garden();