import express from "express"
import authRouter from "./routes/auth.routes.js";

const app=express();

//  authentication routes 
app.use("/api/auth",authRouter);


// health check api
app.get("/api/health",(req,res)=>{

    res.status(200).json({
         success: true,
         message: "AI Resume Platform API is running",
    })
});

export default app;