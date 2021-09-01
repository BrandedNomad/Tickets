/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
import express,{Request,Response, Router} from 'express'
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from "../../../../errors/request-validation.error";
import ModelV0 from "../../index.model";
import {BadRequestError} from "../../../../errors/bad-request.error";
import {validateRequest} from "../../../../middleware/validate-request.middleware";


//Creating a router
const signupRouter:Router = express.Router();

/**
 * @route sign-up
 * @purpose To sign-up new users
 * @path http://www.myticket.com/api/users/{api-version}/user/signup
 * @method POST
 */
signupRouter.post('/signup',[
    //express-validator middleware for validation of user input
    //appends any error messages onto the req object
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters long')
    ],
    validateRequest,
    async (req:Request, res:Response)=>{


    //extracting user input
    const {email, password} = req.body;

    //check if user allready exist
    const existingUser = await ModelV0.User.findOne({email});
    if(existingUser){
        console.log('Email in use');

        throw new BadRequestError('Email already exists! Please provide a different email')
    }

    //create a new user
    const user = ModelV0.User.createNewUser({email,password})
    const token = ModelV0.User.generateAuthToken(user)
    user.tokens = user.tokens.concat({token:token})
    req.session = {
        jwt: token
    }
    await user.save();

    //create log
    let logInfo={
        message:"Successfully created new user",
        ip:req.ip,
        user:user.email,
        url:req.originalUrl,
    }


    //Send response
    res.status(201).send(user)


})


//exports
export = signupRouter
