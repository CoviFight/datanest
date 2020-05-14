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
    }
})


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

    "entries": {
        "type": [TableEntrySchema],
        validate(value) {
            value.forEach((value) => {
                if (value != this.numColumns.value) {
                    throw new Error("Number of values in entry and number of columns in table must be the same.") 
                }
            })
        }
    }
})
    
const Table = mongoose.model('Table', TableSchema)

module.exports = Table
