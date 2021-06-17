import React, {Component} from 'react';
import classes from "./Layout.css";
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Layout extends Component {
    state = {}

    render() {
        return (
            <>
                {/*Toolbar*/}
                {/*Side Drawer*/}
                <main className={classes.Test}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;
