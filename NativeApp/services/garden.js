import http from "./http";

class Garden{
    getAll(useremail) {
        return http.get(`gardens?useremail=${useremail}`)
    }
    create(data) {
        return http.post(`gardens/new`, data)
    }
}

export default new Garden();