import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import "./PropertiesPreview.css";
import { connect } from "react-redux";
import { getProperties } from "../../redux/propertiesReducer";
import { getAllRenters } from "../../redux/renterReducer";
import { getAdmin } from "../../redux/adminReducer";
import PropertyPreview from "../propertyInputs/PropertyPreview";
import Header from '../header/Header'

class PropertiesPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminId: this.props.adminId
    };
  }
  componentDidMount() {
    this.props.getAllRenters();
    this.props.getProperties();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adminId !== this.props.adminId) {
      this.props.getProperties();
    }
    return;
  }

  render() {
    let { loggedIn, renterCheck } = this.props.admin.admin;
    if (!loggedIn) return <Redirect to="/login" />;
    if (Boolean(renterCheck) === true) return <Redirect to="/renter" />;
    const { properties } = this.props;
    return (
      <div className="map-container">
        <Header />
        {properties.map(property => {
          return (
            <div className="prop-container" key={property.prop_id}>
              <PropertyPreview {...property} />
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    adminId: state.admin.admin.id,
    ...state.properties,
    renters: state.renters.renters
  };
}

export default connect(
  mapStateToProps,
  { getProperties, getAllRenters, getAdmin }
)(PropertiesPreview);
