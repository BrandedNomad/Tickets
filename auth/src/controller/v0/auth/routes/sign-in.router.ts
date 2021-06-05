/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
//@ts-ignore
import express,{Request,Response} from 'express'

//Creating a router
//@ts-ignore
const signinRouter:IRouterMatcher = express.Router();


signinRouter.post('/signin',(req:Request, res:Response)=>{
    res.send("success!")
})


//exports
export = signinRouter;
