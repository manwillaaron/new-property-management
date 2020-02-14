import React, { useState } from 'react';
import './Login.css';
import { login, getAdmin } from '../../redux/adminReducer';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './Logo-rentops.png';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';

function Login(props) {
  const [show, toggleShow] = useState(false);
  const [inputs, handle] = useState({ username: '', password: '' });

  const handleChange = e => {
  
    const { value, name } = e.target;
    handle({ ...inputs, [name]: value });
  };

  const login = () => {
    axios
      .post('/api/login', { username, password })
      .then(res => props.history.push('/loading'))
      .catch(err => toggleShow(true));
  };
  
  let { username, password } = inputs;
  return (
    <div className="login-page">
      <img src={logo} className="title" alt="RentOps" />
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <div className="username-password-input-container">
          <div className="username">
            <h1>Username:</h1>
            <input
              className="input1"
              value={username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div className="password">
            <h1>Password: </h1>
            <input
              type="password"
              className="input2"
              value={password}
              onChange={handleChange}
              name="password"
              onKeyDown={ev => {
                if (ev.key === 'Enter') {
                  props.login(username, password);
                  ev.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => login(username, password)}>
            Login
          </button>
          <SweetAlert
            show={show}
            title="login incorrect"
            text="check username and password"
            onConfirm={() => toggleShow(false)}
          />
          <button className="button">
            <Link
              style={{ color: 'black', textDecoration: 'none' }}
              to="/register"
            >
              Register
            </Link>
          </button>
        </div>
      </div>
      <div />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  };
}

export default withRouter(connect(mapStateToProps, { login, getAdmin })(Login));
