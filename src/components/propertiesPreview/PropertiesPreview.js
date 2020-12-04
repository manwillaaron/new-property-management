import React from 'react';
import './PropertiesPreview.css';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import PropertyPreview from '../propertyPreview/PropertyPreview';
import { Link, Route, Switch } from 'react-router-dom';
import PropertyInputs from '../propertyInput/PropertyInputs';

function PropertiesPreview(props) {
  const [popupText, setPopupText] = React.useState('Add a Property')
  React.useEffect(() => {
    props.getProperties();
  }, []);

  React.useEffect(() => {
    console.log(props.properties)
    if (props.properties[0]) {
      setPopupText('Add a Property')
    } else {
      console.log('hit')
      setPopupText('No Properties Found. Add a Property')
    }
  }, [props.properties[0]])

  const { properties } = props;
  return (
    <div>
      {props.properties[0] ? (
        <Link to={'/propertiespreview/add'}> Add a Property</Link>
      ) : (
          <section className='no-prop-popup'>
            {/* <h1 className='add-a-property'>No propeties found. Add a Property</h1> */}
            <PropertyInputs popupText={popupText} />
          </section>
        )}
      <div className="prop-container">
        {props.properties[0] &&
          properties.map(property => (
            <PropertyPreview

              {...property}
              key={property.prop_id} />
          ))}
      </div>
      <Switch>
        <Route path="/propertiespreview/add" render={() => (
          <section className='no-prop-popup'>
            <PropertyInputs popupText={popupText} />
          </section>
        )}
        />
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
