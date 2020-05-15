const mongoose = require('mongoose')
const validator = require('validator')

const CollectionSchema = mongoose.Schema({
    "owner": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "User"
    }
})

CollectionSchema.virtual('Table', {
    "ref": "Table",
    "localField": "_id",
    "foreignField": "belongsTo"
})

const Collection = mongoose.model("Collection", CollectionSchema)

module.exports = Collection

