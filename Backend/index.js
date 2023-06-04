import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import Profile from "./models/register.js";


const app = express();
app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cookieParser());
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new Strategy(opts, async function(jwt_payload, done) {

    const userData = await Profile.findById(jwt_payload.id)
    if(userData){
        return done(null,userData)
    }
    else{
        return done(err,false)
    }
}))

const CONNECTION_URL='mongodb+srv://admin:admin@database.q56qr75.mongodb.net/UserDB?retryWrites=true&w=majority'

app.use("/api",router);

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(8000 ,()=>console.log('server running on prt')))
.catch((error)=>console.log(error.message));

