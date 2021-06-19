import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import FilterNavbar from "./components/Filter/NavbarComponent";
class App extends Component {
    render() {
        return (
            <div>
                <FilterNavbar/>
            </div>
        );
    }
}

export default App;
