/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
//@ts-ignore
import express,{Request,Response} from 'express'
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from "../../../../errors/request-validation.error";
import {DatabaseConnectionError} from "../../../../errors/database-connection.error";

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
        throw new RequestValidationError(errors.array());
    }

    const {email, password} = req.body;


    console.log('Creating a user...')
    throw new DatabaseConnectionError();

    res.send("success!")
})


//exports
export = signupRouter
