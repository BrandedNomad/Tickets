import buildClient from '../api/build-client'

const LandingPage = ({currentUser}) => {

    console.log("LandingPage",currentUser)
    return <h1>Landing Page</h1>;
};

/**
 * @function getInitialProps
 * @description
 * Used to modify or update component props before the component is rendered.
 * This is a great place for api calls or http requests.
 * This method is executed by the server, during/when:
 * - Hard refresh of page
 * - Clicking link from different domains
 * - Typing the URL into the address bar
 * This method is executed by the client, during/when:
 * - Navigating from one page to another while in the app.
 * @return {{}} The props that will be passed into the component
 */
LandingPage.getInitialProps = async (context) => {

    //check if current user is authenticated
    //NB the request is not made from the browser, but the server
    //In this case the request is reaching out to another namespace
    //So the request needs to be made to Http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
    //In order to get the name space: kubectl get namespace
    //In order to get the service name: kubectl get services -n [add namespace]
    // const url = `https://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/v0/user/currentuser`
    // const response = await axios.get(url)
    // //returns user data if authenticated
    // return response.data
    const client = buildClient(context)
    const {data} = await client.get('/api/users/v0/user/currentuser')
    return data

}


export default LandingPage;
