import React from 'react';
import './PropertiesPreview.css';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import PropertyPreview from '../propertyPreview/PropertyPreview';
import { Link, Route, Switch } from 'react-router-dom';
import PropertyInputs from '../propertyInput/PropertyInputs';

function PropertiesPreview(props) {
  React.useEffect(() => {
    props.getProperties();
  }, []);

  const { properties } = props;
  return (
    <div>
      <Link to={'/propertiespreview/add'}>Add Property</Link>
      <div className="prop-container">
        {props.properties[0] &&
          properties.map(property => (
            <PropertyPreview
              {...property}
              key={property.prop_id} />
          ))}
      </div>
      <Switch>
        <Route path="/propertiespreview/add" component={PropertyInputs} />
      </Switch>
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
