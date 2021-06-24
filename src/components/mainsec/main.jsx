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
                <div className="container-fluid my-3">
                    <h1 className="text-center my-3">Explore more travel vacation rentals</h1>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <img className="w-100 card-img-top"
                                     src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                     alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Apartments</h5>
                                    <p className="card-text">156.226 properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img className="w-100 card-img-top"
                                     src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                     alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Apartments</h5>
                                    <p className="card-text">156.226 properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img className="w-100"
                                     src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                     className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Apartments</h5>
                                    <p className="card-text">156.226 properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img className="w-100"
                                     src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                     className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Apartments</h5>
                                    <p className="card-text">156.226 properties</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default MainSec;
