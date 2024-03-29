const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="TheChampIsHereAvishModiBansariRajani"

router.post("/creatuser",
    [body('email', "Incorrect email").isEmail(),
    body('password', "Length should be greater than 3").isLength({ min: 4 }),
    body('name', "Length of name should be greater than 4").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post("/loginuser", [body('email', "Incorrect email").isEmail(),
body('password', "Length should be greater than 3").isLength({ min: 4 })],

    async (req, res) => {
        let email = req.body.email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "Try different email" });
            }
            const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
            if (pwdCompare) {
                return res.status(400).json({ errors: "Try different password" });
            }
            const data={
                user:{
                    id:userdata.id
                }
            }
            
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken})
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })
module.exports = router