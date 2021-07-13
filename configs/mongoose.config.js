const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
       
        await mongoose.connect(process.env.DB_REMOTE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        
        console.log('BBDD conectada correctamente')

    } catch (error) {
        
       console.log(error)
        throw new Error('Error inicializando BBDD')
        
   } 
}

module.exports = {
    dbConnection
}