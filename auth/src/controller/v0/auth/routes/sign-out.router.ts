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

    //remove token from stored tokens
    // @ts-ignore
    let jwt = req.session.jwt
    // ModelV0.User.removeToken(jwt)
    let details = ModelV0.User.validateAuthToken(jwt)
    let user:any = await ModelV0.User.findOne({_id:details.currentUser.id})
    user.tokens = user.tokens.filter((item:any)=>{
        return item.token !== jwt
    })
    user.save()

    //remove cookie from header
    req.session = null

    res.status(200).send({})

})


//exports
export = signoutRouter
