import React, {useEffect } from 'react';
import './AdminDashboard.css';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdmin } from '../../redux/adminReducer';
import { getProperties } from '../../redux/propertiesReducer';
import Admin from './Admin';

 function AdminDashboard(props) {
  useEffect(()=>{
      if (!props.admin.admin.loggedIn) {
  props.getAdmin();
     if (!props.properties)  props.getProperties();
  }
  }, [])
  
  useEffect(()=>{
  props.getProperties(props.adminId);
  }, [props])
    let { loggedIn, renterCheck } = props.admin.admin;
    if (!loggedIn) return <Redirect to="/login" />;
    if (JSON.parse(props.admin.admin.renterCheck) === true)
      return <Redirect to="/renter" />;

    return (
      <div className="admindash-containter">
        <Admin />
      </div>
    );
  }

function mapStateToProps(state) {
  return {
    admin: state.admin,
    properties: state.properties
  };
}

export default 
 withRouter(connect(mapStateToProps, { getAdmin, getProperties })(
  AdminDashboard
))
