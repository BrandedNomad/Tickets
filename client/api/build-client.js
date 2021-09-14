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
const buildClient = ({req}) => {

    if(typeof window === 'undefined'){ //Check if function is running inside of a browser or on a server
        //we are on the server
        //In this case the request is reaching out to another namespace
        //So the request needs to be made to Http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
        //In order to get the name space: kubectl get namespace
        //In order to get the service name: kubectl get services -n [add namespace]
        return axios.create({
            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", //makes the request to the load-balancer
            headers: req.headers //append the necessary headers
        });

    } else {
        //we are in a browser
        //requests should be made to the base url
        //no headers nescesary
        return axios.create({
            baseURL: "/"
        })
    }
}

export default buildClient;
