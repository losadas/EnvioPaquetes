const mongoose = require('mongoose')
const { URI } = process.env
const connectionString = URI

const connect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString)
    console.log('Database Connected', mongoose.connection.readyState)
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = { connect, mongoose }
