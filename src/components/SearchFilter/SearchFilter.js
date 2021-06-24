import React, {Component} from "react";
import SearchBox from "../SearchBox/SearchBox";
import {withRouter} from "react-router-dom";
import CheckDate from "../Search/CheckDate";

const today = new Date();
let tomorrow = new Date()

class SearchFilter extends Component {

    constructor(props) {
        tomorrow.setDate(today.getDate() + 1)
        super(props);
        this.state = {
            fullUlr: "",
            urlQuery: "",
            apiUrl: "http://127.0.0.1:8000/api/v1/hotels/search?",
            fullUrl: "",
            urlParams: "",
            checkIn: "checkIn="+ today.toISOString().split("T")[0],
            checkOut: "checkOut="+ tomorrow.toISOString().split("T")[0],
            location: "",
            rooms: "rooms=1",
            checkInDate: new Date(),
            checkOutDate: null,
        }
    }

    componentDidMount() {
        this.props.updateDates(this.state.checkIn, "checkIn")
        this.props.updateDates(this.state.checkOut, "checkOut")
    }

    setCompCheckDate = async (date, type) => {
        console.log("I AM HERE DATE TYPE ", date, type)
        if (type === "checkIn") {
            await this.setState({checkIn: "checkIn=" + date})
            this.props.updateDates(this.state.checkIn, type)
        }
        if (type === "checkOut") {
            await this.setState({checkOut: "checkOut=" + date})
            this.props.updateDates(this.state.checkOut, type)
        }
    }

    updateSearchQuery = async (searchQuery, types) => {
        console.log("<<<<<TYPES ", types)
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn, this.state.checkOut,
            "location=" + encodeURIComponent(this.state.location), this.state.rooms
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.apiUrl, urlParams].join("")
        await this.setState({fullUrl})
        this.checkSearchUpdated()
        await this.props.fetchHotels()
        this.updateLocationType(types)
        console.log(fullUrl)
    }

    updateLocationType = (types) => {
        if (types.includes("lodging")){
            console.log("====IT'S A HOTEL====")
            this.props.updateLocationType("hotel")
        } else {
            console.log("====NOT A HOTEL====")
            this.props.updateLocationType("location")
        }
    }

    checkSearchUpdated = () => {
        this.props.history.push('/hotels?location=' + this.state.location)
    }

    setCheckDate = (checkInOut) => (checkDate) => {
        this.setState({[checkInOut]: checkDate})
    }

    clicked = () => {
        console.log("CLICKED")
    }

    checkOutMinDate = () => {
        const checkInDate = this.state?.checkInDate??today;
        const returnedDate =  new Date(checkInDate);
        returnedDate.setUTCHours(24,0,0, 0);
        return returnedDate;
    }

    checkMaxDate = () => {
        return new Date(today.getFullYear(), today.getMonth() + 4, 0);
    }

    render() {
        const checkOutMinDate = this.checkOutMinDate()
        const checkMaxDate = this.checkMaxDate();
        return (
            <div className="container">
                <div className="mx-auto">
                    <SearchBox updateUrl={this.updateSearchQuery} />
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