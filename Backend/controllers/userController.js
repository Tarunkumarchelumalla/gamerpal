import jwt from "jsonwebtoken";
import Profile from "../models/register.js";
export const login = async (req, res) => {
    try {
        /// login logic shiit need to fix
        const {email, password} = req.body;
        const user = await Profile.findOne({ email });
        if (user) {
            const pay_load = {
                email : user.email,
                id : user._id
            }
                const token = jwt.sign(pay_load, "secret", { expiresIn: '2m' })
                const refreshToken = jwt.sign(pay_load, "refreshsecret", { expiresIn: '7d' })     
                res.status(200).json({
                    message : `LOGGED IN SUCCESSFULLY | TOKEN DURATION - 2m`,
                    token:token,
                    refreshToken:refreshToken,
                    payload:pay_load,
                })
     
        }else{
            res.status(404).json({status : 404, message : 'Either wrong credentials or user not exists!'})
        }
    } catch (error) {
        res.status(400).send('SOMETHING WENT WRONG!')
    }
}
export const register = async (req, res) => {

  const {username,bio,email, password,games,matchedUsers,swipedLeft,swipedRight,avatar} = req.body;
  
    try {
      if (!email || !password ) {
        
        return res.status(400).json({ message: 'Provide Profile Credentials' });

      }
      
      const isEmailExist = await Profile.findOne({ email });
      const isUsernameExist = await Profile.findOne({username});
      
      if (isEmailExist || isUsernameExist) {
          res.status(400).json({
              message : 'Bad Request',
              error : `${isEmailExist.email || isUsernameExist.username} Already Exists`
          })
      }
      else{
            const addData = await Profile.create({
                email : email,
                password : password,
                username : username,
                avatar:avatar,
                bio: bio,
                games: games,
                matchedUsers: matchedUsers,
                swipedLeft: swipedLeft,
                swipedRight: swipedRight
            })
            if(addData){
            res.status(201).send(addData)
            }
            else{
                res.status(400).json({
                    error : 'UNFORTUNATELY ERROR Occured!'
                })
            }    
      }
    } 
    catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Server error' });
    }
}

export const updateUserById = async (req, res) =>{
    const userId = req.params.id

    const payload = req.body

    const status =  await Profile.findByIdAndUpdate(userId,payload,{new :true})

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to update user' });
    }

}

export const findUserById = async (req, res) =>{
    const userId = req.params.id

    const status =  await Profile.findById(userId)

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to find user' });
    }

}

export const deleteUserById = async (req, res) =>{
    const userId = req.params.id

    const status =  await Profile.findByIdAndRemove(userId)

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to Delete User' });
    }

}
export const getAllUsers = async (req, res) =>{

    const  userData = req.user
    console.log(userData)
    let ignoreUsers = [];
    if(userData.swipedLeft.length > 0) userData.swipedLeft.forEach(v => ignoreUsers.push(v)) 
    if(userData.matchedUsers.length > 0 )  userData.matchedUsers.forEach(v => ignoreUsers.push(v)) 
    if (userData.swipedRight.length > 0) userData.swipedRight.forEach(v => ignoreUsers.push(v)) 
   
    ignoreUsers.push(userData._id.toString())
    
    if(ignoreUsers.length > 0){
    const status =  await Profile.find({ _id: { $nin: ignoreUsers }})

        if(status){ 
            res.status(200).json(status);
                
        }
        else{
            res.status(400).json({ error: 'Failed to get users' });
        }
    }
    else{
        res.status(500).json({error:"paylod error"})
    }

}
export const refreshToken = async (req , res) =>{

    try {

        const {refreshToken} = req.body;
        console.log(refreshToken);
        const userpayload = jwt.verify(refreshToken,"refreshsecret")
        console.log(userpayload)
        
        // const user = await Profile.findOne({});
        if (userpayload) {
            const pay_load = {
                email : userpayload.email,
                id : userpayload.id
            }
                const token = jwt.sign(pay_load, "secret", { expiresIn: '2m' })
                res.status(200).json({
                    message : `Refresh Successfull | TOKEN DURATION - 1 H`,
                    token:token,
                })
     
        }else{
            res.status(404).json({status : 404, message : 'Either wrong credentials or user not exists!'})
        }
    } catch (error) {
        res.status(400).send('SOMETHING WENT WRONG!')
    }
}