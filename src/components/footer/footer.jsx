import React, { Component } from 'react';
import classes from './footer.css';
class Footer extends Component {
    state = {  }
    render() { 
        return (
 <>
 <div id="footer" className="text-white position-relative">
    <div className={classes.footeer} >
      <div className="container text-white">
        <div className="row pb-4">
          <div className="col-md-8 text-center px-3 m-auto">
            <img src="images/icon.png" alt="" />
          </div>
        </div>
        <div className="row py-3">
         
          <div className="col-md-4 col-sm-6 ">
            <div className="widgt temp">
              {/* <h5>Useful Links</h5> */}
              <ul className="widgt-list p-0">
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Support</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Privacy Policy</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Terms & Conditions</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Affiliate Program</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="widgt temp">
              {/* <h5>Recent Posts</h5> */}
              <ul className="widgt-list p-0 text-white">
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Sunset in Venice</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Aerial View of Village</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Lighted Concrete City</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">The Little Ghost</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Royal Oats ft. Waldo</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 ">
          <div className="widgt temp">
              {/* <h5>Recent Posts</h5> */}
              <ul className="widgt-list p-0">
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Sunset in Venice</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Aerial View of Village</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Lighted Concrete City</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">The Little Ghost</a></li>
                <li className="py-1"><a href="#" className="text-decoration-none text-white widgt-link">Royal Oats ft. Waldo</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.copyright}>
      <div className="container">
        <div className="row ">
          <div className=" py-2">
            <div className="copyright temp">
                <h1 className='py-3'>Hoteru</h1>
              <p className="pt-2 text-center">Copyright &copy; 2021 <span>Hoteru</span> | All rights reserved! </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
            </>
         );
    }
}
 
export default Footer;