import React, { Component } from "react";
import "./RenterDashboard.css";
import { getAdmin } from "../../redux/adminReducer";
import { getProperties } from "../../redux/propertiesReducer";
import { connect } from "react-redux";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom"; 
import CheckoutForm from '../../CheckoutForm'

class RenterDashboard extends Component {
  constructor() {
    super();
    this.state = {
      admin_id: ""
    };
  }

  async componentDidMount() {
    this.getSingleObj();
    console.log(this.props);
    this.props.getAdmin();
    await this.props.getProperties(this.props.admin.admin.id);
  }

  getSingleObj = () => {
    let a = this.props.property.properties;
    const output = Object.assign({}, ...a);
    return output;
  };

  render() {
    let propObj = this.getSingleObj();
    console.log(propObj);
    let { loggedIn } = this.props.admin.admin;
    if (!loggedIn) return <Redirect to="/login" />;
    if (JSON.parse(this.props.admin.admin.renterCheck) === false)
      return <Redirect to="/" />;
    return (
      <div className="renter-dash-container">
        <Header />
        <div className="picture-button-container">
        <div className='rows-renter'>

          <Link
            className="picture-buttons2"
            to={`/renter/moreinfo/${propObj.prop_id}`}
            onClick={() => console.log("clicked")}
            style={{
              backgroundImage: "url(" + `${propObj.img_url}` + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          > <h1 class="centered">Rental Information</h1>
          </Link>
          <Link
            // to={`/pay/rent/${propObj.rent}`}
            className="picture-buttons"
            onClick={() => console.log("clicked")}
            style={{
              backgroundImage:
                "url(" +
                `https://images.unsplash.com/photo-1494887205043-c5f291293cf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          > 
          <div className="centered1">
          <h1 >Rent</h1>
            <CheckoutForm className="centered"
              rent = {propObj.rent}
            />
          </div>
          </Link>
        </div>
          <div className='rows-renter'>

          <Link
            className="picture-buttons"
            to={`/propertymanager/chat/${propObj.admin_id}`}
            onClick={() => console.log("clicked")}
            style={{
              // width: "200px",
              // height:"150px",
              backgroundImage:
                "url(" +
                `https://images.unsplash.com/photo-1516822669470-73d1771e95a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          > <h1 class="centered">Repairs</h1>
          </Link>
          <Link
            to={`/propertymanager/chat/${propObj.admin_id}`}
            className="picture-buttons1"
            onClick={() => console.log("clicked", propObj)}
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
          > <h1 class="centered">Messages</h1>
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
    property: state.properties
  };
}

export default connect(
  mapStateToProps,
  { getAdmin, getProperties }
)(RenterDashboard);
