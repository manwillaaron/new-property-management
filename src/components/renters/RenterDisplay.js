import React, { Component } from "react";
// import "./RenterDisplay.css";
import {
  editProperties,
  addProperty,
  getProperties
} from "../../redux/propertiesReducer";
import { getRenters, deleteRenter } from "../../redux/renterReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAdmin } from "../../redux/adminReducer";

class RenterDisplay extends Component {
  async componentDidUpdate(pp) {
    if (pp.renters.length > 1 && this.props.renters.length === 0) {
     await this.props.getRenters(+this.props.prop_id);
    }
  }

  componentDidMount() {
    this.props.getRenters(+this.props.prop_id);
  }

  deleteRenter = rid => {
    this.props.deleteRenter(rid);
    this.props.getRenters(this.props.prop_id);
  };

  render() {
    if (!this.props.admin_id) return <Redirect to="/login" />;
    if (!this.props.renters) return this.props.getRenters(this.props.prop_id);
    return (
      <div className="renters-container">
        {this.props.renters.map((renter, a) => (
          <div className="renter-container" key={renter.admin_id}>
            <div className="renter-count-container">
              <h2 className="renter-count">renter {a + 1}</h2>
            </div>
            <div>
              <h4>Name</h4>
              <h5>
                {renter.first_name} {renter.last_name}
              </h5>
            </div>
            <div>
              <h4>Phone Number</h4>
              <h5>{renter.phone_number}</h5>
            </div>
            <div>
              <h4>Email</h4>
              <h5>{renter.email}</h5>
            </div>
            <div>
              <button
                onClick={() =>
                  this.props.deleteRenter(renter.admin_id, this.props.prop_id)
                }
              >
                delete
              </button>
            </div>
          </div>
        ))}

        <div>
          <button>
            <Link to={`/add/renter/${this.props.prop_id}`}>add renter</Link>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin_id: state.admin.admin.id,
    ...state.renters,
    ...state.properties
  };
}

export default connect(
  mapStateToProps,
  {
    editProperties,
    addProperty,
    getProperties,
    getRenters,
    deleteRenter,
    getAdmin
  }
)(RenterDisplay);
