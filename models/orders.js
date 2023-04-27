const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    items:[],
    location:{
        type: String,
        required: true
    },
    tip:Number,
    payment:String,
    status:String,
    data:{
        type:Date,
        default:Date.now
    },
    phone:Number
})

module.exports = mongoose.model('orderItems', orderSchema)