import React, {Component} from 'react'
import HotelsFeatures from './HotelsFeaturesComponent';
import {withRouter} from "react-router-dom"

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      url:'http://127.0.0.1:8001/api/v1/hotels/test?checkIn=2021-06-07&checkOut=2021-06-08&location=alexandria&rooms=1',
      isLoaded: false,
      items: [],
      filters:[]
    };
  }
  //?filter=this.state.filter.join("-")
  setCheckedFilters= (filters) => {
    console.log(filters);
    const hasFilters = !!filters.length
    const filterQuery = `${(hasFilters?"filter=":"")}${filters.join('-')}`;
    const url = `${this.state.url}${hasFilters?"&":""}${filterQuery}`;
    console.log(url);
    this.setState({filters: filters});
    this.props.history.push(`/search?${filterQuery}`)
    this.fetchHotels(url)
  } 


  fetchHotels=(url)=>{

    fetch(url??this.state.url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },

      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
  componentDidMount() {
    this.fetchHotels();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <HotelsFeatures checkedFilters={this.state.filters} setCheckedFilters={this.setCheckedFilters}/>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default withRouter(NavbarComponent);
