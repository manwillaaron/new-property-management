import React, { Component, useEffect, useState } from 'react';
import './Register.css';
import { register, getAdmin } from '../../redux/adminReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  componentDidMount() {
    this.props.getAdmin();
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  registerAdmin = async () => {
    let {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    } = this.state;
    if (
      !username ||
      !password ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !email
    ) {
      return this.setState({ show: true });
    }
    await this.props
      .register(username, password, first_name, last_name, phone_number, email)
      .then(_ => this.props.history.push('/loading'));
  };

  render() {
    const {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    } = this.state;

    const arr = [
      { text: 'Username', val: username },
      { text: 'Password', val: password },
      { text: 'First_name', val: first_name },
      { text: 'Last_name', val: last_name },
      { text: 'Phone_number', val: phone_number },
      { text: 'Email', val: email }
    ]
    const inputArr = arr.map((input, i) => <input
      className='input1 margin-bottom'
      key={i}
      placeholder={input.text}
      val={input.val}
      type={input.text === "Password"&& 'password'}
      name={input.text.toLowerCase()}
      onChange={(e) => this.handleChange(e)}
          />);
    return (
      <div className="login-page">
        <div className="login-box">{inputArr}
        <div className="button-container">
          <button 
          className='button'
          onClick={() => this.registerAdmin()}
          >Submit</button>
        </div>
        <SweetAlert
          show={this.state.show}
          title="invalid entries"
          text="all fields are required"
          onConfirm={() => this.setState({ show: false })}
        />
        <div style={{ 'display': 'flex' }}>
          <p>Already have an account?</p>
          <Link to="/login">click here to login</Link>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default withRouter(
  connect(mapStateToProps, { register, getAdmin })(Register)
);
