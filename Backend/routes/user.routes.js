import express from "express";
import { login,register,updateUserById,findUserById,deleteUserById,getAllUsers,refreshToken} from "../controllers/userController.js"
import {swipeRight,swipeLeft} from "../controllers/swipeController.js"
import passport from "passport";
import { fetchConversation } from "../controllers/conversationController.js";
import {retriveConvs,Sendmessage} from "../controllers/chats.js"



const router = express.Router();

router.post('/user/login',login);

// Auth pending
router.post('/user/register',register)
router.put('/user/userupdate/:id',updateUserById)
router.get('/user/finduser/:id',findUserById)
router.delete('/user/deleteuser/:id',deleteUserById)

router.post('/swipeRight', passport.authenticate('jwt',{session : false}), swipeRight)

router.post('/swipeLeft', passport.authenticate('jwt',{session : false}), swipeLeft)

router.get('/listofusers/:id',passport.authenticate('jwt',{session : false}),getAllUsers)

// fetch cons

router.get('/conversations/:id',fetchConversation)

// refresh token route
router.post('/refresh-token',refreshToken)

// chats retrive
router.get('/messages/:id',retriveConvs)

// post message
router.post('/send-messages',Sendmessage)

export default router