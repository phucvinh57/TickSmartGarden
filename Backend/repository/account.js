const dbQuery = require('./db')
class Account {
    async getAccount(accountEmail) {
        try {
            const queryStr = `SELECT EXISTS (SELECT accountemail FROM account WHERE accountemail = ?)`
            const exists = await dbQuery(queryStr, [accountEmail])
            return exists
        } catch(err) {
            return err
        }
    }
}

module.exports = new Account()