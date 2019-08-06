import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.js";
import Login from "./components/login/Login.js";
import PropertyInputs from "./components/propertyInputs/PropertyInputs.js";
import Properties from "./components/properties/Properties";
import Register from "./components/register/Register.js";
import Renter from "./components/renters/Renter";
import RenterDashboard from './components/renterDashboard/RenterDashboard'
import RenterDirectory from "./components/renterDirectory/RenterDirectory";
import RenterPropertyView from "./components/renterPropertyView/RenterPropertyView.js";
import CheckoutForm from './CheckoutForm.js'
import SocketView from "./components/socketView/SocketView.js";
import ChatDisplay from "./components/chatDisplay/ChatDisplay.js";
import PropertiesPreview from "./components/properties/PropertiesPreview.js";

export default (
  <Switch>
    <Route path="/" exact component={AdminDashboard} />
    <Route path='/renter' exact component={RenterDashboard}/>
    <Route path='/propertiespreview' component={PropertiesPreview}/>
    <Route path="/moreinfo/:prop_id" component={Properties} />
    <Route path="/moreinfo" component={Properties} />
    <Route path="/add/moreinfo" component={Properties} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/propertyinput/:prop_id" component={PropertyInputs} />
    <Route path="/add/renter/propertyinputs/:prop_id" component={PropertyInputs} />
    <Route path="/add/propertyinput" component={PropertyInputs} />
    <Route path="/edit/renters/:prop_id" component={Renter} />
    <Route path="/add/renter/:prop_id" component={Renter} />
    <Route path='/directory/renters' component={RenterDirectory}/>
    <Route path='/renter/moreinfo/:prop_id' component={RenterPropertyView}/>
    <Route path='/pay/rent/:prop_rent' component={CheckoutForm}/>
    <Route path='/propertymanager/chat/:admin_id' component={ChatDisplay}/>
  </Switch>
);
