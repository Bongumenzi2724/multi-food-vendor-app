const Food = require("../models/Foods");
module.exports={
    addFood:async(req,res)=>{
        const {title,foodtags,category,code,restaurant,description,time,price,additives,imageUrl}=req.body;

        try {
           if(!title||!foodtags||!category||!code||!restaurant||!description||!time||!price||!additives||!imageUrl){
            return res.status(400).json({status:false,message:"You have a missing field"});
           }

           const newFood=new Food(req.body);
           await newFood.save();
           return res.status(201).json({status:true,message:"Food Successfully Added"})
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});

        }
    },
    getFoodById:async(req,res)=>{
        const id=req.params.id;
        try {
            const food=await Food.findById(id);
            res.status(200).json({food})

        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    getRandomFood:async(req,res)=>{

        let randomFoodList=[];
        try {
            
            if(req.params.code){
                randomFoodList=await Food.aggregate([
                    {$match:{code:req.params.code}},
                    {$sample:{size:3}},
                    {$project:{__v:0}}
                ]) 
            }
            if(!randomFoodList.length){
                randomFoodList=await Food.aggregate([
                    {$sample:{size:5}},
                    {$project:{__v:0}}
                ]) 
            }
            if(randomFoodList){
                return res.status(200).json(randomFoodList);
            }
            else{
                return res.status(404).json({status:false,message:"No Food List Found"})
            }
            //return res.status(200).json(randomFoodList);
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    //Restaurant Menu
    getFoodsByRestaurant:async(req,res)=>{
        const id=req.params.id;
        try {
            const foods=await Food.find({restaurant:id});
            return res.status(200).json(foods)
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },

    getFoodsByCategoryAndCode:async(req,res)=>{
        const {category,code}=req.params
        try {
            const foods=await Food.aggregate([
                {$match:{category:category,code:code,isAvailable:true}},
                {$project:{__v:0}}
            ]);
            if(foods.length===0){
                return res.status(200).json([])
            }
            return res.status(200).json(foods)
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    //Searching For Food 
    searchFoods:async(req,res)=>{
        const search=req.params.search;

        try {
            const results=await Food.aggregate([
                {
                    $search:{
                        index:'foods',
                        text:{
                            query:search,
                            path:{
                                wilcard:"*"
                            }
                        }
                    }
                }
            ]);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    },
    getRandomFoodsByCategoryAndCode:async(req,res)=>{
        const {category,code}=req.params;
        try {
            let foods;
            foods=await Food.aggregate([
                {$match:{category:category,code:code,isAvailable:true}},
                {$sample:{size:10}},
            ]);
            if(!foods || foods.length===0){
                foods=await Food.aggregate([
                    {$match:{code:code,isAvailable:true}},
                    {$sample:{size:10}},
                ]);
            }

            else if(!foods || foods.length===0){
                foods=await Food.aggregate([
                    {$match:{code:code,isAvailable:true}},
                    {$sample:{size:10}},
                ]);
            }
        return res.status(200).json(foods);
        } catch (error) {
            return res.status(500).json({status:false,message:error.message});
        }
    }
};