import React, {Component} from "react";
import Search from "../../Search/Search";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import RoomIcon from '@material-ui/icons/Room';
import MoreArrow from "./MoreArrow";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from '@material-ui/icons/Alarm';
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MoreInfo from "../MoreInfo/MoreInfo";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            groupHotels: [],
            id: 1,
        }
    }

    componentDidMount() {
        let url = 'http://127.0.0.1:8000/api/v1/hotels/test?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1'
        fetch(url)
            .then(res => res.json())
            .then(hotels => this.setState(
                {hotels: hotels.map(hotel => {hotel.isActiveState= false;hotel.moreInfo=false; return hotel})})
            );

    }

    setProviders = (providers, index) => {
        console.log(index)
        let hotels = this.state.hotels
        hotels[index].providers = providers;
        this.setState({hotels})
    }



    getHotels = async (hotelName, index) => {
        let hotels = this.state.hotels
        hotels[index].moreInfo = !this.state.hotels[index].moreInfo
        this.setState({hotels})
        if ((this.state.hotels[index].isActiveState = !this.state.hotels[index].isActiveState)){
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

        // this.state.hotels[index].isActiveState = !this.state.hotels[index].isActiveState


    }

    getHotelStars = (rating) => {
        // console.log(rating)
        // let stars = []
        // for (let i = 0; i < rating; i++) {
        //     stars.push(<i className="fas fa-star"/>)
        // }
        // console.log(stars)
        // return stars
        return new Array(rating).fill(<StarRoundedIcon className="text-warning"/>)
    }

    render() {
        if (this.state.hotels[0]) {
            console.log(this.state.hotels[0])
        }
        return (
            <div className="container rounded-3">
                <h3>Hotels List:</h3>
                <Search/>
                {
                    this.state.hotels.length ?
                        this.state.hotels.map(
                            (hotel, index) =>
                                <div id={hotel.name} key={hotel.name} className="my-2 bg-light rounded-3">
                                    <div className="d-flex flex-row">
                                        <div className="m-4">
                                            <img src={hotel.photos} className="rounded-3" width="250px" alt="hotel img"/>
                                        </div>
                                        <div className="m-4 ">
                                            <h4>{hotel.name}</h4>
                                            <p>{this.getHotelStars(hotel.classRating)}</p>
                                            <p><RoomIcon className="text-primary" /> {hotel.address.addressLine1}</p>
                                        </div>
                                        <div className="m-4">
                                            <span>{hotel.hotelPricing.startingAt.plain}</span>
                                            {/*<button onClick={() => this.getHotels(hotel.name, index)}*/}
                                            {/*        className="btn btn-primary m-4"*/}
                                            {/*        type="button">Button*/}
                                            {/*</button>*/}
                                            <div className="d-flex flex-row">
                                                <p>More Deals</p>
                                                <IconButton aria-label="delete" color="primary" onClick={() => this.getHotels(hotel.name, index)}>
                                                    <MoreArrow fontSize="large" />
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
                                        hotel.moreInfo?
                                        <div>
                                        <MoreInfo hotel={hotel} />
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