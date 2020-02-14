import React, { Component } from 'react';
import './RenterDashboard.css';
import { getAdmin } from '../../redux/adminReducer';
import { getProperties } from '../../redux/propertiesReducer';
import { connect } from 'react-redux';
import Header from '../header/Header';
import { Redirect, Link } from 'react-router-dom';
import CheckoutForm from '../../CheckoutForm';

class RenterDashboard extends Component {
  constructor() {
    super();
    this.state = {
      admin_id: ''
    };
  }

  componentDidMount() {
    this.getSingleObj();
    this.props.getAdmin();
    this.props.getProperties(this.props.admin.admin.id);
  }

  getSingleObj = () => {
    let a = this.props.property.properties;
    const output = Object.assign({}, ...a);
    return output;
  };

  render() {
    let propObj = this.getSingleObj();
    return (
      <div className="renter-dash-container">
        <Header />
        <div className="picture-button-container">
          <div className="rows-renter">
            <Link
              className="picture-buttons2"
              to={`/renter/moreinfo/${propObj.prop_id}`}
              onClick={() => console.log('clicked')}
              style={{
                backgroundImage: 'url(' + `${propObj.img_url}` + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 class="centered">Rental Information</h1>
            </Link>
            <Link
              className="picture-buttons"
              onClick={() => console.log('clicked')}
              style={{
                backgroundImage:
                  'url(' +
                  `https://images.unsplash.com/photo-1494887205043-c5f291293cf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="centered1">
                <h1>Rent</h1>
                <CheckoutForm className="centered" rent={propObj.rent} />
              </div>
            </Link>
          </div>
          <div className="rows-renter">
            <Link
              className="picture-buttons"
              to={`/propertymanager/chat/${this.props.admin.admin.id}`}
              onClick={() => console.log('clicked')}
              style={{
                backgroundImage:
                  'url(' +
                  `https://images.unsplash.com/photo-1516822669470-73d1771e95a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 class="centered">Repairs</h1>
            </Link>
            <Link
              to={`/manager/chat/${propObj.admin_id}`}
              className="picture-buttons1"
              onClick={() => console.log('clicked', propObj)}
              style={{
                backgroundImage:
                  'url(' +
                  `https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 class="centered">Messages</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    property: state.properties
  };
}

export default connect(mapStateToProps, { getAdmin, getProperties })(
  RenterDashboard
);
