import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { connect } from 'react-redux';
import { getAdmin } from '../../redux/adminReducer';
import Admin from '../admin/Admin';
import { withRouter } from 'react-router-dom';

const AdminDashboard = (props) => {
  const [toggled, toggle] = useState(false);
  useEffect(() => {
    loginCheck();
    if(props.rcheck){
     props.history.push('/renter')
    }
  }, []);

  async function loginCheck() {
    try {
      await props.getAdmin();
    } catch {
      props.history.push('/login');
    } finally {
      if (toggled === false) {
        toggle(true);
      }
    }
  }
  return <div className="admindash-containter">{toggled && <Admin toggle={toggle} />}</div>;
}

export default withRouter(connect(null, { getAdmin })(AdminDashboard));
