const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../models/user/User");
require('dotenv').config();
const ServiceSID = process.env.ServiceSID;
const AccountSID = process.env.AccountSID;
const authToken = process.env.authToken
const client = require('twilio')(AccountSID, authToken)

const otpMiddleware = expressAsyncHandler(async (req, res, next) => {

    if(!req.body.otp){
      next();
    }
    else{
        const response=await client.verify
        .services(ServiceSID)
        .verificationChecks.create({
          to: `+91${req.body.mobile}`,
          code: req.body.otp,
        })
    
      
    
        if(response.valid){
            
            next()
        }
        else{
            throw new Error("invalid otp")
        }
    }




});

module.exports = otpMiddleware;