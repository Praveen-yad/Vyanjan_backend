const mongoose = require('mongoose')
const { Schema } = mongoose

const fooditems = new Schema ({
    CategoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }, 
    options:
        {
            half:Number,
            full:Number,
            regular:Number,
            medium:Number,
            large:Number
        }
    ,
    description:{
        type:String,
        required:true
    },
    img:{type: String}
})

module.exports = mongoose.model('foodItems', fooditems)