const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
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
    phone:Number,
    total:Number
})

module.exports = mongoose.model('orderItems', orderSchema)