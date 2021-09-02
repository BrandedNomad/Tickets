import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from 'mongoose'
import {server} from "../app";

let mongo:any;

//Before all tests
beforeAll(async ()=>{

    //setup environment variables
    process.env.JWT_SECRET = 'test'
    process.env.NODE_ENV = 'test'

    //Create a new instance of MongoDB
    mongo = await MongoMemoryServer.create();
    let mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
});


//before each test runs
beforeEach(async ()=>{

    //delete all existing data from database
    const collections = await mongoose.connection.db.collections()
    for(let collection of collections){
        await collection.deleteMany({})
    }
})

//after all tests have been completed
afterAll(async ()=>{

    //stop the mongo server
    await mongo.stop();
})


