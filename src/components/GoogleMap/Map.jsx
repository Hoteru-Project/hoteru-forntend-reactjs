import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: process.env.REACT_APP_MAP_KEY,
            center: {lat: this.props.center.lat, lng: this.props.center.lng},
            zoom: this.props.zoom
        }
    }

    static defaultProps = {
        // center: {lat: this.props.center.lat, lng: this.props.center.lng},
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
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.center.zoom}
                    height='300px'
                    // options={this.getMapOptions}
                >
                    {/*<AnyReactComponent text="MY MARKER" />*/}
                    {/*<MapInfoBox*/}
                    {/*    name="Marker"*/}
                    {/*    color="#EA4335"*/}
                    {/*    lat={this.props.center.lat+0.002}*/}
                    {/*    lng={this.props.center.lng}*/}
                    {/*/>*/}
                    <Marker
                        hotel={this.props.hotel}
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