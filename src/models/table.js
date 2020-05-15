const mongoose = require('mongoose')
const validator = require('validator')

const TableSchema = mongoose.Schema({
    "name": {
        "type": String,
    },
    "numColumns": {
        "type": Number,
        validate(value) {
            if (value < 1) {
                throw new Error('Table must have atleast 1 column')
            }
        }
    },
    "belongsTo": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "Collection"
    }
})
    
TableSchema.virtual('tableEntry', {
    "ref": "tableEntry",
    "localField": "_id",
    "foreignField": "table"
})

const Table = mongoose.model('Table', TableSchema)

module.exports = Table
