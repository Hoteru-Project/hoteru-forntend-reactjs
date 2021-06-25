import React, {Component} from 'react';
import ListHotels from "../Hotels/ListHotels/ListHotels";

import RecentVisits from '../RecentVisits/RecentVisits';
import PopularPlaces from '../PopularPlaces/PopularPlaces';
import NearByHotels from '../NearByHotels/NearByHotels';
import {authenticationService} from "../../services/authentication.service";
import {withRouter} from "react-router-dom";

class MainSec extends Component {
    requestSearch =  (location, locationType) => () => {
        const rooms=1;
        const today = new Date();
        today.setUTCHours(1, 0, 0, 0);;
        const nextTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()+2);
        nextTime.setUTCHours(1, 0, 0, 0);


        const params = [
            `location=${location}`,
            `checkIn=${today.toISOString().split("T")[0]}`,
            `checkOut=${nextTime.toISOString().split("T")[0]}`,
            `locationType=${locationType}`,
            `rooms=${rooms}`
        ]
        this.props.history.push("/hotels?"+params.join("&"))
    }

    render() {
        return (
            <>
                <ListHotels />
                {authenticationService.isAuthenticated() && <RecentVisits requestSearch={this.requestSearch} />}
                <PopularPlaces requestSearch={this.requestSearch} />
                <NearByHotels  requestSearch={this.requestSearch}/>
            </>
        );
    }
}

export default withRouter(MainSec);
