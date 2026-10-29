import {Router} from "express";

const authRouter=Router();

authRouter.post("/register",(req,res)=>{
    res.status(200).json({success:true});
});

export default authRouter;