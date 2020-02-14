import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RenterInputs.css';
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

class RenterInputs extends Component {
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
    let inputArr = [
       'first_name',
       'last_name',
       'phone_number',
       'email'
    ]
    
    inputArr = inputArr.map((input, i) => {
      return (
        <Input key={i} val={this.state[input]}
        text={input} handleChange={this.handleChange} />
        )
      }
      )

    return (
      <div>
        <Header />
        <div>
          {inputArr}
          <button onClick={() => this.props.addRenter(this.state)}>
            <Link to={`/moreinfo/${this.state.prop_id}`}>Add</Link>
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
})(RenterInputs);
