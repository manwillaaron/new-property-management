import React from 'react';
import './RenterHeader.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../redux/adminReducer';

const RenterHeader = props => (
  <div className="header">
    <div />
    <div className="header-title-container">
      <h1 className="header-title">RentalOps</h1>
    </div>

    <div className="header-button-container">
      <Link
        onClick={e => props.signout(props.admin.admin_id)}
        className="header-buttons"
        to="/"
      >
        {' '}
        Log Out
      </Link>
    </div>
  </div>
);

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default withRouter(connect(mapStateToProps, { signout })(RenterHeader));
