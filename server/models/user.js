const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new Schema(
  {
    nombre: String,
    usuario: { type: String, unique: true },
    passwordHash: String,
    email: { type: String, unique: true },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  },
  {
    versionKey: false
  }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
})
userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)

module.exports = User
