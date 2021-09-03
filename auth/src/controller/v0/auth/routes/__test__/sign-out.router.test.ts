/**
 * @overview This file contains all the tests for the signout route
 */

import request from 'supertest';
import {server} from "../../../../../app";


it('it clears the cookie after signing out', async()=>{

    const authResponse = await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test999@mail.com',
            password:'test999@mail.com'
        })
        .expect(201)

    const cookie = authResponse.get('Set-Cookie')

    const response =  await request(server)
        .post('/api/users/v0/user/signout')
        .set('Cookie',cookie)
        .send({})
        .expect(200)

    expect(response.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )

})
