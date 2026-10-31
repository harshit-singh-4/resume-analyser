import userModel from "../models/user.model.js";
import argon2 from "argon2"
/** 
* @name         getUserByEmail
* @description  give a user detail if it is exist.
* @access        public
*/
export const getUserByEmail =async(email)=>{
   return await userModel.findOne({email});
}

export const hashpass=async (password)=>{

    return await argon2.hash(password); 
}

export const compare= async (hashp,password)=>{
    return await argon2.verify(hashp,password);
}

// create user

export const createUser=async({email,hashpassword,name})=>{
    
    return await userModel.create({
        name,
        email,
        hashpassword
    })
}
