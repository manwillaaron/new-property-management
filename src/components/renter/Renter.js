import React from 'react';
import { Link } from 'react-router-dom';

const Renter = props => (
  <div className="renter-containers" key={props.renter.admin_id}>
    <div className="renter-elements-nobtns">
      <div className="renter-elements">
        <h1 className="renterh1"> Name</h1>
        <h1 className="renterh1">
          {props.renter.first_name} {props.renter.last_name}
        </h1>
      </div>
      <div className="renter-elements">
        <h1 className="renterh1">Phone Number</h1>
        <h1 className="renterh1">{props.renter.phone_number}</h1>
      </div>
      <div className="renter-elements">
        <h1 className="renterh1">Email</h1>
        <h1 className="renterh1">{props.renter.email}</h1>
      </div>
      {/* <div className="renter-elements">
        <h1 className="renterh1">Property</h1>
        <h1 className="renterh1">{props.properties.address}</h1>
      </div> */}
    </div>
    <div />
    <div />
    <div className="renter-elements-btns">
      <button className="rent-but-style">
        <Link to={`/directory/renters/chat/${props.renter.admin_id}`}>
          chat with {props.renter.first_name}
        </Link>
      </button>
      <button
        className="rent-but-style"
        onClick={async () => {
          await props.deleteRenter(props.renter.admin_id);
          props.getAllRenters();
        }}
      >
        Remove Renter
      </button>
    </div>
    <div />
  </div>
);

export default Renter;
