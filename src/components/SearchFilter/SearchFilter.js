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
            apiUrl: "hotels/search?",
            fullUrl: "",
            urlParams: "",
            checkIn: "checkIn="+ today.toISOString().split("T")[0],
            checkOut: "checkOut="+ tomorrow.toISOString().split("T")[0],
            location: "",
            rooms: "rooms=1",
            checkInDate: new Date(),
            checkOutDate: null,
            locationType: ""
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


    updateSearchQuery = async (searchQuery, locationType) => {
        console.log("<<<<<TYPES ",locationType)
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn, this.state.checkOut,
            "location=" + encodeURIComponent(this.state.location), this.state.rooms, "locationType="+locationType
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.apiUrl, urlParams].join("")
        await this.setState({fullUrl, locationType})
        this.checkSearchUpdated()
        console.log("fullurl", fullUrl)
        await this.props.fetchHotels(fullUrl);
        // this.props.setTest(fullUrl)
        console.log(fullUrl)
    }

    checkSearchUpdated = () => {
        this.props.history.push('/hotels?location=' +this.state.location+ "&"+this.state.checkIn
            +"&" + this.state.checkOut +"&"+ this.state.rooms+ "&locationType="+this.state.locationType
        )
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