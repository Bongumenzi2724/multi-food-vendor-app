const Address = require("../models/Address");
const User = require("../models/User");

module.exports={
    addAddress:async(req,res)=>{
        const newAddress=new Address({
            userId:req.user.id,
            addressLine1:req.body.addressLine1,
            postalCode:req.body.postalCode,
            default:req.body.default,
            deliveryInstructions:req.body.deliveryInstructions,
            latitude:req.body.latitude,
            longitude:req.body.longitude
        });
        try {
            if(req.body.default===true){
                await Address.updateMany({userId:req.user.id},{default:false})
            }
            await newAddress.save();
            return res.status(201).json({status:true,message:"Address successfully Added"})  
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})  
        }
        
    },
    getAddresses:async(req,res)=>{
        try {
            const addresses=await Address.find({userId:req.user.id});
            return res.status(200).json(addresses)
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});

        }
    },
    deleteAddress:async(req,res)=>{
        try {
            await Address.findByIdAndDelete(req.params.id);
            return res.status(200).json({status:true,message:"Address Successfully Deleted"});
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});

        }
    },
    setDefaultAddress:async(req,res)=>{
        const addressId=req.params.id;
        const userId=req.user.id;
        try {
            await Address.updateMany({userId:userId},{default:false});
            const updatedAddress=await Address.findByIdAndUpdate(addressId,{default:true});
            if(updatedAddress){
                await User.findByIdAndUpdate(userId,{address:addressId});
                return res.status(200).json({status:true,message:"Address successfully set a default"});
            }else{
                return res.status(200).json({status:false,message:"Address Not Found"});

            }
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    getDefaultAddress:async(req,res)=>{
        const userId=req.user.id;

        try {
            const address=await Address.findOne({userId:userId,default:true});
            return res.status(200).json({status:true,message:address});

        } catch (error) {
            return res.status(500).json({status:true,message:error.message});

        }
    }
}