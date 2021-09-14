
import axios from 'axios'
import {useState} from 'react'

const useRequest = ({url, method, body, onSuccess})=>{
    //To
    const [errors,setErrors] = useState(null);

    const doRequest = async ()=>{
        try{
            //If request is success full, set errors to null
            setErrors(null)
            //make request
            const response = await axios[method](url,body)
            //call callback
            onSuccess(response.data)
            return response.data
        }catch(error){
            //create error component to display error
            console.log(error)
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oooops....</h4>
                    <ul className='my-0'>
                        {error.response.data.errors.map((error)=>{
                            return <li key={error.message}>{error.message}</li>
                        })}
                    </ul>
                </div>
            )
        }

    }

    return {doRequest, errors}
}

export default useRequest;
