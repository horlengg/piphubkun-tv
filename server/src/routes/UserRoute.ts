import { Router } from "express";
import { User } from "@/models/User";
import { Role } from "@/types";

const route = Router()

route.post("/",async(req,res)=>{
    const {
        googleId,
        email,
        name,
        profileUrl
    } = req.body
    const user = new User({
        email,
        googleId,
        name,
        profileUrl,
        role : Role.USER,
        lastLoginAt : new Date()
    })
    const response = await user.save();
    res.json({status:200,data:response,message:"User saved successfully"})
})

export default route


