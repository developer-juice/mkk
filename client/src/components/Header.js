import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as my_cookie from "../actions/cookies"



class Header extends Component {


  render() {
    // console.log(JSON.stringify(this.props)); // prints twice
    return (
          <nav className="banner navbar navbar-expand-lg navbar-dark static-top">
            <div className="container">
              <Link className="navbar-brand" to="/mkk">
                    <img style={{height: "auto", width: "64px"}} src="/android-chrome-256x256.png" alt="" />
                         CastTheVote -- MarryKissKill Edition
                  </Link>
              <button className="navbar-toggler btn"
                    type="button" data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                  </button>
              <div className=" navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item btn">
                    <Link className="nav-link" to={this.props.user.companyName === "Unlicensed" ? "/mkk/login" : "#"}> {this.props.user.companyName === "Unlicensed" ? "Register / Login" : this.props.user.companyName }</Link>
                  </li>
                  <li className="nav-item active btn">
                  {this.props.user.companyName !== "Unlicensed" &&
                    (<Link className="nav-link" onClick={()=>{
                      my_cookie.eraseCookie(process.env.REACT_APP_COOKIE_USERAUTH);
                    }} to='/mkk'> Logout</Link>)
                  }
                  </li>

                </ul>
              </div>
            </div>
    </nav>
    );
  }

}

// //not sure what this function does
// function mapStateToProps(){
//   var cookie = my_cookie.readCookie(process.env.REACT_APP_COOKIE_USERID)
//   if(cookie){
//     var user = {};
//   }
//   else{
//     user = {
//       companyName: "Unlicensed"
//     }
//   }
//   return {
//     cookie: cookie || "None",
//     user
//   }
// }

// export default connect(mapStateToProps, null)(Header);
export default Header;
