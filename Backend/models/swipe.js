import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema({

    swipedUserId:{
        type:String,
        required:true
    },
},
{timestamps:true});
const Swipes = mongoose.model(swipeSchema);
export default Swipes;