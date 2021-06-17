import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Test from "./components/test";
import Test2 from "./components/test2";

class App extends Component {

    render() {
        // const {t} = this.props;
        return (
            <div>
                
                
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Test}/>
                        <Route path="/t" exact component={Test2}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default withTranslation()(App);
