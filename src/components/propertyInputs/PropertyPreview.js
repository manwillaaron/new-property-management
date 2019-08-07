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
    console.log(this.props);
    return (
      <div className="prop-views">
        {/* <h3 className="property-name-preview">{property_name}</h3> */}
        <Link
          to={`/moreinfo/${prop_id}`}
          style={{
            backgroundImage: "url(" + `${img_url}` + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
          src={img_url}
          className="picture-buttons-properties"
          alt="none"
        ><h3 className="property-name-preview">{property_name}</h3></Link>
        {/* <div className="property-preview-button-container"> */}
          {/* <button className="property-preview-buttons">
            <Link
              className="property-preview-links"
              to={`/moreinfo/${prop_id}`}
            >
              More Info
            </Link>
          </button> */}
          {/* <button
            className="property-preview-buttons"
            onClick={() => this.props.deleteProperty(prop_id)}
          >
            <Link className="property-preview-links" to={`/`}>
              remove
            </Link>
          </button> */}
        {/* </div> */}
      </div>
    );
  }
}

export default connect(
  null,
  { editProperties, deleteProperty }
)(PropertyPreview, getProperties);
