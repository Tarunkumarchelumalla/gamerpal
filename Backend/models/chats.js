import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    senderId: { type: String, required: true },
    message:{type: String, required: true}
});

// const chatsSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     userId1: { type: String, required: true },
//     userId2: { type: String, required: true },
//     messages:[messageSchema]
// });
    
const Chats = mongoose.model(messageSchema);
export default Chats;