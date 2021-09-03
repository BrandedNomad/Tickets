/**
 * @overview This file contains all the tests for the currentuser route
 */

import request from 'supertest';
import {server} from "../../../../../app";


it('it responds with details of the current user', async ()=>{

    const authResponse = await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test9999@mail.com',
            password:'test9999@mail.com'
        })
        .expect(201)

    //get the cookie from first response to be set as header on second response
    const cookie = authResponse.get('Set-Cookie')

    const response =  await request(server)
        .get('/api/users/v0/user/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    console.log(response.body)

})
