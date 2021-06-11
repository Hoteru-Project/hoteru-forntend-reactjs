import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
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
            <div className="mx-auto" style={{ height: '50vh', width: '70%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyA25umcMcwofwQS24kyeqOJUBjf8fYXQZQ" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    // options={this.getMapOptions}
                >
                    <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        name="My Marker"
                        color="red"
                    />
                </GoogleMapReact>

            </div>
        );
    }
}

export default Map;