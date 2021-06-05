/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
//@ts-ignore
import express,{Request,Response} from 'express'
import {body, validationResult} from 'express-validator'

//Creating a router
//@ts-ignore
const signupRouter:IRouterMatcher = express.Router();


signupRouter.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters long')
],(req:Request, res:Response)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new Error("Invalid email or password");
    }

    const {email, password} = req.body;


    console.log('Creating a user...')
    throw new Error("Failed to connect to database")

    res.send("success!")
})


//exports
export = signupRouter
