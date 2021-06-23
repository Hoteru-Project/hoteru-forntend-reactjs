import React, {Component} from 'react'
import HotelsFeatures from './HotelsFeaturesComponent';
import {withRouter} from "react-router-dom"
import MainMenuComponent from './MainMenuComponent';
import instance from "../../axios-backend";

class FilterDisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      url:'/hotels/test?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1',
      isLoaded: false,
      items: [],
      filters:[],
      sortID: null
    };
  }
  //?filter=this.state.filter.join("-")
  setCheckedFilters= (filters) => {

    const hasFilters = !!filters.length
    const filterQuery = `${(hasFilters?"filter=":"")}${filters.join('-')}`;
    const url = `${this.state.url}${hasFilters?"&":""}${filterQuery}`;

    this.setState({filters: filters});
    this.props.history.push(`/search?${filterQuery}`)
    this.fetchHotels(url)
  }

  // displaySortedHotels = (sortindID) => {
  //   const search = this.props.location.search;
  //   const params = new URLSearchParams(search);
  //   const paramObj = {}
  //   for(let param of params.keys()) paramObj[param] = params.get(param)
  //   paramObj["sort"] = "alpha"
  //   console.log(paramObj);
  //   const paramObj2 = {...paramObj, sort: "beta"};
  //   console.log(paramObj2);
    
  //   // .then(response => response.status)
  //   // .catch(err => console.warn(err));
  //   const requestedSort = this.state.url.includes('sorting=');
  // }


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

  handleSortCallBack = (sortID) => {
    let url = this.state.url + `&sorting=${sortID}`;
    this.setState({sortID : sortID});
    this.fetchHotels(url);
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
          <ul>
            <MainMenuComponent
            checkedFilters={this.state.filters}
            setCheckedFilters={this.setCheckedFilters}
            setRequestedSort={this.setRequestedSort}
            handleSortCallBack={this.handleSortCallBack}
            />
            <h3>Testing The requested sortID in the grandparent: {this.state.sortID}</h3>

            {this.state.items.map(item => (
              <li key={item.id}>
                  <strong>{item.name}</strong>
                  <br />
                  Rating: {item.guestReviews.overallRating} 
                  <br />
                  Pricing: ${item.hotelPricing.startingAt.plain}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default withRouter(FilterDisplayComponent);
