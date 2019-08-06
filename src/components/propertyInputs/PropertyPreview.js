import React, { Component } from "react";
import "./PropertyPreview.css";
import {
  editProperties,
  getProperties,
  deleteProperty
} from "../../redux/propertiesReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PropertyPreview extends Component {
  render() {
    let { property_name, img_url, prop_id } = this.props;
    return (
          <div className="prop">
            <h3 className='property-name-preview'>{property_name}</h3>
            <img src={img_url} className='img' alt="none" />
            <div className='property-preview-button-container'>
            <button className='property-preview-buttons'>
              <Link className='property-preview-links' to={`/moreinfo/${prop_id}`}>More Info</Link>
            </button>
            <button className='property-preview-buttons' onClick={() => this.props.deleteProperty(prop_id)}>
              <Link className='property-preview-links' to={`/`}>remove</Link>
            </button>
            </div>
          </div>
       
    );
  }
}

export default connect(
  null,
  { editProperties, deleteProperty }
)(PropertyPreview, getProperties);
