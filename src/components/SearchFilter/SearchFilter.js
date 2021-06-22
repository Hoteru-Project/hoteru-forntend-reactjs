import React, {Component} from "react";
import SearchBox from "../SearchBox/SearchBox";
import {withRouter} from "react-router-dom";


class SearchFilter extends Component{

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
        }
    }

    updateSearchQuery = async (searchQuery) => {
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn,  this.state.checkOut,
            "location=" + encodeURIComponent(this.state.location), this.state.rooms
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.apiUrl, urlParams].join("")
        await this.setState({fullUrl})
        this.checkSearchUpdated()
        await this.props.fetchHotels()
        console.log(fullUrl)
    }

    checkSearchUpdated=()=>{
        this.props.history.push('/hotels?location='+this.state.location)
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto">
                    <SearchBox updateUrl={this.updateSearchQuery}  />
                </div>
            </div>
        )
    }
}

export default withRouter(SearchFilter);