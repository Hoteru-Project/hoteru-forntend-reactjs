import React, {Component} from "react";
import classes from './ListHotels.css';
import Search from "../../Search/Search";
import RoomIcon from '@material-ui/icons/Room';
import MoreArrow from "./MoreArrow";
import IconButton from "@material-ui/core/IconButton";
import MoreInfo from "../MoreInfo/MoreInfo";
import HotelRating from "../HotelRating/HotelRating";
import SearchBox from "../../SearchBox/SearchBox";
import SearchFilter from "../../SearchFilter/SearchFilter";
import Progress from "../../SearchBox/Progress";
import {timeout} from "rxjs/operators";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            groupHotels: [],
            id: 1,
            fullUlr: "",
            apiUrl: "http://127.0.0.1:8000/api/v1/hotels/search?",
            urlQuery: "",
            checkIn: "checkIn=2021-06-07",
            checkOut: "checkOut=2021-06-08",
            location: "",
            rooms: "rooms=1",
            timeOut: false,
        }
        console.log(window.location.href )
    }

    setHotels = (hotels) => {
        this.setState({hotels: hotels})
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    setTimeOut = async (bool) => {
        await this.delay(400)
        this.setState({timeOut: bool})
    }

    timeOut = (bool) => {
        this.setState({timeOut: bool})
    }


    async componentDidMount() {
        await this.setApiUrl();
        await this.fetchHotels()
        await this.setTimeOut(true)
    }

    setApiUrl = async () => {
        const params = new URLSearchParams(decodeURI(window.location.search))
        for (const [key, val] of params) {
            if (key === "location") {
                console.log(key, val)
                await this.setState({location: val})
            }
        }
        let urlQuery = [this.state.checkIn, this.state.checkOut, "location=" + this.state.location, this.state.rooms].join("&")
        let fullUrl = [this.state.apiUrl, urlQuery].join("")
        await this.setState({urlQuery, fullUrl})
    }

    fetchHotels = async () => {
        await this.setApiUrl();
        console.log(this.state.fullUrl)
        fetch(this.state.fullUrl)
            .then(res => res.json())
            .then(hotels => this.setState({
                    hotels: hotels.map((hotel, index) => {
                        hotel.isActiveState = false;
                        hotel.moreInfo = false;
                        hotel.id = index;
                        return hotel;
                    })
                })
            );
    }

    setProviders = (providers, index) => {
        let hotels = this.state.hotels
        hotels[index].providers = providers;
        this.setState({hotels})
    }


    getHotels = async (hotelName, index) => {
        let hotels = this.state.hotels
        hotels[index].moreInfo = !this.state.hotels[index].moreInfo
        this.setState({hotels})
        if ((this.state.hotels[index].isActiveState = !this.state.hotels[index].isActiveState)) {
            this.state[hotelName] = []
            let url = "http://127.0.0.1:8000/api/v1/hotel?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1&name=" + hotelName;

            const providers = await fetch(url)
                .then(res => res.json())
                .then(providers => {
                    this.setState({[hotelName]: providers});
                    return providers;
                })
            this.setProviders(providers, index)
            console.log(this.state[hotelName])
        } else {
            this.setProviders([], index)
        }

    }


    render() {
        if (this.state.hotels[0]) {
            console.log("I AM HOTELS", this.state.hotels[0])
        }
        return (
            <div className="container rounded-3">
                <h3>Hotels List:</h3>
                {/*<Search updateSearch={this.updateSearchQuery} fetchHotels={this.fetchHotels} />*/}
                {/*<SearchBox updateUrl={this.updateSearchQuery} />*/}
                <SearchFilter fetchHotels={this.fetchHotels}/>
                {
                    window.location.href === "http://localhost:3000/" ? null
                        :
                        (this.state.hotels.length ?
                            this.state.hotels.map(

                                (hotel, index) =>
                                    <div id={hotel.name} key={hotel.name} className="my-2 bg-light rounded-3 hotelHeight">
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
                                                className="bg-white rounded-3 p-3">${hotel.hotelPricing.startingAt.plain} / per night</span>
                                                <div className="d-flex flex-row">
                                                    <p>More Info</p>
                                                    <IconButton aria-label="delete" color="primary"
                                                                onClick={() => this.getHotels(hotel.name, index)}>
                                                        <MoreArrow fontSize="large"/>
                                                    </IconButton>
                                                </div>

                                            </div>
                                            <div>

                                            </div>

                                        </div>
                                        {
                                            // hotel.providers?.map((provider) =>
                                            //     <div>
                                            //         <MoreInfo />
                                            //         {/*<span>{provider.name}</span>*/}
                                            //         {/*<span>{provider.hotelPricing.startingAt.plain}</span>*/}
                                            //     </div>
                                            // )
                                            hotel.moreInfo ?
                                                <div>
                                                    <MoreInfo hotel={hotel}/>
                                                    {/*<span>{provider.name}</span>*/}
                                                    {/*<span>{provider.hotelPricing.startingAt.plain}</span>*/}
                                                </div> : null

                                        }
                                    </div>
                            )
                            : null)
                }
                {

                }
                {
                    window.location.href === "http://localhost:3000/" ? null : this.state.timeOut === false ?
                        <div className="w-50 mx-auto">
                            <Progress/>
                        </div>
                        :
                        this.state.hotels.length ? null :
                        <div className="alert alert-warning w-50 mt-4 p-2 mx-auto text-center" role="alert">
                            <span className="text-body m-0">
                                Sorry, no hotels found
                            <i className="fas fa-sad-tear ml-2"/>
                            </span>
                        </div>
                }
            </div>
        );
    }
}

export default ListComponent;