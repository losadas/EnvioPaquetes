const { model, Schema } = require('mongoose')
const itemSchema = new Schema(
  {
    specs: {
      type: Object,
      required: true
    },
    date: String,
    time: String,
    addrRec: String,
    cityRec: String,
    nameDes: String,
    cedDes: Number,
    addrEnt: String,
    cityEnt: String,
    state: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
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
