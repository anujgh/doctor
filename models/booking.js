const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    doctorId :{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    bookingDate: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default:null
    },
    userName:{
        type: String,
        trim: true
    },
    email:{
        type:String,
        trim:true
    },
    mobile:{
        type:String,
        trim:true
    },
    age:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    }
}, {timestamps:true})

module.exports = mongoose.model('booking', bookingSchema);