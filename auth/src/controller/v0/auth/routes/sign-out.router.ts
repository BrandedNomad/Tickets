/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
//@ts-ignore
import express,{Request,Response} from 'express'

//Creating a router
//@ts-ignore
const signoutRouter:IRouterMatcher = express.Router();


signoutRouter.post('/signout',(req:Request, res:Response)=>{
    res.send("success!")
})


//exports
export = signoutRouter
