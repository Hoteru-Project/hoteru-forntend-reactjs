import React, {useState} from "react";

import ReactDOM from "react-dom";
import getDocumentElement from "@popperjs/core/lib/dom-utils/getDocumentElement";

const {compose, withProps, lifecycle} = require("recompose");
const {withScriptjs} = require("react-google-maps");
const {
    StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const composeFn = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAA6y5ND_0Ap3-_wp4qvpKDVrsex10nhCs&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onInputSearchBoxMounted: (ref)=> {
                    refs.searchBoxInput = ref;
                },
                onPlacesChanged: async (props) => {
                    const places = refs.searchBox.getPlaces();
                    // console.log("props", props)
                    console.log("INPUT VALUE",refs.searchBoxInput.value)
                    console.log("I AM PLACES ", places)
                    if (places[0]) {
                        this.setState({places, error: false, searchQuery: places[0].formatted_address});
                        let updateUrl = decodeURI(refs.searchBoxInput.value)
                        let isHotel = places[0].types.includes("lodging")
                        props.updateSearchState(updateUrl, isHotel ? "hotel" : "place")
                        if(window.location.pathname.startsWith("/hotels")) {
                            props.updateUrl(updateUrl, isHotel ? "hotel" : "place")
                        }
                    } else {
                        props.updateUrl("           ")
                        this.setState({error: true})
                    }
                }
            });
        }
    }),
    withScriptjs
)


const SearchBox = (props) => {
    const searchParamLocation = (new URLSearchParams(window.location.search)).get("location");
    const getSearchQuery = (event) => {
        console.log("EVENT_____", event.target.value)
    }
    return (
        <div data-standalone-searchbox="">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={() => {
                    props.onPlacesChanged(props)
                }}
                hideSuggestions={true}
                onChange={getSearchQuery}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a location"
                    ref={props.onInputSearchBoxMounted}
                    defaultValue={searchParamLocation}
                />
            </StandaloneSearchBox>
            {/*<ol>*/}
            {/*    {props.places.map(*/}
            {/*        (place, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                {place.name}*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</ol>*/}
            {
                props.error ? <div className="alert alert-danger mt-4 p-2" role="alert">
                        <p className="text-body m-0">Please, Enter a correct location!!</p>
                    </div>
                    : null
            }
        </div>
    );
}

export default composeFn(SearchBox);