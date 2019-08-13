import React, { Component } from "react";
import "./RenterPropertyView.css";
import {
  editProperties,
  addProperty,
  getProperties
} from "../../redux/propertiesReducer";
import { getRenters, deleteRenter } from "../../redux/renterReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../header/Header";
import { getAdmin } from "../../redux/adminReducer";

class RenterPropertyView extends Component {
  componentDidUpdate(pp) {
    if (pp !== this.props) {
      getRenters(this.props.match.params.prop_id);
    }
  }

  componentDidMount() {
    this.props.getProperties();
    this.props.getAdmin();
  }

  render() {
    if (!this.props.admin_id) return <Redirect to="/login" />;

    let property = {};
    if (this.props.properties) {
      property = this.props.properties.find(
        property => property.prop_id === +this.props.match.params.prop_id
      );
    } else {
      property = this.props.property.find(
        property => property.prop_id === +this.props.match.params.prop_id
      );
    }

    return (
      <div className="rpv-page" key={property.prop_id}>
        <Header />
        <div className="property-info-container">
          <div className="property-images">
            <img className="prop-img-renter" src={property.img_url} alt="" />
          </div>
        <div className='info-container-rent'>
          <div className="general-info-items-prop-renter">
            <h2>property name</h2>
            <h3>{property.address}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Bedrooms</h2>
            <h3>{property.num_beds}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Bathrooms</h2>
            <h3>{property.num_baths}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Square Footage</h2>
            <h3>{property.square_footage}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Acres</h2>
            <h3>{property.acreage}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Rent</h2>
            <h3>{property.rent}</h3>
          </div>
          <div className="general-info-items-prop-renter">
            <h2>Gas Company</h2>
            <h3>{property.gas_company}</h3>
            <h2>Electric Company</h2>
            <h3>{property.electric_company}</h3>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin_id: state.admin.admin.id,
    ...state.renters,
    property: state.properties.properties
  };
}

export default connect(
  mapStateToProps,
  {
    editProperties,
    addProperty,
    getProperties,
    getRenters,
    deleteRenter,
    getAdmin
  }
)(RenterPropertyView);
