import React, { Component } from "react";
import "./Login.css";
import { login, getAdmin } from "../../redux/adminReducer";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from './Logo-rentops.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  async componentDidMount() {
    this.props.getAdmin();
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  render() {
    if (this.props.admin.admin.loggedIn) {
      return <Redirect to="/renter" />;
    }
    let { username, password } = this.state;
    return (
      <div className="login-page">
        <img src={logo} className="title" alt='RentOps'/>
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <div className="username-password-input-container">
            <div className="username">
              <h1>Username:</h1>
              <input
                className="input"
                value={username}
                onChange={this.handleChange}
                name="username"
              />
            </div>
            <div className="password">
              <h1>Password: </h1>
              <input
                type="password"
                className="input"
                value={password}
                onChange={this.handleChange}
                name="password"
                onKeyDown={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    this.props.login(username, password)
                    ev.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="button-container">
            <button
              className="button"
              onClick={() => this.props.login(username, password)}
            >
              Login
            </button>
            <button className="button">
              <Link
                style={{ color: "black", textDecoration: "none" }}
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

export default connect(
  mapStateToProps,
  { login, getAdmin }
)(Login);
