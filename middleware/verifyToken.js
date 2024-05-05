const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
            if(err){
                return res.status(400).json({status:false,message:"Invalid Tokne"})
            }
            req.user=user;
            next();
        })
    }else{
        return res.status(401).json({status:false,message:"You are not authenticated"})
    }
};

const verifyTokenAndAuthorization=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Client"||req.user.userType==="Admin"||req.user.userType==="Vendor"||req.user.userType==="Driver"){
            next();
        }
        else{
            return res.status(403).json({status:false,message:"You are not allowed to access that information"});
        }
    })
};
const verifyVendor=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Admin"||req.user.userType==="Vendor"){
            next();
        }
        else{
            return res.status(403).json({status:false,message:"You are not allowed to access that information"});
        }
    })
};
const verifyAdmin=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Admin"||req.user.userType==="Driver"){
            next();
        }
        else{
            return res.status(403).json({status:false,message:"You are not allowed to access that information"});
        }
    })
};
const verifyDriver=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Admin"||req.user.userType==="Driver"){
            next();
        }
        else{
            return res.status(403).json({status:false,message:"You are not allowed to access that information"});
        }
    })
};
module.exports={verifyToken,verifyTokenAndAuthorization,verifyVendor,verifyAdmin,verifyDriver}