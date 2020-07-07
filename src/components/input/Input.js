import React from 'react'
import '../login/Login.css'

const Input = props => {
  return (
    <div>
    <input
    style={{"width":"200px"}}
      placeholder={props.text.split('_').join(' ')}
      type={props.text==='password'&& 'password'}
      value={props.val}
      onChange={e => props.handleChange(e.target)}
      name={props.text}
    />
  </div>
)}

export default Input;