import React, { Component } from 'react';
import './PropertyInputs.css';
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
import Input from '../input/Input';

class PropertyInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      address: '',
      num_beds: '',
      num_baths: '',
      square_footage: '',
      acreage: '',
      rent: '',
      gas_company: '',
      electric_company: '',
      has_renter: '',
      fridge_included: '',
      dishwasher_included: '',
      washer_dryer_included: '',
      mortgage: null,
      tax_yearly: null,
      img_url: '',
      img_url2: '',
      img_url3: '',
      img_url4: '',
      img_url5: '',
      property_name: '',
      prop_id: ''
    };
  }

  componentDidMount() {
    if (this.props.match.path === '/propertyinput/:prop_id') {
      this.switchEdit();
    } else {
      this.setState({ editing: false });
    }
    if (this.props.match.path === '/add/renter/propertyinputs/:prop_id') {
      this.setState({ editing: false });
    }
    
    this.props.properties.find(property => {
      if (+this.props.match.params.prop_id === property.prop_id) {
        return this.setState(property);
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
    let { loggedIn, renterCheck } = this.props.admin.admin;
    if (!loggedIn) return <Redirect to="/login" />;
    if (Boolean(renterCheck) === true) return <Redirect to="/renter" />;
    const stateArr = [
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
    ];
    let inputs = [
      { val: this.state.address, text: 'address' },
      { val: this.state.num_beds, text: 'num_beds' },
      { val: this.state.num_baths, text: 'num_baths' },
      { val: this.state.square_footage, text: 'square_footage' },
      { val: this.state.acreage, text: 'acreage' },
      { val: this.state.rent, text: 'rent' },
      { val: this.state.gas_company, text: 'gas_company' },
      { val: this.state.electric_company, text: 'electric_company' },
      { val: this.state.has_renter, text: 'has_renter' },
      { val: this.state.fridge_included, text: 'fridge_included' },
      { val: this.state.dishwasher_included, text: 'dishwasher_included' },
      { val: this.state.washer_dryer_included, text: 'washer_dryer_included' },
      { val: this.state.mortgage, text: 'mortgage' },
      { val: this.state.tax_yearly, text: 'tax_yearly' },
      { val: this.state.img_url, text: 'img_url' },
      { val: this.state.img_url2, text: 'img_url2' },
      { val: this.state.img_url3, text: 'img_url3' },
      { val: this.state.img_url4, text: 'img_url4' },
      { val: this.state.img_url5, text: 'img_url5' },
      { val: this.state.property_name, text: 'property_name' }
    ].map((input, i) => <Input key={i} input={input} handleChange={this.handleChange} />);
    return (
      <div>
        <Header prop_id={this.props.match.params} />
        {inputs}

        {this.state.editing ? (
          <div>
            <button
              onClick={() => {
                this.props.editProperties(
                  this.props.match.params.prop_id,
                  ...stateArr
                );
              }}
            >
              <Link to={`/`}>Save Changes</Link>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              this.props.addProperty(...stateArr);
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
    admin: state.admin,
    admin_id: state.admin.admin.id,
    ...state.renters,
    ...state.properties
  };
}

export default connect(mapStateToProps, {
  editProperties,
  addProperty,
  getProperties,
  getRenters,
  deleteRenter,
  getAdmin
})(PropertyInputs);
