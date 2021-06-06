/**
 *@overview This file contains all the endpoints for the currentuser route
 */

//imports
import express,{Request,Response,Router} from 'express'

//Creating an express router
const currentuserRouter:Router = express.Router();

/**
 * @route currentuser
 * @purpose Returns the details of the current user
 * @path https://www.myticket.com/api/users/{api-version}/user/currentuser
 * @method GET
 */
currentuserRouter.get('/currentuser',(req:Request, res:Response)=>{
    res.send("success!")
})

//exports
export = currentuserRouter;
