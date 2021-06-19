import React, {Component} from 'react';
import Navbar from '../../components/navbar/navbar';


class Layout extends Component {

    render() {
        return (
            <>
                {/* <div>{this.props.currentUser.name}</div> */}
                <Navbar/>
                {/* <Nav /> */}
                {/*Side Drawer*/}
                    <main>
                        {this.props.children}
                    </main>
            </>
        );
    }
}

export default Layout;
