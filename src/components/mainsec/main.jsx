import React, {Component} from 'react';
import SearchFilter from "../SearchFilter/SearchFilter";
import CheckDate from "../Search/CheckDate";

const today = new Date();

class MainSec extends Component {
    state = {
        checkIn: new Date(),
        checkOut: null,
    }
    setCheckDate = (checkInOut) => (checkDate) => {
        this.setState({[checkInOut]: checkDate})
    }

    render() {
        const checkIn = this.state.checkIn;
        const checkOutMinDate = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + 1)
        const checkMaxDate = new Date(today.getFullYear(), today.getMonth() + 4, 0)
        return (
            <>
                <SearchFilter />
                <div className="p-2">
                    <CheckDate dateSetter={this.setCheckDate("checkIn")} minDate={today} maxDate={checkMaxDate}/>
                    <CheckDate dateSetter={this.setCheckDate("checkOut")} minDate={checkOutMinDate}
                               maxDate={checkMaxDate}/>
                </div>
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