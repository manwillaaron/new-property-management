import React, { Component } from 'react';
import './Properties.css';
import {
  editProperties,
  addProperty,
  getProperties
} from '../../redux/propertiesReducer';
import { getRenters, deleteRenter } from '../../redux/renterReducer';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import { getAdmin } from '../../redux/adminReducer';
import RenterDisplay from '../renters/RenterDisplay';
import SMSForm from '../../SMS/SMSForm';

class Properties extends Component {
  componentDidUpdate(pp) {
    if (pp !== this.props || this.props.renters.length === 0) {
      this.props.getRenters(this.props.match.params.prop_id);
    }
  }

  componentDidMount() {
    this.props.getProperties();
    this.props.getAdmin();
  }

  render() {
    if (!this.props.admin_id) return <Redirect to="/login" />;
    if (Boolean(this.props.admin.admin.renterCheck) === true)
      return <Redirect to="/renter" />;
    let property = this.props.property.find(
      property => property.prop_id === +this.props.match.params.prop_id
    );
    return (
      <div className="more-info-page" key={property.prop_id}>
        <div>
          <Header />
        </div>
        <div className="all-prop-info">
          <div className="property-image-container">
            <Link
              to={`/propertyinput/${this.props.match.params.prop_id}`}
              className="property-image"
              style={{
                backgroundImage: 'url(' + `${property.img_url}` + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          <div className="prop-info-only">
            <div className="general-info-items-prop">
              <h2>Property Name</h2>
              <h3>{property.property_name}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Address</h2>
              <h3>{property.address}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Bedrooms</h2>
              <h3>{property.num_beds}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Bathrooms</h2>
              <h3>{property.num_baths}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Square Footage</h2>
              <h3>{property.square_footage}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Acres</h2>
              <h3>{property.acreage}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Rent</h2>
              <h3>{property.rent}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Gas Company</h2>
              <h3>{property.gas_company}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Electric Company</h2>
              <h3>{property.electric_company}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Occupied</h2>
              <h3>{JSON.stringify(property.has_renter)}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Fridge?</h2>
              <h3>{JSON.stringify(property.fridge_included)}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Diswasher?</h2>
              <h3>{JSON.stringify(property.dishwasher_included)}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Washer and Dryer?</h2>
              <h3>{JSON.stringify(property.washer_dryer_included)}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Mortgage</h2>
              <h3>{property.mortgage}</h3>
            </div>
            <div className="general-info-items-prop">
              <h2>Taxes</h2>
              <h3>{property.tax_yearly}</h3>
            </div>
          </div>
        </div>
        <div className="renters-smsform">
          <RenterDisplay prop_id={property.prop_id} />
          <SMSForm prop_id={property.prop_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    admin_id: state.admin.admin.id,
    ...state.renters,
    property: state.properties.properties
  };
}

export default connect(mapStateToProps, {
  editProperties,
  addProperty,
  getProperties,
  getRenters,
  deleteRenter,
  getAdmin
})(Properties);
