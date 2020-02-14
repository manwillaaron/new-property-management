import React, { useEffect } from 'react';
import './Admin.css';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdmin } from '../../redux/adminReducer';
import { getProperties } from '../../redux/propertiesReducer';
import add from './addHosuse2-01.png';
import Header from '../header/Header';

  function AdminDashboard(props) {
  // useEffect(()=>{
  // //   if (!props.admin.admin.loggedIn) {
  // // props.getAdmin();
  
  // // if (!props.properties) props.getProperties();
  // // }
  // // if (Boolean(props.admin.admin.renterCheck) === true)
  // // return <Redirect to="/renter" />;
  // },[])

    let { loggedIn, renterCheck } = props.admin.admin;
    // if (!loggedIn) return <Redirect to="/login" />;
    // if (Boolean(renterCheck) === true) return <Redirect to="/renter" />;

    return (
      <div className="admin-dash-container">
        <Header />
        <div className="picture-button-container-admin">
          <div className="rows-admin">
            <Link
              className="picture-buttons-admin"
              to={'/propertiespreview'}
              onClick={() => props.toggle(false)}
              style={{
                backgroundImage:
                  'url(' +
                  'https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <h1 className="centered-admin">Your Rentals</h1>
            </Link>

            <Link
              to={'/directory/renters'}
              className="picture-buttons-admin"
              onClick={() => props.toggle(false)}
              style={{
                backgroundImage:
                  'url(' +
                  `https://images.unsplash.com/photo-1510936470381-68e4c0a5e24b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60` +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 className="centered1-admin">Renter Directory</h1>
            </Link>
          </div>
          <div className="rows-admin">
            <Link
              to={'/add/propertyinput'}
              className="picture-buttons-admin"
              onClick={() => props.toggle(false)}
              style={{
                backgroundImage: 'url(' + add + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 className="centered-admin">Add House</h1>
            </Link>
            <Link
              to={`/propertymanager/chat/`}
              onClick={() => props.toggle(false)}
              className="picture-buttons-admin"
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
              <div className="centered2-admin">
                <h1>Messages</h1>
                <div className="msg-counter">2</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

function mapStateToProps(state) {
  return {
    admin: state.admin,
    properties: state.properties
  };
}

export default withRouter(connect(mapStateToProps, { getAdmin, getProperties })(
  AdminDashboard
));