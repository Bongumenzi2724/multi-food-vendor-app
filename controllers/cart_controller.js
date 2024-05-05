const Cart = require("../models/Cart");
const User = require("../models/User");

module.exports={
    addProductToCart:async(req,res)=>{
        const userId=req.user.id;
        const {productId,totalPrice,quantity,additives}=req.body;

        let count;
        try {
            const existingProduct=await Cart.findOne({userId:userId,productId:productId});
            count=await Cart.countDocuments({userId:userId});
            if(existingProduct){
                existingProduct.totalPrice+=totalPrice*quantity;
                existingProduct.quantity+=quantity;
                await existingProduct.save();
                return res.status(200).json({status:true,count:count});
            }else{
                const newCartItem=new Cart({
                    userId:userId,
                    productId:productId,
                    totalPrice:totalPrice,
                    quantity:quantity,
                    additives:additives
                });

                await newCartItem.save();
                count=await Cart.countDocuments({userId:userId});
                return res.status(200).json({status:true,count:count});
            }
        } catch (error) {
             return res.status(500).json({status:false,message:error.message});
        }
    },
    removeCartItem:async(req,res)=>{
        const cartItemId=req.params.id;
        const userId=req.user.id;
        try {
            await Cart.findByIdAndDelete({_id:cartItemId});
            count=await Cart.countDocuments({userId:userId});
            return res.status(200).json({status:true,count:count});
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    getCart:async(req,res)=>{
        const userId=req.user.id;
        try {
            const cart=await Cart.find({userId:userId}).populate({
                path:'product',
                select:'imageUrl title restaurant  rating ratingCount',
                populate:{
                    path:'restaurant',
                    select:'time coords'
                }
            });

        return res.status(200).json({status:true,cart:cart});
        } catch (error) {
        return res.status(500).json({status:false,message:error.message});
        }
    },
    getCartCount:async(req,res)=>{
        const userId=req.user.id;
        try {
          const count=await Cart.countDocuments({userId:userId});
        return res.status(200).json({status:true,count:count});
  
        } catch (error) {
        return res.status(500).json({status:false,message:error.message});
        }
    },
    decrementProductQty:async(req,res)=>{
        const userId=req.user.id;
        const id=req.params.id;
        try {
            const cartItem=await Cart.findById(id);
            if(cartItem){
                const productPrice=cartItem.totalPrice/cartItem.quantity;
                if(cartItem.quantity>1){
                    cartItem.quantity-=1;
                    cartItem.totalPrice-=productPrice;
                    await cartItem.save();
                    return res.status(200).json({status:true,message:"Product quantity successfully decremented"});
                }else{
                    await Cart.findOneAndDelete({_id:id});
                    return res.status(200).json({status:true,message:"Product quantity successfully removed from the cart"});
                }
            }
            else{
                return res.status(400).json({status:false,message:"Product Does Not Exist"});
            }
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});

        }
    }
}