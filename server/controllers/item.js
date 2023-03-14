const itemmodel = require('../models/item')
const { connect, mongoose } = require('./db')

const options = {
  page: 1,
  limit: 2
}

exports.getData = async (req, res) => {
  try {
    await connect()
    const items = await itemmodel.find()
    res.json(items)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}

exports.insertData = async (req, res) => {
  try {
    await connect()
    const { name } = req.body

    const newItem = new itemmodel({
      name
    })

    const savedItem = await newItem.save()
    res.json(savedItem)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}
