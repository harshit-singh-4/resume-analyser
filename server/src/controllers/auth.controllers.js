// import * as 
import * as userSchema from "../validators/auth.validators.js";

/** 
* @name         registerUserController
* @description  register a new user accept username,email,password .
* @access        public
*/
export const registerUserController=async(req,res)=>{
      
    // const {username,email,password}=req.body;

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

  const { username, email, password } = result.data;

  // Next: Check whether the email already exists,
  // hash the password, and create the user.
  
 const userData = await User.findOne({ email });

if (userData) {
  return res.status(409).json({
    success: false,
    message: "Email already exists",
  });
}

}