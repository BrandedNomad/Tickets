/**
 *@overview This file contains all the endpoints for the currentuser route
 * The currentUser route checks to see if a current user is authenticated or not
 */

//imports
import express,{Request,Response,Router} from 'express'
import ModelV0 from "../../index.model";
import {currentUser} from "../../../../middleware/current-user.middleware";
import {requireAuth} from "../../../../middleware/require-auth.middleware";

//Creating an express router
const currentuserRouter:Router = express.Router();

/**
 * @route currentuser
 * @purpose Returns the details of the current user
 * @path https://www.myticket.com/api/users/{api-version}/user/currentuser
 * @method GET
 */
currentuserRouter.get('/currentuser',currentUser, requireAuth, (req:Request, res:Response)=>{

    res.status(200).send({currentUser: req.currentUser || null});
})

//exports
export = currentuserRouter;
