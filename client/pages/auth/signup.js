/**
 * @overview This file contains the signup page
 */
import {useState} from 'react'
import Router from 'next/router'
import useRequest from "../../hooks/use-request";

/**
 * @page Signup
 * @description A page where new users can signup for an account using their credentials
 * @return {JSX.Element}
 */
const signup = ()=>{

    //keeps track of user credentials
    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')

    //creates a client object that can be called when the user submits the form
    const {doRequest, errors, onSuccess} = useRequest({
        url:"/api/users/v0/user/signup",
        method:'post',
        body:{
            email,
            password
        },
        onSuccess: ()=>{
            Router.push('/')
        }
    })

    //sends user credentials to auth server to create a new account
    const submit = async (event)=>{
        event.preventDefault()
        await doRequest();
    }

    //returns jsx component
    return (
        <form onSubmit={submit}>
            <h1>Sign Up</h1>
            <div className ="form-group">
                <label>Email Address</label>
                <input
                    className="form-control"
                    value={email}
                    onChange={(event)=>{
                        setEmail(event.target.value)
                    }}
                />
            </div>
            <div className = "form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event)=>{
                        setPassword(event.target.value)
                    }}
                />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default signup
