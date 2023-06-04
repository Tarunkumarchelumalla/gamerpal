import mongoose from "mongoose";

const convSchema = new mongoose.Schema({

    members:{
        type: Array,
    }   

},{timestamps:true})

const Conversation = mongoose.model('conversation',convSchema)

export default Conversation