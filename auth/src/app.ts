
/**
 * @overview REST API Server that serves up request
 *
 */

//imports
import express, {Express,Response,Request} from 'express';
import bodyParser from 'body-parser';
import indexRouter from "./controller/v0/index.router";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieSession from "cookie-session";


//Access Environment Variables
dotenv.config()

//creating a server instance
const server:Express = express()

//To make express aware that it is behind an nginx proxy
//and that it should still trust the traffic coming from that proxy
//even though it is coming from a proxy
//needed for accepting cookies
server.set('trust proxy', true)




//configuring index to parse the body of requests
server.use(bodyParser.json())

//Configuration for Cookies
server.use(
    cookieSession({
        signed: false,
        secure: true //only used when user visits on https connection, otherwise defaults to http
    })
)


//CORS POLICY middleware
// index.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS")
//     next();
// })

//url structure https://myticket.dev/api/auth/v0/user/currentuser
//Setting up Root URI call
server.use('/api/users/' + process.env.ROUTE_VERSION + '/', indexRouter);

//Health-check
server.get('/api/users/status',(req:Request,res:Response)=>{
    const dbStatus:string = mongoose.STATES[mongoose.connection.readyState]
    res.status(200).send({
        dbStatus
    })
    //0: disconnected
    //1: connected
    //2: connection
    //3: disconnecting
})

server.get('/api/users/metrics', (req: Request, res:Response)=>{


    res.status(200).send("Total number of requests: ")
})


export {server};



