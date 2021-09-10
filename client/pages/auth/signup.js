
import {useState} from 'react'
import useRequest from "../../hooks/use-request";

const signup = ()=>{

    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const {doRequest, errors} = useRequest({
        url:'/api/users/v0/user/signup',
        method:'post',
        body:{
            email,
            password
        }
    })

    const submit = async (event)=>{
        event.preventDefault()

       await doRequest();




    }

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
