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
    console.log('hit login')
    axios
      .post('/api/login', inputsObj)
      .then( _ => props.history.push('/loading'))
      .catch( _ => toggleShow(true));
  };
  console.log(inputsObj, inputsArr)
  return (
    <div className="login-page">
      <div className="login-box">
          {inputsArr.map(inp => {
            console.log(inp)
            return(
        <div className="username">
           <Input className="input1" key={inp} type={inp === 'Password'? 'password':'text'} val={inputsObj[inp]}
          text={inp} handleChange={input} />
        </div> 
          )})}
        <div className="button-container">
          <button className="button" onClick={() => login()}>
            Login
          </button>
          <SweetAlert
            show={show}
            title="Incorrect Login"
            text="Please check username and password"
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
