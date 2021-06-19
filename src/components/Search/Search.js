import {Component} from "react";
import Autocomplete from "react-google-autocomplete";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: process.env.REACT_APP_MAP_KEY,
        }
    }

    render() {
        return (
            <Autocomplete className="form-control mt-5"
                          apiKey={this.state.key}
                          onPlaceSelected={
                              (place) =>
                                  this.changePlace(place.geometry.location.lat(), place.geometry.location.lng())
                          }
            />
        )
    }

    changePlace = (lat, lng) => {
        let newPlace = {
            lat: lat,
            lng: lng
        }
        this.setState({center: newPlace})
    }
}

export default Search;