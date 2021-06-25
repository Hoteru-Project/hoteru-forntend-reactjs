import React, {Component} from 'react';
import ListHotels from "../Hotels/ListHotels/ListHotels";

import RecentVisits from '../RecentVisits/RecentVisits';
import PopularPlaces from '../PopularPlaces/PopularPlaces';
import NearByHotels from '../NearByHotels/NearByHotels';
import {authenticationService} from "../../services/authentication.service";


class MainSec extends Component {

    render() {
        return (
            <>
                <ListHotels />
                {authenticationService.isAuthenticated() && <RecentVisits />}
                <PopularPlaces />
                <NearByHotels />
            </>
        );
    }
}


export default MainSec;
