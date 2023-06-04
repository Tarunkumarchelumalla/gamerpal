import Messages from "../models/messages.js";
import Profile from "../models/register.js"
/// retriving Chats

export const retriveConvs = async (req,res)=>{

    const conversationId = req.params.id
    if(conversationId){
    const messages = await Messages.find({conversationId})

        if(messages){
            res.status(200).json(messages)
        }else{
            res.status(500).json("Failed to fetch messages")
        }
    }else{
        res.status(400).json("Check params")
    }
} 

////////////////////
// posting a message
////////////////////

export const Sendmessage = async (req,res)=>{

    const {conversationId,sender,text} = req.body;

    console.log(req.body)
    const addData = await Messages.create({
        conversationId:conversationId,
        sender:sender,
        text:text
    })
    if(addData){
    res.status(201).send(addData)
    }
    else{
        res.status(400).json("Something went wrong")
    }



}