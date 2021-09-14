/**
 * @overview This file contains the client builder used for making api calls
 */

import axios from 'axios'

/**
 * @function This function determines wether the call is being made from a browser
 * or from the server and appends the nescesary base url and headers
 * @param req the req object that contains the headers. This is destructured off the context from getInitialProps
 * @return {AxiosInstance} a client that can be used to make the api call
 */
export default ({req}) => {

    if(typeof window === 'undefined'){ //Check if function is running inside of a browser or on a server
        //we are on the server
        return axios.create({
            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", //makes the request to the load-balancer
            headers: req.headers //append the necessary headers
        });

    } else {
        //we are in a browser
        //requests should be made to the base url
        return axios.create({
            baseURL: "/"
        })

    }

}
