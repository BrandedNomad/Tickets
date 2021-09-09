import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from 'mongoose'
import {server} from "../app";
import request from "supertest";

declare global {
    var signin: () => Promise<string[]>;
}

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

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie')

    return cookie

}


