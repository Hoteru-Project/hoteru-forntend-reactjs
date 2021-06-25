import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import instance from '../../axios-backend';
import {withTranslation} from "react-i18next";
import mainClasses from "../mainsec/mainsec.css"

class NearByHotels extends Component {
    state = {
        data: [],
        isloading: false
    }

    async componentDidMount() {
        this.setState({isLoading: true});

        try {
            let {data} = await instance.get(`/hotels/near`);
            await this.setState({data});
            console.log(this.state.data);
        } catch (e) {
            console.log(e);
        }
        this.setState({isLoading: false});

    }

    render() {
        const {t} = this.props;
        return (
            <div className="container mt-5">
                <h2 className="pb-4 text-center" style={{fontSize:"3rem"}}>
                    <span className="badge bg-secondary">{t("nearby_hotels")}</span>
                </h2>
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
                    {!this.state.data.length ?
                        <span className="text-center">{t("no_data")}</span> : this.state.data.map(hotel => (
                            // {console.log(hotel.name)}
                            <div className="col-md-4 p-3">
                                <div className={["card", mainClasses.ClickableCard].join(" ")} onClick={this.props.requestSearch(hotel.name, "hotel")}>
                                    <img src={hotel.photos} alt=""/>
                                    <div className="card-body">
                                        <h5 className="card-title">{hotel.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

}

export default withTranslation()(NearByHotels);
