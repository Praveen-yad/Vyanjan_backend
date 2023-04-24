const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtsecret = "MyNameIssomethingSomeHelloapple"

router.post(
    '/signup',
    body('name',"name should have more the 5 letters").isLength({min:5}),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Passsword Should have more then 5 numbers or letters").isLength({min:5}),
    async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt)
    let exsistion = await user.findOne({email:req.body.email})
    if(exsistion){
        res.send({succes:false, msg:'email exist'})
    }else{
        try{
            await user.create({
                name:req.body.name,
                password:securePass,
                location:req.body.location,
                email:req.body.email
            })
            res.json({succes: true})
        }catch(error){
            console.log(error)
            res.json({success: false })
        }
    }
})

router.post('/login',
    body('email', "Enter a valid Email").isEmail(),
    async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let emailId = req.body.email
    try{
        const userData =  await user.findOne({ email:emailId })
        const passCompare = await bcrypt.compare(req.body.password, userData.password)

        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtsecret)
        
        if(!userData){
            res.status(400).send({ msg : "Enter Valid Cradentials" })
        }else if(!passCompare){
            res.status(400).send({ msg : "Incorrect Password" })
        }else{
            res.status(200).send({info : {
                name:userData.name,
                email:userData.email,
                date:userData.date
            }, sucess : true, token: authToken})
        }
    }catch(error){
        res.status(400).json({sucess:false})
    }
})

module.exports = router;