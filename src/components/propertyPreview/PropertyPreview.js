import React from 'react';
import './PropertyPreview.css';
import { Link } from 'react-router-dom';

const PropertyPreview = props => (
  <div className="prop-card">
    <Link
      to={`/moreinfo/${props.prop_id}`}
      style={{
        backgroundImage: 'url(' + `${props.img_url}` + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height:'200px',
        width:'200px',
        borderRadius:'5px'
      }}
      src={props.img_url}
      className="picture-buttons-properties"
      alt="none"
    >
      <h3
        className="property-name-preview"
      >{props.property_name}</h3>
    </Link>
  </div>
);

export default PropertyPreview;
