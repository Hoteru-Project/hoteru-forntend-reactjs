import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: process.env.REACT_APP_MAP_KEY
        }
    }

    static defaultProps = {
        center: {lat: 40.73, lng: -73.93},
        zoom: 12
    }
    getMapOptions = (maps) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };
    render() {
        return (
            // Important! Always set the container height explicitly
            <div className="mx-auto" style={{ height: '50vh' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: this.state.key}}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    height='300px'
                    // options={this.getMapOptions}
                >
                    <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        name="My Marker"
                        color="#EA4335"
                    />
                </GoogleMapReact>

            </div>
        );
    }
}

export default Map;