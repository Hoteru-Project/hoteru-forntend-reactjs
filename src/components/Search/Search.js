import {Component} from "react";
import Autocomplete from "react-google-autocomplete";
import {withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: process.env.REACT_APP_MAP_KEY,
            placesKey: process.env.REACT_APP_GOOGLE_PLACES,
            apiUrl: "",
            baseUrl: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=geometry,name&language=en&",
            placesQuery: "",
            place: "",
            searchError: false
        }
    }

    render() {
        return (
            <>
                <Autocomplete className="form-control mt-5"
                              apiKey={this.state.key}
                              onPlaceSelected={
                                  (place) => {
                                      // this.changePlace(place.geometry.location.lat(), place.geometry.location.lng())
                                      this.checkPlaceObject(place)
                                  }
                              }
                />
                {
                    this.state.searchError === false ? null : (
                        <div className="alert alert-danger mt-4 p-2" role="alert">
                            <p className="text-body m-0">Please, Enter a correct location!!</p>
                        </div>
                    )
                }
            </>
        )
    }

    async checkPlaceObject(place) {
        if (place.formatted_address) {
            await this.setState({place: place.formatted_address, searchError: false})
            this.props.updateSearch(place.formatted_address)
            this.props.history.push('/hotels?location=' + place.formatted_address)
        } else {
            let input = "input=" + encodeURIComponent(place.name)
            let key = "key=" + this.state.placesKey
            let placesQuery = [input, key].join("&")
            let apiUrl = [this.state.baseUrl, placesQuery].join("")
            let response = await fetch(apiUrl)
            let data = await response.json()
            if (data.status === "OK") {
                this.setState({searchError: false})
                this.props.history.push('/hotels?location=' + encodeURIComponent(place.name))
            } else {
                this.setState({searchError: true})
            }
            this.setState({place: place.name, placesQuery})
            this.props.updateSearch(place.name)
        }
    }

    changePlace = (lat, lng) => {
        let newPlace = {
            lat: lat,
            lng: lng
        }
        this.setState({center: newPlace})
    }
}

export default withRouter(Search);