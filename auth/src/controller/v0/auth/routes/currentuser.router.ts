/**
 *@overview This file contains all the endpoints for the currentuser route
 * The currentUser route checks to see if a current user is authenticated or not
 */

//imports
import express,{Request,Response,Router} from 'express'
import ModelV0 from "../../index.model";

//Creating an express router
const currentuserRouter:Router = express.Router();

/**
 * @route currentuser
 * @purpose Returns the details of the current user
 * @path https://www.myticket.com/api/users/{api-version}/user/currentuser
 * @method GET
 */
currentuserRouter.get('/currentuser',(req:Request, res:Response)=>{

    //check if cookie exists
    if(!req.session || !req.session.jwt){ //can also use !req.session?.jwt
        return res.send({currentUser: null});
    }

    //validates token
    const payload = ModelV0.User.validateAuthToken(req.session.jwt)
    if(payload.currentUser === null){
        res.status(404).send(payload)
    }else{
        res.status(200).send(payload)
    }


})

//exports
export = currentuserRouter;
