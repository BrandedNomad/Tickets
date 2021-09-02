import request from 'supertest';
import {server} from "../../../../../app";



it('returns a 201 on successful signup', async()=>{
    return request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test@mail.com',
            password:'test@mail.com'
        })
        .expect(201)
})

it('returns a 400 with an invalid email', async ()=>{
    return request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'testmail.com',
            password:'test@mail.com'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async ()=>{
    return request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test@mail.com',
            password:'t'
        })
        .expect(400)
})

it('returns a 400 when no email or password is provide', async ()=>{
    await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'test@mail.com',
            password:''
        })
        .expect(400)

    return request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'',
            password:'test@mail.com'
        })
        .expect(400)
})

it('returns a 400 when no email or password is provide', async ()=>{
    await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'',
            password:''
        })
        .expect(400)

    return request(server)
        .post('/api/users/v0/user/signup')
        .send({})
        .expect(400)
})

it('disallows duplicate emails', async ()=>{
    await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'testi@mail.com',
            password:'testi@mail.com'
        })
        .expect(201)

    return request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'testi@mail.com',
            password:'testi@mail.com'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async ()=>{
    const response = await request(server)
        .post('/api/users/v0/user/signup')
        .send({
            email:'testing@mail.com',
            password:'testing@mail.com'
        })
        .expect(201)

    //checks if cookie has been set
    //the environment variable has been set to false to allow for http connection
    expect(response.get('Set-Cookie')).toBeDefined();
})
