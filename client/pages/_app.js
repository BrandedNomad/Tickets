import 'bootstrap/dist/css/bootstrap.css'
import buildClient from "../api/build-client";
import Header from '../components/header.js';


/**
 * @component
 * @description Wraps entire application in a wrapper component, which provides access to global variables
 * @param currentUser
 * @param Component
 * @param pageProps
 * @return {JSX.Element}
 */
const AppComponent =  ({Component, pageProps, currentUser}) => {
    return (
        <div>

            <Header currentUser = {currentUser}/>
            <Component {...pageProps}/>
        </div>

    )
}

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
AppComponent.getInitialProps = async (appContext) => {

    //GLOBAL APP STATE

    //check if current user is authenticated
    const client = buildClient(appContext.ctx)
    const response = await client.get('/api/users/v0/user/currentuser')
        .catch((error)=>{
            console.log(error)
        })

    //INDIVIDUAL PAGE STATE

    //calls the getInitialProps function for the individual page that is being loaded
    //otherwise this will not be called, because it is being called in the AppComponent
    let pageProps = {};
    if(appContext.Component.getInitialProps){ //some pages don't have this defined
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    if(response !== undefined){
        return {
            pageProps,
            ...response.data
        }
    }else{
        return {
            pageProps
        }
    }

}

export default AppComponent;
