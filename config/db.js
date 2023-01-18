const mongoose = require('mongoose')

const DB_URI = 'mongodb://127.0.0.1:27017/gestionproyect'

module.exports = () => {
    
    const connect = () => {
        mongoose.set('strictQuery',false);
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true    
            },
            (err) => {
                if(err){
                    console.log('Fallo en la conexion')
                }else{
                    console.log('Conexion correcta')
                }
            }
        )
    }
    connect()
}