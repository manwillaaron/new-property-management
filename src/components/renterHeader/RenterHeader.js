import React, { Component } from "react";
import "./RenterHeader.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signout, getAdmin } from "../../redux/adminReducer";

class RenterHeader extends Component {
  render() {
    return (
      <div className="header">
        <div />
        <div className="header-title-container">
          <h1 className="header-title">RentalOps</h1>
        </div>

        <div className="header-button-container">
          <Link
            onClick={e => this.props.signout(this.props.admin.admin_id)}
            className="header-buttons"
            to="/"
          >
            {" "}
            Log Out
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
  )(RenterHeader)
);
