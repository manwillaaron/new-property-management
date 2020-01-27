import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Renter.css';
import { connect } from 'react-redux';
import {
  addRenter,
  editRenter,
  deleteRenter,
  getRenters
} from '../../redux/renterReducer';
import { getAdmin } from '../../redux/adminReducer';
import Header from '../header/Header';
import Input from '../input/Input';

class Renter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      prop_id: props.match.params.prop_id
    };
  }

  // componentDidMount() {
  //   this.props.getAdmin();
  // }

  handleChange = e => {
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { first_name, last_name, phone_number, email, prop_id } = this.state;
    let inputArr = [
      { text: 'first_name', val: first_name },
      { text: 'last_name', val: last_name },
      { text: 'phone_number', val: phone_number },
      { text: 'email', val: email }
    ].map((input, i) => (
      <Input key={i} input={input} handleChange={this.handleChange} />
    ));

    return (
      <div>
        <Header />
        <div>
          {inputArr}
          <button onClick={() => this.props.addRenter(this.state)}>
            <Link to={`/moreinfo/${prop_id}`}>Add</Link>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin, properties: state.properties };
}

export default connect(mapStateToProps, {
  getRenters,
  addRenter,
  editRenter,
  deleteRenter,
  getAdmin
})(Renter);
