import React, { Component } from "react";
import "./Register.css";
import { register, getAdmin } from "../../redux/adminReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: ""
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props) {
      this.render()
    }
  }

  componentDidMount() {
    this.props.getAdmin();
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    console.log(value);
  };

  async registerAdmin() {
    let {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    } = this.state;

    await this.props.register(
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    );
  }

  render() {
    const {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    } = this.state;

    if (this.props.admin.admin.loggedIn) {
      return <Redirect to="/renter"/>
    }
    return (
      <div className="register-page">
        <h1 className="title">RentOps</h1>
        <div className="all-info">
          <h1 className="register-title">Register</h1>
          <div className="username-password-container">
            <div className="username-password-boxes">
              <h1>Username: </h1>
              <input
                value={username}
                onChange={this.handleChange}
                name="username"
              />
            </div>
            <div className="username-password-boxes">
              <h1>Password: </h1>
              <input
                type="password"
                value={password}
                onChange={this.handleChange}
                name="password"
              />
            </div>
          </div>
          <div className="more-info-container">
            <div className="moreinfo-boxes">
              <h1>First name: </h1>
              <input
                value={first_name}
                onChange={this.handleChange}
                name="first_name"
              />
            </div>
            <div className="moreinfo-boxes">
              <h1>Last name: </h1>
              <input
                value={last_name}
                onChange={this.handleChange}
                name="last_name"
              />
            </div>
            <div className="moreinfo-boxes">
              <h1>phone_number: </h1>
              <input
                value={phone_number}
                onChange={this.handleChange}
                name="phone_number"
              />
            </div>
            <div className="moreinfo-boxes">
              <h1>email: </h1>
              <input value={email} onChange={this.handleChange} name="email" />
            </div>
            <div className="register-button">
                <button onClick={() => this.registerAdmin()}>
                  <Link to = '/renter'>Register</Link>
                </button>
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.admin };
}

export default connect(
  mapStateToProps,
  { register, getAdmin }
)(Register);
