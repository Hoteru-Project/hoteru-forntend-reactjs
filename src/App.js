import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        {/*<Route path="/" exact component={}/>*/}
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
