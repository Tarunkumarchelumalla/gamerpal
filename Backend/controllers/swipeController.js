import Conversation from "../models/conversation.js";
import Profile from "../models/register.js"
// swipeLeft

export const swipeLeft = async(req,res)=>{

  const {userId,swipedUser} = req.body
 
  if(userId && swipedUser){
    const userData = await Profile.findById(userId)

    const payload = userData.swipedLeft.push(swipedUser)

    const status = await Profile.findByIdAndUpdate(payload._id,payload)

    if(status){
      res.status(200).json('user left swiped')
    }
    else{
      res.json("idk some error")
    }
  }else{
    res.json("please Enter Details correctly")
  }
}

// swipeRight

export const swipeRight = async(req,res)=>{

  const {userId,swipeduser} = req.body

  // console.log(userId,swipeduser)
  const usersIds =[userId,swipeduser]
  //getting swiped users 

  const usersData = await Profile.find({ _id: { $in: usersIds } })

  const swipedUserData = usersData.filter(v => v._id == swipeduser)

  const currentUserData = usersData.filter(v => v._id == userId)

  const swipedRightCheck = swipedUserData[0].swipedRight.filter(v => v === userId)

  console.log(swipedRightCheck)
  //  updating current userData payload concating swipedRight and matched users

  currentUserData[0].swipedRight.push(swipeduser)
    
  if(swipedRightCheck.length > 0){
    // it is for the already for swiped right user  
    currentUserData[0].matchedUsers.push(swipeduser)
    swipedUserData[0].matchedUsers.push(userId)
    
    const saveCurrentuser = await  Profile.findByIdAndUpdate(currentUserData[0]._id, currentUserData[0])

    const saveSwipeduser = await Profile.findByIdAndUpdate(swipedUserData[0]._id,swipedUserData[0])

      if(saveCurrentuser && saveSwipeduser){

        const newConversation = new Conversation({
            members: [userId,swipeduser],
          });
        const conversationinit = await newConversation.save();
          
        res.json(conversationinit)
      }
      else{

        res.satus(400).json("updating users failed")

      }

  }else{
      // saving swiperight
      console.log(currentUserData[0])
      const saveCurrentuser = await Profile.findByIdAndUpdate(currentUserData[0]._id,currentUserData[0])
      
        if(saveCurrentuser){
          res.status(200).json(currentUserData[0])
        }
        else{
          res.status(400).json("payload error")
        }
    }

}

