import userModel from "../models/user.model";

export const getUserByEmail =async(email)=>{
   return await userModel.findOne({email});
}