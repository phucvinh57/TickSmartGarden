const dbQuery = require('./db')
class Account {
    async getAccount(accountEmail) {
        try {
            const queryStr = `SELECT accountemail, password FROM account WHERE accountemail = ?`
            const result = await dbQuery(queryStr, [accountEmail])
            return result[0]
        } catch(err) {
            return "500"
        }
    }
}

module.exports = new Account()