const Order = require("../models/Order");

module.exports={
    placeOrder:async(req,res)=>{
        const newOrder=new Order({
            ...req.body,
            userId:req.user.id
        });

        try {
            await newOrder.save();
            const orderId=newOrder._id;

            return res.status(200).json({status:true,message:"Order placed successfully",orderId:orderId});

        } catch (error) {
            return res.status(500).json({status:false,message:error.message});

        }
    },
    getUserOrder:async(req,res)=>{
        const userId=req.user.id;
        const {paymentStatus,orderStatus}=req.query;
        let query={userId};

        if(paymentStatus){
            query.paymentStatus=paymentStatus;
        }
        if(orderStatus ===orderStatus){
            query.orderStatus=orderStatus
        }
        try {
            const orders=await Order.find(query).populate({
                path:'orderItems.foodId',
                select:'imageUrl title rating time'
            });
            return res.status(200).json(orders);

        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    
}