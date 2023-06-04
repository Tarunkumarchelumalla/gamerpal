
// Creating conversation must be done when it is swiped
// Creation is done while swipes
/////////////////////////////////////////////////////////////////////////////////////////////////

// get all conversation according to userId

import Conversation from "../models/conversation.js";
import Profile from "../models/register.js";
export const fetchConversation = async (req,res)=>{
  
   const userId = req.params.id

   if(userId){

      const conservations = await Conversation.find({
         members:{$in: userId}
      });
        let memberUserIds =[]
      if (conservations) {
          memberUserIds = conservations.reduce((ids, conv) => {
            const currentUserIndex = memberUserIds.indexOf(userId);
            if (currentUserIndex !== -1) {
              memberUserIds.splice(currentUserIndex, 1); // Remove the current user's ID
            }
           return [...ids, ...conv.members];
         }, []);
         
         const memberProfiles = await Profile.find({
            _id: { $in: memberUserIds },
          });
         res.status(200).json({conservations ,memberProfiles})
      }
      else{
         res.status(400).json("Failed to get convs")
      }
   }
   else{
      res.status(400).json("userId not found ")
   }

}


