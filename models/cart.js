const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    items:[{
        id:{
            type:String,
        },
        amount:Number,
        size:String,
        CategoryName:String,
        name:String,
        options:{
            half:Number,
            full:Number
        },
        img:String
    }]

})

module.exports = mongoose.model('cart', cartSchema)