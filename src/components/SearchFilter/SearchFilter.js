import React, {Component} from "react";
import SearchBox from "../SearchBox/SearchBox";
import {withRouter} from "react-router-dom";
import CheckDate from "../Search/CheckDate";

const today = new Date();

class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullUlr: "",
            urlQuery: "",
            apiUrl: "http://127.0.0.1:8000/api/v1/hotels/search?",
            fullUrl: "",
            urlParams: "",
            checkIn: "checkIn=2021-06-07",
            checkOut: "checkOut=2021-06-08",
            location: "",
            rooms: "rooms=1",
            checkInDate: new Date(),
            checkOutDate: null,
        }
    }

    setCompCheckDate = (date, type) => {
        console.log("I AM HERE DATE TYPE ", date, type)
        if (type === "checkIn") {
            this.setState({checkIn: "checkIn=" + date})
        }
        if (type === "checkOut") {
            this.setState({checkOut: "checkOut=" + date})
        }
    }

    updateSearchQuery = async (searchQuery) => {
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn, this.state.checkOut,
            "location=" + encodeURIComponent(this.state.location), this.state.rooms
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.apiUrl, urlParams].join("")
        await this.setState({fullUrl})
        this.checkSearchUpdated()
        await this.props.fetchHotels()
        console.log(fullUrl)
    }

    checkSearchUpdated = () => {
        this.props.history.push('/hotels?location=' + this.state.location)
    }

    setCheckDate = (checkInOut) => (checkDate) => {
        this.setState({[checkInOut]: checkDate})
    }

    render() {
        const checkInDate = this.state.checkInDate;
        const checkOutMinDate = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate() + 1)
        const checkMaxDate = new Date(today.getFullYear(), today.getMonth() + 4, 0)
        return (
            <div className="container">
                <div className="mx-auto">
                    <SearchBox updateUrl={this.updateSearchQuery}/>
                    <div className="p-2 d-flex flex-row">
                        <CheckDate dateSetter={this.setCheckDate("checkInDate")}
                                   minDate={today} maxDate={checkMaxDate}
                                   setcheckDate={this.setCompCheckDate} type="checkIn"
                        />
                        <div className="ml-4 w-100">
                            <CheckDate dateSetter={this.setCheckDate("checkOutDate")}
                                       minDate={checkOutMinDate} maxDate={checkMaxDate}
                                       setcheckDate={this.setCompCheckDate} type="checkOut"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchFilter);