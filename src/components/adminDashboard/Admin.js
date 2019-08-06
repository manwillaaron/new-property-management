import React, { Component } from "react";
import "./Admin.css";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAdmin } from "../../redux/adminReducer";
import { getProperties } from "../../redux/propertiesReducer";
import add from "./addHosuse2-01.png";
import {
  getChatroomMessages,
  getAllChatrooms
} from "../../redux/socketReducer";
import PropertiesPreview from "../properties/PropertiesPreview";
import Header from "../header/Header";
import SMSForm from "../../SMS/SMSForm";

class AdminDashboard extends Component {
  async componentDidMount() {
    console.log(this.props);
    console.log(
      "!%^R!^%R^!%$^%!$",
      Boolean(this.props.admin.admin.renterCheck)
    );
    if (Boolean(this.props.admin.admin.renterCheck) === true)
      return <Redirect to="/renter" />;

    if (!this.props.admin.admin.loggedIn) {
      this.props.getAdmin();

      if (!this.props.properties) this.props.getProperties();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adminId !== this.props.adminId) {
      this.props.getProperties(this.props.adminId);
    }
    return;
  }

  render() {
    let { loggedIn, renterCheck } = this.props.admin.admin;
    console.log(this.props);
    if (!loggedIn) return <Redirect to="/login" />;
    if (JSON.parse(renterCheck) === true) return <Redirect to="/renter" />;

    return (
      <div className="admin-dash-container">
        <Header />
        <div className="picture-button-container-admin">
          <div className="rows-admin">
            <Link
              className="picture-buttons-admin"
              to={"/propertiespreview"}
              onClick={() => console.log("clicked")}
              style={{
                backgroundImage:
                  "url(" +
                  "https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <h1 class="centered-admin">Your Rentals</h1>
            </Link>

            <Link
              to={"/directory/renters"}
              className="picture-buttons-admin"
              onClick={() => console.log("clicked")}
              style={{
                backgroundImage:
                  "url(" +
                  `https://images.unsplash.com/photo-1510936470381-68e4c0a5e24b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              {" "}
              <h1 class="centered1-admin">Renter Directory</h1>
            </Link>
          </div>
          <div className="rows-admin">
            <Link
              to={"/add/propertyinput"}
              className="picture-buttons-admin"
              onClick={() => console.log("clicked")}
              style={{
                // width: "200px",
                // height:"150px",
                backgroundImage: "url(" + add + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              {" "}
              <h1 class="centered-admin">Add House</h1>
            </Link>
            <Link
              to={`/propertymanager/chat/`}
              className="picture-buttons-admin"
              onClick={() => console.log("clicked")}
              style={{
                // width: "200px",
                // height:"150px",
                backgroundImage:
                  "url(" +
                  `https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div class="centered2-admin">
                <h1>Messages</h1>
                <div className='msg-counter'>2</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    properties: state.properties
  };
}

export default connect(
  mapStateToProps,
  { getAdmin, getProperties }
)(AdminDashboard);
