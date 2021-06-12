import React, {Component} from 'react';
import classes from "./Layout.css";

class Layout extends Component {
    state = {}

    render() {
        return (
            <>
                {/*Toolbar*/}
                {/*Side Drawer*/}
                <main>
                    asf
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;
