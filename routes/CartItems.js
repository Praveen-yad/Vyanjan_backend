const express = require('express')
const router = express.Router()
const cartItem = require('../models/cart')

router.post('/tocart', async(req,res) => {
    try{
        await cartItem.create({
            email:req.body.email,
            items:[]
        })
        res.send({sucess: true})

    }catch(error){
        res.status(400).send({sucess:false, error:error})
    }
})

router.put('/upcart', async(req,res) => {
    try{
        await cartItem.findOneAndUpdate(
            {email: req.body.email}, 
            {$push: {items:
                {
                    id:req.body.id,
                    amount:req.body.amount, 
                    size:req.body.size,
                    name:req.body.name,
                    CategoryName:req.body.CategoryName,
                    options:{
                        half:req.body.options.half,
                        full:req.body.options.full
                    },
                    img:req.body.img
                        }
            }})
    res.status(200).send({sucess:true})
    }catch(error){
        res.status(400).send({sucess: false})
    }
})

router.put('/decart', async(req,res) => {
    try{
        const data = await cartItem.findOne(
            {email: req.body.email})

        const newCart = data.items.filter((item) => item.id !== req.body.id)

        await cartItem.updateOne({email: req.body.email}, {items: newCart})
        res.status(200).send({sucess:true})
    }catch(error){
        res.status(400).send({sucess: false})
    }
})

router.post('/getcart', async(req,res) => {
    const json = await cartItem.findOne({email:req.body.email})
    res.status(200).send(json)
})

router.post('/emptycart' , async(req,res) => {
    try{
        await cartItem.updateOne({email: req.body.email}, {items: []})
        res.status(200).send({sucess:true})
    }catch(error){
        res.status(400).send({sucess:false})
    }
})

module.exports = router;