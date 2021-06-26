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
import Animations from "../loadingInfo";
import FilterDisplayComponent from "../../Filter/FilterDisplayComponent";
import GuestRating from "./GuestRating";
import {withTranslation} from "react-i18next";

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
        await this.setState({locationType})
    }


    async componentDidMount() {
        await this.setUrlParams()
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
        let fullUrl = [this.state.apiUrl, urlQuery].join("")
        await this.setState({urlQuery, fullUrl})
    }

    setTest = async (url) => {
        await this.setState({test: url})
    }

    axiosFetch = async (url) => {
        this.setState({isLoading: true})
        await instance.get(url)
            .then((response) => {
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
        this.setState({hotels: []});
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
            let params = "checkIn=" + checkIn + "&checkOut=" + checkOut + "&location=" + location + "&rooms=1&name=" + hotelName;

            console.log("BEFORE AXIOS")
            hotels[index].isInfoLoading = !hotels[index].isInfoLoading
            await this.setState({hotels})
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
        const {t} = this.props;
        return (
            <div className="container rounded-3 my-4">
                <div>
                    {/*<h3>{t("Search")}</h3>*/}
                    <h2 className="my-4" style={{fontSize: "3rem"}}>
                        <span className="badge bg-light text-body">{t("Search")}</span>
                    </h2>
                    <div className="bg-light rounded-3 p-2">
                        <SearchFilter fetchHotels={this.fetchHotels}
                                      updateDates={this.updateDate}
                                      updateLocationType={this.setLocationType}
                                      setTest={this.setTest}
                        />
                        <div className="p-2 ml-4">

                        </div>
                    </div>

                </div>
                <Route path="/hotels">
                    <div className="my-2 rounded-3">
                        <FilterDisplayComponent fetchHotels={this.fetchHotels}/>
                    </div>

                    <h2 className="my-4 text-center" style={{fontSize: "3rem"}}>
                        <span className="badge bg-secondary">{t("Hotels_List")}</span>
                    </h2>
                    {
                        this.state.hotels.map(
                            (hotel, index) =>
                                <div id={hotel.name} key={hotel.name}
                                     className="my-2 bg-light rounded-3 hotelHeight">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            <div className="m-4">
                                                <img src={hotel.photos} className="rounded-3" height="100%"
                                                     width="250px"
                                                     alt="hotel img"/>
                                            </div>
                                            <div className="my-4">
                                                <div className="bg-white rounded-3 p-2">
                                                    <h4>{hotel.name}</h4>
                                                    <HotelRating stars={hotel.classRating}/>
                                                    <div className="d-flex flex-row my-2">
                                                        <div className="px-2">
                                                            <GuestRating
                                                                rating={hotel.guestReviews.overallRating.toFixed(1)}/>
                                                        </div>
                                                        <p className="px-2">
                                                            ({hotel.guestReviews.numberOfReviews} {t("reviews_home")})
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>

                                                </div>
                                                <div>
                                                    <p className="mt-4 bg-white rounded-3 p-3"><RoomIcon
                                                        className="text-primary"/> {hotel.address.addressLine1}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center p-4">
                                            <div className="mt-5">
                                                <span style={{backgroundColor: "lightgreen"}}
                                                      className="rounded-3 p-3">{hotel.hotelPricing.startingAt.formatted} / {t("night")}</span>
                                            </div>
                                            <div className="mt-4">
                                                <div className="">
                                                    <div className="d-flex flex-row bg-white">
                                                        <p className="m-2 mt-3">{t("more_info")}</p>
                                                        <IconButton aria-label="delete" color="primary"
                                                                    onClick={() => this.getHotelProviders(hotel.name, index)}>
                                                            <MoreArrow fontSize="large"/>

                                                        </IconButton>
                                                    </div>
                                                </div>

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
                                {t("no_hotel")} <i className="fas fa-sad-tear ml-2"/>
                            </span>
                    </div>
                    }
                </Route>
            </div>
        );
    }

}

export default withTranslation()(ListComponent);
