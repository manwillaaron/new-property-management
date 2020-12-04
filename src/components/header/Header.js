import React, { Component } from 'react';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout, getAdmin } from '../../redux/adminReducer';
import logo from './Logo-rentops.png';

const Header = (props) => {
  console.log(props.history)
  return(
  <div className="header">
    <div className="spacer-header" />
    <div className="header-title-container">
      <img src={logo} className="header-title" alt="RentOps" />
    </div>
    <div className="header-button-container">
      <button
        className="header-buttons"
        onClick={e => {
          props.signout()
          props.history.push('/login')
        }}
      >
        {' '}
        Log Out
      </button>
     { props.history.location.pathname !=='/login' && <button className="header-buttons" onClick={() => props.history.goBack()}>
        {' '}
        Go Back
      </button>}
    </div>
  </div>
  )};

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default withRouter(
  connect(mapStateToProps, { signout, getAdmin })(Header)
);
