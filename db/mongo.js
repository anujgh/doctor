const mongoose = require('mongoose')

const connect = async () => {
    
        console.log(process.env.MONGO_URI)
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
      }).then(()=>{
        console.log('mongo is connect...')
      }).
   catch ((err)=> {
        
        console.log('there is error to connect mongodb : ',err)
    })

}

module.exports = connect 
