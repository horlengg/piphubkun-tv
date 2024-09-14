import { Router } from "express";
import { Drama } from "@/models/Drama";

const route = Router()

route.post("/",async(req,res)=>{
    res.json({status:200,data:{},message:"User saved successfully"})
})

export default route


