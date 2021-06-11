import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Map from "./Components/Map/Map";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 31.2000924,
                lng: 29.9187387
            },
            zoom: 13
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>hello</h1>
                    <Map
                        center={this.state.center}
                        zoom={this.state.zoom}
                    />
                </div>
            </div>
        );
    }


}

export default App;
