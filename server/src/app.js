import express from "express"
import authRouter from "./routes/auth.routes.js";



const app=express();

// it take json and parse it and available the data in req.body
app.use(express.json());

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