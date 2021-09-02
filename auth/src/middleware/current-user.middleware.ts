import {Request,Response,NextFunction} from "express";
import ModelV0 from "../controller/v0/index.model";

interface UserPayload {
    id: string;
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?:UserPayload;
        }
    }
}

export const currentUser = (req:Request, res:Response, next:NextFunction)=>{

    if(!req.session?.jwt){
        return next();
    }

    //checks if token is valid
    const payload = ModelV0.User.validateAuthToken(req.session.jwt)
    const userPayload = payload.currentUser as UserPayload
    if(userPayload === null){
        //do nothing
    }else{
        //set current user
        req.currentUser = userPayload
    }

    next()
}
