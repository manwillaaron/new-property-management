import React from 'react';
import './PropertiesPreview.css';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import PropertyPreview from '../propertyPreview/PropertyPreview';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

function PropertiesPreview(props) {
  React.useEffect(() => {
    props.getProperties();
  }, []);

  const { properties } = props;
  return (
    <div className="map-container">
      {/* <Header /> */}
      <Link to={'/add/propertyinput'}>Add Property</Link>
      <div className="prop-container">
        {props.properties[0] &&
          properties.map(property => (
            <div key={property.prop_id}>
              <PropertyPreview {...property} />
            </div>
          ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.properties
  };
}

export default connect(mapStateToProps, {
  getProperties
})(PropertiesPreview);
