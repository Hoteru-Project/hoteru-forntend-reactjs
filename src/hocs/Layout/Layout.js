import React, {Component} from 'react';
import Navbar from '../../components/navbar/navbar';
import classes from "./Layout.css";
import Footer from '../../components/footer/footer';
import MainSec from '../../components/mainsec/main';

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
                <MainSec />
                <Footer />
            </>
        );
    }
}

export default Layout;
