import React, {Component} from "react";
import classes from './ListHotels.css';
import Search from "../../Search/Search";
import RoomIcon from '@material-ui/icons/Room';
import MoreArrow from "./MoreArrow";
import IconButton from "@material-ui/core/IconButton";
import MoreInfo from "../MoreInfo/MoreInfo";
import HotelRating from "../HotelRating/HotelRating";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            groupHotels: [],
            id: 1,
            fullUlr: "",
            baseUrl: "http://127.0.0.1:8000/api/v1/hotels/search?",
            urlQuery: "",
            checkIn: "checkIn=2021-06-07",
            checkOut: "checkOut=2021-06-08",
            location: "",
            rooms: "rooms=1",
        }

        // const params = Object.fromEntries(urlSearchParams.entries());
    }

    async componentDidMount() {

        const params = new URLSearchParams(decodeURI(window.location.search))
        for (const [key, val] of params) {
            if (key === "location") await this.setState({location: val})
        }
        let urlQuery = [this.state.checkIn, this.state.checkOut, "location="+this.state.location, this.state.rooms].join("&")
        let fullUrl = [this.state.baseUrl, urlQuery].join("")
        this.setState({urlQuery, fullUrl})
        // const queryString = window.location.search;
        // console.log(decodeURI(queryString));
        let url = 'http://127.0.0.1:8000/api/v1/hotels/search?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1'
        fetch(fullUrl)
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
            let url = "http://127.0.0.1:8000/api/v1/hotel?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1" + "&name=" + hotelName;

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

    updateSearchQuery = async (searchQuery) => {
        await this.setState({location: searchQuery});
        let urlParams = [
            this.state.checkIn, this.state.checkOut,
            "location="+encodeURIComponent(this.state.location), this.state.rooms
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.baseUrl, urlParams].join("")
        await this.setState({fullUrl})
        console.log(fullUrl)
    }
    getHotelStars = (rating) => {
        // let stars = []
        // for (let i = 0; i < rating; i++) {
        //     stars.push(<StarRoundedIcon className="text-warning"/>)
        // }
        // return stars

        // return new Array(rating).fill(<StarRoundedIcon className="text-warning"/>)
    }

    render() {
        if (this.state.hotels[0]) {
            console.log(this.state.hotels[0])
        }
        return (
            <div className="container rounded-3">
                <h3>Hotels List:</h3>
                <Search updateSearch={this.updateSearchQuery} />
                {
                    this.state.hotels.length ?
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
                        : <div>loading...</div>
                }
            </div>
        );
    }
}

export default ListComponent;