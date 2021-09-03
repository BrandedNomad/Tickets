/**
 * @overview This file contains all the tests for the signout route
 */

import request from 'supertest';
import {server} from "../../../../../app";


it('it clears the cookie after signing out', async()=>{

    return request(server)
        .post('/api/users/v0/user/signin')
        .send({
            email:'test05908@mail.com',
            password:'test05@mail.com'
        })
        .expect(400)
})
