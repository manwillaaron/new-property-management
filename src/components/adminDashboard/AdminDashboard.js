import React, {useContext} from 'react';
import './AdminDashboard.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdmin } from '../../redux/adminReducer';
import { getProperties } from '../../redux/propertiesReducer';

const AdminDashboard = _ => (
    <div className="admin-dash-container">
      {/* <Header /> */}
      <div className="picture-button-container-admin">
        <div className="rows-admin">
          <Link
            className="picture-buttons-admin"
            to={'/propertiespreview'}
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
            to={"/dash/expense"}
            className="picture-buttons-admin"
            style={{
              backgroundImage: 'url(' + 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {' '}
            <h1 className="centered-admin">Expenses</h1>
         </Link>
         <Link
              className="picture-buttons-admin"
              to={`/admin/repairs`}
              style={{
                backgroundImage:
                  'url(' +
                  `https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80` +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {' '}
              <h1 class="centered">Repairs</h1>
            </Link>
        </div>
      </div>
    </div>
  );

function mapStateToProps(state) {
  return {
    properties: state.properties
  };
}

export default withRouter(
  connect(mapStateToProps, { getAdmin, getProperties })(AdminDashboard)
);
