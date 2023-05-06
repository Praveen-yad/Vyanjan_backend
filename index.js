const express = require('express')
const mongoDB = require('./db')
const Cors = require('cors')
const app = express()
const port = 5000

mongoDB();
app.use(express.json({limit: '50mb'}))
app.use(Cors())

app.get('/', (req, res) => {
    res.send('Hello Word')
})

app.use('/api', require('./routes/Signup'));
app.use('/api', require('./routes/FoodItem'));
app.use('/api', require('./routes/CartItems'))
app.use('/api', require('./routes/orderRoute'))

app.listen(port, () => {
    console.log(`Rounning on port ${port}`)
})