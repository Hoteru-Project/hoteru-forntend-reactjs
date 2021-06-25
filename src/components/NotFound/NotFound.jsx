import React, { Component } from 'react';
import classes from './NotFound.css';
const NotFound = () => {
    return ( 
        <>

            <div className={classes.notfoundP}>
                    <div className={classes.notfound}>
                        <div className={classes.notfound404}>
                            <h3 className={classes.notfoundh3}>Oops! Page not found</h3>
                            <h1 className={classes.notfound404h1}><span className={classes.notfoundh1span}>4</span><span className={classes.notfoundh1span}>0</span ><span className={classes.notfoundh1span}>4</span></h1>
                        </div>
                        <h2 className={classes.notfoundh2}>we are sorry, but the page you requested was not found</h2>
                    </div>
            </div>
        </>
     );
}
 
export default NotFound;