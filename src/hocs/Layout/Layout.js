import React, {Component} from 'react';
import classes from "./Layout.css";
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import Nav from '../../components/UI/NavbarDrawer/NavbarDrawer';
import Navbar from '../../components/navbar/navbar';


class Layout extends Component {

    render() {
        return (
            <>
            {/* <div>{this.props.currentUser.name}</div> */}
                {/*Toolbar*/}
                <Navbar />

                {/* <Nav /> */}
                {/*Side Drawer*/}
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
                <Link to="/auth/verify">Verify Account</Link>
                <Link to="/auth/forget-password">Forgot Password</Link>
                <Link to="/auth/resend-verification-email">Resent Verification</Link>
                <Link to="/auth/reset-password">Reset Password</Link>
                <Link to="/">Home</Link>
                <main>
                    <button onClick={this.props.logout}>Logout</button>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;
