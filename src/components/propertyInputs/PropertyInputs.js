import React, { Component } from "react";
import "./PropertyInputs.css";
import {
  editProperties,
  addProperty,
  getProperties
} from "../../redux/propertiesReducer";
import { getRenters, deleteRenter } from "../../redux/renterReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Header from "../header/Header";
import { getAdmin } from "../../redux/adminReducer";

class PropertyInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      address: "",
      num_beds: "",
      num_baths: "",
      square_footage: "",
      acreage: "",
      rent: "",
      gas_company: "",
      electric_company: "",
      has_renter: "",
      fridge_included: "",
      dishwasher_included: "",
      washer_dryer_included: "",
      mortgage: "",
      tax_yearly: "",
      img_url: "",
      img_url2: "",
      img_url3: "",
      img_url4: "",
      img_url5: "",
      property_name: "",
      prop_id: ""
    };
  }

  componentDidMount() {
    if (this.props.match.path === "/propertyinput/:prop_id") {
      this.switchEdit();
    } else {
      this.setState({ editing: false });
    }
    if (this.props.match.path === "/add/renter/propertyinputs/:prop_id") {
      this.setState({ editing: false });
    }

    this.props.properties.find(property => {
      if (+this.props.match.params.prop_id === property.prop_id) {
        return this.setState({
          address: property.address,
          num_beds: property.num_beds,
          num_baths: property.num_baths,
          square_footage: property.square_footage,
          acreage: property.acreage,
          rent: property.rent,
          gas_company: property.gas_company,
          electric_company: property.electric_company,
          has_renter: property.has_renter,
          fridge_included: property.fridge_included,
          dishwasher_included: property.dishwasher_included,
          washer_dryer_included: property.washer_dryer_included,
          mortgage: property.mortgage,
          tax_yearly: property.tax_yearly,
          img_url: property.img_url,
          img_url2: property.img_url2,
          img_url3: property.img_url3,
          img_url4: property.img_url4,
          img_url5: property.img_url5,
          property_name: property.property_name,
          prop_id: property.prop_id
        });
      }
    });
    this.props.getAdmin();
    this.props.getProperties();
  }

  componentDidUpdate(pp) {
    if (pp.renters.length < this.props.renters.length) {
      this.switchEdit();
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  switchEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    if (!this.props.admin_id) return <Redirect to="/login" />;
    // if (JSON.parse(this.props.admin.admin.renterCheck) === true) return <Redirect to="/renter" />;
    let {
      address,
      num_beds,
      num_baths,
      square_footage,
      acreage,
      rent,
      gas_company,
      electric_company,
      has_renter,
      fridge_included,
      dishwasher_included,
      washer_dryer_included,
      mortgage,
      tax_yearly,
      img_url,
      img_url2,
      img_url3,
      img_url4,
      img_url5,
      property_name
    } = this.state;

    return (
      <div>
        <Header prop_id={this.props.match.params} />
        <div>
          <h2>Property Name</h2>
          <input
            value={property_name}
            onChange={this.handleChange}
            name="property_name"
          />
        </div>
        <h2>Address</h2>
        <input value={address} onChange={this.handleChange} name="address" />
        <h2>Bedrooms</h2>
        <input value={num_beds} onChange={this.handleChange} name="num_beds" />
        <h2>Bathrooms</h2>
        <input
          value={num_baths}
          onChange={this.handleChange}
          name="num_baths"
        />
        <h2>Square Footage</h2>
        <input
          value={square_footage}
          onChange={this.handleChange}
          name="square_footage"
        />
        <h2>Acreage</h2>
        <input value={acreage} onChange={this.handleChange} name="acreage" />
        <h2>Rent</h2>
        <input value={rent} onChange={this.handleChange} name="rent" />
        <h2>Gas Company</h2>
        <input
          value={gas_company}
          onChange={this.handleChange}
          name="gas_company"
        />
        <h2>Electric Company</h2>
        <input
          value={electric_company}
          onChange={this.handleChange}
          name="electric_company"
        />
        <h2>Has Renter</h2>
        <input
          value={has_renter}
          onChange={this.handleChange}
          name="has_renter"
        />
        <h2>Fridge?</h2>
        <input
          value={fridge_included}
          onChange={this.handleChange}
          name="fridge_included"
        />
        <h2>Diswasher?</h2>
        <input
          value={dishwasher_included}
          onChange={this.handleChange}
          name="dishwasher_included"
        />
        <h2>Washer and Dryer?</h2>
        <input
          value={washer_dryer_included}
          onChange={this.handleChange}
          name="washer_dryer_included"
        />
        <h2>Mortgage</h2>
        <input value={mortgage} onChange={this.handleChange} name="mortgage" />
        <h2>Taxes</h2>
        <input
          value={tax_yearly}
          onChange={this.handleChange}
          name="tax_yearly"
        />
        <h2>Image 1</h2>
        <input value={img_url} onChange={this.handleChange} name="img_url" />
        <h2>Image 2</h2>
        <input value={img_url2} onChange={this.handleChange} name="img_url2" />
        <h2>Image 3</h2>
        <input value={img_url3} onChange={this.handleChange} name="img_url3" />
        <h2>Image 4</h2>
        <input value={img_url4} onChange={this.handleChange} name="img_url4" />
        <h2>Image 5</h2>
        <input value={img_url5} onChange={this.handleChange} name="img_url5" />

        {this.state.editing ? (
          <div>
            <button
              onClick={() =>
                this.props.editProperties(
                  this.state.address,
                  this.state.num_beds,
                  this.state.num_baths,
                  this.state.square_footage,
                  this.state.acreage,
                  this.state.rent,
                  this.state.gas_company,
                  this.state.electric_company,
                  this.state.has_renter,
                  this.state.fridge_included,
                  this.state.dishwasher_included,
                  this.state.washer_dryer_included,
                  this.state.mortgage,
                  this.state.tax_yearly,
                  this.state.img_url,
                  this.state.img_url2,
                  this.state.img_url3,
                  this.state.img_url4,
                  this.state.img_url5,
                  this.state.property_name
                )
              }
            >
              <Link to={`/`}>Save Changes</Link>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              this.props.addProperty(
                this.state.address,
                this.state.num_beds,
                this.state.num_baths,
                this.state.square_footage,
                this.state.acreage,
                this.state.rent,
                this.state.gas_company,
                this.state.electric_company,
                this.state.has_renter,
                this.state.fridge_included,
                this.state.dishwasher_included,
                this.state.washer_dryer_included,
                this.state.mortgage,
                this.state.tax_yearly,
                this.state.img_url,
                this.state.img_url2,
                this.state.img_url3,
                this.state.img_url4,
                this.state.img_url5,
                this.state.property_name
              );
            }}
          >
            <Link to={`/`}>Add</Link>
          </button>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin_id: state.admin.admin.id,
    ...state.renters,
    ...state.properties
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
)(PropertyInputs);
