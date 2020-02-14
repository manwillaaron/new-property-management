import React, { useEffect, useState } from 'react';
import './Properties.css';
import { getProperties } from '../../redux/propertiesReducer';
import { getAdmin } from '../../redux/adminReducer';
import { getRenters } from '../../redux/renterReducer';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import RenterDisplay from '../renters/RenterDisplay';
import SMSForm from '../../SMS/SMSForm';

function Properties(props) {
  const [property, setProperty] = useState({});
  useEffect(() => {
    getProperty();
  }, []);

  async function getProperty() {
    await props.getProperties();
    let foundProperty = props.properties.find(
      property => property.prop_id === +props.match.params.prop_id
    )
    setProperty(foundProperty);
  }

  const propertyVals = [
    'property_name',
    'address',
    'num_beds',
    'num_baths',
    'square_footage',
    'acreage',
    'rent',
    'gas_company',
    'electric_company',
    'has_renter',
    'fridge_included',
    'dishwasher_included',
    'washer_dryer_included',
    'mortgage',
    'tax_yearly'
  ].map(val => (
    <div className="general-info-items-prop" key={val}>
      <h2>{val}</h2>
      <h3>{property[val]}</h3>
    </div>
  ));

  return (
    <div className="more-info-page" key={property.prop_id}>
      <div>
        <Header />
      </div>
      <div className="all-prop-info">
        <div className="property-image-container">
          <Link
            to={`/propertyinput/${props.match.params.prop_id}`}
            className="property-image"
            style={{
              backgroundImage: 'url(' + `${property.img_url}` + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <div className="prop-info-only">{propertyVals}</div>
      </div>
      <div className="renters-smsform">
        <RenterDisplay prop_id={+props.match.params.prop_id} />
        {/* <SMSForm prop_id={property.prop_id} /> */}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    admin_id: state.admin.admin.id,
    ...state.renters,
    properties: state.properties.properties
  };
}

export default connect(mapStateToProps, {
  getProperties,
  getRenters,
  getAdmin
})(Properties);
