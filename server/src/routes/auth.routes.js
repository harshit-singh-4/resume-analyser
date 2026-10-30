import {Router} from "express";
import * as userController from "../controllers/auth.controllers.js"

const authRouter=Router();

/** 
* @route         POST  api/auth/register
* @description   register a new user accept username,email,password .
* @access        public
*/
authRouter.post("/register",userController.registerUserController);

export default authRouter;