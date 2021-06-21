import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import NewsLetterComponent from "./components/Newsletter/NewsLetterComponent";
class App extends Component {
    render() {
        return (
            <div>
               <NewsLetterComponent/>
            </div>
        );
    }
}

export default App;
