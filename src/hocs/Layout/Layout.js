import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Layout extends Component {

    render() {
        return (
            <>
            <div>Welcome {this.props.currentUser.name}</div>
                {/*Toolbar*/}
                {/*Side Drawer*/}
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
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
