import 'bootstrap/dist/css/bootstrap.css'

/**
 * @component
 * @description Wraps entire application in a wrapper component, which provides access to global variables
 * @param Component
 * @param pageProps
 * @return {JSX.Element}
 */
const app =  ({Component, pageProps}) => {
    return <Component {...pageProps}/>
}

export default app;
