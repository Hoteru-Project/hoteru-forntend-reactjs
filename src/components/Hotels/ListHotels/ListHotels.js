import React, {Component} from "react";
import RoomIcon from '@material-ui/icons/Room';
import MoreArrow from "./MoreArrow";
import IconButton from "@material-ui/core/IconButton";
import MoreInfo from "../MoreInfo/MoreInfo";
import HotelRating from "../HotelRating/HotelRating";
import SearchFilter from "../../SearchFilter/SearchFilter";
import Progress from "../../SearchBox/Progress";
import instance from "../../../axios-backend";
import {Route} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Animations from "../loadingInfo";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FilterDisplayComponent from "../../Filter/FilterDisplayComponent";

class ListComponent extends Component {
    state = {
        hotels: [],
        groupHotels: [],
        id: 1,
        apiUrl: "http://127.0.0.1:8000/api/v1/hotels/search?",
        urlQuery: "",
        checkIn: "",
        checkOut: "",
        location: "",
        rooms: "rooms=1",
        locationType: "",
        isLoading: false,
        test: ""
    }

    setHotels = (hotels) => {
        this.setState({hotels: hotels})
    }

    setLocationType = async (locationType) => {
        console.log(">>>>>>>>>>>>TYPE", locationType)
        await this.setState({locationType})
        const url = "hotels/search?" + this.state.urlQuery + "&locationType=" + this.state.locationType
        console.log(">>>>>>>>>>>>TYPE", url)

    }


    async componentDidMount() {
        await this.setUrlParams()
        // const searchParams = new URLSearchParams(decodeURI(window.location.search))
        // const params = Object.fromEntries(searchParams.entries());
        // if(window.location.pathname.startsWith("/hotels")) {
        //     console.log("here")
        //     this.setState({isLoading: true})
        //     await instance.get("/hotels/search", {params})
        //         .then(response => this.setHotelsState(response.data))
        //         .catch(error => console.log(error));
        //     this.setState({isLoading: false})
        // }

    }

    setUrlParams = async () => {
        const searchParams = new URLSearchParams(decodeURI(window.location.search))
        console.log(searchParams)
        const params = Object.fromEntries(searchParams.entries());
        if (window.location.pathname.startsWith("/hotels")) {
            this.setState({isLoading: true})
            await instance.get("/hotels/search", {params})
                .then(response => this.setHotelsState(response.data))
                .catch(error => console.log(error));
            this.setState({isLoading: false})
        }
    }

    setApiUrl = async () => {
        const params = new URLSearchParams(decodeURI(window.location.search))
        for (const [key, val] of params) {
            if (key === "location") {
                await this.setState({location: val})
            }
        }
        let urlQuery = [this.state.checkIn, this.state.checkOut,
            "location=" + encodeURI(this.state.location), this.state.rooms
        ].join("&")
        // if (locationType !== ""){ urlQuery+="&locationType="+locationType }
        let fullUrl = [this.state.apiUrl, urlQuery].join("")
        await this.setState({urlQuery, fullUrl})
    }

    setTest = async (url) => {
        await this.setState({test: url})
    }

    axiosFetch = async (url) => {
        this.setState({isLoading: true})
        // const axios = require('axios');
        // console.log("====AXIOS START====")
        // const url = "hotels/search?" + this.state.urlQuery
        // console.log("<<<<<<<<<<<urlQuery", url)
        await instance.get(url)
            .then((response) => {
                // console.log("====AXIOS RESPONSE", response.data);
                this.setHotelsState(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({isLoading: false})
    }

    setHotelsState = (hotels) => {
        const newHotels = hotels.map((hotel, index) => {
            hotel.isActiveState = false;
            hotel.moreInfo = false;
            hotel.isInfoLoading = false;
            hotel.id = index;
            return hotel;
        })
        this.setState({hotels: newHotels})

    }


    fetchHotels = async (url) => {
        await this.setApiUrl();
        await this.axiosFetch(url)
    }

    setProviders = (providers, index) => {
        let hotels = this.state.hotels
        hotels[index].providers = providers;
        this.setState({hotels})
    }


    getHotelProviders = async (hotelName, index) => {
        let location = new URLSearchParams(decodeURI(window.location.search)).get("location")
        let checkIn = new URLSearchParams(decodeURI(window.location.search)).get("checkIn")
        let checkOut = new URLSearchParams(decodeURI(window.location.search)).get("checkOut")
        let hotels = this.state.hotels
        hotels[index].moreInfo = !this.state.hotels[index].moreInfo
        this.setState({hotels})
        if ((this.state.hotels[index].isActiveState = !this.state.hotels[index].isActiveState)) {
            this.state[hotelName] = []
            // let url = "http://127.0.0.1:8000/api/v1/hotel?checkIn="+checkIn+"&checkOut="+checkOut+"&location="+location+"&rooms=1&name=" + hotelName;
            let params = "checkIn=" + checkIn + "&checkOut=" + checkOut + "&location=" + location + "&rooms=1&name=" + hotelName;

            console.log("BEFORE AXIOS")
            hotels[index].isInfoLoading = !hotels[index].isInfoLoading
            await this.setState({hotels})
            // this.setState({[hotels[index].isInfoLoading]: true})
            // this.setState({[hotelName.isProvidersLoading]: true})
            let providers = await instance.get("/hotel?" + params)
                .then((response) => {
                    this.setState({[hotelName]: response.data});
                    return response.data;
                })
                .catch(error => console.log(error));
            hotels[index].isInfoLoading = !hotels[index].isInfoLoading
            await this.setState({hotels})

            console.log(providers)
            console.log("AFTER AXIOS")
            this.setProviders(providers, index)
            // console.log("<<<<PROVIDERS", checkIn, checkOut)
        } else {
            this.setProviders([], index)
        }

    }

    updateDate = (date, type) => {
        if (type === "checkIn")
            this.setState({checkIn: date})
        if (type === "checkOut")
            this.setState({checkOut: date})
    }

    render() {
        console.log(this.state.hotels)
        if (this.state.hotels[0]) {
            console.log("I AM HOTELS", this.state.hotels)
        }
        return (
            <div className="container rounded-3">
                <h3>Search </h3>
                <SearchFilter fetchHotels={this.fetchHotels}
                              updateDates={this.updateDate}
                              updateLocationType={this.setLocationType}
                              setTest={this.setTest}
                />
                <Button variant="contained" color="primary" className="p-2"
                        size="small" onClick={this.setUrlParams}
                >search
                    <SearchRoundedIcon className="ml-1" />
                </Button>
                <Route path="/hotels">
                    <FilterDisplayComponent fetchHotels={this.fetchHotels} />

                    <h3>Hotels List:</h3>
                    {
                        this.state.hotels.map(
                            (hotel, index) =>
                                <div id={hotel.name} key={hotel.name}
                                     className="my-2 bg-light rounded-3 hotelHeight">
                                    <div className="d-flex flex-row">
                                        <div className="m-4">
                                            <img src={hotel.photos} className="rounded-3" width="250px"
                                                 alt="hotel img"/>
                                        </div>
                                        <div className="m-4">
                                            <div className="mb-2 bg-white rounded-3 p-3">
                                                <h4>{hotel.name}</h4>
                                                <HotelRating stars={hotel.classRating}/>
                                            </div>
                                            <p className="mt-4 bg-white rounded-3 p-3"><RoomIcon
                                                className="text-primary"/> {hotel.address.addressLine1}</p>
                                        </div>
                                        <div className="m-4">
                                    <span
                                        className="bg-white rounded-3 p-3">${hotel.hotelPricing.startingAt.plain} / per night
                                    </span>
                                            <div className="d-flex flex-row">
                                                <p>More Info</p>
                                                <IconButton aria-label="delete" color="primary"
                                                            onClick={() => this.getHotelProviders(hotel.name, index)}>
                                                    <MoreArrow fontSize="large"/>
                                                </IconButton>
                                            </div>

                                        </div>
                                    </div>
                                    {
                                        hotel.isInfoLoading &&
                                            <div className="w-50 mx-auto p-4 container">
                                                <Animations/>
                                            </div>
                                    }
                                    {
                                        hotel.moreInfo && !hotel.isInfoLoading &&
                                            <div>
                                                <MoreInfo hotel={hotel}/>
                                            </div>

                                    }
                                </div>
                        )
                    }

                    {this.state.isLoading &&
                    <div className="w-100 mx-auto">
                        <Progress/>
                    </div>
                    }
                    {!this.state.isLoading && !this.state.hotels.length &&
                    <div className="alert alert-warning w-50 mt-4 p-2 mx-auto text-center" role="alert">
                            <span className="text-body m-0">
                                Sorry, no hotels found
                            <i className="fas fa-sad-tear ml-2"/>
                            </span>
                    </div>
                    }
                </Route>
            </div>
        );
    }
}

export default ListComponent;