import React, { Component } from 'react';
import axios from 'axios';
import instance from '../../axios-backend'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

class RecentVisits extends Component {
    state = {
        recent: [],
        isLoading: false,
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    async componentDidMount() {
        this.setState({ isLoading: true });
        await this.delay(200);
        try {
            let { data } = await instance.get("/hotels/recent?limit=3");
            console.log(data);
            this.setState({ recent: data });
        }
        catch (e) {
            console.log(e);
        }
        this.setState({ isLoading: false });

    }
    render() {
        let { recent } = this.state;
        return (<>
            <div className="container mt-4">
                <h1>
                    Recent Visits
                </h1>
                <div className="row">
                    <div className="text-center">
                        {this.state.isLoading &&
                            <Grid container wrap="wrap">
                                {(Array.from(new Array(3))).map((item, index) => (
                                    <Box key={index} width={310} marginRight={0.5} my={5}>

                                        <Skeleton variant="rect" width={310} height={148} />
                                        <Box pt={0.5}>
                                            <Skeleton />
                                            <Skeleton width="60%" />
                                        </Box>
                                    </Box>

                                ))}
                            </Grid>
                        }
                    </div>

                    {recent.map(data =>
                        <div className="col-md-4 p-3 ">
                            <div className="card">
                                <img className="w-100 card-img-top"
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                    alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{data.search}</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
        );
    }
}

export default RecentVisits;