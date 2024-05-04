const User = require("../models/User")
const generateOtp = require("../utils/otp_generator")
const sendEmail = require("../utils/send_email")
const Address=require('./models/Address')
const cryptoJS=require('crypto.js')
const jwt=require('jsonwebtoken')
module.exports={
    createUser:async(req,res)=>{

        const emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

        if(!emailRegex.test(req.body.email)){
            return res.status(400).json({status:false,message:"Email is not Vaild"});
        }
        const minPasswordLength=8;

        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:"Password Should be At Least 8 Characters"});
        }

        try {
            const emailExists=await User.findOne({email:req.body.email});
            if(emailExists){
                return res.status(400).json({status:false,message:"Email Already Exists, Provide Another One"});
            }
            //Generate an OTP
            const otp=generateOtp();
            const newUser=new User({
                username:req.body.username,
                email:req.body.email,
                userType:"Client",
                password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),
                otp:otp
            })
            //Save User
            await newUser.save();
            //Send OTP to Email
            sendEmail(newUser.email,otp);

            return res.status(201).json({status:true,message:"User Successfully Created"})
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})

        }
    },
    loginUser:async(req,res)=>{
        const emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

        if(!emailRegex.test(req.body.email)){
            return res.status(400).json({status:false,message:"Email is not Vaild"});
        }
        const minPasswordLength=8;

        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:"Password Should be At Least 8 Characters"});
        }

        try {
            const user=await User.findOne({email:req.body.email});
            if(!user){
                return res.status(400).json({status:false,message:"Account does not exist"})
            }

            const decryptedPassword=CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const decryptedPasswordString=decryptedPassword.toString(CryptoJS.enc.Utf8);
            
            if(decryptedPasswordString!==req.body.password){
                return res.status(400).json({status:false,message:"Incorrect Password"})
            }
            const token=jwt.sign({
                id:user._id,
                userType:user.userTypes,
                email:user.email,
            },process.env.JWT_SECRET,{expiresIn:'1d'});
            
            const {password,otp,...others}=user.doc;

            return res.status(200).json({...others,token})
        }
        catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    }
}