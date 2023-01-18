const mongoose = require('mongoose')
const monpaginate = require('mongoose-paginate-v2')
const UserSchema = new mongoose.Schema({
    nombre: String,  
    usuario: String,
    passwordHash: String,
    email: String
},
{
    versionKey: false,
    timestamps: true
}

)

UserSchema.plugin(monpaginate)
module.exports = mongoose.model('user', UserSchema)