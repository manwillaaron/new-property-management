import React, { Component } from 'react';
import './RenterDisplay.css';
import { getRenters, deleteRenter, getAllRenters } from '../../redux/renterReducer';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Renter from '../renter/Renter';

class RenterDisplay extends Component {
  componentDidMount() {
    this.props.getRenters(+this.props.prop_id);
  }

  deleteRenter = rid => {
    this.props.deleteRenter(rid);
    this.props.getRenters(+this.props.prop_id);
  };

  render() {
    return (
      <div className="renters-container">
        {this.props.renters.map((renter, a) => (
          <Renter
            key={renter.admin_id}
            renter={renter}
            deleteRenter={this.props.deleteRenter}
            getAllRenters={this.props.getAllRenters}
          />
        ))}
        <Link to={`/add/renter/${this.props.prop_id}`}>add Renter to property</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.renters
  };
}

export default connect(mapStateToProps, {
  getAllRenters,
  getRenters,
  deleteRenter
})(RenterDisplay);
