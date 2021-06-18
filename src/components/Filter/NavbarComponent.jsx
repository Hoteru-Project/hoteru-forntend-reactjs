import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';

class FilterNavbar extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="shadow-sm p-3 mt-5 rounded container" style={{"max-width":"80vw"}}>
                <div className="aligner" style={{"display":"flex","alignItems":"center"}}>
                    <nav className="navbar justify-content-between">
                        <p className="navbar-brand"><strong>Sort by</strong> </p>

                    </nav>
                </div>
            </div>
        );}
}
 
export default FilterNavbar;
