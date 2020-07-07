import React, { Component } from 'react';
import './Register.css';
import { register, getAdmin } from '../../redux/adminReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import  Input  from '../input/Input'

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
      .then(_ => this.props.history.push('/renter'));
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

    const inputArr = [
      { text: 'username', val: username },
      { text: 'password', val: password },
      { text: 'first_name', val: first_name },
      { text: 'last_name', val: last_name },
      { text: 'phone_number', val: phone_number },
      { text: 'email', val: email }
    ].map((input, i) => <Input key={i} text={input.text} val={input.val} handleChange={this.handleChange} />);

    return (
      <div className="register-page">
        <h1 className="title">RentOps</h1>
        <div className="username-password-container">{inputArr}</div>
        <div className="register-button">
          <button onClick={() => this.registerAdmin()}>Submit</button>
        </div>
        <SweetAlert
        show={this.state.show}
        title="invalid entries"
        text="all fields are required"
        onConfirm={() => this.setState({ show: false })}
      />
        <div style={{'display':'flex'}}>
          <p>Already have an account?</p>
          <Link to="/login">click here to login</Link>
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
