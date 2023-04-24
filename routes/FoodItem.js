const express = require('express')
const router = express.Router()
const foodItems = require('../models/fooditem')
const {body, validationResult} = require('express-validator')
router.post(
    '/items', 
    body('name',"Name Should to greater the 5 letters").isLength({min:5})
    ,async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        await foodItems.create({
            name:req.body.name,
            CategoryName:req.body.CategoryName,
            description:req.body.description,
            options:{
                half:req.body.options.half,
                full:req.body.options.full
            },
            img:req.body.img
        })
        res.json({succes: true})
    }catch(error){
        console.log(error)
        res.json({success: false })
    }
})

router.get('/foodItems',async (req,res) => {
    const item = await foodItems.find({})        
    res.status(200).send(item)
})

router.post('/showcart', async(req,res) => {
    const item = await foodItems.findOne({_id: req.body.id})
    res.status(200).send(item) 
})

module.exports = router;