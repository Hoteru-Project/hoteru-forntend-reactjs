import React, {Component} from 'react';
import Navbar from '../../components/navbar/navbar';
import classes from "./Layout.css";


class Layout extends Component {

    render() {
        return (
            <>
                {/* <div>{this.props.currentUser.name}</div> */}
                <Navbar/>
                {/* <Nav /> */}
                {/*Side Drawer*/}
                    <main className={classes.Container}>
                        {this.props.children}
                    </main>
            </>
        );
    }
}

export default Layout;
