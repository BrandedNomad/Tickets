/**
 *@overview This file contains all the endpoints for the sign-in route
 */

//imports
import express,{Request,Response, Router} from 'express'

//Creating an express router
const signinRouter:Router = express.Router();

/**
 * @route sign-in
 * @purpose To sign-in existing users
 * @path http://www.myticket.com/api/users/{api-version}/user/signin
 * @method POST
 */
signinRouter.post('/signin',(req:Request, res:Response)=>{
    res.send("success!")
})


//exports
export = signinRouter;
