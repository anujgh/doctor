const leaveModel = require('../models/leave')

const add = async (req, res) => {
    try {
        console.log('req body ', req.body)
        let data = await leaveModel.create(req.body);
        let message = "Leave is added successfully"

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


module.exports = {add}