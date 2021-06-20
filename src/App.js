import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import FilterDisplayComponent from "./components/Filter/FilterDisplayComponent";
class App extends Component {
    render() {
        return (
            <div>
                <FilterDisplayComponent/>
            </div>
        );
    }
}

export default App;
