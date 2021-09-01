/**
 *@overview This file contains all the endpoints for the sign-out route
 */

//imports
import express,{Request,Response,Router} from 'express'
import ModelV0 from "../../index.model";



//Creating a router
const signoutRouter:Router = express.Router();

/**
 * @route sign-out
 * @purpose To sign-out logged-in users
 * @path http://www.myticket.com/api/users/{api-version}/user/signout
 * @method POST
 */
signoutRouter.post('/signout',async (req:Request, res:Response)=>{

    //get session token
    // @ts-ignore
    let jwt = req.session.jwt

    //find user details
    let details = ModelV0.User.validateAuthToken(jwt)

    //use details to find User
    let user:any = await ModelV0.User.findOne({_id:details.currentUser.id})

    //remove token from stored tokens
    user.tokens = user.tokens.filter((item:any)=>{
        return item.token !== jwt
    })

    //save user
    user.save()

    //remove cookie from header
    req.session = null

    res.status(200).send({})

})


//exports
export = signoutRouter
