import buildClient from '../api/build-client'

const LandingPage = ({currentUser}) => {


    return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
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
    const client = buildClient(context)
    const {data} = await client.get('/api/users/v0/user/currentuser')
    return data
}


export default LandingPage;
