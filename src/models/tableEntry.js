const mongoose = require('mongoose')
const validator = require('validator')

const TableEntrySchema = mongoose.Schema({
    "numValues": {
        "type": Number,
        "required": true,
        validate(value) {
            if (value < 1) {
                throw new Error('Entry must have atleast 1 value')
            }
        }
    },
    "values": {
        "type": [String]
    },
    "table": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "Table"
    }
})

const tableEntry = mongoose.model('tableEntry', TableEntrySchema)

module.exports = tableEntry