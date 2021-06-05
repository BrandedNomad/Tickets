
/**
 * @overview REST API Server that serves up request
 *
 */

//imports
import express from 'express';
import bodyParser from 'body-parser';
import indexRouter from "./controller/v0/index.router";
import dotenv from 'dotenv'
//const mongoose = require('mongoose');

dotenv.config()

//creating a server instance
const server = express()
const port: string | undefined = process.env.PORT

//configuring index to parse the body of requests
server.use(bodyParser.json())


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


// //Connecting to the database and starting the index
// mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false},(error,response)=>{
//
//     if(error){
//         return console.log("Could not connect to database",error)
//     }
//
//     console.log("Successfully connected to database")
//
//     index.listen(port,()=>{
//         if(!error){
//             console.log("Server up and running on port: " + port)
//         }else{
//             console.log("Unable to start index: ", error)
//         }
//
//     })
// });

server.listen(port,()=>{
    console.log("Server up and running on port: " + port)

})
