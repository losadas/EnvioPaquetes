const itemmodel = require('../models/item')
const usermodel = require('../models/user')
const { connect, mongoose } = require('./db')

const options = {
  page: 1,
  limit: 2
}

exports.getData = async (req, res) => {
  try {
    await connect()
    const query = req.query
    console.log(query)
    if (query.userToken) {
      const items = await itemmodel.find({ user: query.userToken })
      res.json(items)
      console.log(items)
    } else {
      const items = await itemmodel.find({ _id: query._id })
      console.log(items)
      res.json(items)
    }
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
    const {
      fecha,
      time,
      largo,
      ancho,
      alto,
      peso,
      direccion,
      ciudad,
      nomdestin,
      cedula,
      direccione,
      ciudade,
      userId
    } = req.body

    const user = await usermodel.findById(userId)

    const newItem = new itemmodel({
      specs: {
        largo,
        ancho,
        alto,
        peso
      },
      date: fecha,
      time,
      addrRec: direccion,
      cityRec: ciudad,
      nameDes: nomdestin,
      cedDes: cedula,
      addrEnt: direccione,
      cityEnt: ciudade,
      state: 'Guardado',
      user: user._id
    })

    const savedItem = await newItem.save()
    user.items = user.items.concat(savedItem._id)
    await user.save()
    res.json(savedItem)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}

exports.updateData = async (req, res) => {
  try {
    await connect()
    const {
      fecha,
      time,
      largo,
      ancho,
      alto,
      peso,
      direccion,
      ciudad,
      nomdestin,
      cedula,
      direccione,
      ciudade,
      orderId,
      estado
    } = req.body
    console.log('bodyyyy:', req.body)
    const itemUpdated = {
      specs: {
        largo,
        ancho,
        alto,
        peso
      },
      date: fecha,
      time,
      addrRec: direccion,
      cityRec: ciudad,
      nameDes: nomdestin,
      cedDes: cedula,
      addrEnt: direccione,
      cityEnt: ciudade,
      state: estado
    }

    const savedItem = await itemmodel.findByIdAndUpdate(orderId, itemUpdated, {
      new: true
    })
    console.log('saved iteeeeem', savedItem)

    res.json(savedItem)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}
