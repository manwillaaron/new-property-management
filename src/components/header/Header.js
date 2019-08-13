import React, { Component } from "react";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signout, getAdmin } from "../../redux/adminReducer";
import logo from './Logo-rentops.png'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className='spacer-header' />
        <div className="header-title-container">
          <img src={logo} className="header-title" alt='RentOps'/>
        </div>

        <div className="header-button-container">
          <Link
            onClick={async e => this.props.signout()
              
            }
            className="header-button-logout"
            to="/login"
          >
            {" "}
            Log Out
          </Link>
          <Link
            onClick={console.log(this.props)}
            className="header-buttons"
            to="/"
          >
            {" "}
            Go Back
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signout, getAdmin }
  )(Header)
);
