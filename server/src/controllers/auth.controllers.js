import * as authService from "../services/auth.services.js"
import * as userSchema from "../validators/auth.validators.js";


/** 
* @name         registerUserController
* @description  register a new user accept username,email,password .
* @access        public
*/
export const registerUserController=async(req,res)=>{
      
    // const {username,email,password}=req.body;

    try{

     const result = userSchema.registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const { name, email, password } = result.data;

  // Next: Check whether the email already exists,
  // hash the password, and create the user.
  
 const userData = await authService.getUserByEmail(email);

if (userData) {
  return res.status(409).json({
    success: false,
    message: "Email already exists",
  });
}

 const hashpassword= await authService.hashpass(password);
 
 const newUser= await authService.createUser({name,email,hashpassword});

 const {token,tokenHash}=authService.generateVerificationToken();

 //  Set expiry to 15 minutes from now
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // token created in database
 await authService.createVerificationToken({
  id:newUser._id,
  tokenHash,
  expiresAt
 });

 


  return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
}catch(err){
    console.error("Registration error:", err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

}