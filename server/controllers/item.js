const itemmodel = require('../models/item')
const usermodel = require('../models/user')
const { connect, mongoose } = require('./db')
//sskey
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

    const item = await itemmodel.findById(orderId)

    const itemUpdated = {
      specs: {
        largo: largo !== '' ? largo : item.specs.largo,
        ancho: ancho !== '' ? ancho : item.specs.ancho,
        alto: alto !== '' ? alto : item.specs.alto,
        peso: peso !== '' ? peso : item.specs.peso
      },
      date: fecha !== '' ? fecha : item.date,
      time: time !== '' ? time : item.time,
      addrRec: direccion !== '' ? direccion : item.addrRec,
      cityRec: ciudad !== '' ? ciudad : item.cityRec,
      nameDes: nomdestin !== '' ? nomdestin : item.nameDes,
      cedDes: cedula !== '' ? cedula : item.cedDes,
      addrEnt: direccione !== '' ? direccione : item.addrEnt,
      cityEnt: ciudade !== '' ? ciudade : item.cityEnt,
      state: estado !== '' ? estado : item.state
    }

    const savedItem = await itemmodel.findByIdAndUpdate(orderId, itemUpdated, {
      new: true
    })

    res.json(savedItem)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}
