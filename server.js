    import express, { json } from 'express'
    import { configDotenv } from 'dotenv';
    import jwt, { decode } from 'jsonwebtoken'
    import bcrypt, { hash } from 'bcryptjs';
    import mongoose from 'mongoose';
    import User from './models/UserSchema.js';
    import { connectDB } from './config/db.js';
    import { authMiddleware } from './Middleware/authMiddleware.js';
    import cors from 'cors';
    
    configDotenv();
    
    //function that create the accesstoken
    const generateAccessToken = (user)=>{
        return jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECERT,{expiresIn:"15m"});
    };


    //function that creates the refresh token
    const generateRefreshToken = (user)=>{
        return jwt.sign({id:user._id},process.env.JWT_SECERT,{expiresIn:"7d"})
    }

    let refreshTokens = [] ;


    const app = express(); // creating the express obj
    app.use(cors())   // to avoid the cross origin error while connecting to the front-end
    app.use(express.json()) // converting the res and the res to json automatically
    connectDB();    //db connection



    //user registration api
    app.post('/register',async (req,res)=>{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
         return  res.status(400).json({
                msg:"User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create ({
            email,password:hashedPassword
        })
        res.status(201).json({
            msg:"registered success"
        })
    })


    //user login api
    app.post('/login', async (req,res)=>{

        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg:"No account exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({msg:"Wrong password"})
        }

        const accessToken = generateAccessToken(user) ; 
        const refreshToken = generateRefreshToken(user); 

        refreshTokens.push(refreshToken);
        res.json({
            msg:"Login success",
            accessToken:accessToken,
            refreshToken:refreshToken
        })
    })
    app.get("/profile", authMiddleware,(req, res) => {

        if(req.user.role==="user")
        {
            res.json({
            message: "Welcome to profile",
            user:req.user
        });
        }else{
            res.status(400).json({
                message:"You are not allowed to access"

            })
        }
    });


    app.post("/refresh-token",(req,res)=>{
        const {refreshToken} = req.body;

        if (!refreshToken){
            return res.status(401).json({
                msg:"Refresh token requried"
            }
            )
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json({
                msg:"Invalid refresh token"
            })
        }

        jwt.verify(refreshToken,process.env.JWT_SECERT,(err,user)=>{
            if(err){
                return res.status(403).json({
                    msg:"Refresh token expired"
                })
            }
        })

        const accessToken = jwt.sign({
            id:user.id
        },process.env.JWT_SECERT,{expiresIn:"15m"})

        res.json({accessToken})

    })

    app.post('/logout',(req,res)=>{
        const {refreshToken} = req.body;
        if(!refreshToken){
            res.status(400).json({
                msg:"Refresh token required"
            })
        }
        refreshTokens = refreshTokens.filter((token)=>token!==refreshToken);

        res.json({
            msg:"Logout success"
        })
    })

    app.listen(process.env.PORT,()=>{
        console.log("Server running on ",process.env.PORT);
    })

