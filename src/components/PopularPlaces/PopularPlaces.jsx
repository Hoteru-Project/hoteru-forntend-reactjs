import React, {Component} from 'react';
import instance from '../../axios-backend';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import {withTranslation} from "react-i18next";
import mainClasses from "../mainsec/mainsec.css";

class PopularPlaces extends Component {
    state = {
        type: "place",
        places: [],
        isLoading: false
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            let {data} = await instance.get(`/hotels/popular?type=${this.state.type}`);
            this.setState({places: data});
        } catch (e) {
            console.log(e);
        }
        this.setState({isLoading: false});
    }

    changePlace = async (setType) => {
        await this.setState({type: setType});
        this.componentDidMount();
        console.log(this.state);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <div className="container my-5">
                    {/*<h1 className="pb-3">{t("popular")}</h1>*/}
                    <h2 className="my-4 text-center" style={{fontSize:"3rem"}}>
                        <span className="badge bg-secondary">{t("popular")}</span>
                    </h2>

                    <ul className="nav nav-tabs">
                        <li className="nav-item" style={{"cursor": 'pointer'}}>
                            <a className="nav-link" onClick={() => this.changePlace('place')}>{t("places")}</a>
                        </li>
                        <li className="nav-item" style={{"cursor": 'pointer'}}>
                            <a className="nav-link" onClick={() => this.changePlace('hotel')}>{t("hotels")}</a>
                        </li>
                    </ul>

                    <div className="row">
                        <div className="text-center">
                            {this.state.isLoading &&
                            <Grid container wrap="wrap">
                                {(Array.from(new Array(3))).map((item, index) => (
                                    <Box key={index} width={310} marginRight={0.5} my={5}>

                                        <Skeleton variant="rect" width={310} height={148}/>
                                        <Box pt={0.5}>
                                            <Skeleton/>
                                            <Skeleton width="60%"/>
                                        </Box>
                                    </Box>

                                ))}
                            </Grid>
                            }
                        </div>
                        {!this.state.places.length ?
                            <span className="text-center">{t("no_data")}</span> : this.state.places.map(data => (
                                <>
                                    <div className="col-md-3 p-3">
                                        <div className={["card", mainClasses.ClickableCard].join(" ")} onClick={this.props.requestSearch(data.search, data.type)}>
                                            <img className="w-100 card-img-top"
                                                 src="https://www.choicehotels.com/cms/images/sleep-inn/image_sleep-inn-about-01/image_sleep-inn-about-01.jpg"
                                                 alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{data.search}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </>
        );
    }

}

export default withTranslation()(PopularPlaces);
