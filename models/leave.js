const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({
    doctorId : {
        type : mongoose.Schema.Types.ObjectId,
        default: null
    },
    leaveDate : {
        type : Date,
        default: null
    },
    reason : {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model("leave", leaveSchema)