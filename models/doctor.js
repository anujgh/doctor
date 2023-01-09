const mongoos = require('mongoose')

const doctorSchema = mongoos.Schema({
    firstName : {
        type: String,
        trim: true
    }, 
    lastName: {
        type: String,
        trim: true
    },
    timeings: [
        {
            start_time: { type: String, trim: true},
            end_time: { type: String, trim: true},
            day: {type: String, trim:true}

        }
    ]
    
    
}, {timestamps: true})

module.exports = mongoos.model("doctor",doctorSchema)