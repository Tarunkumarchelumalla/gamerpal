import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },


});
const Users = mongoose.model('authDb',userSchema);
export default Users;