import Map from "../../Map/Map";

const MoreInfo = (props) => {
    const center = {
        lat: props.hotel.hotelLocation.coordinates.latitude,
        lng: props.hotel.hotelLocation.coordinates.longitude
    }
    return (
        <div className="container p-4">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                            type="button" role="tab" aria-controls="home" aria-selected="true">Overview
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#info"
                            type="button" role="tab" aria-controls="profile" aria-selected="false">Info
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#reviews"
                            type="button" role="tab" aria-controls="contact" aria-selected="false">Reviews
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#deals"
                            type="button" role="tab" aria-controls="contact" aria-selected="false">Deals
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="alert alert-light" role="alert">
                        <p>Guests overall Rating: {Math.floor(props.hotel.guestReviews.overallRating)} ({props.hotel.guestReviews.numberOfReviews} reviews)</p>

                        <p>General Features: {props.hotel.mainAmenities.slice(0, 4).map(item => {
                            return <li>{item}</li>
                        })}</p>
                    </div>
                </div>
                <div className="tab-pane fade p-4" id="info" role="tabpanel" aria-labelledby="profile-tab">
                    <h4>Location: </h4>
                    <Map center={center}/>
                </div>
                <div className="tab-pane fade py-2" id="reviews" role="tabpanel" aria-labelledby="contact-tab">
                    <p className="bg-light p-2">Guests overall Rating: {Math.floor(props.hotel.guestReviews.overallRating)} ({props.hotel.guestReviews.numberOfReviews} reviews)</p>

                    {props.hotel.guestReviews.reviews.slice(0, 4).map(review => {
                        return (
                            <div className="alert alert-info" role="alert">
                                <strong><p className="text-body">Reviewer: {review.name}</p></strong>
                                <span className="text-body">Comment: {review.review}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="tab-pane fade p-4" id="deals" role="tabpanel" aria-labelledby="profile-tab">
                    <h4>Deals: </h4>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo;