import React, { Component } from 'react';
import './Login.css';
import { login, getAdmin } from '../../redux/adminReducer';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './Logo-rentops.png';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      show: false
    };
  }
  componentDidMount() {
  //  this.props.toggle()
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  login = () => {
    const { username, password } = this.state;
    axios
      .post('/api/login', { username, password })
      .then(res => this.props.history.push('/'))
      .catch(err => this.setState({show:true}));
  };

  render() {
    // if (this.props.admin.admin.loggedIn) {
    //   return <Redirect to="/" />;
    // }
    let { username, password } = this.state;
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
                onChange={this.handleChange}
                name="username"
              />
            </div>
            <div className="password">
              <h1>Password: </h1>
              <input
                type="password"
                className="input2"
                value={password}
                onChange={this.handleChange}
                name="password"
                onKeyDown={ev => {
                  if (ev.key === 'Enter') {
                    this.props.login(username, password);
                    ev.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="button-container">
            <button
              className="button"
              onClick={() => this.login(username, password)}
            >
              Login
            </button>
            <SweetAlert
              show={this.state.show}
              title="login incorrect"
              text="check username and password"
              onConfirm={() => this.setState({ show: false })}
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
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  };
}

export default withRouter(connect(mapStateToProps, { login, getAdmin })(Login));
