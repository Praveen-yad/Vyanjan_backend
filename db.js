const mongoose = require('mongoose')

const URL = "mongodb+srv://praveenyad99:praveenyad99@cluster0.xqkfphf.mongodb.net/goFoodmern?retryWrites=true&w=majority"
const mongodb = () => { 

     mongoose.connect(URL)
    const conn = mongoose.connection;

    conn.on('connected', () => {
        console.log("connected")
    })

    conn.on("disconnected", () => {
        console.log('disconnected')
    })
    conn.on('error', (err) => {
        console.log(err)
    })

}

module.exports = mongodb;