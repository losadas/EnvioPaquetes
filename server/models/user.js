const { model, Schema } = require('mongoose')
const userSchema = new Schema(
  {
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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})
const User = model('User', userSchema)

module.exports = User
