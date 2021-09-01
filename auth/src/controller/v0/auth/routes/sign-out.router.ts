/**
 *@overview This file contains all the endpoints for the sign-out route
 */

//imports
import express,{Request,Response,Router} from 'express'


//Creating a router
const signoutRouter:Router = express.Router();

/**
 * @route sign-out
 * @purpose To sign-out logged-in users
 * @path http://www.myticket.com/api/users/{api-version}/user/signout
 * @method POST
 */
signoutRouter.post('/signout',(req:Request, res:Response)=>{



    res.status(200).send("success!")

})


//exports
export = signoutRouter
