import mongoose from "mongoose";
import {server} from "./app";



//set port
const port: string | undefined = process.env.PORT

/**
 * @function start
 * @description establishes a connection to the mongodb database and starts the server
 * @Returns {Promise<void>}
 */
const start = async():Promise<void> => {
    if(!process.env.JWT_SECRET){
        throw new Error('JWT_SECRET must be defined')
    }

    try{
        //@ts-ignore
        //connecting to database
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });

        console.log("Successfully Connected to MongoDB", mongoose.connection.readyState)



    }catch(error:any){
        console.log(error.toString())
    }

    //starts the server
    server.listen(port,()=>{
        console.log("Server up and running on port: " + port)
    })
}

//start the server
start();
