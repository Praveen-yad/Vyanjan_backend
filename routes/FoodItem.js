const express = require('express')
const router = express.Router()
const foodItems = require('../models/fooditem')
const jwt = require('jsonwebtoken')
const jwtsecret = "MyNameIssomethingSomeHelloapple"
const cloudinary = require('../utils/cloudinary')


router.post('/items', async(req, res) => {
    try{
        if(req.body.img){
            const upload = await cloudinary.uploader.upload(req.body.img,{
                upload_preset:'vyanjan'
            })
            if(upload.asset_id){
                await foodItems.create({
                    name:req.body.name,
                    CategoryName:req.body.CategoryName,
                    description:req.body.description,
                    options:{
                        half:req.body.options.half,
                        full:req.body.options.full
                    },
                    img:upload.url
                })
                res.status(200).send({sucess: true})
            }
        }
    }catch(error){
        console.log(error)
        res.status(400).send({sucess: false })
    }
})

router.post('/tunein', async(req,res) => {
    try{
        if(req.body.img){
            const upload = await cloudinary.uploader.upload(req.body.img,{
                upload_preset:'tunein1'
            })
            res.status(200).send(upload.url)
        }
    }catch(error){
        res.status(400).send("Error")
    }
})

router.post('/allFood',async (req,res) => {
    jwt.verify(req.body.token, jwtsecret,async(err, data) => {
        if(err){
            res.status(400).send({verify: false})
        }else{
            const item = await foodItems.find({})        
            res.status(200).send({verify: true, item:item})
        }
    })
})

router.get('/foodItems',async (req,res) => {
        try{
            const item = await foodItems.find({})        
            res.status(200).send(item)
        }catch(error){
            res.status(400).send({sucess: false})
        }
})

router.post('/showcart', async(req,res) => {
    const item = await foodItems.findOne({_id: req.body.id})
    res.status(200).send(item) 
})

router.post('/remove', async(req, res) => {
    try{
        await foodItems.findByIdAndDelete({_id:req.body.id})
        res.status(200).send({sucess: true})
    }catch(error){
        res.status(400).send({sucess: false})
    }
})


// router.post("/cloud", async(req,res) => {
//     try{
//         const upload = await cloudinary.uploader.upload(req.body.img,{
//             upload_preset:"vyanjan"
//         }).then(res => console.log(res))
//         res.send(upload)
//     }catch(error){
//         res.status(400).send({sucess:false})
//     }
// })

module.exports = router;


