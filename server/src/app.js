import express from "express"


const app=express();

// health check api
app.get("/api/health",(req,res)=>{

    res.status(200).json({
         success: true,
         message: "AI Resume Platform API is running",
    })
});

export default app;