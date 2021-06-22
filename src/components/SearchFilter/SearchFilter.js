import React, {Component} from "react";
import Search from "../Search/Search";


class SearchFilter extends Component{

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: "http://127.0.0.1:8000/api/v1/hotels/test?",
            fullUrl: "",
            urlParams: "",
            checkIn: "checkIn=2021-06-07",
            checkOut: "checkOut=2021-06-08",
            location: "",
            rooms: "rooms=1",
        }
    }

    updateSearchQuery = async (searchQuery) => {
        // console.log("UPDATE SEARCH QUERY"+searchQuery)
        await this.setState({location: searchQuery});
        let urlParams = [this.state.checkIn,  this.state.checkOut,
            "location="+encodeURIComponent(this.state.location), this.state.rooms
        ].join("&")
        this.setState(({urlParams}))
        let fullUrl = [this.state.baseUrl, urlParams].join("")
        await this.setState({fullUrl})
        console.log(fullUrl)
    }

    render() {
        return (
            <div className="container">
                <div className="w-25 mx-auto">
                    <Search updateSearch={this.updateSearchQuery} />
                </div>
            </div>
        )
    }
}

export default SearchFilter;