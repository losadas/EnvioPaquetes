const mongoose = require('mongoose')
const monpaginate = require('mongoose-paginate-v2')
const ItemSchema = new mongoose.Schema({
    name: String
},
{
    versionKey: false,
    timestamps: true
}

)

ItemSchema.plugin(monpaginate)
module.exports = mongoose.model('item', ItemSchema)