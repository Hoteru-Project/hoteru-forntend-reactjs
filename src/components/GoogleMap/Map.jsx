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
        center: {lat: 31.2000924, lng: 29.9187387},
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
        console.log(this.props.center.lat)
        console.log(this.props.center.lng)
        return (
            // Important! Always set the container height explicitly
            <div className="mx-auto" style={{ height: '50vh' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: this.state.key}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    height='300px'
                    // options={this.getMapOptions}
                >
                    {/*<AnyReactComponent text="MY MARKER" />*/}
                    <Marker
                        name="Marker"
                        color="#EA4335"
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                    />
                </GoogleMapReact>

            </div>
        );
    }
}

export default Map;