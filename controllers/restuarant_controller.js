const Restaurant = require("../models/Restaurant");

module.exports={
    addRestuarant:async(req,res)=>{
        //const {id}=req.params;
        const {title,time,imageUrl,owner,code,logoUrl,coordinates}=req.body;
        if(!title||!time||!imageUrl||!owner||!code||!logoUrl||!coordinates||!coordinates.latitude||!coordinates.longitude||!coordinates.address||!coordinates.title){
            return res.status(400).json({status:false,message:"All Fields Must Be Provided"})
       }
        try {
            const newRestaurant=await Restaurant.create(req.body)
            await newRestaurant.save();
            return res.status(201).json({status:true,message:"Restuarant Successfully Created"})
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },

    getRestuarantById:async(req,res)=>{
        const {id}=req.params
        try {
           const restuarant=await Restaurant.findById(id)
           return res.status(200).json(restuarant);

        } catch (error) {
           return res.status(500).json({status:false,message:error.message})
        }
    },

    getAllNearByRestuarant:async(req,res)=>{
        const code=req.params.code;
        try {
            let allNearbyRestaurant=[];
           if(code){

            allNearbyRestaurant=await Restaurant.aggregate([
                {$match:{code:code,isAvailable:true}},
                {$project:{__v:0}}
            ]);
           } 

           if(allNearbyRestaurant.length===0){

            allNearbyRestaurant=await Restaurant.aggregate([
                {$match:{code:code,isAvailable:true}},
                {$project:{__v:0}}
            ]);
           }
           return res.status(200).json(allNearbyRestaurant)
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },

    getRandomRestuarants:async(req,res)=>{
        const code=req.params.code;
        try {
            let randomRestaurant=[];
           if(code){
            randomRestaurant=await Restaurant.aggregate([
                {$match:{code:code,isAvailable:true}},
                {$sample:{size:5}},
                {$project:{__v:0}}
            ]);
           } 

           if(randomRestaurant.length===0){
            randomRestaurant=await Restaurant.aggregate([
                {$match:{code:code,isAvailable:true}},
                {$sample:{size:5}},
                {$project:{__v:0}}
            ]);
           }
           return res.status(200).json(randomRestaurant)
        } catch (error) {
            return res.status(500).json({status:false,message:error.message})
        }
    },
}