const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:4200",
    }
});
    let users = []

    const adduser = (userId,socketId) =>{
        !users.some(user=>user.userId === userId) &&
        users.push({userId,socketId})
    }
    const removeUser =(socketId) =>{
        users = users.filter(user => user.socketId !=socketId)
    }
    const getUser = (userId)=>{
        return users.find((user) => user.socketId === userId)
    }
io.on("connection",(socket)=>{
    console.log("a user connected...")
    // take users
    io.emit("welcome","hello this is your big brain")
    socket.on("addUsers",userId=>{
       adduser(userId,socket.id)
       io.emit("getUsers",users)
    })

    socket.on("disconnect",()=>{
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })

    // send and get message
    socket.on("sendMessage",(v)=>{
       console.log(v);
        io.emit("messageChange","somechanges socketserver")
    })
})

