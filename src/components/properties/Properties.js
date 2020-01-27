import React, { useEffect } from 'react';
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
  useEffect(() => {
    props.getProperties();
    props.getAdmin();
  }, []);

  useEffect(() => {
    props.getRenters(props.match.params.prop_id);
  }, [props.renters]);

  if (!props.admin_id) return <Redirect to="/login" />;
  if (Boolean(props.admin.admin.renterCheck) === true)
    return <Redirect to="/renter" />;
  let property = props.property.find(
    property => property.prop_id === +props.match.params.prop_id
  );

  const propertyVals = [
    { val: property.property_name, text: 'property_name' },
    { val: property.address, text: 'address' },
    { val: property.num_beds, text: 'num_beds' },
    { val: property.num_baths, text: 'num_baths' },
    { val: property.square_footage, text: 'square_footage' },
    { val: property.acreage, text: 'acreage' },
    { val: property.rent, text: 'rent' },
    { val: property.gas_company, text: 'gas_company' },
    { val: property.electric_company, text: 'electric_company' },
    { val: property.has_renter, text: 'has_renter' },
    { val: property.fridge_included, text: 'fridge_included' },
    { val: property.dishwasher_included, text: 'dishwasher_included' },
    { val: property.washer_dryer_included, text: 'washer_dryer_included' },
    { val: property.mortgage, text: 'mortgage' },
    { val: property.tax_yearly, text: 'tax_yearly' }
  ].map(val => (
    <div className="general-info-items-prop">
      <h2>{val.text}</h2>
      <h3>{val.val}</h3>
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
        <RenterDisplay prop_id={property.prop_id} />
        <SMSForm prop_id={property.prop_id} />
      </div>
    </div>
  );
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
  getProperties,
  getRenters,
  getAdmin
})(Properties);
