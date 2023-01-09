const doctorModel = require('../models/doctor')
const moment = require('moment')
const add = async (req, res) => {
    try {
        console.log('req body ', req.body)
        let data = await doctorModel.create(req.body)

        res.status(200).send({
            message:'doctor is added success',
            data
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const doctorsByDay = async (req, res)=>{
    try {
        console.log(req.query)
        let data = await doctorModel.find({"timeings.day":req.query.day})
        res.status(200).send({
            message:'list of doctors',
            data
        })
        
    } catch (error) {
        res.status(400).send(error)
        
    }

}

const doctorsByDate = async (req, res)=>{
    try {
        let date_str = req.query.date;
        let dateObj = Date(req.query.date)
        console.log('date obj is', dateObj)
        let day = moment(req.query.date).format('ddd')
        let dayLower = day.toLowerCase()
        console.log('day is', dayLower)
        
        // let data = await doctorModel.find({"timeings.day":day})
        let data = await doctorModel.aggregate([
            {
                $match : {
                    "timeings.day" : dayLower
                }
            },

            {
                $lookup: {
                    from : "leaves",
                    // localField: "_id",
                    // foreignField: "doctorId",
                    let: { "doctorId" : "$_id", "dateObj": dateObj, "dateStr": date_str },
                    pipeline : [
                        {
                            $match: {
                                "$expr" : {
                                    $and: [ 
                                        {"$eq" : ["$doctorId" , "$$doctorId"]},
                                        // {"$eq" : ["leaveDate" , dateObj]},

                                    ]
                                }
                            }
                        },

                        {
                            $addFields: { "dateOfLeave":  {$dateToString:{format: "%Y-%m-%d", date: "$leaveDate"}}}
                        },

                        {
                            $match: {
                                $expr: {
                                    "$eq" : ["$dateOfLeave", "$$dateStr"]
                                }
                            }
                        }
                    ],
                    as : "leaves"
                }
            },

            {
                $match : {
                    $expr : {
                        $eq : [ {'$size' : "$leaves" }, 0]
                    }
                }
            }
        ])
        console.log('data is ', data)
        res.status(200).send({
            message:'list of doctors',
            data
        })
        
    } catch (error) {
        res.status(400).send(error)
        
    }

}


module.exports = {add, doctorsByDay, doctorsByDate}