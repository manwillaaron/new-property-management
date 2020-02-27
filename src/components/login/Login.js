import React, { useState } from 'react';
import './Login.css';
import { login, getAdmin } from '../../redux/adminReducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import useInputs from '../../customHooks/useInputs';
import Input from '../input/Input'

function Login(props) {
  const [inputsObj, inputsArr, input] = useInputs('login',props.match, false);
  const [show, toggleShow] = useState(false);

  const login = () => {
    axios
      .post('/api/login', inputsObj)
      .then(res => props.history.push('/loading'))
      .catch(err => toggleShow(true));
  };
  return (
    <div className="login-page">
      <div/>
      <div className="login-box">
          {inputsArr.map(inp => (
        <div className="username">
           <Input className="input1" key={inp} val={inputsObj[inp]}
        text={inp} handleChange={input} />
        </div> 
          ))}
        <div className="button-container">
          <button className="button" onClick={() => login()}>
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
