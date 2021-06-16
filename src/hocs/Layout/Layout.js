import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Layout extends Component {

    render() {
        return (
            <>
            <div>Welcome {this.props.currentUser.name}</div>
                {/*Toolbar*/}
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
