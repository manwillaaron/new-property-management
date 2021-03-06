import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useAxios } from './customHooks/userCheck';
import AdminDashboard from './components/adminDashboard/AdminDashboard.js';
import Login from './components/login/Login.js';
import PropertyInputs from './components/propertyInput/PropertyInputs';
import Properties from './components/properties/Properties';
import Register from './components/register/Register.js';
import RenterInputs from './components/renters/RenterInputs';
import RenterDashboard from './components/renterDashboard/RenterDashboard';
import RenterDirectory from './components/renterDirectory/RenterDirectory';
import RenterPropertyView from './components/renterPropertyView/RenterPropertyView.js';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import ChatDisplay from './components/chatDisplay/ChatDisplay.js';
import PropertiesPreview from './components/propertiesPreview/PropertiesPreview.js';
import Loading from './components/loading/Loading.js';
import ExpenseInputs from './components/ExpenseInputs/ExpenseInputs';
import Expenses from './components/expenses/Expenses';
import ExpenseDash from './components/ExpenseDash/ExpenseDash';
import Header from './components/header/Header';
import RepairForm from './components/repairs/RepairForm';
import AdminRepairs from './components/repairs/AdminRepairs';
 
const Routes = ({ history, location }) => {
  const [  , call] = useAxios('/api/admin', history.push, location.pathname);
  useEffect(_ => call(), [history.location.pathname]);
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/add/propertyinput" component={PropertyInputs} />
        <Route path="/propertiespreview" component={PropertiesPreview} />
        <Route path="/loading" component={Loading} />
        <Route path="/moreinfo/:prop_id" component={Properties} />
        <Route path="/moreinfo" component={Properties} />
        <Route path="/add/moreinfo" component={Properties} />
        <Route path="/propertyinput/:prop_id" component={PropertyInputs} />
        <Route path="/directory/renters" component={RenterDirectory} />
        <Route
          path="/add/renter/propertyinputs/:prop_id"
          component={PropertyInputs}
        />
        <Route path="/edit/renters/:prop_id" component={RenterInputs} />
        <Route path="/add/renter/:prop_id" component={RenterInputs} />
        <Route path="/pay/rent/:prop_rent" component={CheckoutForm} />
        <Route path="/renter" exact component={RenterDashboard} />
        <Route path="/register" component={Register} />
        <Route
          path="/renter/moreinfo/:prop_id"
          component={RenterPropertyView}
        />
        <Route path="/manager/chat/:admin_id" component={ChatDisplay} />
        <Route path="/" exact component={AdminDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/input/expenses" component={ExpenseInputs} />
        <Route path="/expense/report/:id" component={Expenses} />
        <Route path="/dash/expense" component={ExpenseDash} />
        <Route path="/repair/form/:prop_id" component={RepairForm}/>
        <Route path="/admin/repairs" component={AdminRepairs}/>
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
