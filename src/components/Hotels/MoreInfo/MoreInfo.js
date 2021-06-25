import Map from "../../GoogleMap/Map";
import classes from "./MoreInfo.css"
import {useTranslation, withTranslation} from "react-i18next";

const MoreInfo = (props) => {
    const center = {
        lat: props.hotel.hotelLocation.coordinates.latitude,
        lng: props.hotel.hotelLocation.coordinates.longitude,
        zoom: 14
    }
    const {t} = useTranslation();
    return (
        <div className="container p-4">
            <ul className="nav nav-tabs" id={"hotel" + props.hotel.id} role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="overview" data-bs-toggle="tab" data-bs-target={"#overview"+props.hotel.id}
                            type="button" role="tab" aria-controls="home" aria-selected="true">{t("overview")}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="info" data-bs-toggle="tab" data-bs-target={"#info"+props.hotel.id}
                            type="button" role="tab" aria-controls="profile" aria-selected="false">{t("info")}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target={"#reviews"+props.hotel.id}
                            type="button" role="tab" aria-controls="contact" aria-selected="false">{t("reviews")}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target={"#deals"+props.hotel.id}
                            type="button" role="tab" aria-controls="contact" aria-selected="false">{t("deals")}
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="hotelContent">
                <div className="tab-pane fade show active" id={"overview"+props.hotel.id} role="tabpanel">
                    <div className="alert alert-light" role="alert">
                        <p>Guests overall Rating: {Math.floor(props.hotel.guestReviews.overallRating)} ({props.hotel.guestReviews.numberOfReviews} reviews)</p>

                        <p>Main Features: {props.hotel.mainAmenities.slice(0, 4).map(item => {
                            return <li>{item}</li>
                        })}</p>
                    </div>
                </div>
                <div className="tab-pane fade p-4" id={"info"+props.hotel.id} role="tabpanel">
                    <div>
                        <h4>Location: </h4>
                        <Map center={center} hotel={props.hotel}/>
                    </div>
                    <div className="mt-2">
                        <h4>All Features: </h4>
                        <div className="row">
                            {props.hotel.mainAmenities.map( (item) => {return <li className=" col-5">{item}</li> }  )}
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade py-2" id={"reviews"+props.hotel.id} role="tabpanel">
                    <p className="bg-light p-2">Guests overall Rating: {Math.floor(props.hotel.guestReviews.overallRating)} ({props.hotel.guestReviews.numberOfReviews} reviews)</p>

                    {props.hotel.guestReviews.reviews.slice(0, 4).map(review => {
                        return (
                            <div className="alert alert-info" role="alert">
                                <div>
                                    <strong><span className="text-body">Reviewer: {review.name}</span></strong>
                                    <strong><span className="text-body ml-4">Rating: {review.rate}</span></strong>
                                    <strong><span className="text-body ml-4">Date: {new Date(review.date).toISOString().split('T')[0]}</span></strong>
                                </div>
                                <p className="text-body m-0 mt-2 ">Comment: {review.review}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="tab-pane fade p-4 d-flex" id={"deals"+props.hotel.id} role="tabpanel" style={{overflow:"auto",}}>
                    {
                        props.hotel.providers?.map((provider) =>
                            <div className={["rounded-3 bg-white mx-3 p-4 text-center", classes.hoverShadow].join(" ")}>
                                <span className="badge bg-primary p-2">${provider.hotelPricing.startingAt.plain} / {t("night")}</span>
                                <span className="badge d-block mt-2 bg-dark p-2">{provider.provider}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(MoreInfo);
