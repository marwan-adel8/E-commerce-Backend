import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        default:""
    },

    isAdmin:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User", userSchema);
export default User;
