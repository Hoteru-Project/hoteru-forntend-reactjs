import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import MainMenuComponent from './MainMenuComponent';
import instance from "../../axios-backend";

class FilterDisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      url:'/hotels/test?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1&locationType=place',
      isLoaded: false,
      items: [],
      filters:[],
      sortID: null,
      classRating: null,
      starRating:null
    };
    // const params = new URLSearchParams(decodeURI(window.location.search))
    // console.log(">>>FILTER DISPLAY ", params.getAll("search"))
  }

  setCheckedFilters= (filters) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const params = Object.fromEntries(urlParams.entries())
    // console.log("FILTER DISPLAY", params)
    const hasFilters = !!filters.length
    hasFilters? (params.filter = filters.join('-')) : (delete params.filter)
    // const filterQuery = `${(hasFilters?"filter=":"")}${filters.join('-')}`;
    // const url = `${this.state.url}${hasFilters?"&":""}${filterQuery}`;
    const finalQueryString = Object.keys(params).map(key => `${key}=${params[key]}`).join("&")
    this.setState({filters: filters});
    this.props.history.push({
      pathname: "/hotels",
      search: finalQueryString
    })
    // this.props.history.push(`/hotels?${filterQuery}`)
    // this.fetchHotels("/hotels/search"+window.location.search)
    this.props.fetchHotels("/hotels/search"+window.location.search)
  }

  fetchHotels=(url)=>{
    instance.get(url??this.state.url)
    .then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: [...result.data]
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      })
    }
  
  componentDidMount() {
    this.fetchHotels();
  }

  handleApiCall = (paramName, value) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const params = Object.fromEntries(urlParams.entries())
    params[paramName] = value;
    const finalQueryString = Object.keys(params).map(key => `${key}=${params[key]}`).join("&")
    this.props.history.push({
      pathname: "/hotels",
      search: finalQueryString
    })
    this.props.fetchHotels("/hotels/search"+window.location.search)
  }

  handleSortCallBack = (sortID) => {
    this.handleApiCall("sorting", sortID)
    this.setState({sortID : sortID});
  }

  getClassRatingToDisplay = (classRating) => {
    this.handleApiCall("class", classRating)
    this.setState({classRating : classRating});
  }

  getStarsRatingToDisplay = (starsNumber) => {
    this.handleApiCall("stars", starsNumber)
    this.setState({starsNumber : starsNumber});
  }

  render() {
    const { error, isLoaded, items } = this.state;
    this.state.items.forEach(item => console.log([item.name, item.hotelPricing.startingAt.plain]))
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <MainMenuComponent
            checkedFilters={this.state.filters}
            setCheckedFilters={this.setCheckedFilters}
            setRequestedSort={this.setRequestedSort}
            handleSortCallBack={this.handleSortCallBack}
            getClassRatingToDisplay={this.getClassRatingToDisplay}
            getStarsRatingToDisplay={this.getStarsRatingToDisplay}
            />
        </div>
      );
    }
  }
}

export default withRouter(FilterDisplayComponent);
