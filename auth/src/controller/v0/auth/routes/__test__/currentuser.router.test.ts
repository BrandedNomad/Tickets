/**
 * @overview This file contains all the tests for the currentuser route
 */

import request from 'supertest';
import {server} from "../../../../../app";


it('it responds with details of the current user', async ()=>{

    //get the cookie from first response to be set as header on second response
    const cookie = await global.signin();

    const response =  await request(server)
        .get('/api/users/v0/user/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
})

it('responds with null if not authenticated',async ()=>{
    const response = await request(server)
        .get('/api/users/v0/user/currentuser')
        .send()
        .expect(401)

    expect(response.body.currentUser === null)
})
