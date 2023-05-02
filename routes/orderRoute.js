const express = require('express')
const router = express.Router()
const orderItems = require('../models/orders')

router.post('/order', async(req, res) => {
    try{
        const response = await orderItems.create({
            name:req.body.name,
            email:req.body.email,
            items:req.body.items,
            location:req.body.location,
            tip:req.body.tip,
            payment:req.body.payment,
            status:req.body.status,
            phone:req.body.phone,
            total:req.body.total
        })
        res.status(200).send({sucess: true, id : response._id})
    }catch(error){
        res.status(400).send({sucess: false})
    }
})

router.post('/getorders', async(req, res) => {
    try{
        const json = await orderItems.find({email: req.body.email})
        res.status(200).send({sucess: true, json: json})
    }catch(error){
        res.status(400).send({suceess: false})
    }
})

router.post('/allOrders', async(req, res) => {
    try{
        const json = await orderItems.find({})
        res.status(200).send({sucess: true, json: json})
    }catch(error){
        res.status(400).send({suceess: false})
    }
})

module.exports = router


