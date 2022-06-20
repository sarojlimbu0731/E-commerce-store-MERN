import mongoose  from "mongoose";

const userSchema =mongoose.Schema({
    name:{type: String, reqiured:true},
    email:{type:String, reqiured:true, unique:true},
    password:{type:String, reqiured:true},
    isAdmin:{type: Boolean, default:false, required:true}
},
{
    timestamps:true
})

const Users= mongoose.model('users',userSchema);

export default Users;