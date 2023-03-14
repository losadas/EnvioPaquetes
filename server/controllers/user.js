const usermodel = require('../models/user')
const { connect, mongoose } = require('./db')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const options = {
  page: 1,
  limit: 2
}

exports.getData = async (req, res) => {
  try {
    await connect()
    const items = await usermodel.find()
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
    const { nombre, usuario, password, email } = req.body
    const existinUser = await usermodel.findOne({ email })
    if (existinUser) {
      res.send({ error: 'Ya existe un usuario con este correo' }).end()
    } else {
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt)

      const newUser = new usermodel({
        nombre,
        usuario,
        passwordHash,
        email
      })

      const savedUser = await newUser.save()

      const token = jwt.sign(
        {
          user: savedUser._id
        },
        process.env.JWT_SECRET
      )

      res
        .cookie('token', token, {
          httpOnly: true
        })
        .status(200)
        .end()
    }
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}

exports.sigIn = async (req, res) => {
  try {
    const { usuario, password } = req.body

    const existingUser = await usermodel.findOne({ usuario })

    if (!existingUser)
      return res.status(401).json({ errorMessage: 'Wrong user or password' })

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    )
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: 'Wrong user or password' })

    const token = jwt.sign(
      {
        user: existingUser._id
      },
      process.env.JWT_SECRET
    )

    res
      .cookie('token', token, {
        httpOnly: true
      })
      .send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
}

exports.logged = (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    res.send(true)
  } catch (error) {
    res.json(false)
  }
}

exports.logout = (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    .send()
}

exports.updateSingle = async (req, res) => {
  try {
    await connect()
    const id = req.params.id
    const user = req.body
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(user.password, salt)
    const newUserUpdate = {
      nombre: user.nombre,
      usuario: user.usuario,
      passwordHash,
      email: user.email
    }
    const putedUser = await usermodel.findByIdAndUpdate(id, newUserUpdate, {
      new: true
    })
    res.json(putedUser).end()
  } catch (error) {
    res.send({ error })
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}

exports.deleteSingle = async (req, res) => {
  try {
    await connect()
    const { id } = req.params
    const deletedUser = await usermodel.findByIdAndDelete(id)
    res.json(deletedUser).end()
  } catch (error) {
    res.send({ error })
  }
  mongoose.connection.close(() => {
    console.log('Closed Connection', mongoose.connection.readyState)
  })
}
