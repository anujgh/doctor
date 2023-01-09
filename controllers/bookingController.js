const moment = require('moment')
const { default: mongoose } = require('mongoose')
const bookingModel = require('../models/booking')

const list = (req, res) => {
    try {
        res.status(200).json({
            message:"success",
            data:{}
        })
    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}

/**
 * checking is booking slot is available or not.
 * @param {*} booking 
 * @returns 
 */
const isSlotAvailable = async (booking) =>{
    console.log("booking is " ,booking)
    data = await bookingModel.findOne({
        $and : [
            {
                doctorId : mongoose.Types.ObjectId(booking.doctorId)

            },
            {
                /**
                 * check time availibility
                 */
                $or : [
                    {
                        /**
                         * if request time slot already in b/w other booked slot
                         */
                        $and : [
                            {
                                bookingDate : { $lte : booking.bookingDate }
                            },
                            {
                                endTime : { $gte : booking.endTime }
                            }
                        ]
                    },
        
                    {
                        /**
                         * if other booking start time is in b/w requested slot
                         */
                        $and : [
                            {
                                bookingDate : { $gt : booking.bookingDate }
                            },
                            {
                                bookingDate : { $lt : booking.endTime }
                            }
                        ]
                    },
        
                    {
                        /**
                         * if other booking end time is in b/w requested slot
                         */
                        $and : [
                            {
                                endTime : { $gt : booking.bookingDate }
                            },
                            {
                                endTime : { $lt : booking.endTime }
                            }
                        ]
                    }
                ]

            }
        ]
    })
    if(data){
        return false
    } 

    console.log('data is ', data)
    return true;
    
}

const add = async (req, res) => {
    try {
        let data = {}
        let message = ""
        let obj_data = req.body;
        let date_obj = new Date(req.body.start_time)
        obj_data.bookingDate = date_obj 
        obj_data.endTime = moment(date_obj).add(req.body.duration, "m").toDate()
        
        if(await isSlotAvailable(obj_data)){
            data = await bookingModel.create(obj_data)
            message = "success"
        } else {
            message = "Time slot is not available."
        }
        res.status(200).json({
            message,
            data
        })
    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}

module.exports = {list, add}