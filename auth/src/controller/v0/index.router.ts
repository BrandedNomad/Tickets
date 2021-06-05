/**
 * @overview This file contains an index for all available routes. Currently, SimpleMERN only has one route.
 *
 */

//import
import express from 'express';
import currentuserRouter from './auth/routes/currentuser.router';
import signinRouter from './auth/routes/sign-in.router'
import signoutRouter from './auth/routes/sign-out.router'
import signupRouter from './auth/routes/sign-up.router'
import {errorHandler} from "../../middleware/error-handler.middleware";


//Creating a router object
const indexRouter = express.Router();

//Setting up user routes
indexRouter.use('/user', [currentuserRouter,signupRouter,signinRouter,signoutRouter, errorHandler]);

//exports
export = indexRouter;
