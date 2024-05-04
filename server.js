const express=require('express')
const dotenv=require('dotenv');
const { default: mongoose } = require('mongoose');
const CategoryRoute = require('./routes/category');
const RestaurantRoute=require('./routes/restaurant')
const FoodsRoute=require('./routes/foods')
const RatingsRoute=require('./routes/rating')
const AuthRoute=require('./routes/auth')
const UserRoute=require('./routes/user')

const app=express()

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('Database Connected')}).catch((err)=>{console.log(err)})

//enable json data to be processed
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use("/api/auth",AuthRoute);
app.use("/api/user",UserRoute);
app.use("/api/category",CategoryRoute);
app.use('/api/restaurants',RestaurantRoute);
app.use('/api/foods',FoodsRoute);
app.use('/api/ratings',RatingsRoute);

app.listen(process.env.PORT || 3000,()=>console.log(`Example App listening on port ${process.env.PORT || 3000}!`))