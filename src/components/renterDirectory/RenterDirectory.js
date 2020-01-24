import React, { Component } from 'react';
import './RenterDirectory.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  addRenter,
  editRenter,
  deleteRenter,
  getAllRenters
} from '../../redux/renterReducer';
import { getProperties } from '../../redux/propertiesReducer';
import { getAdmin } from '../../redux/adminReducer';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

class RenterDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: ''
    };
  }

  componentDidMount() {
    this.props.getAdmin();
    this.props.getAllRenters();
  }

  render() {
    let { loggedIn, renterCheck } = this.props.admin.admin;
    if (!loggedIn) return <Redirect to="/login" />;
    if (Boolean(renterCheck) === true) return <Redirect to="/renter" />;
    const { renters } = this.props.renters;
    return (
      <div className="renter-directory-page">
        <Header />
        <div className="renters-container">
          {renters.map(renter => (
            <div className="renter-containers" key={renter.admin_id}>
              <div className="renter-elements-nobtns">
                <div className="renter-elements">
                  <h1 className="renterh1"> Name</h1>
                  <h1 className="renterh1">
                    {renter.first_name} {renter.last_name}
                  </h1>
                </div>
                <div className="renter-elements">
                  <h1 className="renterh1">Phone Number</h1>
                  <h1 className="renterh1">{renter.phone_number}</h1>
                </div>
                <div className="renter-elements">
                  <h1 className="renterh1">Email</h1>
                  <h1 className="renterh1">{renter.email}</h1>
                </div>
                <div className="renter-elements">
                  <h1 className="renterh1">Property</h1>
                  <h1 className="renterh1">{this.props.properties.address}</h1>
                </div>
              </div>
              <div />
              <div />
              <div className="renter-elements-btns">
                <button className="rent-but-style">
                  <Link
                    to={`/propertymanager/chat/${renter.admin_id}`}
                  >
                    chat with {renter.first_name}
                  </Link>
                </button>
                <button
                  className="rent-but-style"
                  onClick={async () => {
                    await this.props.deleteRenter(renter.admin_id);
                    this.props.getAllRenters();
                  }}
                >
                  Remove Renter
                </button>
              </div>
              <div />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    properties: state.properties,
    renters: state.renters
  };
}

export default connect(mapStateToProps, {
  getAllRenters,
  addRenter,
  editRenter,
  deleteRenter,
  getAdmin,
  getProperties
})(RenterDirectory);
