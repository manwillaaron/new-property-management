import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AdminDashboard from './components/adminDashboard/AdminDashboard.js';
import Login from './components/login/Login.js';
import PropertyInputs from './components/propertyInput/PropertyInputs';
import Properties from './components/properties/Properties';
import Register from './components/register/Register.js';
import RenterInputs from './components/renters/RenterInputs';
import RenterDashboard from './components/renterDashboard/RenterDashboard';
import RenterDirectory from './components/renterDirectory/RenterDirectory';
import RenterPropertyView from './components/renterPropertyView/RenterPropertyView.js';
import CheckoutForm from './CheckoutForm.js';
import ChatDisplay from './components/chatDisplay/ChatDisplay.js';
import PropertiesPreview from './components/propertiesPreview/PropertiesPreview.js';
import { connect } from 'react-redux';
import { getAdmin } from './redux/adminReducer';
import { useCall as useAxios } from './customHooks/userCheck';
import axios from 'axios';

const Routes = props => {
  const data = useAxios('/api/admin');
  console.log(data)
  useEffect(() => {
    if (
      props.location.path !== '/login' ||
      props.location.path !== '/register' ||
      data !== 'Loading...'
    ) {
      loginCheck();
    }
  }, [props.location]);

  async function loginCheck() {
    
  }

  return (
    <Switch>
      <Route path="/" exact component={() => <AdminDashboard />} />
      <Route path="/propertiespreview" component={PropertiesPreview} />
      <Route path="/moreinfo/:prop_id" component={Properties} />
      <Route path="/moreinfo" component={Properties} />
      <Route path="/add/moreinfo" component={Properties} />
      <Route path="/propertyinput/:prop_id" component={PropertyInputs} />
      <Route path="/directory/renters" component={RenterDirectory} />
      <Route path="/add/propertyinput" component={PropertyInputs} />
      <Route
        path="/add/renter/propertyinputs/:prop_id"
        component={PropertyInputs}
      />
      <Route path="/edit/renters/:prop_id" component={RenterInputs} />
      <Route path="/add/renter/:prop_id" component={RenterInputs} />
      )}
      <Route path="/pay/rent/:prop_rent" component={CheckoutForm} />
      <Route path="/renter" exact component={RenterDashboard} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={() => <Login />} />
      <Route path="/renter/moreinfo/:prop_id" component={RenterPropertyView} />
      <Route path="/manager/chat/:admin_id" component={ChatDisplay} />
    </Switch>
  );
};
export default withRouter(connect(null, { getAdmin })(Routes));
