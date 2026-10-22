import app from "./src/app.js";

const PORT=process.env.PORT;

const startServer=()=>{
    
    try{
       
        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        })
    }
    catch(err){
          console.error("Server startup failed:", err.message);
    }
};

startServer();