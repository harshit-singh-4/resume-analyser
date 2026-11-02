import userModel from "../models/user.model.js";
import VerificationToken from "../models/verificationToken.model.js";

import crypto from "crypto";
import argon2 from "argon2"
import { create } from "domain";
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

/** 
* @name         generateVerificationToken
* @description  generate 8 digit random token and hash the token.
* @access        public
*/

export const generateVerificationToken = () => {
  // Generate a cryptographically secure random token
  const token = crypto.randomInt(10000000, 100000000).toString();

  // Hash the token before storing it in the database
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    tokenHash,
  };
};

// verificationToken

export const createVerificationToken = async ({userId,tokenHash,expiresAt}) => {
 

  // Store only the hash in MongoDB
  await VerificationToken.create({
    userId,
    tokenHash,
    expiresAt,
  });

};
