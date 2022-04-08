const ShortUniqueID = require('short-unique-id')

const generateID = new ShortUniqueID({
    length: 8,
    dictionary: 'hex'
}) 

module.exports = generateID