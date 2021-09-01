/**
 *@overview This file contains all the endpoints for the sign-in route
 */

//imports
import express,{Request,Response, Router} from 'express'
import {body, validationResult} from "express-validator";
import {RequestValidationError} from "../../../../errors/request-validation.error";
import {validateRequest} from "../../../../middleware/validate-request.middleware";
import ModelV0 from "../../index.model";
import {BadRequestError} from "../../../../errors/bad-request.error";

//Creating an express router
const signinRouter:Router = express.Router();

/**
 * @route sign-in
 * @purpose To sign-in existing users
 * @path http://www.myticket.com/api/users/{api-version}/user/signin
 * @method POST
 */
signinRouter.post('/signin',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req:Request, res:Response)=>{

    const existingUser = await ModelV0.User.findByCredentials(req.body.email,req.body.password);
    if(!existingUser){
        throw new BadRequestError('Invalid credentials')
    }else{

        const token = ModelV0.User.generateAuthToken(existingUser)
        existingUser.tokens = existingUser.tokens.concat({token:token})
        req.session = {
            jwt: token
        }
        await existingUser.save();

        res.status(200).send(existingUser)
    }

})


//exports
export = signinRouter;
