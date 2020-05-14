const mongoose = require('mongoose')
const validator = require('validator')

const CollectionSchema = mongoose.Schema({
    "owner": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "User"
    }
})


const Collection = mongoose.Model("Collection", CollectionSchema)

module.exports = Collection

