import React, {Component} from "react";
import SearchBox from "../SearchBox/SearchBox";
import {withRouter} from "react-router-dom";
import CheckDate from "../Search/CheckDate";
import FilterDisplayComponent from "../Filter/FilterDisplayComponent";
import Button from "@material-ui/core/Button";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Fab from "@material-ui/core/Fab";
import {withTranslation} from "react-i18next";

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
            checkIn: "checkIn=" + today.toISOString().split("T")[0],
            checkOut: "checkOut=" + tomorrow.toISOString().split("T")[0],
            location: "",
            rooms: "rooms=1",
            checkInDate: new Date(),
            checkOutDate: null,
            locationType: "",
            currency: ""
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

    updateSearchParams = (searchQuery, locationType) => {
        this.setState({location: searchQuery, locationType: locationType})
    }

    updateSearchQuery = async (searchQuery, locationType) => {
        console.log("<<<<<TYPES ", locationType)
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn, this.state.checkOut,
            "location=" + encodeURIComponent(this.state.location), this.state.rooms, "locationType=" + locationType,
            "currency=" + localStorage.getItem("currency")??"USD"
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.apiUrl, urlParams].join("")
        await this.setState({fullUrl, locationType})
        this.checkSearchUpdated()
        await this.props.fetchHotels(fullUrl);
        // this.props.setTest(fullUrl)
        console.log(fullUrl)
    }

    checkSearchUpdated = () => {
        this.props.history.push('/hotels?location=' + this.state.location + "&" + this.state.checkIn
            + "&" + this.state.checkOut + "&" + this.state.rooms + "&locationType=" + this.state.locationType + "&currency=" + this.state.currency
        )
    }

    setCheckDate = (checkInOut) => (checkDate) => {
        this.setState({[checkInOut]: checkDate})
    }

    clicked = () => {
        console.log("CLICKED")
    }

    checkOutMinDate = () => {
        const checkInDate = this.state?.checkInDate ?? today;
        const returnedDate = new Date(checkInDate);
        returnedDate.setUTCHours(24, 0, 0, 0);
        return returnedDate;
    }

    checkMaxDate = () => {
        return new Date(today.getFullYear(), today.getMonth() + 4, 0);
    }

    render() {
        const {t} = this.props
        const checkOutMinDate = this.checkOutMinDate()
        const checkMaxDate = this.checkMaxDate();
        return (
            <div className="container">
                <div className="mx-auto row">
                    <div className="col-md-4 mt-4">
                        <SearchBox updateUrl={this.updateSearchQuery} updateSearchState={this.updateSearchParams}/>
                    </div>
                    <div className="col-md-3">
                        <CheckDate dateSetter={this.setCheckDate("checkInDate")}
                                   minDate={today} maxDate={checkMaxDate}
                                   setcheckDate={this.setCompCheckDate} type="checkIn"
                        />
                    </div>
                    <div className="col-md-3">
                        <CheckDate dateSetter={this.setCheckDate("checkOutDate")} className="w-100"
                                   minDate={checkOutMinDate} maxDate={checkMaxDate}
                                   setcheckDate={this.setCompCheckDate} type="checkOut"
                        />
                    </div>
                    <div className="col-md-2 d-flex flex-column justify-content-center">
                        <Fab variant="extended" color="primary" onClick={()=>this.updateSearchQuery(this.state.location, this.state.locationType)}>
                            <SearchRoundedIcon className="mr-1"/>{t("search_button")}
                        </Fab>
                    </div>
                </div>

            </div>
        )
    }
}

export default withTranslation()(withRouter(SearchFilter));
