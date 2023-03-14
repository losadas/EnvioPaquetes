const { model, Schema } = require('mongoose')
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
)

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})
const Item = model('Item', itemSchema)

module.exports = Item
