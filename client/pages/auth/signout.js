import {useEffect} from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Signout = () =>{
    const {doRequest,onSuccess} = useRequest({
        url:'/api/users/v0/user/signout',
        method:'post',
        body:{},
        onSuccess: ()=>{
            Router.push('/')
        }
    })

    useEffect(async ()=>{
        await doRequest()
    },[])

    return <div>Signing you out...</div>
}

export default Signout;
