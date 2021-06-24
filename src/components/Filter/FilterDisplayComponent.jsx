import React, {Component} from 'react'
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
      sortID: null,
      classRating: null,
    };
  }

  setCheckedFilters= (filters) => {

    const hasFilters = !!filters.length
    const filterQuery = `${(hasFilters?"filter=":"")}${filters.join('-')}`;
    const url = `${this.state.url}${hasFilters?"&":""}${filterQuery}`;

    this.setState({filters: filters});
    this.props.history.push(`/search?${filterQuery}`)
    this.fetchHotels(url)
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

  handleSortCallBack = (sortID) => {
    let url = this.state.url + `&sorting=${sortID}`;
    this.setState({sortID : sortID});
    this.fetchHotels(url);
  }

  getClassRatingToDisplay = (classRating) => {
    let url = this.state.url + `&class=${classRating}`;
    this.setState({classRating : classRating});
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
            getClassRatingToDisplay={this.getClassRatingToDisplay}
            />
            <h3>Testing The requested sortID in the grandparent: {this.state.sortID}</h3>

            {this.state.items.map(item => (
              <li key={item.id}>
                  <strong>{item.name}</strong>
                  <br />
                  Rating: {item.guestReviews.overallRating} 
                  <br />
                  Pricing: ${item.hotelPricing.startingAt.plain}
                  <br />
                  {item.classRating} star hotel
                  <br />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default withRouter(FilterDisplayComponent);
