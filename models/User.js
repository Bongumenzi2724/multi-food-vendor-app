const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    otp:{
        type:String,
        required:false,
        default:"none"
    },
    password:{
        type:String,
        required:true,
        unique: true,
    },
    verification:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        default:"0714550123"
    },
    phoneVerification:{
        type:Boolean,
        default:false
    },
    address:{
        type:model.Schema.Types.ObjectId,
        ref:"Address",
        required: false,
    },
    userTypes:{
        type:String,
        required:true,
        default:"Client",
        enum:["Client","Admin","vendor","Driver"]
    },
    profile:{
        type:String,
        default: 'https://th.bing.com/th/id/OIP.uAAW2SAl-ISFwKoMdOPMxQHaE8?rs=1&pid=ImgDetMain'
    }

},{timestamps:true});

module.exports=mongoose.model('User',UserSchema);