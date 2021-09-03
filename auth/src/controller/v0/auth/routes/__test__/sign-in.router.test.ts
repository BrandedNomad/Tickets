/**
 * @overview This file contains all the tests for the signin route
 */

import request from 'supertest';
import {server} from "../../../../../app";


it('fails when an email that does not exist is supplied', async()=>{

    return request(server)
        .post('/api/users/v0/user/signin')
        .send({
            email:'test05908@mail.com',
            password:'test05@mail.com'
        })
        .expect(400)
})


it('fails when incorrect password is supplied', async()=>{

    await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test05@mail.com',
            password:'test05@mail.com'
        })
        .expect(201)

    return request(server)
        .post('/api/users/v0/user/signin')
        .send({
            email:'test05@mail.com',
            password:'test05098098@mail.com'
        })
        .expect(400)
})



it('responds with a cookie when given valid credentials', async()=>{

    //creates a new account
    await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test10@mail.com',
            password:'test10@mail.com'
        })
        .expect(201)

    //signs into account
    const response = await request(server)
        .post('/api/users/v0/user/signin')
        .send({
            email:'test10@mail.com',
            password:'test10@mail.com'
        })
        .expect(200)

    //checks if cookie has been set
    expect(response.get('Set-Cookie')).toBeDefined()
})



